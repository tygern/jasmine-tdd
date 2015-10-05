describe('addStrings', function () {
  it('correctly adds two numbers', function () {
    expect(addStrings('3', '5')).toEqual(8);
    expect(addStrings('4', '6')).toEqual(10);
  });

  it('treats non-numbers as 0', function () {
    expect(addStrings('a', '6')).toEqual(6);
    expect(addStrings('2', '')).toEqual(2);
  });
});

describe('messaging.flashController', function () {
  var $scope, messagingService, $timeout;
  beforeEach(module('messaging'));

  beforeEach(inject(function ($rootScope, $controller, _$timeout_, _messagingService_) {
    $scope = $rootScope.$new();
    $timeout = _$timeout_;
    messagingService = _messagingService_;
    spyOn(messagingService, 'getMessage').and.returnValue('Hi!');

    $controller('messaging.flashController', {
      $scope: $scope,
      messagingService: messagingService
    });
  }));

  describe('when the controller loads', function () {
    it('sets the message', function () {
      expect($scope.message).toEqual('Hi!');
      expect(messagingService.getMessage)
        .toHaveBeenCalledWith('initial');
    });
  });

  describe('after waiting 5 seconds', function () {
    it('shows the \'prompt\' message', function () {
      $scope.message = '';

      $timeout.flush(4900);
      expect($scope.message).toEqual('');

      $timeout.flush(200);

      expect($scope.message).toEqual('Hi!');
      expect(messagingService.getMessage)
        .toHaveBeenCalledWith('prompt');
    });
  });
});

describe('users.currentController', function () {
  var $scope, usersService, deferred;
  beforeEach(module('users'));

  beforeEach(inject(function ($rootScope, $controller, $q,
                              _usersService_) {
    $scope = $rootScope.$new();
    usersService = _usersService_;

    deferred = $q.defer();
    spyOn(usersService, 'getCurrent')
      .and.returnValue(deferred.promise);

    $controller('users.currentController', {
      $scope: $scope,
      usersService: usersService
    });
  }));

  describe('when the controller loads', function () {
    it('sets the current user', function () {
      expect($scope.currentUser).toEqual('Loading');

      deferred.resolve('@walken20');
      $scope.$apply();

      expect($scope.currentUser).toEqual('@walken20');
    });
  });
});
