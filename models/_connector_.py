import configparser
from sqlalchemy import create_engine, exc, event, select
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Config = configparser.ConfigParser()
Config.read("config.ini")

host = Config.get("DATABASE", "host")
port = Config.get("DATABASE", "port")
database = Config.get("DATABASE", "database")
user = Config.get("DATABASE", "user")
password = Config.get("DATABASE", "password")

engine = create_engine('mysql+mysqlconnector://' + 
                       str(user) + ":" + str(password) + 
                       "@" + str(host) + ":" + str(port) +
                       "/" + str(database)
                       )
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False,bind=engine))

Base = declarative_base()
Base.query= db_session.query_property()