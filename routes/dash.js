var express = require('express');
var router = express.Router();
var auth = require('./lib/auth');
var core = require('./lib/core');
var mysql = require('./lib/db.conn');
var headerMeta = require('./lib/meta.class');
//define view menu
var metaFile = headerMeta("Dashboard", 1);

/* GET home page. */
router.all('/', auth.checkLogin(), function (req, res, next) {
    mysql.record('accounts', {email: req.session.user})
        .then(function (info) {
            if(info){
                res.render('dash', {meta: metaFile, user: info});
            }else {
                res.redirect('/login');
            }
        })
        .catch(function (err) {
            res.redirect('/login');
            return {}
        });
});
module.exports = router;
