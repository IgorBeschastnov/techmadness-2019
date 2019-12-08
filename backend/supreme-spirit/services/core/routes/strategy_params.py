import json
from typing import List, Dict, Any

import redis
from fastapi import Depends
from services.utils import get_db
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import StrategyParams

from .. import app

r = redis.Redis(host='redis', port=6379, db=0)


class StrategyModel(BaseModel):
    title: str
    params: Dict[str, Any]


class StrategyListModel(BaseModel):
    strategies: List[StrategyModel]


@app.post('/strategy/params')
def get_strategy_params(params: StrategyParams, db: Session = Depends(get_db)):
    if params.window is not None:
        r.set('window', params.window)
    if params.years is not None:
        r.set('years', json.dumps(params.years))


@app.get('/strategy/params')
def get_strategy_params(db: Session = Depends(get_db)):
    window = r.get('window')
    years = r.get('years')
    return StrategyListModel(strategies=[
        StrategyModel(
            title='Автоплатеж',
            params={
                'windows': window,
            }
        ),
        StrategyModel(
            title='Предложения на годовщину',
            params={
                'years': years,
            }
        )
    ])
