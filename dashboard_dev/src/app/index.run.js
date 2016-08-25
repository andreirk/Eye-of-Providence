(function ()
{
    'use strict';

    angular
        .module('fuse')
        .run(runBlock);

    /** @ngInject */
    function runBlock($sessionStorage, $rootScope, $timeout, $state)
    {
        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams)
        {
            $rootScope.loadingProgress = true;
            
            // check if a user authorized
            if(toState.name==='app.profile' && toState.name !=='app.auth_login' && !$sessionStorage.user){
                event.preventDefault();
                $state.go('app.auth_login');
            }
            
        });

        // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
        //     if(toState.name==='/profile' && toState.name !=='/login' && !$sessionStorage.user.id){
        //         event.preventDefault();
        //         $state.go('/login');
        //     }
        //  })

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });
    }
})();