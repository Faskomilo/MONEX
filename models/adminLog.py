from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date

engine = create_engine(
    'mysql+mysqlconnector://<user>:<password>@localhost:3306/<default_db>...')
Base = declarative_base()

class User(Base):
     __tablename__ = 'users'

     id = Column(Integer, primary_key=True, nullable=False)
     idAdmin = Column(Integer, nullable=False)
     date  = Column(Date, nullable=False)
     idBill = Column(Integer, nullable=False)
     action = Column(String, nullable=False)


     def __repr__(self):
        return "<User(idAdmin='%s', date='%s', idBill='%s', action='%s')>" % (
                             self.idAdmin, self.date, self.idBill, self.action)