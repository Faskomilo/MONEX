from models._connector_ import Base
from MainController import Queries
from sqlalchemy import Column, Integer, String, Date, ForeignKey

class Admins(Base, Queries):
     __tablename__ = 'admins'

     id = Column(Integer, primary_key=True, nullable=False)
     username = Column(String, nullable=False)
     quantity = Column(String, nullable=False)

     def __repr__(self):
        return "<User(username='%s', quantity='%s')>" % (
                             self.username, self.quantity)