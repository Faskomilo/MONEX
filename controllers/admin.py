from MainController import Controller, Authorize
from models.ActionLog import ActionLog
from models.AdminLog import AdminLog
from models.Bills import Bills
from flask import make_response
from babel.dates import format_datetime
import datetime

class getAdminLog(Controller):
    def getAdminLog(self):
        _authorized = Authorize.Authorization()
        if not self.isInt(_authorized):
            return _authorized
        if self.request.method == "GET":
            success = "ok"
            message = "All adminLogs"
            data = {}
            adminLogs = AdminLog.getAll()
            for row in adminLogs:
                rowColumns = {
                    "idAdmin":row.idAdmin,
                    "date":format_datetime(datetime=row.date, locale="es_MX"),
                    "idBill":row.idBill,
                    "newQuantityBills":row.newQuantityBills,
                    "beforeQuantityBills":row.beforeQuantityBills,
                    "action":row.action
                }
                data[row.id] = rowColumns
            json = {
                "success":success,
                "message":message,
                "data":data
            }
            return json

class getUserLog(Controller):
    def getUserLog(self):
        _authorized = Authorize.Authorization()
        if not self.isInt(_authorized):
            return _authorized
        if self.request.method == "GET":
            success = "ok"
            message = "All UserLogs"
            data = {}
            userLogs = ActionLog.getAll()
            for row in userLogs:
                rowColumns = {
                    "idBill":row.idBill,
                    "billsGiven":row.billsGiven,
                    "date":format_datetime(datetime=row.date, locale="es_MX")
                }
                data[row.id] = rowColumns
            json = {
                "success":success,
                "message":message,
                "data":data
            }
            return json
    
class getResources(Controller):
    def getResources(self):
        _authorized = Authorize.Authorization()
        if not self.isInt(_authorized):
            return _authorized
        if self.request.method == "GET" or self.request.method == "POST":
            success = "ok"
            message = "All Resources"
            data = {}
            if self.request.method == "POST":
                success = "ko"
                message = "INVALID NEW QUANTITY"
                request = self.request.json
                if self.isInt(request["quantity"]):
                    if int(request["quantity"]) > 0:
                        _billToChange = Bills.get(Bills.id == request["bill"])
                        if _billToChange is not None:
                            _beforeQuantity = _billToChange.quantity
                            _billToChange.quantity = request["quantity"]
                            if _billToChange.save():
                                success = "ok"
                                message = "UPDATED QUANTITY"
                                if int(request["quantity"]) > _beforeQuantity:
                                    action = "Aumento de cantidad de denominación"
                                elif int(request["quantity"]) == _beforeQuantity:
                                    action = "Sin cambios"
                                else:
                                    action = "Disminución de cantidad de denominación"
                                _newAdminLog = AdminLog(idAdmin = Authorize.Authorization(False),
                                                        date =datetime.datetime.utcnow(),
                                                        idBill=request["bill"],
                                                        newQuantityBills=request["quantity"],
                                                        beforeQuantityBills=_beforeQuantity,
                                                        action= action
                                                        )
                                _newAdminLog.save()
            allBills = Bills.getAll()
            for row in allBills:
                data[row.id] = row.quantity
            json = {
                "success":success,
                "message":message,
                "data":data
            }
            return json

class getMessages(Controller):
    def getMessages(self):
        _authorized = Authorize.Authorization()
        if not self.isInt(_authorized):
            return _authorized
        if self.request.method == "GET":
            success = "ok"
            message = "All Messages"
            data = {}
            limits = self.getResourceLimits()
            _bills = Bills.getAll()
            for bill in _bills:
                if bill.quantity >= limits[str(bill.id)]["EXCESS-LIMIT"]:
                    info = {
                        "Status":"excess",
                        "Message": "Denominación " + bill.id + " está en su límite, favor de retirar exceso"
                    }
                    data[bill.id] = info
                elif bill .quantity <= limits[str(bill.id)]["SCARCE-LIMIT"]:
                    info = {
                        "Status":"low",
                        "Message": "Denominación " + str(bill.id) + " está en su límite, favor de agregar más billetes"
                    }
                    data[bill.id] = info
            json = {
                "success":success,
                "message":message,
                "data":data
            }
            return json