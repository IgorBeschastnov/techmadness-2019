from typing import List

from fastapi import Depends
from sqlalchemy.orm import Session

from crud import get_offers
from crud import create_offer as create_offer_
from database import OfferModel, OfferBase
from services.utils import get_db
from .. import app


@app.get('/offers', response_model=List[OfferModel])
def offers_list(db: Session = Depends(get_db)):
    return get_offers(db)

@app.post('/offers')
def create_offer(offer: OfferBase, db: Session = Depends(get_db)):
    db_offer = create_offer_(db=db, offer=offer)
    return db_offer
