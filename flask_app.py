from flask import Flask, request, render_template
import os

app = Flask(__name__)

@app.route("/", methods=["GET","POST"])
def listenRoot():
    return render_template("monex_index.html"), 200

@app.route("/<controller>/<action>", methods=["GET","POST"])
def listen(controller, action):
    if os.path.isfile("templates/" + controller + "_" + action + ".html"):
        return render_template(controller + "_" + action + ".html"), 200
    elif os.path.isfile("controllers/" + controller + ".py"):
        pass
    else:
        return not_found_error(404)

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404_error.html'), 404

if __name__ == "__main__":
    app.run()