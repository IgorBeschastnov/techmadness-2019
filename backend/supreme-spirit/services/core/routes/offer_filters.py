from typing import List

from fastapi import Depends
from sqlalchemy.orm import Session

from crud import get_offer_filters
from database import OfferFilterModel
from services.utils import get_db
from .. import app


@app.get('/offerfilters', response_model=List[OfferFilterModel])
def offer_filters_list(db: Session = Depends(get_db)):
    return get_offer_filters(db)
