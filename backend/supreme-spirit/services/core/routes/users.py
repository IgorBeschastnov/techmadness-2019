from typing import List

from fastapi import Depends
from sqlalchemy.orm import Session

from crud import get_users
from crud import create_user as create_user_
from database import UserBase, UserModel
from services.utils import get_db
from .. import app


@app.get('/users', response_model=List[UserModel])
def users_list(db: Session = Depends(get_db)):
    return get_users(db)

@app.post('/users')
def create_user(user: UserBase, db: Session = Depends(get_db)):
    db_user = create_user_(db=db, user=user)
    return db_user