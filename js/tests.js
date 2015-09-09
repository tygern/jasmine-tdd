describe('describe organizes tests', function() {
  it('it runs a test with expectations', function() {
    expect(1 === 1).toBe(true);
  });
});

describe('jasmine matchers', function() {
  it('contains a variety of matchers', function() {
    expect(true).toBe(true);
    expect({some: 'object'}).not.toBe({some: 'object'});
    expect({some: 'object'}).toEqual({some: 'object'});
    expect(3).toBeLessThan(4);
    expect({some: 'object'}.notThere).toBeUndefined();
    expect('there are many more matchers').toBeTruthy();
  });
});

describe('test setup', function() {
  var a;

  beforeEach(function() {
    a = 1
  });

  it('beforeEach is run before each test', function() {
    expect(a).toBe(1);
  });
});

describe('mocking', function() {
  var generator;
  beforeEach(function() {
    generator = { getRandom: function(max) { return max * Math.random(); }}
  });

  it('spyOn allows mocking functions', function() {
    spyOn(generator, 'getRandom').and.returnValue(42);

    var result = generator.getRandom(50);

    expect(result).toBe(42);
    expect(generator.getRandom).toHaveBeenCalled();
    expect(generator.getRandom).toHaveBeenCalledWith(50);
    expect(generator.getRandom.calls.count()).toBe(1);
  });
});

describe('asynchronous tests', function() {
  it('wait until done is called', function (done) {
    var p = new Promise(function (resolve) {
      setTimeout(function () {
        resolve('The test is done!');
      }, 100);
    });

    p.then(function (message) {
      expect(message).toBe('The test is done!');
      done();
    });
  });
});
