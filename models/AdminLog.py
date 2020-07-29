from models._connector_ import Base
from MainController import Queries
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey

class AdminLog(Base, Queries):
     __tablename__ = 'adminlog'

     id = Column(Integer, primary_key=True, nullable=False)
     idAdmin      = Column(Integer,ForeignKey("admins.id"), nullable=False)
     date         = Column(DateTime, nullable=False)
     idBill       = Column(Integer,ForeignKey("bills.id"), nullable=False)
     action       = Column(String, nullable=False)


     def __repr__(self):
        return "<AdminLog(idAdmin='%s', date='%s', idBill='%s', action='%s')>" % (
                             self.idAdmin, self.date, self.idBill, self.action)