from MainController import Controller, Authorize
from models.ActionLog import ActionLog
from models.AdminLog import AdminLog
from models.Bills import Bills
from flask import make_response

class getAdminLog(Controller):
    def getAdminLog(self):
        self.Authorize()
        if self.request.method == "POST":
            success = "ok"
            message = "All adminLogs"
            data = {}
            adminLogs = AdminLog.getAll()
            for row in adminLogs:
                rowColumns = {
                    "idAdmin":row.idAdmin,
                    "date":row.date,
                    "idBill":row.idBill,
                    "quantityBills":row.quantityBills,
                    "beforeQuantityBills":row.beforeQuantityBills,
                    "afterQuantityBills":row.afterQuantityBills,
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
        self.Authorize()
        if self.request.method == "POST":
            success = "ok"
            message = "All UserLogs"
            data = {}
            userLogs = ActionLog.getAll()
            for row in userLogs:
                rowColumns = {
                    "idBill":row.idBill,
                    "billsGiven":row.billsGiven,
                    "date":row.date
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
        self.Authorize()
        if self.request.method == "POST":
            print(self.request.json)
            success = "ok"
            message = "All Resources"
            data = {}
            allBills = Bills.getAll()
            for row in allBills:
                data[row.id] = row.quantity
            json = {
                "success":success,
                "message":message,
                "data":data
            }
            return json
