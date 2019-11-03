# pylint: disable=W0401,C0413,W0614

import os

from pydantic import BaseSettings


class Level:
    LOCAL = 'local'
    DEV = 'dev'
    PROD = 'prod'


RUN_LEVEL = os.getenv('RUN_LEVEL', Level.LOCAL)

DEBUG = False
from conf.envs.prod import *  # isort: ignore

if RUN_LEVEL == Level.DEV or RUN_LEVEL == Level.LOCAL:
    from conf.envs.dev import *  # isort: ignore
if RUN_LEVEL == Level.LOCAL:
    from conf.envs.local import *  # isort: ignore


class DatabaseConfig(BaseSettings):
    NAME: str = DATABASE_NAME
    USER: str = DATABASE_USER
    PASSWORD: str = DATABASE_PASSWORD
    HOST: str = DATABASE_HOST
    PORT: str = DATABASE_PORT


DB_URI = (
    f'postgresql+psycopg2://{DatabaseConfig.USER}:{DatabaseConfig.PASSWORD}@'
    f'{DatabaseConfig.HOST}:{DatabaseConfig.PORT}/{DatabaseConfig.NAME}'
)
