
from flask import make_response
import os
import base64
import hashlib
import datetime
from models.Admins import Admins
from models.Sessions import Sessions
from MainController import Controller

class login(Controller):
    def login(self):
        success = "ko"
        redirect =  "admin/login"
        message = "NOT LOGGED IN"
        _cookie = None
        if self.request.method == "POST":
            _request = self.request.json
            _username = _request["username"]
            _password = _request["password"]
            _origin = self.request.url_root
            if len(_username) > 5 and len(_password) > 5:
                _admin = Admins.get(Admins.username == _username)
                if _admin is not None:
                    password = hashlib.sha224(str(_password).encode('utf-8')).hexdigest()
                    if password == _admin.password:
                        _cookie = base64.urlsafe_b64encode(os.urandom(32)).rstrip(b"=").decode("ascii")
                        _session = Sessions(cookie=_cookie,
                                            idAdmin=_admin.id,
                                            date=datetime.datetime.utcnow())
                        _session.save()
                        success = "ok"
                        message = "login ok"
                        redirect = "admin/messages"
                        _cookie = {"SID": _cookie}
        response = {"success": success,
                    "message": message,
                    "data":{
                        "redirect":redirect,
                        "cookie":_cookie
                        }
                    }
        response = make_response(response)
        return response