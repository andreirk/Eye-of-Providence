/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function(req, res){
        UserRole.find().exec(function(err, roles) {
            if(err) throw err;
            sails.log.info('in role controller roles are:');
            sails.log.info(roles);
            res.json({
                data: {
                    roles: roles
                }
            });
        });
    },

    create: function(req, res) {
        sails.log.info('UserRole create ctrl');
        var roleData = req.body.role;
        UserRole.create(roleData).exec(function(err, role) {
            if (err) {
                return res.serverError(err);
            }
            sails.log.info('Role was created: '+ role.name);

            UserRole.find().exec(function (err, roles) {
                if (err) {
                    return res.serverError(err);
                }
                res.ok({
                    status: "Successfuly created role!",
                    data : {
                        roles: roles
                    }
            });
            });
        });    
    },     
};

