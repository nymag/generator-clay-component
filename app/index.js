'use strict';
const generators = require('yeoman-generator'),
  optionOrPrompt = require('yeoman-option-or-prompt'),
  chalk = require('chalk'),
  fs = require('fs'),
  _ = require('lodash'),
  descMessage = 'What does this component do?',
  tagMessage = 'What tag should this component use?',
  clientMessage = 'Does it need client-side javascript?',
  serverMessage = 'Does it need server-side javascript?';

module.exports = generators.Base.extend({
  // allow us to pass options OR use the interactive prompts
  _optionOrPrompt: optionOrPrompt,

  constructor: function () {
    generators.Base.apply(this, arguments);

    this.on('error', function (e) {
      if (_.includes(e.message, 'Did not provide required argument')) {
        this.log(chalk.red('Wait a minute!') + ' You need to provide a name, e.g. ' + chalk.inverse(' yo clay-component ' + chalk.bold('foobar') + ' '));
        process.exit(1);
      }
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
      desc: descMessage,
      alias: 'd',
      type: String
    });

    // --tag or -t
    this.option('tag', {
      desc: tagMessage,
      alias: 't',
      type: String
    });

    // --client or -c
    this.option('client', {
      desc: clientMessage,
      alias: 'c',
      type: Boolean
    });

    // --server or -s
    this.option('server', {
      desc: serverMessage,
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
  },

  prompting: function () {
    var done = this.async();

    this._optionOrPrompt([{
      name: 'desc',
      message: descMessage,
      type: 'input'
    }, {
      name: 'tag',
      message: tagMessage,
      type: 'list',
      default: 1,
      choices: [{
        name: chalk.magenta('<!-- comment -->') + ' used for components that live in the <head>',
        value: 'comment',
        short: '<!-- comment -->'
      }, {
        name: chalk.magenta('<aside>') + ' used for components connected tangentially with the main content',
        value: 'aside',
        short: '<aside>'
      }, {
        name: chalk.magenta('<section>') + ' used for components the contain semantic content',
        value: 'section',
        short: '<section>'
      }, {
        name: chalk.magenta('<div>') + ' a catch-all for non-semantic components',
        value: 'div',
        short: '<div>'
      }]
    }, {
      name: 'client',
      message: clientMessage,
      type: 'confirm',
      default: false
    }, {
      name: 'server',
      message: serverMessage,
      type: 'confirm',
      default: false
    }], function (answers) {
      this.log(answers)
      done();
    }.bind(this));
  }
});
