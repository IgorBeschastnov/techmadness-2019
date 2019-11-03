from pydantic import BaseModel


class UserBase(BaseModel):
    name: str


class UserCreate(UserBase):
    pass


class UserModel(UserBase):
    id: int

    class Config:
        orm_mode = True
