(function ()
{
    'use strict';

    angular
        .module('app.toolbar', [])
        .config(config);

    /** @ngInject */
    function config($translatePartialLoaderProvider,msApiProvider)
    {
        $translatePartialLoaderProvider.addPart('app/toolbar');

       msApiProvider.register('app.logout', 
        [
            '/logout',        
        ]);        
    }
})();
