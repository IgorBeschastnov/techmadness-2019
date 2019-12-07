from database import Session
from collections import defaultdict

from crud import get_in_transactions_by_user_id

def auto_transaction(user_id: int, window: int):
    transactions = get_in_transactions_by_user_id(user_id, Session())
    if transactions:
        dates = defaultdict(list)

        for record in transactions:
            dates[record.to_user_id].append(record.created_at)
        



    