from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.requests import Request
from starlette.responses import JSONResponse

app = FastAPI()

@app.exception_handler(Exception)
def type_error_handler(request: Request, exc):
    return JSONResponse(status_code=200, content={'ok': False, 'error': str(exc)})


from .routes import *  # pylint: disable=C0413  # isort:skip
