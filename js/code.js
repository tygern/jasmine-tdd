function addStrings(first, second) {
  function parseNumber(string) {
    var number = parseInt(string);

    return isNaN(number) ? 0 : number;
  }

  return parseNumber(first) + parseNumber(second);
}

angular.module('users', []);
angular.module('twitterAdapter', []);
angular.module('messaging', [
  'twitterAdapter'
]);

angular.module('greeterApplication', [
  'users',
  'messaging'
]);

angular.module('messaging')
  .service('messagingService', function () {
    return {
      getMessage: function (type) {
        if(type === 'initial') {
          return 'It\'s nice to see you.';
        } else if (type === 'prompt') {
          return 'Oh, you\'re still here.';
        }
      }
    }
  });

angular.module('messaging')
  .controller('messaging.flashController', function ($scope, $timeout,
                                                     messagingService) {
    function setMessage(type) {
      $scope.message = messagingService.getMessage(type);
    }

    setMessage('initial');

    $timeout(function () {
      setMessage('prompt');
    }, 5000);
  });

angular.module('users')
  .service('usersService', function ($q) {
    return {
      getCurrent: function () {
        var deferred = $q.defer();
        deferred.resolve('@walken20');
        return deferred.promise;
      }
    }
  });

angular.module('users')
  .controller('users.currentController', function ($scope, usersService) {
    function setCurrentUser(user) {
      $scope.currentUser = user;
    }

    setCurrentUser('Loading');

    usersService.getCurrent().then(setCurrentUser);
  });