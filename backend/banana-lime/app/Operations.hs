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

getBoundOfferTemplates = executeQuery "select offer_template_id, offer_filter_id from bound_offer_templates" []
getOfferTemplate template_id = executeQuery "select type, text, data from offer_templates where offer_template_id = ?" [SqlInteger template_id]
getOfferFilter filter_id = executeQuery "select filter from offer_filters where offer_filter_id = ?" [SqlInteger filter_id]

executeInsertQuery user_ids template_id = do
    putStr preparedQuery
    executeQuery preparedQuery []
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
          ]
         ]
    in
        if criterias == ""
            then baseQuery ++ "true"
            else baseQuery ++ criterias
        where baseQuery = "select user_id from users where "
          
          --actType = activityType filter
          --compAgeTo = companyAgeTo filter
          --compAgeFrom = companyAgeFrom filter
          --currency = currencyAccount filter

getUsers filter = executeQuery query []
    where query = createFilterQuery filter

processBoundOfferTemplate (template_id:filter_id:_) = do
    filtersArr <- getOfferFilter $ fromSql filter_id 
    let filter_str = fromSql $ head $ head filtersArr
    let filter = decodePerson filter_str
    case filter of
        Nothing -> putStr "Could not parse offer filter"
        Just f -> do
            users_sql <- getUsers f
            let users = [fromSql $ head user :: Integer | user <- users_sql]
            executeInsertQuery users (fromSql template_id :: Integer)
            putStr "Created offers"

ioLoop = do
    -- log
    putStr "Consumer is running\n"
    -- Get bound templates from db
    boundOfferTemplates <- getBoundOfferTemplates
    -- Process recieved data
    mapM_ processBoundOfferTemplate boundOfferTemplates
    -- sleep
    Control.threadDelay $ 5 * 1000000 -- 5 seconds
    -- run loop
    ioLoop
