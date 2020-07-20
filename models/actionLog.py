from models._connector_ import Base
from MainController import Queries
from sqlalchemy import Column, Integer, String, Date, ForeignKey

class actionLog(Base, Queries):
     __tablename__ = 'actionlog'

     id = Column(Integer, primary_key=True, nullable=False)
     idBill = Column(Integer,ForeignKey("bills.id"), nullable=False)
     billsGiven = Column(String, nullable=False)
     date = Column(Date, nullable = False)

     def __repr__(self):
        return "<User(idBill='%s', billsGiven='%s', date='%s')>" % (
                             self.idBill, self.billsGiven, self.date)