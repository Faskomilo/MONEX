
from flask import request, make_response, json, redirect
import re
import os
import base64
import hashlib
from models.admins import Admins
# add regex

class login():
    def login(self, user, password, origin):
        response = make_response()
        if request.method == "POST":
            if len(user) >= 5 and len(password) >= 5:
                admin = Admins.get(Admins.username == user)
                if admin is not None:
                    password = hashlib.sha224(password).hexdigest()
                    if password == admin.password:
                        cookie = base64.urlsafe_b64encode(os.urandom(32)).rstrip("=").decode("ascii")
                        response(redirect(origin + "/admin/index", 200))
                        response.set_cookie("Valid", cookie)
                        return response
    
    def signin(self, sessionKey):
        response = make_response()