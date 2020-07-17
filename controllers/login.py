
from flask import request, make_response, json, redirect
# add regex

class login():
    def login(self, user, password):
        if request.method == "POST":
            # regex password
            if len(user) > 5 and password != 0:
                print(type(request.cookies))
                pass
    
    def signin(self, sessionKey):
        response = make_response(redirect())