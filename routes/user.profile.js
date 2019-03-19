var express = require('express');
var router = express.Router();
var auth = require('./lib/auth');
var core = require('./lib/core');
var mysql = require('./lib/db.conn');
var headerMeta = require('./lib/meta.class');
var md5 = require('md5');
//define view menu
var metaFile = headerMeta("Profile", 2);
var updatedInfo = '';

//Get user profile page
router.all('/', function (req, res, next) {
    updatedInfo = {pass: '', basic: '', address: ''};
    var b = req.body;
    //update basic info
    if(b.cmd==='1'){
        //update basic info
        mysql.update('accounts', {email: req.session.user}, {name: b.name, phone: b.phone})
            .then(function (info) {
                updatedInfo.basic = ': Your basic info was updated';
                next();
            });
        return;
    }
    //update address
    if(b.cmd==='2'){
        //update basic info
        mysql.update('accounts', {email: req.session.user}, {address: b.address, state: b.state})
            .then(function (info) {
                updatedInfo.address = ': Address details was changed';
                next();
            });
        return;
    }
    //update password
    if(b.cmd==='3'){
        //update basic info
        if(b.p1===''||b.p2===''||b.op==''){
            updatedInfo.pass = ': Fields are empty';
            next();
            return;
        }
        if(b.p1!=b.p2){
            updatedInfo.pass = ': New password not the same';
            next();
            return;
        }
        if(b.p1.length<8){
            updatedInfo.pass = ': Password too small, min. 8';
            next();
            return;
        }
        mysql.update('accounts', {email: req.session.user, pass: md5(b.op)}, {pass: md5(b.p1)})
            .then(function (info) {
                console.log(info);
                if(info.changedRows){
                    updatedInfo.pass = ': Password changed';
                    next();
                }else {
                    updatedInfo.pass = ': Old password incorrect';
                    next();
                }
            });
        return;
    }
    next();
}, function (req,res) {
    mysql.record('accounts', {email: req.session.user})
        .then(function (info) {
            if(info){
                res.render('user_profile', {meta: metaFile, user: info, updated: updatedInfo});
                return;
            }else {
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
