from typing import List

from crud import create_offer_filter as create_offer_filter_
from crud import get_offer_filter_by_id as get_offer_filter_by_id_
from crud import get_offer_filters
from fastapi import Depends
from services.utils import get_db
from sqlalchemy.orm import Session

from database import OfferFilterBase, OfferFilterModel

from .. import app


@app.get('/offerfilters', response_model=List[OfferFilterModel])
def offer_filters_list(db: Session = Depends(get_db)):
    return get_offer_filters(db)

@app.get('/offerfilters/{id}', response_model=OfferFilterModel)
def get_offer_filter_by_id(id: int, db: Session = Depends(get_db)):
    return get_offer_filter_by_id_(db)

@app.post('/offerfilters')
def create_offer_filter(offer_filter: OfferFilterBase, db: Session = Depends(get_db)):
    df_offer_filter = create_offer_filter_(db=db, offer_filter=offer_filter)
    return df_offer_filter
