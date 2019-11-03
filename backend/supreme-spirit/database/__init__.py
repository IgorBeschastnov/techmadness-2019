from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from conf import DB_URI

SQLALCHEMY_DATABASE_URL = DB_URI
engine = create_engine(SQLALCHEMY_DATABASE_URL)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

from .models import User  # pylint: disable=C0413  # isort:skip
from .model_schemas import *  # pylint: disable=C0413  # isort:skip

__all__ = ['Base', 'Session', 'User', 'UserCreate', 'UserModel']
