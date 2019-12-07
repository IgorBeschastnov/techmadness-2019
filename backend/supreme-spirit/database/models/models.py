import datetime
from enum import IntEnum

from sqlalchemy import (
    BigInteger,
    Boolean,
    Column,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    String,
    orm,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship

from database import Base
from database.models.fields import ModelField

# from database.models.schemas import UserAccounts


class AccountType(IntEnum):
    CREDIT = 1
    DEPOSIT = 2
    PAYMENT = 3


class OfferType(IntEnum):
    CREDIT = 1
    DEPOSIT = 2
    AUTOTRANSACTION = 3
    IMPORTANT_DAY = 4
    CAR = 5
    MORTGAGE = 6
    INSURANCE = 7
    INVESTMENTS = 8

    


class UserType(IntEnum):
    OOO = 1
    ZAO = 2
    PAO = 3
    OAO = 4
    IP = 5


class UserActivity(IntEnum):
    REAL_ESTATE = 1
    IT = 2
    HR = 3
    PUBLIC_ORGANIZATION = 4
    FOODSTUFFS = 5


class User(Base):
    __tablename__ = 'users'
    # System fields
    id = Column('user_id', Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow,nullable=False)

    login = Column(String(50), nullable=False, unique=True)
    address = Column(String(50), nullable=True)
    type = Column(Enum(UserType), default=UserType.OOO)
    activity = Column(Enum(UserActivity), default=UserActivity.IT)
    num_of_employees = Column(Integer, default=12)

    @property
    def age(self):
        return (datetime.datetime.utcnow() - self.created_at).days/360


class Account(Base):
    __tablename__ = 'accounts'
    # System fields
    id = Column('account_id', Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    name = Column(String(20), default='')
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
    from_user = relationship(User, foreign_keys=[from_user_id], backref='from_transactions')

    to_user_id = Column(Integer, ForeignKey(User.id), nullable=True)
    to_user = relationship(User, foreign_keys=[to_user_id], backref='to_transactions')

    from_account_id = Column(Integer, ForeignKey(Account.id), nullable=True)
    from_account = relationship(
        Account, foreign_keys=[from_account_id], backref='from_transactions'
    )

    to_account_id = Column(Integer, ForeignKey(Account.id), nullable=True)
    to_account = relationship(Account, foreign_keys=[to_account_id], backref='to_transactions')

    amount = Column(BigInteger)


class OfferTemplate(Base):
    __tablename__ = 'offer_templates'
    id = Column('offer_template_id', Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    type = Column(Enum(OfferType))
    text = Column(String(250))
    data = Column(JSONB)


class Offer(Base):
    __tablename__ = 'offers'
    id = Column('offer_id', Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    accepted = Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey(User.id), nullable=False)
    user = relationship(User, backref='users')

    offer_template_id = Column(Integer, ForeignKey(OfferTemplate.id), nullable=False)
    offer_template = relationship(OfferTemplate, backref='offer_templates')


class OfferFilter(Base):
    __tablename__ = 'offer_filters'
    id = Column('offer_filter_id', Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    filter = Column(JSONB)


class BoundOfferTemplate(Base):
    __tablename__ = 'bound_offer_templates'
    id = Column('bound_offer_templates_id', Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    offer_filter_id = Column(Integer, ForeignKey(OfferFilter.id), nullable=True)
    offer_filter = relationship(OfferFilter, backref='bounds')

    offer_template_id = Column(Integer, ForeignKey(OfferTemplate.id), nullable=True)
    offer_template = relationship(OfferTemplate, backref='bounds')
