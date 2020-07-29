from models._connector_ import Base
from MainController import Queries
from sqlalchemy import Column, Integer, String, ForeignKey

class Bills(Base, Queries):
     __tablename__ = 'bills'

     id              = Column(Integer, primary_key=True, nullable=False)
     quantity        = Column(Integer, nullable=False)

     def __repr__(self):
        return "<Bills(id='%s', quantity='%s')>" % (
                             self.id, self.quantity)