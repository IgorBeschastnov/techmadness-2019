from typing import List

from fastapi import Depends
from sqlalchemy.orm import Session

from crud import get_transactions
from crud import create_transaction as create_transaction_
from database import TransactionModel, TransactionBase
from services.utils import get_db
from .. import app


@app.get('/transactions', response_model=List[TransactionModel])
def transactions_list(db: Session = Depends(get_db)):
    return get_transactions(db)

@app.post('/transactions')
def create_transaction(transaction: TransactionBase, db: Session = Depends(get_db)):
    db_transaction = create_transaction_(db=db, transaction=transaction)
    return db_transaction
