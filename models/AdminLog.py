from models._connector_ import Base
from MainController import Queries
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from models.Admins import Admins
from models.Bills import Bills

class AdminLog(Base, Queries):
      __tablename__ = 'adminlog'

      id                    = Column(Integer, primary_key=True, nullable=False)
      idAdmin               = Column(Integer,ForeignKey(Admins.id), nullable=False)
      date                  = Column(DateTime, nullable=False)
      idBill                = Column(Integer,ForeignKey(Bills.id), nullable=False)
      quantityBills         = Column(Integer, nullable=False)
      beforeQuantityBills   = Column(Integer, nullable=False)
      afterQuantityBills    = Column(Integer, nullable=False)
      action                = Column(String, nullable=False)

      Admins = relationship(Admins)
      Bills = relationship(Bills)


      def __repr__(self):
         return "<AdminLog(idAdmin='%s', date='%s', idBill='%s', action='%s')>" % (
                              self.idAdmin, self.date, self.idBill, self.action)