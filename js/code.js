function square(x) {
  if (typeof x === 'number')
    return x * x;
}

angular.module('time', []);
angular.module('twitterAdapter', []);
angular.module('messaging', [
  'twitterAdapter'
]);

angular.module('myApplication', [
  'ui.router',
  'time',
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