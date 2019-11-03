from fastapi import FastAPI

app = FastAPI()

from .routes import *  # pylint: disable=C0413  # isort:skip
