# -*- coding: utf-8 -*-
"""
Agility Maps v2.

Static files routes module.
"""
import flask


def route_static_public(path: str) -> flask.Response:
    """
    Route /static/public/<path:path>

    :param str path: Path of file to get.
    :return flask.Response: Public file.
    """
    return flask.send_from_directory("public", path)


def route_static_ui(path: str) -> flask.Response:
    """
    Route /static/ui/<path:path>

    :param str path: Path of file to get.
    :return flask.Response: Static file.
    """
    return flask.send_from_directory("ui", path)
