#!/usr/bin/env python
from flask import Flask, request, render_template, make_response, redirect, url_for, send_from_directory
import os
import importlib
import models
import controllers

app = Flask(__name__)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route("/", methods=["GET","POST"])
def listenRoot():
    return make_response(redirect(request.url_root + "monex/index"))

@app.route("/<controller>/<action>", methods=["GET","POST"])
def listen(controller, action):
    if os.path.isfile("templates/" + controller + "_" + action + ".html"):
        return render_template(controller + "_" + action + ".html"), 200
    elif os.path.isfile("controllers/" + controller + ".py"):
        importedController = importlib.import_module("controllers." + controller)
        classImportedController = getattr(importedController, action)
        instanceImportedClass = classImportedController(request)
        execute = getattr(instanceImportedClass, action, None)
        if execute:
            return execute()
    else:
        return not_found_error(404)

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404_error.html'), 404

if __name__ == "__main__":
    app.run()
    