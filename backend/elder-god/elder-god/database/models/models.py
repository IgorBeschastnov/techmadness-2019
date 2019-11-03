from sqlalchemy import Boolean, Column, Integer, String, orm
from sqlalchemy.dialects.postgresql import JSONB

from database import Base
from database.models.fields import ModelField
#from database.models.schemas import


class User(Base):
    __tablename__ = 'users'
    # System fields
    id = Column('user_id', Integer, primary_key=True, index=True)
    # User customization
    name = Column(String(50), nullable=True)

    def __repr__(self):
        return f'<User {self.id} : {self.name}'
