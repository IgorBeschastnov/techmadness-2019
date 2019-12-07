from database import User
from sqlalchemy.orm import Session
from database import UserBase

def get_users(db):
    return db.query(User).all()

def create_user(db: Session, user: UserBase):
    db_user = User(login=user.login, address=user.address)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user