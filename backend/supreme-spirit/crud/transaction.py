from database import Transaction


def get_transactions(db):
    return db.query(Transaction).all()
