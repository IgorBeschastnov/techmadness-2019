from database import OfferTemplate


def get_offer_templates(db, type_):
    query = db.query(OfferTemplate)
    if type_:
        query = query.filter(OfferTemplate.type == type_.upper())
    return query.all()
