'use strict';

const expect = require('chai').expect,
  dirname = __dirname.split('/').pop(),
  filename = __filename.split('/').pop().split('.').shift(),
  lib = require('./' + filename);

describe(dirname, function () {
  describe(filename, function () {
    // describe('get', function () {
    //   it('gets some data', function () {
    //     const ref = 'some ref';
    //
    //     return lib(ref).then(function (data) {
    //       // if you do dynamic things on the GET, uncomment this block
    //       // and add tests for each scenario
    //       expect(data).to.equal(undefined);
    //     });
    //   });
    // });

    describe('put', function () {
      const fn = lib[this.title];

      it('updates self on empty data', function () {
        const ref = 'some ref',
          data = {};

        function expectOperations(ops) {
          expect(ops).to.deep.equal([{ type: 'put', key: ref, value: JSON.stringify(data) }]);
        }

        return fn(ref, data).then(expectOperations);
      });

      // add other tests for anything else you need to do on the PUT below
    });
  });
});
