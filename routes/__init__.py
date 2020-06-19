from flask import Flask, request

app = Flask(__name__)

class server():
    def listen(self, action, controller, method):
        app.add_url_rule(action+"/"+controller, method=method)
