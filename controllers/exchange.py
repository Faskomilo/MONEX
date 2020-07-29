from flask import make_response
from MainController import Controller, Authorization
from models.Bills import Bills

class exchange(Controller):
    def exchange(self):
        if self.request.method == "POST":
            request = self.request.json
            bills = Bills.getAll()
            for x in bills:
                print(x)  

