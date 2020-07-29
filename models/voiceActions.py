from models._connector_ import Base
from MainController import Queries
from sqlalchemy import Column, Integer, String, ForeignKey

class VoiceAction(Base, Queries):
     __tablename__ = 'voiceaction'

     id                 = Column(Integer, primary_key=True, nullable=False)
     recording          = Column(String, nullable=False)

     def __repr__(self):
        return "<VoiceAction(recording='%s')>" % (
                             self.recording)