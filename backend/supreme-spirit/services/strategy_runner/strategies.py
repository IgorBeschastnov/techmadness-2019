from collections import defaultdict
from datetime import timedelta

from crud import get_in_transactions_by_user_id

from database import Offer, OfferTemplate, Session
from database.models.models import OfferType


def predict_autotransaction(user_id: int, window: int):
    transactions = get_in_transactions_by_user_id(user_id, Session())
    predicted_users = defaultdict(list)
    if transactions:
        dates = defaultdict(list)

        for record in transactions:
            dates[record.to_user_id].append(record.created_at)

        for id, value in dates.items():
            if len(value) > 1:
                for i in range(len(value) - 1):
                    td = timedelta(days=window)
                    if value[i + 1] < value[i] + td:
                        predicted_users[id] = len(value)
    return predicted_users


def create_autotransaction_offers(predicted, user):
    if predicted:
        db = Session()
        for id, value in predicted.items():
            auto_transaction = OfferTemplate(
                text='Автоплатеж',
                type=OfferType.AUTOTRANSACTION,
                data={'description': 'Настройте автоплатеж!', 'user_id': id, 'weight': value},
            )
            db.add(auto_transaction)
            db.commit()
            db.refresh(auto_transaction)
            db_offer = Offer(user_id=user.id, offer_template_id=auto_transaction.id)
            db.add(db_offer)
            db.commit()
            db.refresh(db_offer)
