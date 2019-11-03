from database import User


def get_users(db):
    return db.query(User).all()
