import datetime
import json
import math
import random
import time

import redis
from crud.user import get_users
from services.strategy_runner.strategies import autotransaction_offer, company_birthday_event
from sqlalchemy.orm import Session

from database import Offer, OfferTemplate, OfferType, Session

pull = (
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt '
    'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco '
    'laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in '
    'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat '
    'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'.split()
)


def generate_offers_unaccepted():
    db = Session()
    users = get_users(db)

    db = Session()
    for _ in range(1, 60):
        user = random.choice(users)
        age_bonus = OfferTemplate(
            text=' '.join(random.choices(pull, k=5)),
            type=random.choice(list(OfferType)),
            data={
                'description': ' '.join(random.choices(pull, k=10)),
                'interest': random.randint(0, 10),
                'user_id': user.id,
            },
        )
        db.add(age_bonus)
        db.commit()
        db.refresh(age_bonus)
        db_offer = Offer(user_id=user.id, offer_template_id=age_bonus.id)
        db_offer.accepted = random.choice([True, False])
        db.add(db_offer)
        db.commit()
        db.refresh(db_offer)
        print(user.id, db_offer.id)


if __name__ == '__main__':
    generate_offers_unaccepted()
