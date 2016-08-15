(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            'app.auth.login',
            'app.auth.register',

            //  Activity
            'app.activity',

            // Pages
         //   'app.pages',
            // Profile
            'app.profile',
        ]);
})();