(function ()
{
    'use strict';

    angular
        .module('app.pages', [
            'app.pages.auth.login',
            'app.pages.auth.register',
          
            'app.pages.auth.forgot-password',
            'app.pages.auth.reset-password',
            'app.pages.auth.lock',
        
            'app.pages.profile',
    
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('pages', {
            title : 'PAGES',
            group : true,
            weight: 1
        });
    }
})();