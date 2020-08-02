from models._connector_ import Base
from MainController import Queries
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from models.Bills import Bills

class VoiceBills(Base, Queries):
     __tablename__ = 'voicebills'

     id              = Column(Integer, primary_key=True, nullable=False)
     recording       = Column(String, nullable=False)
     idBill          = Column(Integer,ForeignKey(Bills.id), nullable=False)

     Bills = relationship(Bills)

     def __repr__(self):
        return "<VoiceBills(recording='%s', idBill='%s')>" % (
                             self.recording, self.idBill)