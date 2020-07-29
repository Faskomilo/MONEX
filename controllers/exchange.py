from flask import make_response
from MainController import Controller, Authorization
from models.Bills import Bills

class exchange(Controller):
    def exchange(self):
        if self.request.method == "POST":
            request = self.request.json
            billToExchange = request.billToExchange
            billsInDB = Bills.getAll()
            for x in billsInDB:
                print(x.id)  

