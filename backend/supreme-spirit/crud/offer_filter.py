from database import OfferFilter


def get_offer_filters(db):
    return db.query(OfferFilter).all()
