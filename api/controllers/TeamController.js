/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function(req,res){
        Team.find().exec(function(err, teams) {
            if(err) throw err;
            sails.log.info('in team controller teams are:');
            sails.log.info(teams);
            res.json({
                data: {
                    teams: teams
                }
            });
        });
    },

    create: function(req, res) {
        sails.log.info('Userteam create ctrl');
        var teamData = req.body.team;
        Team.create(teamData).exec(function(err, team) {
            if (err) {
                return res.serverError(err);
            }
            sails.log.info('team was created: '+ team.name);

            Team.find().exec(function (err, teams) {
                if (err) {
                    return res.serverError(err);
                }
                res.ok({
                    status: "Successfuly created team!",
                    data : {
                        teams: teams
                    }
            });
            });
        });    
    },     	
};

