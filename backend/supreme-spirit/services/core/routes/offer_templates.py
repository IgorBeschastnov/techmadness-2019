from typing import List

from fastapi import Depends, Query
from sqlalchemy.orm import Session

from crud import get_offer_templates
from crud import create_offer_template as create_offer_template_
from database import OfferTemplateModel, OfferTemplateBase
from services.utils import get_db
from .. import app


@app.get('/offertemplates', response_model=List[OfferTemplateModel])
def offer_templates_list(
    type_: str = Query(None, alias='type'),
    db: Session = Depends(get_db)
):
    return get_offer_templates(db, type_)


@app.post('/offertemplates')
def create_offer_template(offer_template: OfferTemplateBase, db: Session = Depends(get_db)):
    db_offer_template = create_offer_template_(db=db, offer_template=offer_template)
    return db_offer_template
