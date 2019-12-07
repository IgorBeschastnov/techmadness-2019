from crud.user import get_users
from strategies import create_autotransaction_offers, predict_autotransaction

from database import Offer, OfferTemplate, Session


def run():
    db = Session()
    users = get_users(db)
    for user in users:
        create_autotransaction_offers(predict_autotransaction(user.id, 5), user)


if __name__ == '__main__':
    run()
