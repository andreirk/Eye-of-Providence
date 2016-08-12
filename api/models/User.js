/**
 * User.js
 *
 * @module      :: Model
 * @description :: This is the User model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


var  _ = require("lodash"),
     bcrypt = require('bcrypt');

module.exports = {

  attributes: {    
      firstName: {
          type: 'string',
         
        },
      surName: {
          type: 'string',
         
        },
      patronymName: {
          type: 'string',
          defaultsTo : ''
        },
      birthDay: {
          type: 'date'
      },
      email: {
          type: 'string',
          email: true,
          required: true,
          unique: true
        },
      password: {
          type: 'string',
          minLength: 6,
          required: true
        },        
      // profile photo  
      avatarUrl: {
          type: 'string',
          url: true
        },
      role: {
          model: 'userrole',
        },
      // team the user belongs to  
      teams: {
          collection: 'team',
          via: 'members',
        },
      activities : {
          collection: 'activity',
          via: 'author',
      } , 
      // time at which employee begins working 
      workDayBegin: {
          type: 'time'
        },
      // time at which employee stops working 
      workDayEnd: {
          type: 'time'
        },
      // the day when employee started to work   
      startedWorkOn: {
          type: 'date'
        },
      // the day when employee was dismissed
      finishWorkOn: {
          type: 'date'
        },
      effectiveness: {
          type: 'float'
        },

      /**
       * Get user's full name
       */

       getFullName :  function() {
        return _.compact([this.firstName, this.secondName, this.patronymName ]).join(' ');      
      },

      /**
       * Custom toJSON() implementation. Removes unwanted attributes.
       */      
      toJSON: function () {
        var obj = this.toObject();
        delete obj.password;
        obj.fullName = this.getFullName();
        return obj;
      },
  },

    beforeCreate: function(user, cb) {
        // encrypt password with salt
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    }
  
};

