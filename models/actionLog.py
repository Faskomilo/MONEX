from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, ForeignKey

engine = create_engine(
    'mysql+mysqlconnector://<root>:<Mgogeta1234>@localhost:3306/<default_db>...')
Base = declarative_base()

class actionLog(Base):
     __tablename__ = 'actionlog'

     id = Column(Integer, primary_key=True, nullable=False)
     idBill = Column(Integer,ForeignKey("bills.id"), nullable=False)
     billsGiven = Column(String, nullable=False)
     date = Column(Date, nullable = False)

     def __repr__(self):
        return "<User(idBill='%s', billsGiven='%s', date='%s')>" % (
                             self.idBill, self.billsGiven, self.date)