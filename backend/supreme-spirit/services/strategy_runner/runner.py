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
)


def run():
    r = redis.Redis(host='localhost', port=6379, db=0)
    db = Session()
    users = get_users(db)

    if not r.exists('window'):
        window = 1
        r.set('window', '1')
    else:
        window = int(r.get('window'))
    
    if not r.exists('years'):
        years = [0, 1, 3, 5]
        r.set('years', json.dumps(years))
    else:
        years = json.loads(r.get('years'))

    print(window)
    print(years)

    for user in users:
        #company_birthday_event(user, years)
        #create_autotransaction_offers(*predict_autotransaction(user, window))
        predict_credit_offers(user)


if __name__ == '__main__':
    while True:
        run()
        time.sleep(60)
