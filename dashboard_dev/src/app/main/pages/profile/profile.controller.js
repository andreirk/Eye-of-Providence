(function ()
{
    'use strict';

    angular
        .module('app.pages.profile')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController($localStorage,Timeline, About, msApi,$mdpDatePicker, $mdpTimePicker)
    {
        var vm = this;
        vm.basicForm = {};
        vm.basicForm.birthDay = '';
        vm.basicForm.roles = ['Manager', 'Developer'];
        vm.basicForm.teams = [{name:'FirstTeam'},{name: 'SecondTeam'}, {name:'Supermens'}];

      
        // Data
        vm.posts = []; //Timeline.posts;
        vm.activities = []; //Timeline.activities;
        vm.about = About.data;
        vm.user = $localStorage.user;

        vm.basicForm.firstname = vm.user.firstName || '';
        vm.basicForm.lastname = vm.user.lastName || '';
        vm.basicForm.email = vm.user.email || '';

        console.log('in profile controller ');
        console.log('user in localStorage is: ');
        console.log(vm.user);
        // vm.basicForm.birthDay = new Date();
        // vm.photosVideos = PhotosVideos.data;

        // Methods
    //     msApi.request('profile.userData@get', {id: vm.user.id}, 
    //         // SUCCESS
    //         function (response){
    //             console.log('in profile userData request');
    //             console.log('user id is: ' + vm.user);
    //             if(response.status){  
    //                 vm.disabled = false;
    //                 $localStorage.user = response.data.user;
    //                 console.log( $localStorage.user);
                   
    //                 // vm.form = {};
    //             };
    //             console.log('Server respond with data: ' + response.data);
    //         }, 
    //         // ERROR
    //         function (response){
    //             vm.error = true;
    //             vm.errorMessage = "Invalid username and/or password";
    //             vm.disabled = false;
    //             vm.loginForm = {};
    //             console.error('Error in login ctrl and data: ' + response.status);
    //    });
        //////////
    }

})();
