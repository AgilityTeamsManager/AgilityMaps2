# -*- coding: utf-8 -*-
"""
Agility Maps v2.

Routing module.
"""
# pylint: disable=relative-beyond-top-level
import flask

from ..app.controllers.app import route_app  # type: ignore
from .static import route_static_public, route_static_ui


def route(app: flask.Flask) -> None:
    """
    Route app.

    :param flask.Flask app: App to route.
    """
    app.add_url_rule("/app", view_func=route_app)
    app.add_url_rule(
        "/static/public/<path:path>", view_func=route_static_public
    )
    app.add_url_rule("/static/ui/<path:path>", view_func=route_static_ui)
