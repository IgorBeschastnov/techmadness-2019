from typing import List

from fastapi import Depends
from sqlalchemy.orm import Session

from crud import get_offer_filters
from crud import create_offer_filter as create_offer_filter_
from database import OfferFilterModel, OfferFilterBase
from services.utils import get_db
from .. import app


@app.get('/offerfilters', response_model=List[OfferFilterModel])
def offer_filters_list(db: Session = Depends(get_db)):
    return get_offer_filters(db)

@app.post('/offerfilters')
def create_offer_filter(offer_filter: OfferFilterBase, db: Session = Depends(get_db)):
    df_offer_filter = create_offer_filter_(db=db, offer_filter=offer_filter)
    return df_offer_filter
