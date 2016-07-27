/**
 * UserController
 * @module      :: Controller
 * @description :: Server-side logic for managing users- UserController
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



/** 
 * @returns array of json objects
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
            console.log('in user controller users are:');
            console.log(users);
            res.view('user/index', {users: users})
           
        });
    }, 

    create: function(req, res) {
        var usersData = req.body;
        User.create(usersData).exec(function(err, user) {
            if (err) {
                return res.serverError(err);
            }
            console.log('User was created: '+ user.firstName);

            User.find().exec(function (err, users) {
                if (err) {
                    return res.serverError(err);
                }
                users = objectsPrepare(users);
                res.view('user/index', {users: users})
            });
        });    
    }, 

    show: function(req, res) {
        var userId = req.param('id');
        User.findOne({id: userId}).populate('teams').populate('activities').populate('role').exec(function (err, user) {
            if (err) {
                return res.serverError(err);
            } 
            console.log(user);
            if(user){
                res.view('user/show', {user: user.toJSON()})
            }   
        });  
    }, 

    edit: function(req, res) {
            var userId = req.param('id');
            User.findOne({id: userId}).populate('teams').populate('activities').populate('role').exec(function (err, user) {
            if (err) {
                return res.serverError(err);
            } 
            console.log(user);
            if(user){
                res.view('user/edit', {user: user})
            }   
        }); 
    }, 

    update: function(req, res) {
            var userId = req.param('id');
            var user = req.body.user;
            User.update(userId, user).exec(function (err, updatedUser) {
            if (err) {
                return res.serverError(err);
            } 
            console.log(updatedUser);
            if(updatedUser){
                res.view('user/edit', {user: updatedUser})
            }   
        }); 
    },    

    uploadAvatar: function (req, res) {

        req.file('avatar').upload({
            maxBytes: 10000000
        },function whenDone(err, uploadedFiles) {
            if (err) {
            return res.negotiate(err);
            }

            if (uploadedFiles.length === 0){
            return res.badRequest('No file was uploaded');
            }

            User.update(req.session.me, {

            avatarUrl: require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.session.me),

            avatarFd: uploadedFiles[0].fd
            })
            .exec(function (err){
            if (err) return res.negotiate(err);
            return res.ok();
            });
        });
    },    

    avatar: function (req, res){

        req.validate({
            id: 'string'
        });

        User.findOne(req.param('id')).exec(function (err, user){
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
        User.find().exec(function(err, users) {
            if (err) {
                return res.serverError(err);
            }
            console.log(users);
            res.json(users);
        });
    }, 


};

