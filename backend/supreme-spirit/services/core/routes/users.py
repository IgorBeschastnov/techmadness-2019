from typing import List

from fastapi import Depends
from sqlalchemy.orm import Session

from crud import get_users
from database import UserModel
from services.utils import get_db
from .. import app


@app.get('/users', response_model=List[UserModel])
def users_list(db: Session = Depends(get_db)):
    return get_users(db)
