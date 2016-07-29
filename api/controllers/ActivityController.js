/**
 * ActivityController
 *
 * @module      :: Controller 
 * @description :: Server-side logic for managing activities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
    // SHOW FORM for NEW
    new: function (req, res) {
      
      var userId = req.param('user_id');
      sails.log.info('activities controller new action user_id is: ' + userId);
      res.view('activities/new', {userId : userId});  
    },

    // CREATE ACTION
    create: function (req, res) {
        var userId = req.param('user_id'),
            activityData = req.body;

        activityData.author = userId;

        Activity.create(activityData).exec(function (err, createdActivity) {
            if(err){
                 return res.serverError(err);
            }
            sails.log.info('Activity was created: '+ createdActivity.title);

            return res.send(200, {
                    code: 'successful',
                    message: 'Activity was successfully created',
                    activity: createdActivity
                });
        });
    },

    // FIND by USER ACTION
    find: function (req, res) {
        var userId = req.param('user_id');

        Activity.find({author: userId}).exec(function (err, activities) {
            if(err){
                 return res.serverError(err);
            }
            sails.log.info('found activities are: '+ activities);

            return res.json(activities);
        });
    },  

    // FIND by USER ACTION
    index: function (req, res) {
        
        Activity.find().exec(function (err, activities) {
            if(err){
                 return res.serverError(err);
            }
            sails.log.info('found activities are: '+ activities);

            return res.json(activities);
        });
    },       

};

