'use strict';
const generators = require('yeoman-generator'),
  optionOrPrompt = require('yeoman-option-or-prompt'),
  chalk = require('chalk'),
  fs = require('fs'),
  _ = require('lodash');

module.exports = generators.Base.extend({
  // allow us to pass options OR use the interactive prompts
  _optionOrPrompt: optionOrPrompt,

  constructor: function () {
    generators.Base.apply(this, arguments);

    this.on('error', function () {
      this.log(chalk.red('Wait a minute!') + ' You need to provide a name, e.g. ' + chalk.inverse(' yo clay-component ' + chalk.bold('foobar') + ' '));
      process.exit(1);
    });

    // add name as an argument, since we need to check if the component exists
    // before doing anything else
    this.argument('name', {
      desc: 'Component name, in kebab-case.',
      required: true,
      type: String
    });
    this.fancyName = this.name.split('-').map(_.startCase).join(' '); // foo-bar → Foo Bar

    // add options

    // --desc or -d
    this.option('desc', {
      desc: 'One-line component description, in github-flavored markdown. Can be expanded later.',
      alias: 'd',
      type: String
    });

    // --tag or -t
    this.option('tag', {
      desc: 'What tag should this component use? Options are comment, section, aside, div.',
      alias: 't',
      type: String
    });

    // --client or -c
    this.option('client', {
      desc: 'Does this component need client-side javascript?',
      alias: 'c',
      type: Boolean
    });

    // --server or -s
    this.option('server', {
      desc: 'Does this component need server-side javascript?',
      alias: 's',
      type: Boolean
    });
  },

  initializing: {
    checkComponent: function () {
      const name = this.name,
        hasComponentFolder = fs.existsSync(this.destinationPath('components', name));
        // note: this.fs.exists() doesn't work for directories, hence fs.existsSync()

      if (hasComponentFolder) {
        this.log(chalk.red('Hold on a second!') + ' This component already exists at ' + chalk.blue('components/' + name));
        process.exit(1);
      }
    }
  }
});
