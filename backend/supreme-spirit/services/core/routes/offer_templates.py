from typing import List

from fastapi import Depends, Query
from sqlalchemy.orm import Session

from crud import get_offer_templates
from database import OfferTemplateModel
from services.utils import get_db
from .. import app


@app.get('/offertemplates', response_model=List[OfferTemplateModel])
def offer_templates_list(
    type_: str = Query(None, alias='type'),
    db: Session = Depends(get_db)
):
    return get_offer_templates(db, type_)
