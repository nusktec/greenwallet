var express = require('express');
var router = express.Router();
var auth = require('./lib/auth');
var core = require('./lib/core');
var mysql = require('./lib/db.conn');
var rand = require('random-number');
var headerMeta = require('./lib/meta.class');
//define view menu
var metaFile = headerMeta("Group Purchase", 5);
var randStr = require('randomstring');
var date = require('date-and-time');

/* GET group purchase page. */
router.get('/', auth.checkLogin(), function (req, res, next) {
    var rvcode = randStr.generate(12).toUpperCase();
    var data = {vcode: rvcode, resp: {gv: ''}};
    mysql.query("select * from `accounts` as acc, `vpins` as vp where (acc.email='"+req.session.user+"' and vp.v_acc=acc.acc_num) and vp.v_type='gpin' order by `vp`.`v_id` desc")
        .then(function (info) {
            if (info) {
                console.log(info);
                res.render('user_group_purchase', {meta: metaFile, user: info, data: data});
            } else {
                res.redirect('/login');
            }
        })
        .catch(function (err) {
            console.log(err);
            res.redirect('/login');
            return {}
        });
});

/* GET group purchase page. */
router.post('/', auth.checkLogin(), function (req, res, next) {
    var rvcode = randStr.generate(12).toUpperCase();
    var data = {vcode: rvcode, resp: {gv: ''}};

    //handles quick data computations
    if (Object.keys(req.body).length > 1) {
        //block of creating new group code
        if (req.body.btncr) {
            var d = req.body;
            var ins = {
                v_pin: d.vpin,
                v_value: d.vamount,
                v_type: core.dataModel.vpin.GPIN,
                v_acc: req.session.acc,
                v_created: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')
            };
            if (parseInt(ins.v_value) > 0) {
                //insert and update balance on vgroup
                core.queryModel.debitAndInsertPin(req.session.user, ins.v_value, 'vpins', ins, function (res) {
                    //get message and treat well

                        //false statement issued
                        switch (res.res) {
                            case core.responseModel.account.LowBalance:
                                data.resp.gv = "<p style='color: #ff00af;'><i class='fa fa-warning'></i>You account balance is low</p>";
                                req.data = data;
                                next();
                                break;
                            case core.responseModel.account.UnableToCharge:
                                data.resp.gv = "<p style='color: red;'><i class='fa fa-warning'></i>Unable to charge your account at the moment</p>";
                                req.data = data;
                                next();
                                break;
                            case core.responseModel.account.AccountCharged:
                                data.resp.gv = "<p style='color: #00b716;'><i class='fa fa-money'></i> You have successfully purchase a group voucher with &#8358;" + ins.v_value + "</p>";
                                req.data = data;
                                next();
                                break;
                            default:
                            //just mind your business
                        }

                });
            } else {
                //Return 0 amount issue
                data.resp.gv = "<p style='color: red;'><i class='fa fa-money'></i> The specified amount is small or empty</p>";
                req.data = data;
                next();
            }
        }

    }

}, function (req,res,next) {
    mysql.query("select * from `accounts` as acc, `vpins` as vp where (acc.email='"+req.session.user+"' and vp.v_acc=acc.acc_num) and vp.v_type='gpin' order by `vp`.`v_id` desc")
        .then(function (info) {
            if (info) {
                console.log(req.data);
                res.render('user_group_purchase', {meta: metaFile, user: info, data: req.data});
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
