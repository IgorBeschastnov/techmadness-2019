from typing import List

from fastapi import Depends
from sqlalchemy.orm import Session

from crud import get_bound_offer_templates
from database import BoundOfferTemplateModel
from services.utils import get_db
from .. import app


@app.get('/boundoffertemplates', response_model=List[BoundOfferTemplateModel])
def bound_offer_template_list(db: Session = Depends(get_db)):
    return get_bound_offer_templates(db)
