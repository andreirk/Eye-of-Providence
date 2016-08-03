/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.http.html
 */
var express = require('express');

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

  middleware: {
    methodOverride  : require("method-override")('_method'),
    passportInit    : require('passport').initialize(),
    passportSession : require('passport').session(),
    
    setLocals : function(req, res, next){
        
        if(req.user){
          var user = req.user;
          res.locals.currentUser = user.toJSON();// req.user;
        } else {
          res.locals.currentUser = null;
        }
        
        res.locals.title = 'Eye Of Providence';
        res.locals.error = 'error'; // req.getFlash('error');
        sails.log.info('!!! user in request: user ' + req.user);
        sails.log.info('request route is: ' + req.route);
        sails.log.info('request path is: ' + req.path);
        sails.log.info('request method is: ' + req.method);
        sails.log.info('request url is: ' + req.url);
        sails.log.info('request POST body is: ' + JSON.stringify(req.body));

        res.locals.success = 'success'; //req.getFlash('success');
        next();
},



  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/

    order: [
          'startRequestTimer',
          'cookieParser',
          'session',
          'passportInit',     
          'passportSession', 
          'myRequestLogger',
          'bodyParser',
          'handleBodyParserError',
          'setLocals',
          'compress',
          'methodOverride',
          'poweredBy',
          'router',
          'www',
          'favicon',
          '404',
          '500'
        ],

  /****************************************************************************
  *                                                                           *
  * Example custom middleware; logs each request to the console.              *
  *                                                                           *
  ****************************************************************************/

    // myRequestLogger: function (req, res, next) {
    //     console.log("Requested :: ", req.method, req.url);
    //     return next();
    // }


  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
  * default as of v0.10, Sails uses                                          *
  * [skipper](http://github.com/balderdashy/skipper). See                    *
  * http://www.senchalabs.org/connect/multipart.html for other options.      *
  *                                                                          *
  * Note that Sails uses an internal instance of Skipper by default; to      *
  * override it and specify more options, make sure to "npm install skipper" *
  * in your project first.  You can also specify a different body parser or  *
  * a custom function with req, res and next parameters (just like any other *
  * middleware function).                                                    *
  *                                                                          *
  ***************************************************************************/

    // bodyParser: require('skipper')({strict: true})

  },

  //dashboardStatic
   customMiddleware:function (app) {
      app.use('/dashboard/', express.static(process.cwd() + '/dashboard/.tmp/serve/app'));
    },

  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
