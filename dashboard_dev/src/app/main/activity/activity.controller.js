(function ()
{
    'use strict';

    angular
        .module('app.activity')
        .controller('ActivityController', ActivityController);

    /** @ngInject */
    function ActivityController(ActivityData)
    {
        var vm = this;

        // Data
        vm.list = ActivityData.data.activities;

        // Methods

        //////////
    }
})();
