var express = require('express');
var router = express.Router();
var auth = require('./lib/auth');
var core = require('./lib/core');
var mysql = require('./lib/db.conn');
var headerMeta = require('./lib/meta.class');
//define view menu
var metaFile = headerMeta("Settings", 9);

/* GET settings page page. */
router.get('/', auth.checkLogin(), function (req, res, next) {
    mysql.record('accounts', {email: req.session.user})
        .then(function (info) {
            if (info) {
                res.render('user_settings', {meta: metaFile, user: info});
            } else {
                res.redirect('/login');
            }
        })
        .catch(function (err) {
            res.redirect('/login');
            return {}
        });
});

//treat incoming data via post
router.post('/', auth.checkLogin(), function (req, res, next) {
    if(updSettings(req.session.user, req.body)){
        next();
    }else {
        next();
    }
}, function (req,res) {
    mysql.record('accounts', {email: req.session.user})
        .then(function (info) {
            if (info) {
                res.render('user_settings', {meta: metaFile, user: info, data: true});
            } else {
                res.redirect('/login');
            }
        })
        .catch(function (err) {
            res.redirect('/login');
            return {}
        });
});
module.exports = router;

//function do settings
function updSettings(email, data) {
    mysql.update('accounts', {email: email}, {
        set_email: data.semail,
        set_sms: data.ssms,
        set_freez: data.sfreez
    })
        .then(function (info) {
            return true;
        })
        .catch(function (err) {
            console.log(err);
            return false;
        })
}
