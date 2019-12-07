from database import Account, AccountBase
from sqlalchemy.orm import Session


def get_accounts(db):
    return db.query(Account).all()

def create_account(db: Session, account: AccountBase):
    db_account = Account(name=account.name,
                        user_id=account.user, 
                        type=account.type,
                        currency=account.currency,
                        balance=account.balance,
                        interest=account.interest)
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account