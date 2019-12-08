import redis
import time
import json

from crud.user import get_users
from strategies import create_autotransaction_offers, predict_autotransaction

from database import Offer, OfferTemplate, Session


def run():
    r = redis.Redis(host='localhost', port=6379, db=0)
    db = Session()
    users = get_users(db)

    window = int(r.get("window"))
    print(window)
    if window is None:
        window = 5

    for user in users:
        
        create_autotransaction_offers(predict_autotransaction(user.id, window), user)


if __name__ == '__main__':
    while(True):
        run()
        time.sleep(60)
