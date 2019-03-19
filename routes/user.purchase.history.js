var express = require('express');
var router = express.Router();
var auth = require('./lib/auth');
var core = require('./lib/core');
var mysql = require('./lib/db.conn');
var headerMeta = require('./lib/meta.class');
var md5 = require('md5');
//define view menu
var metaFile = headerMeta("Purchase", 4);

/* GET home page. */
router.all('/', function (req, res, next) {
    //after all the function, then preview

    next();
}, function (req, res) {
    mysql.record('accounts', {email: req.session.user})
        .then(function (info) {
            if (info) {
                mysql.query("select * from phistory where `p_acc`=? order by `p_id` desc limit 500",info.acc_num)
                    .then(function (data) {
                        res.render('user_purchase_history', {meta: metaFile, user: info, updated: {}, ph: data});
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
