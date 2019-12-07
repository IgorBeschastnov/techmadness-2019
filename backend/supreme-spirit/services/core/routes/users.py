import datetime
from typing import List

from crud import create_user as create_user_
from crud import get_user, get_users
from crud import users_list_with_parametres as users_list_with_parametres_
from fastapi import Depends
from services.utils import get_db
from sqlalchemy.orm import Session

from database import UserBase, UserModel
from database.models.models import UserActivity, UserType

from .. import app


@app.get('/users', response_model=List[UserModel])
def users_list_with_parametres(
    type: UserType = None,
    age_from: datetime.datetime = None,
    age_to: datetime.datetime = None,
    cur_type: str = None,
    num_of_emp_from: int = None,
    num_of_emp_to: int = None,
    activity: UserActivity = None,
    db: Session = Depends(get_db),
):
    return users_list_with_parametres_(
        type, age_from, age_to, cur_type, num_of_emp_from, num_of_emp_to, activity, db
    )


@app.get('/users/{id}', response_model=UserModel)
def users_list(id: int, db: Session = Depends(get_db)):
    return get_user(id, db)


@app.post('/users')
def create_user(user: UserBase, db: Session = Depends(get_db)):
    db_user = create_user_(db=db, user=user)
    return db_user
