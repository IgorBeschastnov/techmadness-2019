from database import Session


def operation(func):
    def decorated(*args, **kwargs):
        try:
            db = Session()
            return func(db, *args, **kwargs)
        finally:
            db.close()
    return decorated
