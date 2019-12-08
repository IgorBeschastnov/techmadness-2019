import random
import math
from collections import defaultdict
from datetime import timedelta, datetime
from functools import reduce

from sqlalchemy import desc

from crud import get_out_transactions_by_user_id
from database import Offer, OfferTemplate, Session, OfferType, User, Transaction


def predict_autotransaction(user: User, window: int):
    transactions = get_out_transactions_by_user_id(user.id, Session())
    if not transactions:
        return None, None

    predicted_users = defaultdict(list)
    dates = defaultdict(list)

    for record in transactions:
        dates[record.to_user_id].append(record.created_at)

    for to_id, value in dates.items():
        if len(value) <= 1:
            continue
        for i in range(len(value) - 1):
            td = timedelta(days=window)
            if value[i] - td <= value[i + 1] <= value[i] + td:
                predicted_users[to_id] = len(value)

    return user, predicted_users


def create_autotransaction_offers(user, predicted, db=None):
    if not predicted:
        return
    for to_id, weight in predicted.items():
        autotransaction_offer(user, to_id, weight, db=db)


def create_offer(offer_template, user, db, created_at=None):
    db.add(offer_template)
    db.commit()
    db.refresh(offer_template)
    db_offer = Offer(user_id=user.id, offer_template_id=offer_template.id)
    if created_at is not None:
        db_offer.created_at = created_at
        db_offer.accepted = True
    db.add(db_offer)
    db.commit()
    db.refresh(db_offer)


def autotransaction_offer(user, to_id, weight=None, created_at=None, db=None):
    if db is None:
        db = Session()
    if value is None:
        value = random.randint(0, 10)
    auto_transaction = OfferTemplate(
        text='Автоплатеж',
        type=OfferType.AUTOTRANSACTION,
        data={'description': 'Настройте автоплатеж!', 'user_id': to_id, 'weight': weight},
    )
    create_offer(auto_transaction, user, db, created_at)


def company_birthday_event(user, years=None, created_at=None, db=None):
    if years and user.age not in years:
        return
    if db is None:
        db = Session()
    age_bonus = OfferTemplate(
        text='Выслуга лет!',
        type=OfferType.DEPOSIT,
        data={
            'description': 'Вы с нам уже давно! Вам специальное предложение',
            'interest': 5.5,
            'user_id': user.id,
        },
    )
    create_offer(age_bonus, user, db, created_at)


def predict_credit_offers(
    user,
    minimal_sequence,
    value=None,
    created_at=None,
    db=None
):
    if db is None:
        db = Session()

    transactions = db.query(Transaction).filter(
        ((Transaction.from_user_id == user.id) |
         (Transaction.to_user_id == user.id)) &
        ((Transaction.to_user_id != user.id) |
         (Transaction.from_user_id != user.id))
    ).order_by(desc(Transaction.created_at)).all()
    if not transactions:
        return None

    month_delta = timedelta(days=30)
    now = datetime.now()
    
    def delta(dt):
        return now - dt

    net_list = []
    for transaction in transactions:
        appended = False
        month_net = 0
        if transaction.from_user_id == user.id:
            month_net -= transaction.amount
        else:
            month_net += transaction.amount
        if delta(transaction.created_at) > month_delta:
            net_list.append(month_net)
            month_net = 0
            appended = True

    if not appended:
        net_list.append(month_net)

    sequential = 1
    avg = net_list[0]
    sign = math.copysign(1, net_list[0])
    for net in net_list[1:]:
        next_sign = math.copysign(1, net)
        if next_sign != sign:
            break
        else:
            sequential += 1
            avg += net

    if sequential < minimal_sequence:
        return None
    
    avg /= sequential

    if sign == -1:
        return -1, avg
    else:
        return 1, avg


def create_finance_offer(user, type_, amount):
    db = Session()
    offer_template = OfferTemplate(
        text='Автоплатеж',
        type=OfferType.DEPOSIT if type_ else OfferType.CREDIT,
        data={'description': 'Настройте автоплатеж!', 'interest': 5 + type_, 'amount': amount},
    )
    create_offer(offer_template, user, db)
