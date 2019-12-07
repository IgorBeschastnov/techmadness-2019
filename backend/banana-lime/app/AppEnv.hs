module AppEnv where

import           Database.HDBC
import qualified Database.HDBC.PostgreSQL as Postgres

dbHost = "localhost"
dbPort = "5432"
dbUser = "user"
dbPassword = "password"
dbName = "hack"

connectionString = "postgres://" 
    ++ dbUser ++ ":"
    ++ dbPassword ++ "@"
    ++ dbHost ++ ":"
    ++ dbPort ++ "/"
    ++ dbName

--connection :: IO Postgres.Connection
connection = Postgres.connectPostgreSQL connectionString

query op args connection = quickQuery' connection op args
executeQuery op args = Postgres.withPostgreSQL connectionString (query op args)


runSimple op args connection = run connection op args
--runQuery op args = Postgres.withPostgreSQL connectionString (runSimple op args)
runQuery op args = do
    conn <- connection
    rows <- run conn op args
    commit conn
    return rows
