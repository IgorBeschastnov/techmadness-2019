from database import BoundOfferTemplate


def get_bound_offer_templates(db):
    return db.query(BoundOfferTemplate).all()
