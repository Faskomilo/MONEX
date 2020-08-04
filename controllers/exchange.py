from flask import make_response
from MainController import Controller
from models.Bills import Bills
from models.ActionLog import ActionLog
import datetime

class exchange(Controller):
    def exchange(self):
        if self.request.method == "POST":
            success = "ko"
            message = "Not Enough Change"
            data = "Disculpe, actualmente no tenemos el cambio suficiente para su operación, inténtelo más tarde"            
            request = self.request.json
            billToExchange = int(request["billToExchange"])
            change = ""
            _billsInDB = Bills.getAll()
            _billsInDB.reverse()
            for x in _billsInDB:
                _bill = int(x.id)
                if billToExchange == 0:
                    break
                if _bill > billToExchange or _bill == int(request["billToExchange"]):
                    continue
                if x.quantity == 0:
                    continue
                _quantity =  billToExchange // _bill
                if _quantity > 0:
                    if _quantity > int(x.quantity):
                        _quantity = int(x.quantity)
                    _moneyToTakeAway = _quantity * _bill
                    billToExchange = billToExchange - _moneyToTakeAway
                    x.quantity = int(x.quantity) - _quantity
                    type = ""
                    change += str(_quantity)
                    if _bill > 10:
                        type = "billete"
                    else:
                        type = "moneda"
                    change += " " + type
                    if _quantity > 1:
                        change += "s"
                    change += " de " + str(_bill) + " peso"
                    if _bill != 1:
                        change += "s"
                    change += ", <br/>"
            change = change[:-7]
            if billToExchange  == 0:
                success = "ok"
                message = "Transaction Completed"
                data = change
                for x in _billsInDB:
                    if str(x.id) == str(request["billToExchange"]):
                        x.quantity = int(x.quantity) + 1
                    x.save()
                _newActionLog = ActionLog(idBill=int(request["billToExchange"]),
                                          billsGiven=data.replace(" <br/>", " "),
                                          date=datetime.datetime.utcnow())
                _newActionLog.save()
            json = {
                "success":success,
                "message":message,
                "data":data
            }
            response = make_response(json)
            return response

