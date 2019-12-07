from database import OfferFilter, OfferFilterBase
from sqlalchemy.orm import Session

def get_offer_filters(db):
    return db.query(OfferFilter).all()

def create_offer_filter(db: Session, offer_filter: OfferFilterBase):
    df_offer_filter = OfferFilter(filter=offer_filter.filter)
    db.add(df_offer_filter)
    db.commit()
    db.refresh(df_offer_filter)
    return df_offer_filter
