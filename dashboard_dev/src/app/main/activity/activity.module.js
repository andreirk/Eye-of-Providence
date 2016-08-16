(function ()
{
    'use strict';

    angular
        .module('app.activity', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider,$mdThemingProvider)
    {
        // State
        $stateProvider
            .state('app.activity', {
                url    : '/activity',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/activity/activity.html',
                        controller : 'ActivityController as vm'
                    }
                },
                resolve: {
                    ActivityData: function (apiResolver)
                    {   
                        return apiResolver.resolve('activities.list@get');
                    },
    
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/activity');

        // Api
        msApiProvider.register('activity', ['app/data/activity/activity.json']);

        // Navigation
        // msNavigationServiceProvider.saveItem('EOP', {
        //     title : 'ACTIVITY',
        //     group : true,
        //     weight: 2
        // });

        msNavigationServiceProvider.saveItem('activity', {
            title    : 'Activity',
            icon     : 'icon-tile-four',
            state    : 'app.activity',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'ACTIVITY.ACTIVITY_NAV',
            weight   : 3
        });

    $mdThemingProvider.theme('default')
    .primaryPalette('indigo')

    }
})();