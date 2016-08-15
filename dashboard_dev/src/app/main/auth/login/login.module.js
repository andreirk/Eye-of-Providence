(function ()
{
    'use strict';

    angular
        .module('app.auth.login', ['ngStorage'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider, msApiProvider)
    {
        // State
        $stateProvider.state('app.auth_login', {
            url      : '/auth/login',
            views    : {
                'main@'                       : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.auth_login': {
                    templateUrl: 'app/main/auth/login/login.html',
                    controller : 'LoginController as vm'
                }
            },
            bodyClass: 'login'
        });

     //   msApiProvider.register('getBlog', [url, paramDefaults, actions, options]);

        msApiProvider.register('app.login', 
        [
        // url
            '/api/login',
        // paramDefaults
            null,
        // actions
            {
                login: {
                    method:'POST'
                }
            }
        
        ]);

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/auth/login');

        // Navigation
        // msNavigationServiceProvider.saveItem('pages.auth', {
        //     title : 'Authentication',
        //     icon  : 'icon-lock',
        //     weight: 1,
        //     hidden: function(){return true}
        // });

        // msNavigationServiceProvider.saveItem('auth.login', {
        //     title : 'Login',
        //     state : 'app.auth_login',
        //     weight: 1
        // });

    }

})();