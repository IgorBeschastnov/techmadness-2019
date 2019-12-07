from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse

app = FastAPI(title='Core API', description='Endpoints for interacting with recommendation backend')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.exception_handler(Exception)
def type_error_handler(request: Request, exc):
    return JSONResponse(status_code=200, content={'ok': False, 'error': str(exc)})


from .routes import *  # pylint: disable=C0413  # isort:skip
