/**
 * UserController
 * @module      :: Controller
 * @description :: Server-side logic for managing users- UserController
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


/** 
 *  prepare objects to display
 */
function objectsPrepare(arrOfJObj){
    arrOfJObj.forEach(function(element) {
        element.fullName = element.getFullName();
    }, this);
    return arrOfJObj;
}

module.exports = {
    // get all users with public attrs
    index: function(req, res) {
        User.find().exec(function(err, users) {
            if(err) throw err;
            users = objectsPrepare(users);
            sails.log.info('in user controller users are:');
            sails.log.info(users);
            res.view('user/index', {users: users});
        });
    }, 

    create: function(req, res) {
        var usersData = req.body;
        User.create(usersData).exec(function(err, user) {
            if (err) {
                return res.serverError(err);
            }
            sails.log.info('User was created: '+ user.firstName);

            User.find().exec(function (err, users) {
                if (err) {
                    return res.serverError(err);
                }
                users = objectsPrepare(users);
                res.view('user/index', {users: users});
            });
        });    
    }, 

    show: function(req, res) {
        var userId = req.param('id');
        User.findOne({id: userId})
            .populate('teams')
            .populate('activities')
            .populate('role')
            .exec(function (err, user) {
                if (err) {
                    return res.serverError(err);
                } 
            sails.log.info(user);
            if(user){
                res.view('user/show', {user: user.toJSON()})
            }   
        });  
    }, 

    edit: function(req, res) {
            var userId = req.param('id');
            User.findOne({id: userId})
                .populate('teams')
                .populate('activities')
                .populate('role')
                .exec(function (err, user) {
            if (err) {
                return res.serverError(err);
            } 
            sails.log.info(user);
            if(user){
                res.view('user/edit', {user: user})
            }   
        }); 
    }, 

    update: function(req, res) {
            var userId = req.param('id');
            var user = req.body.user;
            sails.log.info('user update cntl, userid is: ' + userId);
            User.update(userId, user).exec(function (err, updatedUser) {
            if (err) {
                return res.serverError(err);
            } 
            sails.log.info(updatedUser);
            if(updatedUser){
                res.redirect('/users');
            }   
        }); 
    },

    destroy: function(req, res) {
            var userId = req.param('id');
            sails.log.info('in remove action userId is: '+ userId);
            User.destroy({id :userId} ).exec(function (err) {
            if (err) {
                return res.serverError(err);
            }

            return res.send(200, {
                    code: 'successful',
                    message: 'User was successfully deleted',
                });
        }); 
    },    


    uploadAvatar: function (req, res) {
        var userId = req.param('id');
        req.file('avatar').upload({
            maxBytes: 10000000
        },function whenDone(err, uploadedFiles) {
            if (err) {
                return res.negotiate(err);
            }

            if (uploadedFiles.length === 0){
                return res.badRequest('No file was uploaded here blah');
            }

            User.update(req.session.me, {
                avatarUrl: require('util').format('%s/users/%s/avatar', sails.getBaseUrl(), userId),
                avatarFd: uploadedFiles[0].fd
            })
             .exec(function (err){
               if (err) return res.negotiate(err);
               return  res.redirect(`/users/${userId}/edit`);
            });
        });
    },    

    avatar: function (req, res){
        var userId = req.param('id');
        req.validate({
            id: 'string'
        });

        User.findOne(userId).exec(function (err, user){
            if (err) return res.negotiate(err);
            if (!user) return res.notFound();

            // User has no avatar image uploaded.
            // (should have never have hit this endpoint and used the default image)
            if (!user.avatarFd) {
            return res.notFound();
            }

            var SkipperDisk = require('skipper-disk');
            var fileAdapter = SkipperDisk(/* optional opts */);

            // Stream the file down
            fileAdapter.read(user.avatarFd)
            .on('error', function (err){
            return res.serverError(err);
            })
            .pipe(res);
        });
    },

    getUsersJson :  function(req, res) {
        User.find().populate('role')
            .populate('teams')
            .populate('activities')
            .exec(function(err, users) {
            if (err) {
                return res.serverError(err);
            }
            res.json(users);
        });
    }, 
};

