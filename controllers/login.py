
from flask import request, make_response, json, redirect
import re
from ..models.admins import Admins
# add regex

class login():
    def login(self, user, password):
        if request.method == "POST":
            if len(user) >= 5 and len(password) >= 5:
                admin = Admins(1,"dsada", "sdaqsdad")
                print(admin)
                pass
    
    def signin(self, sessionKey):
        response = make_response()