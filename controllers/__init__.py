from flask import Flask, request, render_template
import os

app = Flask(__name__)

@app.route("/<action>/<controller>", methods=["GET","POST"])
def listen(self, action, controller, method):
    if os.path.isfile("../HTML/" + action + "_" + controller + ".html"):
        return render_template("../HTML/" + action + "_" + controller + ".html"), 200
    else:
        return not_found_error

@app.errorhandler(404)
def not_found_error(error):
    return render_template('../HTML/404.html'), 404