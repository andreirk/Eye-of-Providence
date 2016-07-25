/**
 * Activity.js
 *
 * @module      :: Model
 * 
 * @description :: This is the Activity model
 * @docs        :: https://docs.google.com/document/d/11byRqlkKCM4oE-AJAWmez0VACVfA2khbFU7G5yYIIGQ/edit#
 * 
 * @namespace
 * @prop {number}  attributes.title             - 
 * @prop {text}    attributes.description       - 
 * @prop {number}  attributes.priority          - 
 * @prop {date}    attributes.beginDate           -
 * @prop {date}    attributes.finishDate           -
 * @prop {object}  attributes.author              -
 * @prop {string}  attributes.resourceLink           -   
 * 
 */

module.exports = {

  attributes: {
      title: {
        type: 'string',
        required: true,
        unique: true
      },
      description: {
        type: 'text'
      },
      priority: {
        type: 'integer',
      },
      beginDate: {
        type: 'datetime'
      },
      finishDate: {
        type: 'datetime'
      },
      // comment: {
      //   type: 'string'
      //   // model: 'comment'
      // },
      author: {
        model: 'user'
      },
      resourceLink: {
        type: 'string'
      },
  }
};

