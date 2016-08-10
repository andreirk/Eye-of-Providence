(function ()
{
    'use strict';

    angular
        .module('app.pages.profile')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController($localStorage,Timeline, About)
    {
        var vm = this;
        vm.basicForm = {};
        vm.basicForm.birthDay = '';
        // Data
        vm.posts = []; //Timeline.posts;
        vm.activities = []; //Timeline.activities;
        vm.about = About.data;
        vm.user = $localStorage.user;

        vm.basicForm.firstname = vm.user.firstName || '';
        vm.basicForm.lastname = vm.user.lastName || '';
        vm.basicForm.email = vm.user.email || '';

       // vm.basicForm.birthDay = new Date();
        // vm.photosVideos = PhotosVideos.data;

        // Methods

        //////////
    }

})();
