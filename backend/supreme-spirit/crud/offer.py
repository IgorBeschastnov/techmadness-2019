from sqlalchemy.orm import Session

from database import Offer, OfferBase


def get_offers(db):
    return db.query(Offer).all()


def get_offers_by_user_id(user_id, db):
    return db.query(Offer).filter(Offer.user_id == user_id).all()


def get_offer_by_id(id_: int, db):
    return db.query(Offer).filter(Offer.id == id_).first()


def create_offer(db: Session, offer: OfferBase):
    db_offer = Offer(user_id=offer.user_id, offer_template_id=offer.offer_template_id)
    db.add(db_offer)
    db.commit()
    db.refresh(db_offer)
    return db_offer


def update_offer(id, db):
    result = db.query(Offer).filter(Offer.id == id).update({'accepted': True})
    db.commit()
    return result
