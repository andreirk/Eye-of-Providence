/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view:  'homepage'
  },


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  'get /login': {
       view: 'login'
  },

  'post /login': 'AuthController.login',

  '/logout': 'AuthController.logout',

  'get /signup': {
    view: 'signup'
  },

/**
 * UserController 
 * ROUTES 
 */

 // NEW USER FORM 
 'get /users/new' : {
   view : 'user/new'
 },
 // CREATE 
 'post /users': 'UserController.create',

 // SHOW ONE 
 'get /users/:id' : 'UserController.show',
 // EDIT FORM
 'get /users/:id/edit' : 'UserController.edit',
  // DESTROY
 'delete /users/:id' : 'UserController.destroy',
 // UPDATE
 'put /users/:id' : 'UserController.update',

// get login status for front end auth logic
'get /users/status' : 'UserController.getLoginStatus',

 // UPLOAD AVATAR
 'post /users/:id/avatar' : 'UserController.uploadAvatar',
 // GET AVATAR
 'get /users/:id/avatar' : 'UserController.avatar',

  // GET JSON 
 'get /users.json' : 'UserController.getUsersJson',


/** 
 * Activity controller ROUTES
 */

// CREATE 
'get /users/:user_id/activities/new' :  'ActivityController.new',
'post /users/:user_id/activities' : 'ActivityController.create', 

// READ
'get /users/:user_id/activities' : 'ActivityController.find', 
'get /users/:user_id/activities/:id' : 'ActivityController.findOne', 

// EDIT
'get /users/:user_id/activities/:id/edit' : 'ActivityController.edit',
'put /users/:user_id/activities/:id' : 'ActivityController.update',

// DELETE 
'delete /users/:user_id/activities/:id/' : 'ActivityController.destroy',

// FIND ALL
'get /activities' : 'ActivityController.index', 


};
