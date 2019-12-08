import datetime
import json
import math
import random
import time

import redis
from crud.user import get_users
from services.strategy_runner.strategies import (
    company_birthday_event,
    create_autotransaction_offers,
    predict_autotransaction,
)
from sqlalchemy.orm import Session

from database import Offer, OfferTemplate, Session


def func(day):
    return math.log(day) * math.sin(day) ** 2


def func2(day):
    return (math.log(day) * math.sin(day) ** 2) - 1


def generate_offers():
    r = redis.Redis(host='localhost', port=6379, db=0)
    db = Session()
    users = get_users(db)

    window = int(r.get('window'))
    years = json.loads(r.get('years'))

    if window is None:
        window = 5

    for user in users:
        company_birthday_event(user, years)

    days = (datetime.datetime.utcnow() - datetime.datetime(2015, 1, 1)).days
    for day in range(1, days):
        value = func(day)
        if (random.randint(0, 100) / 100) < value:
            company_birthday_event(
                user, years, datetime.datetime(2015, 1, 1) + datetime.timedelta(days=day), db
            )

    for day in days:
        value = func2(day)
        if (random.randint(0, 100) / 100) < value:
            create_autotransaction_offers(
                predict_autotransaction(
                    user.id,
                    window,
                    datetime.datetime(2015, 1, 1) + datetime.timedelta(days=day),
                    db,
                ),
                user,
            )


if __name__ == '__main__':
    generate_offers()
