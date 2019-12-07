from database import BoundOfferTemplate, BoundOfferTemplateBase
from sqlalchemy.orm import Session

def get_bound_offer_templates(db):
    return db.query(BoundOfferTemplate).all()

def create_bound_offer_template(db: Session, bound_offer_template: BoundOfferTemplateBase):
    df_bound_offer_template = BoundOfferTemplate(offer_filter_id=bound_offer_template.offer_filter_id,
                                                 offer_template_id=bound_offer_template.offer_filter_id)
    db.add(df_bound_offer_template)
    db.commit()
    db.refresh(df_bound_offer_template)
    return df_bound_offer_template

