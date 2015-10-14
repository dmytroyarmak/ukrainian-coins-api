var expect = require('chai').expect;
var ukrainianCoinsApi = require('..');

describe('ukrainianCoinsApi', function() {
  it('should be defined', function() {
    expect(ukrainianCoinsApi).to.be.an('object');
  });

  describe('#getСategoriess()', function () {
    it('should be a function', function() {
      expect(ukrainianCoinsApi.getСategoriess).to.be.a('function');
    });
  });
});
