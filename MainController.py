from models._connector_ import db_session as db
from flask import request
import datetime
import configparser
import configparser
import os
import sys

class Queries():
    @classmethod
    def get(self, filter):
        query = db.query(self)
        if isinstance(filter, int):
            query = query.filter_by(id=filter)
        else:
            query = query.filter(filter)
        return query.first()

    @classmethod
    def getAll(self, filter =  None):
        query = db.query(self)
        if filter is not None:
            query = query.filter(filter)
        return query.all()

    def save(self):
        try:
            db.add(self)
            db.commit()
            return True
        except Exception as exception:
            db.rollback()
            print("*** Error Saving ***")
            print(exception)
            return False
    
    def delete(self):
        try:
            db.delete(self)
            db.commit()
            return True
        except Exception as exception:
            db.rollback()
            print("*** Error Deleting ***")
            print(exception)
            return False

class Controller():
    request = None
    def __init__(self, request):
        self.request = request

    def isInt(self, string):
        try:
            int(string)
            return True
        except:
            return False
    
    def getResourceLimits(self):
        limits = {}
        Config = configparser.ConfigParser()
        Config.read("config.ini")
        denominations = BeforeRun().Options["SCARCE-LIMITS"].keys()
        for denomination in denominations:
            denominationLimits = {
                "SCARCE-LIMIT":int(Config.get("SCARCE-LIMITS", denomination)),
                "EXCESS-LIMIT":int(Config.get("EXCESS-LIMITS", denomination))
            }
            limits[denomination] = denominationLimits
        return limits

class Authorize:

    @staticmethod
    def Authorization(refresh=False):
        Config = configparser.ConfigParser()
        Config.read("config.ini")
        from models.Sessions import Sessions
        _session = Sessions.get(Sessions.cookie == request.cookies.get("SID"))
        if _session is not None:
            time_diff = (datetime.datetime.utcnow() - _session.date).total_seconds()
            if time_diff > int(Config.get("APPLICATION", "timeout")):
                print("UNAUTHORIZED")
                _session.delete()
                return Authorize.notAuthorized()
            if refresh:
                _session.date = datetime.datetime.utcnow()
                _session.save()
            return int(_session.idAdmin)
        else:
            return Authorize.notAuthorized()

    @staticmethod
    def notAuthorized():
        print("UNAUTHORIZED")
        json = {
            "success":"ko",
            "message":"UNAUTHORIZED"
        }
        return json

class BeforeRun():
    Options = {
            "DATABASE":{
                "host":False,
                "port":True,
                "user":False,
                "password":False,
                "database":False
            },
            "APPLICATION":{
                "timeout":True
            },
            "SCARCE-LIMITS":{
                "1":True,
                "2":True,
                "5":True,
                "10":True,
                "20":True,
                "50":True,
                "100":True,
                "200":True,
                "500":True,
                "1000":True,
            },
            "EXCESS-LIMITS":{
                "1":True,
                "2":True,
                "5":True,
                "10":True,
                "20":True,
                "50":True,
                "100":True,
                "200":True,
                "500":True,
                "1000":True,
            }
        }

    def checkForConfigIniErrors(self):
        if not os.path.isfile("./config.ini"):
            print("config.ini file missing, see exampleConfig.ini for reference")
            sys.exit()
        Config = configparser.ConfigParser()
        Config.read("config.ini")
        
        for Section in self.Options.keys():
            if not Config.has_section(Section):
                print("Section \"" + Section + "\" in config.ini missing, see exampleConfig.ini for reference")
                sys.exit()
            for Option in self.Options[Section].keys():
                if not Config.has_option(Section, Option):
                    print("Parameter \"" + Option + "\" in section \"" + Section + "\" in config.ini missing, see exampleConfig.ini for reference")
                    sys.exit()
                if self.Options[Section][Option]:
                    if not Controller(None).isInt(Config.get("APPLICATION", "timeout")):
                        print("Wrong type parameter \"host\" in section \"DATABASE\" in config.ini, see exampleConfig.ini for reference")
                        sys.exit()