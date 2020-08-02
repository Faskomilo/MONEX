from models._connector_ import Base
from MainController import Queries
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from models.Bills import Bills

class ActionLog(Base, Queries):
     __tablename__ = 'actionlog'

     id              = Column(Integer, primary_key=True, nullable=False)
     idBill          = Column(Integer,ForeignKey(Bills.id), nullable=False)
     billsGiven      = Column(String, nullable=False)
     date            = Column(DateTime, nullable = False)

     Bills = relationship(Bills)

     def __repr__(self):
        return "<ActionLog(idBill='%s', billsGiven='%s', date='%s')>" % (
                             self.idBill, self.billsGiven, self.date)