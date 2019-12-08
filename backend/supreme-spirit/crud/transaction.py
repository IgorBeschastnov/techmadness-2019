from sqlalchemy import or_
from sqlalchemy.orm import Session

from database import Account, Transaction, TransactionBase, TransactionCreate


def get_transactions(db):
    return db.query(Transaction).all()


def get_out_transactions_by_user_id(id, db):
    return db.query(Transaction).filter(Transaction.from_user_id == id).all()


def get_in_transactions_by_user_id(id, db):
    return db.query(Transaction).filter(Transaction.to_user_id == id).all()


def get_transactions_by_user_id(id, db):
    return (
        db.query(Transaction)
        .filter(or_(Transaction.to_user_id == id, Transaction.from_user_id == id))
        .all()
    )


def get_transaction_by_id(id_, db):
    return db.query(Transaction).filter(Transaction.id == id_).first()


def create_transaction(db: Session, transaction: TransactionBase):

    from_acc = db.query(Account).filter(Account.id == transaction.from_account).first()
    to_acc = db.query(Account).filter(Account.id == transaction.to_account).first()

    from_acc.balance -= transaction.amount
    to_acc.balance += transaction.amount
    db_transaction = Transaction(
        from_user_id=from_acc.user_id,
        to_user_id=to_acc.user_id,
        from_account_id=transaction.from_account,
        to_account_id=transaction.to_account,
        amount=transaction.amount,
    )

    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction
