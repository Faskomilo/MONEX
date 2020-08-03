from models._connector_ import db_session as db
from flask import request
import datetime

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

class Controller:
    request = None
    def __init__(self, request):
        self.request = request

    def isInt(self, string):
        try:
            int(string)
            return True
        except:
            return False

class Authorize:

    @staticmethod
    def Authorization(refresh=False):
        from models.Sessions import Sessions
        _session = Sessions.get(Sessions.cookie == request.cookies.get("SID"))
        if _session is not None:
            time_diff = (datetime.datetime.utcnow() - _session.date).total_seconds()/60
            if time_diff > 5:
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