import datetime
from enum import IntEnum

from sqlalchemy import ForeignKey, Boolean, Column, Integer, String, orm, Enum, BigInteger, Float, DateTime
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
    id = Column('account_id', Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    user_id = Column(Integer, ForeignKey(User.id), nullable=True)
    user = relationship(User, backref='accounts')
    type = Column(Enum(AccountType), default=AccountType.PAYMENT)
    currency = Column(String(20), default='rub')
    balance = Column(BigInteger, default=0)
    interest = Column(Float, default=0)


class Transaction(Base):
    __tablename__ = 'transactions'
    id = Column('transaction_id', Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    from_user_id = Column(Integer, ForeignKey(User.id), nullable=True)
    from_user = relationship(User, backref='transactions')

    to_user_id = Column(Integer, ForeignKey(User.id), nullable=True)
    to_user = relationship(User, backref='transactions')

    from_account_id = Column(Integer, ForeignKey(Account.id), nullable=True)
    from_account = relationship(Account, backref='transactions')

    to_account_id = Column(Integer, ForeignKey(Account.id), nullable=True)
    to_account = relationship(Account, backref='transactions')

    amount = Column(BigInteger)
