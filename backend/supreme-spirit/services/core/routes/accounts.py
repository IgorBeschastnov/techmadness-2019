from typing import List

from fastapi import Depends
from sqlalchemy.orm import Session

from crud import get_accounts
from database import AccountModel
from services.utils import get_db
from .. import app


@app.get('/accounts', response_model=List[AccountModel])
def accounts_list(db: Session = Depends(get_db)):
    return get_accounts(db)
