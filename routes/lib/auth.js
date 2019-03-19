module.exports = {
   checkLogin: function () {
       // middleware function to check for logged-in users
       var sessionChecker = (req, res, next) => {
           if (req.session.user && req.cookies.user_sid) {
               //res.redirect('/dash');
               next();
           } else {
               res.redirect('/login');
               // next();
           }
       };
       return sessionChecker;
   },
    
    getUser: function () {
        var sessionChecker = (req, res, next) =>
        {
            if (req.session.user && req.cookies.user_sid) {
                return req.session.user;
            } else {
                return false;
                // next();
            }
        }
    }
};