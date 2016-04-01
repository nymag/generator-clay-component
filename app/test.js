'use strict';

/* eslint max-nested-callbacks:[2,5] */

const path = require('path'),
  test = require('yeoman-test'),
  assert = require('yeoman-assert'),
  folder = path.join('components', 'foo'),
  tpl = 'template.nunjucks',
  all = 'all.css',
  print = 'print.css',
  schema = 'schema.yml',
  bootstrap = 'bootstrap.yml';

/**
 * run the generator with various options
 * note: options and prompts are interchangeable because of `yeoman-option-or-prompt`
 * @param {object} options (could be empty)
 * @param {Function} done async callback
 */
function run(options, done) {
  test.run(path.join(__dirname, 'index.js'))
    .withArguments(['foo'])
    .withOptions(options)
    .on('end', done);
}

describe('clay-component', function () {
  describe('always', function () {
    before(function (done) {
      run({}, done);
    });

    it('creates component folder', function () {
      assert.file(folder);
    });

    it('adds all.css', function () {
      const file = path.join(folder, all);

      assert.file(file);
      assert.fileContent(file, '.foo {');
    });

    it('adds print.css', function () {
      const file = path.join(folder, print);

      assert.file(file);
      assert.fileContent(file, '.foo {');
    });

    it('adds template.nunjucks', function () {
      const file = path.join(folder, tpl);

      assert.file(file);
      assert.fileContent(file, 'class="foo"');
    });

    it('adds schema.yml', function () {
      assert.file(path.join(folder, schema));
      // schema gets a description, but no name passed in
    });

    it('adds bootstrap.yml', function () {
      const file = path.join(folder, bootstrap);

      assert.file(file);
      assert.fileContent(file, 'foo:');
    });
  });

  describe('with element', function () {
    before(function (done) {
      run({tag: 'aside'}, done);
    });

    it('sets tag', function () {
      assert.fileContent(path.join(folder, tpl), /^<aside/);
    });
  });

  describe('with comment', function () {
    before(function (done) {
      run({tag: 'comment'}, done);
    });

    it('sets tag', function () {
      assert.fileContent(path.join(folder, tpl), '<!-- data-uri="{{ _ref or _self }}" -->');
    });
  });

  describe('with description', function () {
    before(function (done) {
      run({desc: 'cool'}, done);
    });

    it('sets description', function () {
      assert.fileContent(path.join(folder, schema), 'cool');
    });
  });
});
