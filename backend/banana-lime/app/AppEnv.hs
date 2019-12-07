module AppEnv where

import           Database.HDBC
import qualified Database.HDBC.PostgreSQL as Postgres

dbHost = "localhost"
dbPort = "5432"
dbUser = "user"
dbPassword = "password"
dbName = "hack"

query op args connection = quickQuery' connection op args
executeQuery op args = Postgres.withPostgreSQL connectionString (query op args)
    where connectionString = "postgres://" 
            ++ dbUser ++ ":"
            ++ dbPassword ++ "@"
            ++ dbHost ++ ":"
            ++ dbPort ++ "/"
            ++ dbName
    