/**
 * UserController
 * @module      :: Controller
 * @description :: Server-side logic for managing users- UserController
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // get all users with public attrs
	getUsers: function(req, res) {
        User.find().exec(function(err, users) {
            if(err) throw err;
            console.log(users);
            users.forEach(function(element) {
                element.fullName = element.fullName();
            }, this);
            res.json(users);
        });
    }, 

};

