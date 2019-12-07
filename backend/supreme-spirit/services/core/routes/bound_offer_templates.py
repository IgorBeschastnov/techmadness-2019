from typing import List

from fastapi import Depends, Query
from sqlalchemy.orm import Session

from crud import get_bound_offer_templates
from database import BoundOfferTemplateModel
from services.utils import get_db
from .. import app


@app.get('/boundoffertemplates', response_model=List[BoundOfferTemplateModel])
def bound_offer_template_list(db: Session = Depends(get_db)):
    return get_bound_offer_templates(db)


@app.get('/boundoffertemplates', response_model=List[BoundOfferTemplateModel])
def bound_offer_templates_list(
    template: int = Query(None, description='offer template id'),
    filter_: int = Query(None, description='user filter id', alias='filter'),
    db: Session = Depends(get_db),
):
    return get_bound_offer_templates(db, template, filter_)
