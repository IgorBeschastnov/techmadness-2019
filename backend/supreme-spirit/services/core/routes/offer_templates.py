from typing import List

from fastapi import Depends
from sqlalchemy.orm import Session

from crud import get_offer_templates
from database import OfferTemplateModel
from services.utils import get_db
from .. import app


@app.get('/offertemplates', response_model=List[OfferTemplateModel])
def offer_templates_list(db: Session = Depends(get_db)):
    return get_offer_templates(db)
