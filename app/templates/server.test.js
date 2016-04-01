'use strict';
/* eslint max-nested-callbacks:[2,5] */

var sinon = require('sinon'),
  expect = require('chai').expect,
  dirname = __dirname.split('/').pop(),
  filename = __filename.split('/').pop().split('.').shift(),
  lib = require('./' + filename);

describe(dirname, function () {
  describe(filename, function () {
    // describe('get', function () {
    //   var sandbox;
    //
    //   beforeEach(function () {
    //     sandbox = sinon.sandbox.create();
    //   });
    //
    //   afterEach(function () {
    //     sandbox.restore();
    //   });
    //
    //   it('gets some data', function () {
    //     var ref = 'some ref';
    //
    //     return lib(ref).then(function (data) {
    //       // if you do dynamic things on the GET, uncomment this block
    //       // and add tests for each scenario
    //       expect(data).to.equal(undefined);
    //     });
    //   });
    // });

    describe('put', function () {
      var fn = lib[this.title],
        sandbox;

      beforeEach(function () {
        sandbox = sinon.sandbox.create();
      });

      afterEach(function () {
        sandbox.restore();
      });

      it('updates self on empty data', function () {
        var ref = 'some ref',
          data = {};

        return fn(ref, data).then(function (ops) {
          expect(ops).to.deep.equal([{ type: 'put', key: ref, value: JSON.stringify(data) }]);
        });
      });

      // add other tests for anything else you need to do on the PUT below
    });
  });
});
