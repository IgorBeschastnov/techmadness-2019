from crud.user import get_users
from database import Session
from strategies import auto_transaction

def run():
    db = Session()
    users = get_users(db)
    for user in users:
        auto_transaction(user.id, db)
    

if __name__ == "__main__":
    run()