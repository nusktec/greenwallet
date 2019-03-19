const MessagingResponse = require('twilio').twiml.MessagingResponse;
const response = new MessagingResponse();
const message = response.message();
message.body('Hello World!');
response.redirect('https://demo.twilio.com/welcome/sms/');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/', function (req, res, next) {
    res.send("Hello Hi");console.log(response.toString());
});

module.exports = router;
