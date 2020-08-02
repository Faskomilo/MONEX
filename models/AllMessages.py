from models._connector_ import Base
from MainController import Queries
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from models.VoiceActions import VoiceActions
from models.VoiceNumbers import VoiceNumbers
from models.VoiceBills import VoiceBills

class AllMessages(Base, Queries):
     __tablename__ = 'allmesages'

     id                    = Column(Integer, primary_key=True, nullable=False)
     idVoiceAcion          = Column(Integer,ForeignKey(VoiceActions.id), nullable=False)
     idVoiceNumber         = Column(Integer,ForeignKey(VoiceNumbers.id), nullable=False)
     idVoiceBill           = Column(Integer,ForeignKey(VoiceBills.id), nullable = False)
     
     VoiceActions = relationship(VoiceActions)
     VoiceNumbers = relationship(VoiceNumbers)
     VoiceBills = relationship(VoiceBills)

     def __repr__(self):
        return "<AllMessages(idVoiceAcion='%s', idVoiceNumber='%s', idVoiceBill='%s')>" % (
                             self.idVoiceAcion, self.idVoiceNumber, self.idVoiceBill)