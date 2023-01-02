#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Agility Maps v2.

Start debug server.
"""
from . import server


def start() -> None:
    """
    Start developement server.

    Server is started on http://localhost:8080/
    """
    server.run(
        host="localhost",
        port=8080,
        debug=True,
    )


if __name__ == "__main__":
    start()
