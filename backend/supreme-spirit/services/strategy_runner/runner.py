import json
import time

import redis
from crud.user import get_users
from strategies import (
    company_birthday_event,
    create_autotransaction_offers,
    predict_autotransaction,
)

from database import Offer, OfferTemplate, Session


def run():
    r = redis.Redis(host='localhost', port=6379, db=0)
    db = Session()
    users = get_users(db)

    window = int(r.get('window'))
    years = json.loads(r.get('years'))

    print(window)
    print(years)
    if window is None:
        window = 5

    for user in users:
        company_birthday_event(user, years)
        # create_autotransaction_offers(predict_autotransaction(user.id, window), user)


if __name__ == '__main__':
    while True:
        run()
        time.sleep(60)
