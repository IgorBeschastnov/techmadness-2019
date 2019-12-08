import json
import time

import redis

from crud.user import get_users
from database import Offer, OfferTemplate, Session
from strategies import (
    company_birthday_event,
    create_autotransaction_offers,
    predict_autotransaction,
    predict_credit_offers,
    create_finance_offer,
)

r = redis.Redis(host='redis', port=6379, db=0)


def get_or_default(key, default, encoder = lambda x: x, decoder = lambda x: x):
    if not r.exists(key):
        value = default
        r.set(key, encoder(value))
    else:
        value = decoder(r.get(key))
    return value


def run():
    db = Session()
    users = get_users(db)

    window = get_or_default('window', 1, str, int)
    years = get_or_default('years', [0, 1, 3, 5], json.dumps, json.loads)
    minimal_sequence = get_or_default('minimal_sequence', 5, str, int)

    for user in users:
        company_birthday_event(user, years)
        create_autotransaction_offers(*predict_autotransaction(user, window))

        finance_offer = predict_credit_offers(user, minimal_sequence)
        if finance_offer is not None:
            create_finance_offer(user, *finance_offer)


if __name__ == '__main__':
    while True:
        run()
        time.sleep(60)  # TODO
