# -*- coding: utf-8 -*-
"""
Agility Maps v2.

Path module.
"""
import os


def set_path() -> None:
    """
    Set path.

    Moves to root.
    """
    os.chdir(".")
    print(os.getcwd())
