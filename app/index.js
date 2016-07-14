'use strict';
const generators = require('yeoman-generator'),
  optionOrPrompt = require('yeoman-option-or-prompt'),
  chalk = require('chalk'),
  fs = require('fs'),
  mkdirp = require('mkdirp'),
  _ = require('lodash'),
  path = require('path'),
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
    this.folder = this.destinationPath('components', this.name);

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
    const done = this.async();

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
      this.answers = answers;
      done();
    }.bind(this));
  },

  writing: {
    createFolder: function () {
      const done = this.async(),
        log = this.log,
        folder = this.folder;

      mkdirp(folder, function (err) {
        if (err) {
          log(chalk.red('ERROR:') + ' Could not create folder: ' + chalk.grey(folder));
          process.exit(1);
        }

        log(chalk.grey('Wrote ' + folder));
        done();
      });
    },

    createStyles: function () {
      const name = this.name,
        folder = this.folder,
        styles = 'styles.scss';

      this.fs.copyTpl(this.templatePath(styles), path.join(folder, styles), { name: name });
    },

    createTemplate: function () {
      const name = this.name,
        folder = this.folder,
        tag = _.get(this, 'answers.tag'),
        tpl = 'template.nunjucks';

      if (tag === 'comment') {
        // copy over the meta component template
        this.fs.copyTpl(this.templatePath('comment.nunjucks'), path.join(folder, tpl), { name: name });
      } else {
        // copy over the regular template
        this.fs.copyTpl(this.templatePath(tpl), path.join(folder, tpl), { name: name, tag: tag });
      }
    },

    createData: function () {
      const name = this.name,
        folder = this.folder,
        desc = _.get(this, 'answers.desc');

      this.fs.copyTpl(this.templatePath('schema.yml'), path.join(folder, 'schema.yml'), { desc: desc });
      this.fs.copyTpl(this.templatePath('bootstrap.yml'), path.join(folder, 'bootstrap.yml'), { name: name });
    },

    createClientJs: function () {
      const name = this.name,
        folder = this.folder,
        client = _.get(this, 'answers.client');

      if (client) {
        this.fs.copyTpl(this.templatePath('client.js'), path.join(folder, 'client.js'), { name: name });
      }
    },

    createServerJs: function () {
      const name = this.name,
        folder = this.folder,
        server = _.get(this, 'answers.server');

      if (server) {
        this.fs.copyTpl(this.templatePath('server.js'), path.join(folder, 'server.js'), { name: name });
        this.fs.copy(this.templatePath('server.test.js'), path.join(folder, 'server.test.js'));
      }
    }
  },

  end: function () {
    this.log(chalk.green('Component ' + chalk.bold(this.name) + ' created!'));
  }
});
