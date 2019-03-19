var express = require('express');
var router = express.Router();
var headerMeta = require('./lib/meta.class');
//define view menu
var metaFile = headerMeta("Login", "");
var auth = require('./lib/auth');
var mysql = require('./lib/db.conn');
var md5 = require('md5');

/* GET users listing. */
var status = {message: 'LOGIN TO CONTINUE'}
router.all('/:name?/:user?', function (req, res, next) {
    var bform = req.body;
    if (Object.keys(bform).length > 1) {
        var chkUser = {email: bform.email, pass: md5(bform.password)}
        mysql.record('accounts', chkUser)
            .then(function (info) {
                if(!info){
                    status.message = "Invalid account details";
                    next();
                }
                //success login here
                req.session.user = info.email;
                req.session.acc = info.acc_num;
                res.redirect('/dash');
            })
            .catch(function (err) {
                status.message = "Invalid account details";
                next();
            });
    } else {
        next();
    }
}, function (req, res) {
    var isLogin = auth.getUser();
    res.render('login', {meta: metaFile, config: {login: isLogin}, info: status});
    status.message = "LOGIN TO CONTINUE";
});

module.exports = router;