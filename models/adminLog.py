from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, ForeignKey

engine = create_engine(
    'mysql+mysqlconnector://<user>:<password>@localhost:3306/<default_db>...')
Base = declarative_base()

class AdminLog(Base):
     __tablename__ = 'adminlog'

     id = Column(Integer, primary_key=True, nullable=False)
     idAdmin = Column(Integer,ForeignKey("admins.id"), nullable=False)
     date  = Column(Date, nullable=False)
     idBill = Column(Integer,ForeignKey("bills.id"), nullable=False)
     action = Column(String, nullable=False)


     def __repr__(self):
        return "<User(idAdmin='%s', date='%s', idBill='%s', action='%s')>" % (
                             self.idAdmin, self.date, self.idBill, self.action)