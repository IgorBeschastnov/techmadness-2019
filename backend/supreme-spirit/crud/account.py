from database import Account


def get_accounts(db):
    return db.query(Account).all()
