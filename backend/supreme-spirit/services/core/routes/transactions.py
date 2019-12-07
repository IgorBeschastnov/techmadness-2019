from typing import List

from crud import create_transaction as create_transaction_
from crud import get_transaction_by_id as get_transaction_by_id_
from crud import get_transactions
from fastapi import Depends
from services.utils import get_db
from sqlalchemy.orm import Session

from database import TransactionBase, TransactionModel

from .. import app


@app.get('/transactions', response_model=List[TransactionModel])
def transactions_list(db: Session = Depends(get_db)):
    return get_transactions(db)

@app.get('/transactions/{id}', response_model=TransactionModel)
def get_transaction_by_id(id: int, db: Session = Depends(get_db)):
    return get_transaction_by_id_(id, db)

@app.post('/transactions')
def create_transaction(transaction: TransactionBase, db: Session = Depends(get_db)):
    db_transaction = create_transaction_(db=db, transaction=transaction)
    return db_transaction
