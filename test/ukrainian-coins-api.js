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

    describe('when called', function() {
      var result;

      beforeEach(function() {
        result = ukrainianCoinsApi.getСategoriess();
      });

      it('should return a promise', function() {
        expect(result).to.be.an.instanceOf(Promise);
      });

      describe('resolved data', function() {
        var resolvedData;

        beforeEach(function() {
          return result.then(function(data) {
            resolvedData = data;
          });
        });

        it('should be an array', function() {
          expect(resolvedData).to.be.an.instanceOf(Array);
        });

        it('should contain objects with id and name', function() {
          resolvedData.forEach(function(item) {
            expect(item).to.be.an('object');

            expect(item).to.have.property('id')
              .that.is.a('number');

            expect(item).to.have.property('name')
              .that.is.a('string');
          });
        });

        it('should contain objects only with positive id', function() {
          resolvedData.forEach(function(item) {
            expect(item.id).to.be.above(0);
          });
        });
      });
    });
  });
});