from models._connector_ import Base
from MainController import Queries
from sqlalchemy import Column, Integer, String, Date, ForeignKey

class VoiceBills(Base, Queries):
     __tablename__ = 'voicebills'

     id = Column(Integer, primary_key=True, nullable=False)
     recording = Column(String, nullable=False)
     idBill = Column(Integer,ForeignKey("bills.d"), nullable=False)

     def __repr__(self):
        return "<User(recording='%s', idBill='%s')>" % (
                             self.recording, self.idBill)