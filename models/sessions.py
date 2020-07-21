from models._connector_ import Base
from MainController import Queries
from sqlalchemy import Column, Integer, String, Date, ForeignKey

class Sessions(Base, Queries):
     __tablename__ = 'sessions'

     cookie             = Column(String, primary_key=True, nullable=False)
     idAdmin            =  Column(Integer,ForeignKey("admins.id"), nullable=False)
     date               = Column(Integer, nullable=False)

     def __repr__(self):
        return "<Sessions(cookie='%s', idAdmin='%s', date='%s')>" % (
                             self.cookie, self.idAdmin, self.date)