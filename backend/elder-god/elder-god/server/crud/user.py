from database import User

from server.utils import operation


@operation
def get_users(db):
    return db.query(User).all()
