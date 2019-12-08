{-# LANGUAGE DeriveGeneric #-}

module Operations where

import qualified Data.Text as Text
import qualified Control.Concurrent as Control
import qualified Data.ByteString.Lazy.Internal as Data
import           Data.Maybe
import           Data.Aeson
import           Database.HDBC
import           GHC.Generics
-- local imports
import AppEnv

-- dates are not supported yet
data OfferFilter = 
    OfferFilter { companyType     :: Maybe String
                , employeesTo     :: Maybe Integer
                , activityType    :: Maybe String
                , companyAgeTo    :: Maybe Integer
                , employeesFrom   :: Maybe Integer
                , companyAgeFrom  :: Maybe Integer
                , currencyAccount :: Maybe Bool
                  } deriving (Show, Generic)

instance FromJSON OfferFilter

decodePerson :: Data.ByteString -> Maybe OfferFilter
decodePerson = decode

getBoundOfferTemplates = executeQuery "select bound_offer_templates_id, offer_template_id, offer_filter_id from bound_offer_templates" []
getOfferTemplate template_id = executeQuery "select type, text, data from offer_templates where offer_template_id = ?" [SqlInteger template_id]
getOfferFilter filter_id = executeQuery "select filter from offer_filters where offer_filter_id = ?" [SqlInteger filter_id]

executeInsertQuery user_ids template_id
    | null user_ids = putStrLn "No users fit the criteria"
    | otherwise = do
        putStrLn $ "Executing: " ++ preparedQuery
        rows <- runQuery preparedQuery []
        putStrLn $ "Executed. Affected rows: " ++ show rows
        where preparedQuery = insertQuery user_ids template_id

insertQuery user_ids template_id = "insert into offers (offer_template_id, user_id) values " ++ rowsString
    where rowString user_id = "(" ++ show template_id ++ ", " ++ show user_id ++ ")"
          concat str1 str2 = str1 ++ ", " ++ str2
          rowsString = foldr concat (rowString $ head user_ids) [rowString user_id | user_id <- tail user_ids]

createCriteria :: String -> String -> Maybe Integer -> Maybe String
createCriteria fieldName operator value = case value of
    Nothing -> Nothing
    Just val -> Just (fieldName ++ " " ++ operator ++ " " ++ show val)

concatCriteria :: String -> Maybe String -> String
concatCriteria criteria1 criteria2 = case criteria2 of
    Nothing -> criteria1
    Just val -> if criteria1 == ""
        then val
        else criteria1 ++ " and " ++ val

createFilterQuery :: OfferFilter -> String
createFilterQuery filter = 
    let criterias = foldl concatCriteria "" [
         -- Just "1",
         -- Just "2"
          createCriteria a b c | (a, b, c) <-
          [
            ("num_of_employees", "<", employeesTo filter)
          , ("num_of_employees", ">", employeesFrom filter)
          -- activityType filter
          -- companyAgeTo filter
          -- companyAgeFrom filter
          -- currencyAccount filter
          ]
         ]
    in
        if criterias == ""
            then baseQuery ++ "true"
            else baseQuery ++ criterias
        where baseQuery = "select user_id from users where "

deleteBoundOffer bound_id = do
    putStrLn $ "Deleting BoundOfferTemplate " ++ show bound_id
    rows <- runQuery "delete from bound_offer_templates where bound_offer_templates.bound_offer_templates_id = ?" [SqlInteger bound_id]
    putStrLn $ "Deleted. Affected rows: " ++ show rows

processBoundOfferTemplate :: [SqlValue] -> IO()
processBoundOfferTemplate (bound_id:template_id:filter_id:_) = do
    putStrLn $ "Processing bound offer template " ++ show bound
    filtersArr <- getOfferFilter $ fromSql filter_id 
    let filter_str = fromSql $ head $ head filtersArr
    let filter = decodePerson filter_str
    case filter of
        Nothing -> putStrLn "Could not parse offer filter"
        Just f -> do
            let usersQuery = createFilterQuery f
            putStrLn $ "User query: " ++ usersQuery
            users_sql <- executeQuery usersQuery []
            let users = [fromSql $ head user :: Integer | user <- users_sql]
            executeInsertQuery users (fromSql template_id :: Integer)
            deleteBoundOffer bound
            putStrLn $ "Processed bound template " ++ show bound
    where bound = fromSql bound_id :: Integer

ioLoop = do
    -- log
    putStrLn "*****     Running IOLoop    *****"
    -- Get bound templates from db
    boundOfferTemplates <- getBoundOfferTemplates
    putStrLn $ "Found bound offer templates: " ++ show (length boundOfferTemplates)
    -- Process recieved data
    mapM_ processBoundOfferTemplate boundOfferTemplates
    -- sleep
    Control.threadDelay $ 5 * 1000000 -- 5 seconds
    -- run loop
    ioLoop
