{-# LANGUAGE DeriveGeneric #-}

module Operations where

import qualified Data.Text as Text
import qualified Control.Concurrent as Control
import qualified Data.ByteString.Lazy.Internal as Data
import           Data.Aeson
import           Database.HDBC
import           GHC.Generics
-- local imports
import AppEnv

-- dates are not supported yet
data OfferFilter = 
    OfferFilter { companyType     :: String
                , employeesTo     :: Integer
                , activityType    :: String
                , companyAgeTo    :: Integer
                , employeesFrom   :: Integer
                , companyAgeFrom  :: Integer
                , currencyAccount :: Bool
                  } deriving (Show, Generic)

instance FromJSON OfferFilter

decodePerson :: Data.ByteString -> Maybe OfferFilter
decodePerson = decode


showSql val = Text.pack $ fromSql val
showBoundOfferTemplate template_id filter_id =  Text.append first $ Text.append (Text.pack " ") second
    where first = showSql template_id
          second = showSql filter_id

getBoundOfferTemplates = executeQuery "select offer_template_id, offer_filter_id from bound_offer_templates" []
getOfferTemplate template_id = executeQuery "select type, text, data from offer_templates where offer_template_id = ?" [SqlInteger template_id]
getOfferFilter filter_id = executeQuery "select filter from offer_filters where offer_filter_id = ?" [SqlInteger filter_id]

processBoundOfferTemplate (template_id:filter_id:_) = do
    filtersArr <- getOfferFilter $ fromSql filter_id 
    let filter_str = fromSql $ head $ head filtersArr
    let filter = decodePerson filter_str
    putStr $ show filter

ioLoop = do
    -- log
    putStr "Consumer is running\n"
    -- Get bound templates from db
    boundOfferTemplates <- getBoundOfferTemplates
    -- Process recieved data
    mapM_ processBoundOfferTemplate boundOfferTemplates
    -- putStr $ Text.unpack (Text.unlines [Text.pack string | string <- strings])
    -- sleep
    Control.threadDelay $ 5 * 1000000
    -- run loop
    ioLoop
