from sqlalchemy.orm import Session

from database import Account, AccountBase


def get_accounts(db):
    return db.query(Account).all()


def get_account_by_id(id_: int, db):
    return db.query(Account).filter(Account.id == id_).first()


def create_account(db: Session, account: AccountBase):
    db_account = Account(
        name=account.name,
        user_id=account.user,
        type=account.type,
        currency=account.currency,
        balance=account.balance,
        interest=account.interest,
    )
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account
