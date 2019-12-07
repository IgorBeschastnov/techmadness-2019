from database import BoundOfferTemplate


def get_bound_offer_templates(db, template, filter_):
    query = db.query(BoundOfferTemplate)
    if template:
        query = query.filter(BoundOfferTemplate.offer_template_id == template)
    if filter_:
        query = query.filter(BoundOfferTemplate.offer_filter_id == filter_)
    return query.all()
