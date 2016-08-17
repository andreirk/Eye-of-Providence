(function ()
{
    'use strict';

    angular
        .module('app.profile', [
                    'ngStorage',
                    "ngMaterial",
                    "ngAnimate",
                    "ngAria",
                    'mdPickers',
                    "ngMessages",
                   ])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        
        $stateProvider.state('app.profile', {
            url      : '/profile',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/profile/profile.html',
                    controller : 'ProfileController as vm'
                }
            },
            resolve  : {
                Timeline    : function (msApi)
                {
                    return msApi.resolve('profile.timeline@get');
                },
                About       : function (msApi)
                {
                    return msApi.resolve('profile.about@get');
                },
                PhotosVideos: function (msApi)
                {
                    return msApi.resolve('profile.photosVideos@get');
                },
 
                Teams: function (apiResolver)
                {   
                    return apiResolver.resolve('teams.list@get');
                },

                Roles: function (apiResolver)
                {
                    return apiResolver.resolve('roles.list@get');
                },
                   
                // UserData: function (msApi)
                // {
                //     return msApi.resolve('profile.userData@get');
                // }
            },
            bodyClass: 'profile'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/profile');

        // Api
        msApiProvider.register('profile.timeline', ['app/data/profile/timeline.json']);
        msApiProvider.register('profile.about', ['app/data/profile/about.json']);
        msApiProvider.register('profile.photosVideos', ['app/data/profile/photos-videos.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('profile', {
            title : 'Profile',
            icon  : 'icon-account',
            state : 'app.profile',
            weight: 1
        });
    }

})();