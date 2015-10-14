var expect = require('chai').expect;
var ukrainianCoinsApi = require('..');

describe('ukrainianCoinsApi', function() {
  it('should be defined', function() {
    expect(ukrainianCoinsApi).to.be.an('object');
  });

  describe('#getСategories()', function () {
    it('should be a function', function() {
      expect(ukrainianCoinsApi.getСategories).to.be.a('function');
    });

    describe('when called', function() {
      var result;

      beforeEach(function() {
        result = ukrainianCoinsApi.getСategories();
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

            expect(item).to.have.property('id').that.is.a('number');
            expect(item).to.have.property('name').that.is.a('string');
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


  describe.only('#getList()', function () {
    it('should be a function', function() {
      expect(ukrainianCoinsApi.getList).to.be.a('function');
    });

    describe('when called', function() {
      var result;

      beforeEach(function() {
        result = ukrainianCoinsApi.getList();
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

        it('should contain objects with id, name, metal, denomination and date', function() {
          resolvedData.forEach(function(item) {
            expect(item).to.be.an('object');

            expect(item).to.have.property('id').that.is.a('number');
            expect(item).to.have.property('name').that.is.a('string');
            expect(item).to.have.property('metal').that.is.a('string');
            expect(item).to.have.property('denomination').that.is.a('string');
            expect(item).to.have.property('date').that.is.a('string');
          });
        });
      });
    });
  });
});
