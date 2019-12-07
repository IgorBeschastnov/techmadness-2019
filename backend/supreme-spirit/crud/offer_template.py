from database import OfferTemplate, OfferTemplateBase
from sqlalchemy.orm import Session


def get_offer_templates(db):
    return db.query(OfferTemplate).all()

def create_offer_template(db: Session, offer_template: OfferTemplateBase):
    db_offer_template = OfferTemplate(type=offer_template.type,
                                      text=offer_template.text,
                                      data=offer_template.data)
    db.add(db_offer_template)
    db.commit()
    db.refresh(db_offer_template)
    return db_offer_template