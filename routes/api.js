/**
 * Created by Boyang on 2016/8/5.
 */

/* 使用'node-restful'库建立可从外部query的功能，
 例如: https://liaoyuan-url-shortener.herokuapp.com/api/url/6000001
 可以通过浏览器返回id为:6000001的url表中的条目信息，支持POST, PUT, DELETE, GET操作
*/
var express = require('express');
var router = express.Router();

var Url = require('../models/url');
Url.methods(['get', 'put', 'post', 'delete']);
Url.register(router, '/url');

module.exports = router;