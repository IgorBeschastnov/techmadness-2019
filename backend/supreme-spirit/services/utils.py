from database import Session


# DB Dependency for session management
def get_db():
    db = None
    try:
        db = Session()
        yield db
    finally:
        if db:
            db.close()
