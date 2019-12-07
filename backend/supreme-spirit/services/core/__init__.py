from fastapi import FastAPI

app = FastAPI(title='Core API', description='Endpoints for interacting with recommendation backend')

from .routes import *  # pylint: disable=C0413  # isort:skip
