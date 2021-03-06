(function ()
{
    'use strict';

    angular
        .module('app.auth.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController(msApi,$sessionStorage, $location)
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
            vm.disabled = false;
            $sessionStorage.user = response.data.user;
            console.log('in login ctrl local storage user is:')
            console.log( $sessionStorage.user);
            $location.path('/profile');
            // vm.form = {};
          };
    
          //console.log('Server respond with data: ' + response.data);
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