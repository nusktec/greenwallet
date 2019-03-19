var express = require('express');
var router = express.Router();
var auth = require('./lib/auth');
var core = require('./lib/core');
var mysql = require('./lib/db.conn');
var headerMeta = require('./lib/meta.class');
//define view menu
var metaFile = headerMeta("Reset Password", 0);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('user_password', {meta: metaFile, info: ''});
});

/* Data submitted. */
router.post('/', function (req, res, next) {
    var bf = req.body;
    if (!Object.keys(bf).length > 0) {
        req.msg = "Empty form submitted";
        next();
    }
    //find them for db
    var requested_email = bf.email;
    mysql.record('accounts', {email: requested_email, acc_num: bf.account})
        .then(function (info) {
            if (info) {
                //send mail to the user and next
                req.msg = "<b style='color: green'>Email has been sent to " + requested_email + " with the associated phone no. " + info.phone + "</b>";
                next();
                return;
            } else {
                req.msg = "<b style='color: red'>No account associated with " + requested_email + "</b>";
                next();
            }
        });
}, function (req, res) {
    res.render('user_password', {meta: metaFile, info: req.msg});
});
module.exports = router;
