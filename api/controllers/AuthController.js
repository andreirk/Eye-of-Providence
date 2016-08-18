/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
var activator = require('activator');
var nodemailer = require('nodemailer');

var  mailPassword = "password";

var templates = __dirname +'/resources';

var configActivate = {
  user: {},
//   protocol: 'http://',
//   domain: 'localhost',
};


configActivate.user.find = function (searchQuery, callback) {
    User.findOne(searchQuery, callback);
};
 
configActivate.user.save = function (id, data, callback) {
    User.update({ _id: id }, data, callback);
};


var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "gmail",
    auth: {
        user: "falkonirk@gmail.com",
        pass: mailPassword
    }
});

configActivate.transport = smtpTransport;
configActivate.templates = templates;
configActivate.from = 'From me';

activator.init(configActivate);

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function(req, res) {

        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                sails.log.info(user);
                return res.ok(
                        {
                            status: 'Successfuly logged in',
                            data: {
                                user: user
                            }
                        });
                        
                 });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        sails.log.info('Logging out');
        res.ok({status: 'Successfuly logged out'});
    },

    // handling activation 
    createActivate   : activator.createActivate,
    completeActivate : activator.completeActivate,
 
    // handling password reset 
    createPasswordReset   : activator.createPasswordReset,
    completePasswordReset : activator.completePasswordReset


};
