from database import OfferTemplate


def get_offer_templates(db):
    return db.query(OfferTemplate).all()
