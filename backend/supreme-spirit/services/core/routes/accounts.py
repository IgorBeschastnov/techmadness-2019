from typing import List

from crud import create_account as create_account_
from crud import get_account_by_id as get_account_by_id_
from crud import get_accounts
from fastapi import Depends
from services.utils import get_db
from sqlalchemy.orm import Session

from database import AccountBase, AccountModel

from .. import app


@app.get('/accounts/{id}', response_model=AccountModel)
def get_account_by_id(id: int, db: Session = Depends(get_db)):
    return get_account_by_id_(id, db)


@app.get('/accounts', response_model=List[AccountModel])
def accounts_list(db: Session = Depends(get_db)):
    return get_accounts(db)


@app.post('/accounts')
def create_account(account: AccountBase, db: Session = Depends(get_db)):
    db_account = create_account_(db=db, account=account)
    return db_account
