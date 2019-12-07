from database import User
from sqlalchemy.orm import Session
from database import UserBase

def get_users(db):
    return db.query(User).all()

def get_user(user_id: int, db):
    return db.query(User).filter(User.id == user_id).first()

def create_user(db: Session, user: UserBase):
    db_user = User(login=user.login, address=user.address)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user