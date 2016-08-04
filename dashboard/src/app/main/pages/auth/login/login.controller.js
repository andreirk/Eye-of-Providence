(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController(msApi, $location)
    {
        var vm = this;
        // Data

        // Methods
      vm.login = function () {

      vm.error = false;
      vm.disabled = true;
     
     var loginParams = {
         email: vm.form.email,
         password: vm.form.password
     }

      msApi.request('app.login@login', loginParams, 
      // SUCCESS
      function (response){
          if(response.status){
            $location.path('/pages/profile');
            vm.disabled = false;
            // vm.form = {};
          };
          console.log('Server respond with data: ' + response.status);
      }, 
      // ERROR
      function (response){
          vm.error = true;
          vm.errorMessage = "Invalid username and/or password";
          vm.disabled = false;
          vm.loginForm = {};
          console.error('Error in login ctrl and data: ' + response.status);
      });

    //   AuthService.login(vm.loginForm.email, vm.loginForm.password)
    
    //     .then(function () {
    //       $location.path('/');
    //       vm.disabled = false;
    //       vm.loginForm = {};
    //     })
     
    //     .catch(function () {
    //       vm.error = true;
    //       vm.errorMessage = "Invalid username and/or password";
    //       vm.disabled = false;
    //       vm.loginForm = {};
    //     });

    };
        //////////
    }
})();