from models._connector_ import Base
from MainController import Queries
from sqlalchemy import Column, Integer, String, Date, ForeignKey

class allmessages(Base, Queries):
     __tablename__ = 'allmesages'

     id = Column(Integer, primary_key=True, nullable=False)
     idVoiceAcion = Column(Integer,ForeignKey("voiceactions.id"), nullable=False)
     idVoiceNumber = Column(Integer,ForeignKey("voicenumbers.id"), nullable=False)
     idVoiceBill = Column(Integer,ForeignKey("voicebills.id"), nullable = False)

     def __repr__(self):
        return "<User(idVoiceAcion='%s', idVoiceNumber='%s', idVoiceBill='%s')>" % (
                             self.idVoiceAcion, self.idVoiceNumber, self.idVoiceBill)