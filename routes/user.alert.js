var express = require('express');
var router = express.Router();
var auth = require('./lib/auth');
var core = require('./lib/core');
var mysql = require('./lib/db.conn');
var headerMeta = require('./lib/meta.class');
var md5 = require('md5');
//define view menu
var metaFile = headerMeta("Alerts", 3);

/* GET home page. */
router.all('/', function (req, res, next) {
    //after all the function, then preview

    next();
}, function (req, res) {
    mysql.record('accounts', {email: req.session.user})
        .then(function (info) {
            if (info) {
                mysql.query("select * from alerts where `al_acc`=? order by `al_id` desc limit 150",info.acc_num)
                    .then(function (alerts) {
                        res.render('user_alert', {meta: metaFile, user: info, updated: {}, al: alerts});
                        return;
                    })
            } else {
                res.redirect('/login');
                return;
            }
        })
        .catch(function (err) {
            res.redirect('/login');
        });
    return;
});

module.exports = router;
