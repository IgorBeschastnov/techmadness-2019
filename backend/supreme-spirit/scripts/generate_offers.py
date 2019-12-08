import datetime
import json
import math
import random
import time

import redis

from crud.user import get_users
from services.strategy_runner.strategies import (
    company_birthday_event,
    autotransaction_offer,
)
from sqlalchemy.orm import Session

from database import Offer, OfferTemplate, Session


def func1(x):
    return math.log(x) * math.sin(x) ** 2


def func2(x):
    return abs(math.sqrt(x) * math.cos(x))


local_max_1 = 3
local_max_2 = 17
generation_params = (
    (func1, local_max_1, company_birthday_event),
    (func2, local_max_2, autotransaction_offer),
)
start_date = datetime.datetime(2018, 10, 1)


def generate_offers():
    db = Session()
    users = get_users(db)

    days = (datetime.datetime.utcnow() - start_date).days
    for day in range(1, days):
        for func, local_max, constructor in generation_params:
            value = func(day) / local_max
            if (random.randint(0, 100) / 100) <= value:
                constructor(
                    random.choice(users),
                    created_at=start_date + datetime.timedelta(days=day),
                    db=db,
                )


if __name__ == '__main__':
    generate_offers()
