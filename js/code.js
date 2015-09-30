function square(x) {
  if (typeof x === 'number')
    return x * x;
}

angular.module('users', []);
angular.module('twitterAdapter', []);
angular.module('messaging', [
  'twitterAdapter'
]);

angular.module('myApplication', [
  'ui.router',
  'users',
  'messaging'
]);

angular.module('messaging')
  .service('messagingService', function () {
    return {
      getMessage: function () {
      }
    }
  });

angular.module('messaging')
  .controller('messaging.flashController', function($scope, $timeout,
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
  .service('usersService', function () {
    return {
      getCurrent: function () {
      }
    }
  });

angular.module('users')
  .controller('users.currentController', function($scope, usersService) {
    $scope.currentUser = 'Loading';

    usersService.getCurrent().then(function (result) {
      $scope.currentUser = result;
    });

  });