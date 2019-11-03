# pylint: disable=W0401,C0413,W0614

import os


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

# Database configuration
DATABASE_NAME = os.getenv('DATABASE_NAME', DATABASE_NAME)
DATABASE_USER = os.getenv('DB_USER', DATABASE_USER)
DATABASE_PASSWORD = os.getenv('DB_PASSWORD', DATABASE_PASSWORD)
DATABASE_HOST = os.getenv('DB_HOST', DATABASE_HOST)
DATABASE_PORT = os.getenv('DB_PORT', DATABASE_PORT)

DB_URI = (
    f'postgresql+psycopg2://{DATABASE_USER}:{DATABASE_PASSWORD}@'
    f'{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}'
)
