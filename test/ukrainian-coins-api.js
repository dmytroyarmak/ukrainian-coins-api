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

  describe('#getList()', function () {
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

  describe('#getDetails(id)', function () {
    it('should be a function', function() {
      expect(ukrainianCoinsApi.getDetails).to.be.a('function');
    });

    describe('when called', function() {
      var result;

      beforeEach(function() {
        result = ukrainianCoinsApi.getDetails(1);
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

        it('should be an object', function() {
          expect(resolvedData).to.be.an('object');
        });

        it('should contain all properties', function() {
          expect(resolvedData).to.have.property('id').that.is.a('number');
          expect(resolvedData).to.have.property('name').that.is.a('string');
          expect(resolvedData).to.have.property('metal').that.is.a('string');
          expect(resolvedData).to.have.property('denomination').that.is.a('string');
          expect(resolvedData).to.have.property('date').that.is.a('string');
          expect(resolvedData).to.have.property('weight').that.is.a('number');
          expect(resolvedData).to.have.property('diameter').that.is.a('number');
          expect(resolvedData).to.have.property('thickness').that.is.a('number');
          expect(resolvedData).to.have.property('quality').that.is.a('string');
          expect(resolvedData).to.have.property('edge').that.is.a('string');
          expect(resolvedData).to.have.property('mintage').that.is.a('number');
          expect(resolvedData).to.have.property('categoryId').that.is.a('number');
          expect(resolvedData).to.have.property('category').that.is.a('string');
          expect(resolvedData).to.have.property('generalDescription').that.is.a('string');
          expect(resolvedData).to.have.property('averseDescription').that.is.a('string');
          expect(resolvedData).to.have.property('reverseDescription').that.is.a('string');
          expect(resolvedData).to.have.property('averseImgUrl').that.is.a('string');
          expect(resolvedData).to.have.property('reverseImgUrl').that.is.a('string');
        });
      });
    });
  });
});
