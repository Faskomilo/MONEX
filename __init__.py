from flask import Flask, request, render_template
import os

app = Flask(__name__)

@app.route("/<action>/<controller>", methods=["GET","POST"])
def listen(action, controller):
    if os.path.isfile("../views/" + action + "_" + controller + ".html"):
        return render_template("../views/" + action + "_" + controller + ".html"), 200
    else:
        return not_found_error(404)

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404Error.html'), 404

if __name__ == "__main__":
    app.run()