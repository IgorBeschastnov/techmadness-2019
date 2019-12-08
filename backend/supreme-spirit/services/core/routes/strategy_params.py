from typing import List
import redis
import json

from fastapi import Depends
from services.utils import get_db
from sqlalchemy.orm import Session

from database import StrategyParams

from .. import app

@app.post('/strategy/params')
def get_strategy_params(params: StrategyParams, db: Session = Depends(get_db)):
    r = redis.Redis(host='redis', port=6379, db=0)
    if params.window is not None:
        r.set("window", params.window)
    if params.years is not None:
        r.set("years", json.dumps(params.years))