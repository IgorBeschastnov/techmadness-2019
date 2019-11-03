from typing import List

from database import UserModel
from server import app
from server.crud import get_users


@app.get("/users", response_model=List[UserModel])
def users_list():
    return get_users()
