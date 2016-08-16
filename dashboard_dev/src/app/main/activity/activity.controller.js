(function ()
{
    'use strict';

    angular
        .module('app.activity')
        .controller('ActivityController', ActivityController);

    /** @ngInject */
    function ActivityController($scope, ActivityData, $sessionStorage, api)
    {
        var vm = this;

        // Data
      
        vm.list = ActivityData.data.activities;
        vm.activityForm = {};
      
        vm.addActivity = addActivity;

        // Methods

        function addActivity(){
           console.log('in function addActivity')
           var activityData = {activity:  vm.activityForm}
           activity.author = $sessionStorage.user.id;
           api.activities.activity.add(activityData, function(response, second){
               if(response.status){
                   console.log(response)
                   var prom = api.activities.activity.get();
                   prom.$promise.then(function(resource){
                       vm.list = resource.data.activities;
                       console.info('list after update');
                       console.log(vm.list);
                   }, function(reason){
                       console.info('reason in add activity is:')
                       console.log(reason);
                   })
                   
               }
               console.dir(second);
           });
           
        }

        //////////
    }
})();
