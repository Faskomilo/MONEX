from flask import Flask, request, render_template
import importlib
import os

app = Flask(__name__)

@app.route("/<controller>/<action>", methods=["GET","POST"])
def listen(controller, action):
    print(action)
    print(controller)
    if os.path.isfile("templates/" + controller + "_" + action + ".html"):
        return render_template(controller + "_" + action + ".html"), 200
    elif os.path.isfile("controllers/" + controller + ".py"):
        class = importlib.import_module("")
    else:
        return not_found_error(404)

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404_error.html'), 404

if __name__ == "__main__":
    app.run()