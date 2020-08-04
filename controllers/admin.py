from MainController import Controller, Authorize
from models.Admins import Admins
from models.ActionLog import ActionLog
from models.AdminLog import AdminLog
from models.Bills import Bills
from flask import make_response
from babel.dates import format_datetime
import datetime

class getAdminLog(Controller):
    def getAdminLog(self):
        _authorized = Authorize.Authorization(True)
        if not self.isInt(_authorized):
            return _authorized
        if self.request.method == "GET":
            success = "ok"
            message = "All adminLogs"
            data = {}
            adminLogs = AdminLog.getAll()
            for row in adminLogs:
                rowColumns = {
                    "idAdmin":Admins.get(Admins.id == row.idAdmin).username,
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
        _authorized = Authorize.Authorization(True)
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
        _authorized = Authorize.Authorization(True)
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
                    newQuantity = int(request["quantity"])
                    if newQuantity > 0:
                        _billToModify = Bills.get(Bills.id == request["bill"])
                        limits = self.getResourceLimits()
                        topLimit = int(limits[str(_billToModify.id)]["EXCESS-LIMIT"])
                        bottomLimit = int(limits[str(_billToModify.id)]["SCARCE-LIMIT"])
                        if _billToModify is not None:
                            if newQuantity > bottomLimit and newQuantity < topLimit:
                                _beforeQuantity = _billToModify.quantity
                                _billToModify.quantity = newQuantity
                                if _billToModify.save():
                                    success = "ok"
                                    message = "UPDATED QUANTITY"
                                    if newQuantity > _beforeQuantity:
                                        action = "Aumento de cantidad de denominación"
                                    elif newQuantity == _beforeQuantity:
                                        action = "Sin cambios"
                                    else:
                                        action = "Disminución de cantidad de denominación"
                                    _newAdminLog = AdminLog(idAdmin = Authorize.Authorization(False),
                                                            date =datetime.datetime.utcnow(),
                                                            idBill=request["bill"],
                                                            newQuantityBills=newQuantity,
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
        _authorized = Authorize.Authorization(True)
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
                        "Message": "La denominación de $" + str(bill.id) + " tiene un exceso de cantidad, favor de retirar exceso"
                    }
                    data[bill.id] = info
                elif bill .quantity <= limits[str(bill.id)]["SCARCE-LIMIT"]:
                    info = {
                        "Status":"low",
                        "Message": "La denominación de $" + str(bill.id) + " está llegando a una cantidad muy baja, favor de agregar más"
                    }
                    data[bill.id] = info
            json = {
                "success":success,
                "message":message,
                "data":data
            }
            return json