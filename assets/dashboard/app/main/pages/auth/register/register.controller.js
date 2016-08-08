(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.register')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController(msApi, $location)
    {
        var vm = this;
        // Data

        // Methods
      vm.register = function () {

      vm.error = false;
      vm.disabled = true;
     
     var registerParams = {
         firstName : vm.form.firstName,
         secondName : vm.form.secondName,
         email: vm.form.email,
         password: vm.form.password
     }

      msApi.request('app.register@register', registerParams, 
      // SUCCESS
      function (response){
          if(response.status){
            $location.path('/pages/login');
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
          console.error('Error in register ctrl and data: ' + response.status);
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