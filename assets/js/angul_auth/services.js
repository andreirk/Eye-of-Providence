angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

   
    var user = null;

 
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });

    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return $http.get('/users/status')
  
      .success(function (data) {
        if(data.status){
          user = true;
        } else {
          user = false;
        }
      })

      .error(function (data) {
        user = false;
      });
    }

    function login(email, password) {

 
      var deferred = $q.defer();

      $http.post('/login',
        {email: email, password: password})
    
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
       
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function logout() {

   
      var deferred = $q.defer();

   
      $http.get('/logout')
      
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
     
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function register(firstName, secondName, email, password) {

      var deferred = $q.defer();

      $http.post('/users',
        {
          email: email,
          password: password,
          firstName: firstName,
          secondName: secondName  
      })
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

}]);