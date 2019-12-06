from enum import IntEnum

from sqlalchemy import Boolean, Column, Integer, String, orm, Enum, BigInteger, Float
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship

from database import Base
from database.models.fields import ModelField
#from database.models.schemas import UserAccounts


class AccountType(IntEnum):
    CREDIT = 1
    DEPOSIT = 2
    PAYMENT = 3


class User(Base):
    __tablename__ = 'users'
    # System fields
    id = Column('user_id', Integer, primary_key=True, index=True)

    login = Column(String(50), nullable=False)
    address = Column(String(50), nullable=True)

    def __repr__(self):
        return f'<User {self.id} : {self.name}'


class Account(Base):
    __tablename__ = 'accounts'
    # System fields
    id = Column('user_id', Integer, primary_key=True, index=True)

    user = relationship(User, backref='accounts')
    type = Column(Enum(AccountType), default=AccountType.PAYMENT)
    currency = Column(String(20), default='rub')
    balance = Column(BigInteger, default=0)
    interest = Column(Float, default=0)
