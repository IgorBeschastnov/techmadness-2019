from database import Transaction, TransactionBase
from sqlalchemy.orm import Session

def get_transactions(db):
    return db.query(Transaction).all()

def create_transaction(db: Session, transaction: TransactionBase):
    db_transaction = Transaction(from_user_id=transaction.from_user,
                          to_user_id=transaction.to_user,
                          from_account_id=transaction.from_account,
                          to_account_id=transaction.to_account,
                          amount=transaction.amount)
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction