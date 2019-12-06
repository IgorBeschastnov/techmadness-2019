from database import Offer


def get_offers(db):
    return db.query(OfferTemOfferplate).all()
