from sqlalchemy.orm import Session

from database import Transaction, TransactionBase


def get_transactions(db):
    result = db.query(Transaction).all()
    print('HERE\n\n\n')
    print(result[0].from_account_id)
    print(result[0].from_account)
    print('HERE\n\n\n')
    return db.query(Transaction).all()


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
