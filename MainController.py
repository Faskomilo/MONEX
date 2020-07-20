from  models._connector_ import db_session as db

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