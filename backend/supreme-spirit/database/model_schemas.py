import datetime
from typing import Dict, List, Optional

from pydantic import BaseModel

from database.models.models import AccountType, OfferType, UserType, UserActivity


class UserBase(BaseModel):
    login: str
    address: str
    type: UserType
    activity: UserActivity
    num_of_employees: int


class UserCreate(UserBase):
    pass



class AccountBase(BaseModel):
    name: str
    balance: float
    currency: str
    user: int
    type: AccountType
    interest: float

    
class UserModel(UserBase):
    id: int
    created_at: datetime.datetime
    age: int
    accounts: Optional[List[AccountBase]]

    class Config:
        orm_mode = True


class AccountCreate(AccountBase):
    pass


class AccountModel(AccountBase):
    id: int
    user: UserModel
    created_at: datetime.datetime

    class Config:
        orm_mode = True


class TransactionBase(BaseModel):
    from_user: int
    to_user: int
    from_account: int
    to_account: int
    amount: float


class TransactionCreate(TransactionBase):
    pass


class TransactionModel(TransactionBase):
    id: int
    from_user: UserModel
    to_user: UserModel
    from_account: AccountModel
    to_account: AccountModel
    created_at: datetime.datetime

    class Config:
        orm_mode = True


class OfferTemplateBase(BaseModel):
    type: OfferType
    text: str
    data: Dict


class OfferTemplateCreate(OfferTemplateBase):
    pass


class OfferTemplateModel(OfferTemplateBase):
    id: int
    created_at: datetime.datetime

    class Config:
        orm_mode = True


class OfferBase(BaseModel):
    user_id: int
    offer_template_id: int


class OfferCreate(OfferBase):
    pass


class OfferModel(OfferBase):
    id: int
    created_at: datetime.datetime

    user: UserModel
    offer_template: OfferTemplateModel

    class Config:
        orm_mode = True


class OfferFilterBase(BaseModel):
    filter: Dict


class OfferFilterCreate(OfferFilterBase):
    pass


class OfferFilterModel(OfferFilterBase):
    id: int
    created_at: datetime.datetime

    class Config:
        orm_mode = True


class BoundOfferTemplateBase(BaseModel):
    offer_filter_id: int
    offer_template_id: int


class BoundOfferTemplateCreate(BoundOfferTemplateBase):
    offer_filter: OfferFilterModel
    offer_template: OfferTemplateModel


class BoundOfferTemplateModel(BoundOfferTemplateCreate):
    id: int
    created_at: datetime.datetime

    class Config:
        orm_mode = True
