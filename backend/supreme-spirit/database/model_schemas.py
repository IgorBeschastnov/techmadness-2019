from pydantic import BaseModel
from database.models.models import AccountType
import datetime

class UserBase(BaseModel):
    name: str


class UserCreate(UserBase):
    pass


class UserModel(UserBase):
    id: int

    class Config:
        orm_mode = True


class AccountBase(BaseModel):
    name: str
    balance : float
    currency : str
    type : AccountType

class AccountCreate(AccountBase):
    pass


class AccountModel(AccountBase):
    id: int
    user : UserModel
    created_at : datetime.datetime

    class Config:
        orm_mode = True

class TransactionBase(BaseModel):
    from_user : int
    to_user : int
    from_account : int
    to_account : int
    amount : float

class TransactionCreate(TransactionBase):
    pass

class TransactionModel(TransactionBase):
    id: int
    from_user : UserModel
    to_user : UserModel
    from_account : AccountModel
    to_account : AccountModel
    created_at : datetime.datetime

    class Config:
        orm_mode = True

