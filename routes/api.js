/**
 * Created by Boyang on 2016/8/5.
 */

var express = require('express');
var router = express.Router();

var Url = require('../models/url');
Url.methods(['get', 'put', 'post', 'delete']);
Url.register(router, '/url');

module.exports = router;