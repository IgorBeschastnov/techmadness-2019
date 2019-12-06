from typing import List

from fastapi import Depends
from sqlalchemy.orm import Session

from crud import get_offers
from database import OfferModel
from services.utils import get_db
from .. import app


@app.get('/offers', response_model=List[OfferModel])
def offers_list(db: Session = Depends(get_db)):
    return get_offers(db)
