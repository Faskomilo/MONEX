from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date

engine = create_engine(
    'mysql+mysqlconnector://<user>:<password>@localhost:3306/<default_db>...')
Base = declarative_base()

class User(Base):
     __tablename__ = 'users'

     id = Column(Integer, primary_key=True, nullable=False)
     idBill = Column(Integer, nullable=False)
     billsGiven = Column(String, nullable=False)
     date = Column(Date, nullable = False)

     def __repr__(self):
        return "<User(idBill='%s', billsGiven='%s', date='%s')>" % (
                             self.idBill, self.billsGiven, self.date)