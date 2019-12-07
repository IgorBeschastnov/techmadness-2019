from typing import List

from fastapi import Depends
from sqlalchemy.orm import Session

from crud import get_bound_offer_templates
from crud import create_bound_offer_template as create_bound_offer_template_
from database import BoundOfferTemplateModel, BoundOfferTemplateBase
from services.utils import get_db
from .. import app


@app.get('/boundoffertemplates', response_model=List[BoundOfferTemplateModel])
def bound_offer_template_list(db: Session = Depends(get_db)):
    return get_bound_offer_templates(db)

@app.post('/boundoffertemplates')
def create_bound_offer_template(bound_offer_template: BoundOfferTemplateBase,
                        db: Session = Depends(get_db)):
    df_bound_offer_template = create_bound_offer_template_(db=db, 
                                                          bound_offer_template=bound_offer_template)
    return df_bound_offer_template
