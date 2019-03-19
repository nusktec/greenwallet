var express = require('express');
var router = express.Router();
var headerMeta = require('./lib/meta.class');
//define view menu
var metaFile = headerMeta('Register', '');
//import db class
var mysql = require('./lib/db.conn');
//random number
var rn = require('random-number');
//mdb5
var md5 = require('md5');
//core
var coreLib = require('./lib/core');
var date = require('date-and-time');

var status = {message: 'SIGNUP TO GET INSTANT ACCESS'};
var gen_acc = rn({min: 111111, max: 999999, integer: true});
/* GET users listing. */
router.all('/', function (req, res, next) {
    //perform the registration magic world
    gen_acc = rn({min: 111111, max: 999999, integer: true});

    /*try and connect to db*/
    var bform = req.body;
    if(Object.keys(bform).length>7){
        var insertData = {
            name: bform.firstname + " " + bform.lastname,
            email: bform.email,
            phone: bform.phone,
            address: bform.address,
            state: bform.state,
            balance: 0,
            date: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss'),
            status: 1,
            acc_num: gen_acc,
            pass: md5(bform.password),
        };
        mysql.insert('accounts',insertData)
            .then(function (info) {
                if(true){
                    //send email
                    status.message = "Account <strong>" + gen_acc + "</strong> was successfully created";
                    //next() when done...
                    next()
                }else{
                    status.message = "System not sure on account creation, try login and check";
                    //next() when done...
                    next()
                }
            })
            .catch(function (err) {
                status.message = "Unable to create account, type of account exist already";
                //next() when done...
                next()
            });
    }else{
        //next() when done...
        next()
    };
}, function (req, res) {
    //display after all
    res.render('register', {meta: metaFile, info: status});
});

module.exports = router;
