from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String

engine = create_engine(
    'mysql+mysqlconnector://<user>:<password>@localhost:3306/<default_db>...')
Base = declarative_base()

class User(Base):
     __tablename__ = 'users'

     id = Column(Integer, primary_key=True, nullable=False)
     username = Column(String, nullable=False)
     quantity = Column(String, nullable=False)

     def __repr__(self):
        return "<User(username='%s', quantity='%s')>" % (
                             self.username, self.quantity)