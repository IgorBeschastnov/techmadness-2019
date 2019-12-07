from typing import List

from crud import create_user as create_user_
from crud import get_user, get_users
from fastapi import Depends
from services.utils import get_db
from sqlalchemy.orm import Session

from database import UserBase, UserModel

from .. import app


@app.get('/users', response_model=List[UserModel])
def users_list(db: Session = Depends(get_db)):
    return get_users(db)


@app.get('/users/{id_}', response_model=UserModel)
def users_list(id_: int, db: Session = Depends(get_db)):
    return get_user(id_, db)


@app.post('/users')
def create_user(user: UserBase, db: Session = Depends(get_db)):
    db_user = create_user_(db=db, user=user)
    return db_user
