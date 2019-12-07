from sqlalchemy.orm import Session

from database import User, UserBase


def get_users(db):
    return db.query(User).all()


def get_user(user_id: int, db):
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, user: UserBase):
    db_user = User(login=user.login,
    address=user.address,
    type=user.type,
    activity=user.activity,
    num_of_employees=user.num_of_employees)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def users_list_with_parametres(
    type, 
    age_from,
    age_to, 
    cur_type, 
    num_of_emp_from, 
    num_of_emp_to, 
    activity,
    db):
    print(num_of_emp_from)
    query = db.query(User)
    if age_from:
        query = query.filter(User.age >= age_from)
    if age_to:
        query = query.filter(User.age <= age_to)
    if num_of_emp_from is not None:
        query = query.filter(User.num_of_employees >= num_of_emp_from)
    if num_of_emp_to is not None:
        query = query.filter(User.num_of_employees <= num_of_emp_to)
    if type:
        query = query.filter(User.type == type)
    if activity:
        query = query.filter(User.activity == activity)
    if cur_type:
        query = query.filter(User.accounts.currency != 'rus')
    return query.all()