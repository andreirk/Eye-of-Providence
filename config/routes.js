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

  'post /api/login': 'AuthController.login',

  '/api/logout': 'AuthController.logout',

  'get /signup': {
    view: 'signup'
  },

/**
 * UserController 
 * ROUTES 
 */

 // NEW USER FORM 
 'get /api/users/new' : {
   view : 'user/new'
 },
 // CREATE 
 'post /api/users': 'UserController.create',

 // SHOW ONE 
  // 'get /api/users/:id' : 'UserController.show',
  // the same as above but use json for SPA
   'get /api/users/:id' : 'UserController.findOne',


 // EDIT FORM
 'get /api/users/:id/edit' : 'UserController.edit',
  // DESTROY
 'delete /api/users/:id' : 'UserController.destroy',
 // UPDATE
 'put /api/users/:id' : 'UserController.update',

// get login status for front end auth logic
  'get /api/users/status' : 'UserController.getLoginStatus',

 // UPLOAD AVATAR
 'post /api/users/:id/avatar' : 'UserController.uploadAvatar',
 // GET AVATAR
 'get /api/users/:id/avatar' : 'UserController.avatar',

  // GET JSON 
 'get /api/users.json' : 'UserController.getUsersJson',


/** 
 * Activity controller ROUTES
 */

// CREATE 
'get  /api/users/:user_id/activities/new' :  'ActivityController.new',
'post /api/users/:user_id/activities' : 'ActivityController.create', 
'post /api/activities' : 'ActivityController.create', 


// READ
'get /api/users/:user_id/activities' : 'ActivityController.find', 
'get /api/users/:user_id/activities/:id' : 'ActivityController.findOne', 

// EDIT
'get /api/users/:user_id/activities/:id/edit' : 'ActivityController.edit',
'put /api/users/:user_id/activities/:id' : 'ActivityController.update',

// DELETE 
'delete /api/users/:user_id/activities/:id/' : 'ActivityController.destroy',

// FIND ALL

'get /api/activities' : 'ActivityController.index', 


/** 
 * Team controller ROUTES
 */
'get /api/teams' : 'TeamController.index', 

'post /api/teams': 'TeamController.create',


/** 
 * UserRole controller ROUTES
 */
'get /api/roles' : 'UserRoleController.index', 

'post /api/roles': 'UserRoleController.create',

};
