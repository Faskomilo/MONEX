from models._connector_ import Base
from MainController import Queries
from sqlalchemy import Column, Integer, String

class VoiceNumbers(Base, Queries):
     __tablename__ = 'voicenumbers'

     id              = Column(Integer, primary_key=True, nullable=False)
     recording       = Column(String, nullable=False)

     def __repr__(self):
        return "<VoiceNumbers(recording='%s'>" % (
                             self.recording)