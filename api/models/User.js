/**
 * User.js
 *
 * @module      :: Model
 * @description :: This is the User model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


  _ = require("lodash");

module.exports = {

  attributes: {
    
      // User login name
      username: {
          type: 'string',
          required: true,
          unique: true
        },
      firstName: {
          type: 'string',
          required: true
        },
      secondName: {
          type: 'string',
          required: true
        },
      patronymName: {
          type: 'string'
        },
      // profile photo  
      avatar: {
          type: 'string',
          url: true
        },
      teamRole: {
          type: 'string'
        },
      // team the user belongs to  
      team: {
         // model: 'team'
         type: 'string'
        },
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

      /**
       * Get user's full name
       */
      fullName: function() {
        return _.compact([this.firstName, this.secondName, this.patronymName ]).join(' ');      
      },

      /**
       * Custom toJSON() implementation. Removes unwanted attributes.
       */      
      toJSON: function () {
        var obj = this.toObject();
        delete obj.password;
        return obj;
      }       
  }
};

