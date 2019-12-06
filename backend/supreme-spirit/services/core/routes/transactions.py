from typing import List

from fastapi import Depends
from sqlalchemy.orm import Session

from crud import get_transactions
from database import TransactionModel
from services.utils import get_db
from .. import app


@app.get('/transactions', response_model=List[TransactionModel])
def transactions_list(db: Session = Depends(get_db)):
    return get_transactions(db)
