from models._connector_ import Base
from MainController import Queries
from sqlalchemy import Column, Integer, String, Date, ForeignKey

class Bills(Base, Queries):
     __tablename__ = 'bills'

     id              = Column(Integer, primary_key=True, nullable=False)
     money           = Column(Integer, nullable=False)
     quantity        = Column(Integer, nullable=False)

     def __repr__(self):
        return "<Bills(money='%s', quantity='%s')>" % (
                             self.money, self.quantity)