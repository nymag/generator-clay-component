# generator-clay-component
A yeoman generator for Clay components!

[![Circle CI](https://circleci.com/gh/nymag/generator-clay-component.svg?style=svg)](https://circleci.com/gh/nymag/generator-clay-component) [![npm version](https://badge.fury.io/js/generator-clay-component.svg)](https://badge.fury.io/js/generator-clay-component)

# Installation

```bash
npm install --global generator-clay-component
```

Or you can use the [yeoman interactive menu!](http://yeoman.io/codelab/install-generators.html)

# Usage

_First, make sure you're running this generator from the **root** directory of your Clay instance!_

To create a new component, simply call the generator with the component's name. Make sure to use kebab-case!

```bash
yo clay-component foo-bar
```

The generator will ask you a few short questions, then spin up the new component in your `components/foo-bar` folder.

1. **What does this component do?** – Write a short, one-line description of your component
2. **What tag should this component use?** – Select the tag you want to use (or `comment`, for a component that lives in the `<head>`)
3. **Does it need client-side javascript?** – This will create a `client.js` with a [dollar-slice](https://github.com/nymag/dollar-slice) controller
4. **Does it need server-side javascript?** – This will create a `server.js` and `server.test.js` for you do logic on `GET`s and `PUT`s

_Interactive prompts are nice, but who has the time? My twitter feed won't read itself!_

You can also use command line flags for all of these options:

* `--desc <words>` or `-d <words>` – description
* `--tag <tag name>` or `-t <tag name>` – tag (note: you can also specify custom tags this way!)
* `--client` or `-c` – if you want client scripts
* `--server` or `-c` – if you want server scripts

If you're a speed daemon, your component might look like this:

```bash
yo clay-component fizz-buzz-enterprise -d "FizzBuzz Enterprise Edition" -t article -cs
```

# Contributing

We're busy people, so we probably missed something! Let us know by submitting an [issue](https://github.com/nymag/generator-clay-component/issues/new), or better yet [submit a pull request with a failing test](https://github.com/nymag/generator-clay-component/pulls). We use linting tools and unit tests, which are built constantly using [continuous integration](https://circleci.com/gh/nymag/generator-clay-component).
