from flask import make_response
from MainController import Controller, Authorization
from models.Bills import Bills

class exchange(Controller):
    def exchange(self):
        if self.request.method == "POST":
            request = self.request.json
            billToExchange = request["billToExchange"]
            change = ""
            _billsInDB = Bills.getAll()
            for x in _billsInDB:
                if int(x.id) >= int(billToExchange):
                    _billsInDB.pop(_billsInDB.index(x))
            _billsInDB.reverse()
            for x in _billsInDB:
                _bill = x.id
                if _bill > int(billToExchange):
                    continue
                _quantity =  int(billToExchange) // int(_bill)
                print("bill " + str(_bill))
                print("quantity " + str(_quantity))
                if _quantity > 0:
                    type = ""
                    change += str(_quantity)
                    if _bill > 10:
                        type = "billete"
                    else:
                        type = "moneda"
                    change += " " + type
                    if _quantity > 1:
                        change += "s"
                    change += " de " + str(_bill) + " pesos,"
            print(change)
            change = change[:-1]
