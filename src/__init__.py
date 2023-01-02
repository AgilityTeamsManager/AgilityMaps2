# -*- coding: utf-8 -*-
"""
Agility Maps v2.

Main server file.
"""
import flask

from .modules.path import set_path
from .modules.router import route

set_path()

server: flask.Flask = flask.Flask("agilitymaps2", template_folder="app/views")
route(server)
