from sqlalchemy.orm import Session

from database import Transaction, TransactionBase


def get_transactions(db):
    return db.query(Transaction).all()

def get_transaction_by_id(id_, db):
    return db.query(Transaction).filter(Transaction.id == id_).first()


def create_transaction(db: Session, transaction: TransactionBase):
    db_transaction = Transaction(
        from_user_id=transaction.from_user,
        to_user_id=transaction.to_user,
        from_account_id=transaction.from_account,
        to_account_id=transaction.to_account,
        amount=transaction.amount,
    )
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction
