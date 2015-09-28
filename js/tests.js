describe('square', function () {
  it('squares the number', function () {
    expect(square(1)).toEqual(1);
    expect(square(3)).toEqual(9);
    expect(square(-4)).toEqual(16);
  });

  it('has other matchers', function () {
    expect(square(3)).not.toEqual(8);
    expect(square(5)).toBeGreaterThan(20);
    expect(square("a")).toBeUndefined();
  });
});

describe('timeProvider', function () {
  var timeProvider;

  beforeEach(function () {
    timeProvider = {
      dayOfWeek: function () {
        return 'Thursday';
      }
    };
  });

  afterEach(function () {
    timeProvider = {};
  });

  it('tracks calls and arguments', function () {
    spyOn(timeProvider, 'dayOfWeek').and.returnValue('Monday');

    var result = timeProvider.dayOfWeek('capital');

    expect(result).toEqual('Monday');
    expect(timeProvider.dayOfWeek).toHaveBeenCalled();
    expect(timeProvider.dayOfWeek).toHaveBeenCalledWith('capital');
    expect(timeProvider.dayOfWeek.calls.count()).toEqual(1);
  });
});

describe('testing asynchronous code', function () {
  it('takes done as an argument', function (done) {
    done();
  });

  it('will pass if completed before timeout', function (done) {
    setTimeout(function () {
      done();
    }, 100);
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

  describe('when the controller starts', function () {
    it('loads the message', function () {
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

      $timeout.flush(5100);

      expect($scope.message).toEqual('Hi!');
      expect(messagingService.getMessage)
        .toHaveBeenCalledWith('prompt');
    });
  });
});
