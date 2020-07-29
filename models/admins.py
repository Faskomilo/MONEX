from models._connector_ import Base
from MainController import Queries
from sqlalchemy import Column, Integer, String, ForeignKey

class Admins(Base, Queries):
     __tablename__ = 'admins'

     id              = Column(Integer, primary_key=True, nullable=False)
     username        = Column(String, nullable=False)
     password        = Column(String, nullable=False)
     deleted         = Column(Integer, nullable=False, default=0)

     def __repr__(self):
        return "<Admins(username='%s', password='%s')>" % (
                             self.username, self.password)