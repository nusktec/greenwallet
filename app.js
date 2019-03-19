var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
//load .env file
require('dotenv').config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//track session
// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'yueruiYIEnanuWOi',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000000,
        secure: false
    }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
//form body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './public')));

//on_web_prefix
var prefix = '';

app.all(prefix+"/", require('./routes/index.js'));
app.use(prefix + '/dash', require('./routes/dash'));
app.use(prefix + '/register', require('./routes/register'));
app.use(prefix + '/login', require('./routes/login'));
//dashboards
app.use(prefix + '/dash', require('./routes/dash'));
//action routers
app.get(prefix + '/logout', function (req, res, next) {
    req.session.user = null;
    next();
}, function (req, res) {
    res.redirect('/');
});
app.use(prefix + '/profile', require('./routes/user.profile'));
app.use(prefix + '/alerts', require('./routes/user.alert'));
app.use(prefix + '/purchase-history', require('./routes/user.purchase.history'));
app.use(prefix + '/group-purchase', require('./routes/user.group.purchase'));
app.use(prefix + '/reset-psw', require('./routes/user.password'));
app.use(prefix + '/settings', require('./routes/user.settings'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {});
});

module.exports = app;
