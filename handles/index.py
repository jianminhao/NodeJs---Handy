#! /usr/bin/env Python
# coding=utf-8

import tornado.web

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        user_name = "handy"
        self.render("index.html", user_name = user_name)
