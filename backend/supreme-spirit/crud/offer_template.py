from sqlalchemy.orm import Session

from database import OfferTemplate, OfferTemplateBase


def get_offer_templates(db, type_):
    query = db.query(OfferTemplate)
    if type_:
        query = query.filter(OfferTemplate.type == type_.upper())
    return query.all()


def get_offer_template_by_id(id_: int, db):
    return db.query(OfferTemplate).filter(OfferTemplate.id == id_).first()


def create_offer_template(db: Session, offer_template: OfferTemplateBase):
    db_offer_template = OfferTemplate(
        type=offer_template.type, text=offer_template.text, data=offer_template.data
    )
    db.add(db_offer_template)
    db.commit()
    db.refresh(db_offer_template)
    return db_offer_template
