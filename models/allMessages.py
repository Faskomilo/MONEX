from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, ForeignKey

engine = create_engine(
    'mysql+mysqlconnector://<user>:<password>@localhost:3306/<default_db>...')
Base = declarative_base()

class User(Base):
     __tablename__ = 'users'

     id = Column(Integer, primary_key=True, nullable=False)
     idVoiceAcion = Column(Integer,ForeignKey("voiceactions.id"), nullable=False)
     idVoiceNumber = Column(Integer,ForeignKey("voicenumbers.id"), nullable=False)
     idVoiceBill = Column(Integer,ForeignKey("voicebills.id"), nullable = False)

     def __repr__(self):
        return "<User(idVoiceAcion='%s', idVoiceNumber='%s', idVoiceBill='%s')>" % (
                             self.idVoiceAcion, self.idVoiceNumber, self.idVoiceBill)