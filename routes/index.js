var express = require('express');
var router = express.Router();
var auth = require('./lib/auth');
var core = require('./lib/core');
var mysql = require('./lib/db.conn');
var headerMeta = require('./lib/meta.class');
var md5 = require('md5');
//define view menu
var metaFile = headerMeta("Profile", 2);

/* GET home page. */
router.all('/', function (req, res, next) {
   res.render('index');
});

module.exports = router;
