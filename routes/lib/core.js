//main other functions
var sql = require('./db.conn');
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

//Error models
var errorModels = {
    account: {
        UnableToCharge: 'CH-0',
        AccountCharged: 'CH-1',
        LowBalance: 'BAL-0',
        NoUserExist: "USR-0",
    },
    system: {NoCodeExec: 'CODE-0'}
};

//export functions
var core = {
    responseModel: errorModels,
    senddSMS: function sendSMS(phone, type, msg) {

    },

    email: function email(email, title, msg) {
        var mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: title,
            text: msg
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },

    dataModel: {
        vpin: {VPIN: 'vpin', GPIN: 'gpin'}
    },

    queryModel: {
        //Insert new PIN / Debit
        debitAndInsertPin: function (email, amount, xtable, newdata, callback) {
            sql.record('accounts', {email: email})
                .then(function (info) {
                    if (!info) {
                        callback({status: false, res: errorModels.account.NoUserExist});
                    }
                    var balance = parseInt(info.balance);
                    var debitAmount = parseInt(amount);
                    var pendingDebit = balance - debitAmount;
                    if (debitAmount < balance) {
                        //argument is fine, ready for debit
                        sql.update('accounts', {email: info.email}, {balance: pendingDebit})
                            .then(function (info) {
                                //after successful debit, try create vpin now
                                if (!parseInt(info.changedRows) > 0) {
                                    callback({status: false, res: errorModels.account.UnableToCharge});
                                }
                                sql.insert(xtable, newdata)
                                    .then(function (info) {
                                        if (info) {
                                            console.log(info);
                                            callback({status: true, res: errorModels.account.AccountCharged});
                                        }
                                    })
                                    .catch(function (err) {
                                        console.log("Error from pin creation: " + err);
                                    })
                            })
                            .catch(function (err) {
                                console.log("Error from debit section: " + err);
                            });
                    } else {
                        callback({status: false, res: errorModels.account.LowBalance});
                    }
                })
                .catch(function (err) {
                    console.log("Error from db model: " + err);
                });
            //return {status: false, res: errorModels.system.NoCodeExec};
        },

        //Deposit to voucher pin
        creditVoucher: function (num) {
            var num;
            return new Promise(function (res,err) {
                
            })
            
        }
    }

};

module.exports = core;
