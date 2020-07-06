from flask import Flask, request

app = Flask(__name__)

@app.route("/profile/<username>")
def listen(self, action, controller, method):
    pass 