from models._connector_ import Base
from MainController import Queries
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from models.Admins import Admins

class Sessions(Base, Queries):
     __tablename__ = 'sessions'

     cookie             = Column(String, primary_key=True, nullable=False)
     idAdmin            = Column(Integer,ForeignKey(Admins.id), nullable=False)
     date               = Column(DateTime, nullable=False)

     Admins = relationship(Admins)

     def __repr__(self):
        return "<Sessions(cookie='%s', idAdmin='%s', date='%s')>" % (
                             self.cookie, self.idAdmin, self.date)