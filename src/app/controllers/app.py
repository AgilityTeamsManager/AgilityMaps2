# -*- coding: utf-8 -*-
"""
Agility Maps v2.

/app controller.
"""
import flask


def route_app() -> flask.Response:
    """
    Route /app.

    :return flask.Response: App response.
    """
    return flask.make_response(flask.render_template("app.html"))
