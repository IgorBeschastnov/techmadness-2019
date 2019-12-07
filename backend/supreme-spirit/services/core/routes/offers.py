from typing import List

from crud import create_offer as create_offer_
from crud import get_offers
from fastapi import Depends
from services.utils import get_db
from sqlalchemy.orm import Session

from database import OfferBase, OfferModel

from .. import app


@app.get('/offers', response_model=List[OfferModel])
def offers_list(db: Session = Depends(get_db)):
    return get_offers(db)


@app.post('/offers')
def create_offer(offer: OfferBase, db: Session = Depends(get_db)):
    db_offer = create_offer_(db=db, offer=offer)
    return db_offer
