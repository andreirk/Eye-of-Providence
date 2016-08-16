(function ()
{
    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController($sessionStorage,api,Timeline, About,Teams, Roles,
                             msApi,$mdpDatePicker, $mdpTimePicker,$mdDialog, $mdMedia)
    {
        var vm = this;

        // Data
        vm.posts = []; //Timeline.posts;
        vm.activities = []; //Timeline.activities;
        vm.about = About.data;
        vm.profileForm = {};
        vm.profileForm.user = {};
        vm.roles = Roles.data.roles;
        console.info(vm.roles);
        vm.teams = Teams.data.teams;
        getUserById($sessionStorage.user.id);
        vm.profileForm.user.role = $sessionStorage.user.role || {};
        console.log('in profile controller user after request is');
   
        console.log('in profile controller ');
        console.log('user in sessionStorage is: ');
        console.log($sessionStorage.user);
 
        // Methods
       getUserById($sessionStorage.user.id); 
       vm.submit = submit;


function getUserById(userId){

        api.users.getById.get({'id': userId},
        // Success
        function (response)
            {   
                console.log('Respnse is: ');
                console.log(response.data.user);
                $sessionStorage.user = response.data.user;
                vm.user = response.data.user;
               
                vm.profileForm.user = response.data.user;
                vm.profileForm.user.lastName = response.data.user.secondName;
           //     vm.user.role.name = Roles.data.roles[vm.user.role.id]
                //return response;
            },
            // Error
            function (response)
            {
                console.error(response);
            }
        
    );
}

     function submit(){
           
           var userData = {user : vm.profileForm.user}
           api.users.user.update({id:vm.profileForm.user.id}, userData, function(updatedUser, second){
               if(updatedUser.status){
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('OK!')
                            .textContent('Your profile data has been successfully updated')
                            .ariaLabel('Success!')
                            .ok('Got it!')   
                    );
                    // update user in ctrl
                    getUserById(vm.profileForm.user.id);
               }      
               console.log(second);     
           });
     }
   
        //////////
    }

})();
