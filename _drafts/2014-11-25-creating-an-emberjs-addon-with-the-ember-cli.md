---
layout: post
title: Creating an Ember.js Addon with the Ember CLI.
summary: Thanks to the power of the Ember CLI, reusing code and functionality between apps has never been easier.
category: ember
---

Thanks to the power of the Ember CLI, reusing code and functionality between apps has never been easier. To
get an idea of the addons that already exist in this ecosystem, check out <http://emberaddons.com>. At the
time of writing this, there are already more than 300 addons listed. Many of which can drastically help
you cut down on development time. So, let's get started!

For this example, we will be creating an Ember CLI addon for the [remarkable](https://github.com/jonschlinkert/remarkable)
markdown library. We will create a Handlebars helper and an Ember component which will be able to be
used in Ember CLI apps that install the addon.

## Getting started

In order to get started you will need the following dependencies to be installed:

* [node](http://nodejs.org/)
* [npm](https://www.npmjs.org/)
* [bower](http://bower.io)
* [ember-cli](http://www.ember-cli.com)

## Generating the addon skeleton

The Ember CLI provides an addon generator so you can create the addon skeleton, including tests,
with the following command:

```
ember addon <your-addon-name>
```

For the purposes of this example, I will create the `ember-remarkable` addon. So I will use the
following command:

```
ember addon ember-remarkable
```

This will install all npm and bower dependencies, and create the necessary scaffold to begin
implementing your addon. Now, to ensure everything is workin as expected, you can run the initial
tests, which consist of jshinting, with:

```
ember t
```

Your output should resemble:

```
ember-remarkable [master] % ember t
version: 0.1.2
Built project successfully. Stored in "/Users/johno/code/ember/ember-remarkable/tmp/class-tests_dist-vfl3qTwU.tmp".
ok 1 PhantomJS 1.9 - JSHint - .: app.js should pass jshint
ok 2 PhantomJS 1.9 - JSHint - dummy/tests/helpers: dummy/tests/helpers/resolver.js should pass jshint
ok 3 PhantomJS 1.9 - JSHint - dummy/tests/helpers: dummy/tests/helpers/start-app.js should pass jshint
ok 4 PhantomJS 1.9 - JSHint - dummy/tests: dummy/tests/test-helper.js should pass jshint
ok 5 PhantomJS 1.9 - JSHint - .: router.js should pass jshint

1..5
# tests 5
# pass  5
# fail  0

# ok
```

Now that everything is in order, we need to add a bower dependency for the remarkable library.

## Adding a bower dependency

In order to add a bower dependency, we need to create an addon
[blueprint](http://www.ember-cli.com/#generators-and-blueprints) that adds the bower dependency:

```
ember g blueprint ember-remarkable
```

This will create the file `blueprints/ember-remarkable/index.js` which is where we can introduce the remarkable
dependency. Throughout the build process with the Ember CLI, there are numerous hooks that are introduced. For
this addon, we want to tie into the `afterInstall` hook, which is executed when the generator is run after the
addon is installed as an npm dependency in an Ember CLI app.

To create the hook and add the remarkable depdendency, we can modify `blueprints/ember-remarkable/index.js`
like so:

```javascript
'use strict';

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    return this.addBowerPackageToProject('remarkable');
  }
};
```

### Specify the blueprint path

We can modify the project root's `index.js` to specify what path to use for the blueprint:

```javascript
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-remarkable',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  }
};
```

Note that the `blueprints` path is the default. Now, when this addon is installed in an Ember
app, the blueprint can be run with:

```
ember g ember-remarkable
```

And, the remarkable bower package will be installed automatically. Awesome!

### Import the Javascript file

Now that the bower package is being installed, we need to import the Javascript file into our addon. This
can be done in the addon root's `index.js`:

```javascript
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-remarkable',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  included: function(app) {
    this._super.included(app);
    this.app.import(app.bowerDirectory + '/remarkable/dist/remarkable.js');
  }
};
```

Now, the addon will import the remarkable Javascript into the Ember CLI app.

## Creating a helper

In order to generate a helper, you can run the following Ember CLI command:

```
ember g helper md-remarkable
```

This will create the helper, with a test file. However, the helper is created in `app/helpers`, which
isn't where we want the helper to be located. We want to keep the helper in the `addon/helpers` directory.
This ensures that the helper doesn't stomp on anything defined by the user.

So, we will have to move the `helpers` directory with `mv app/helpers addon`.

### Testing the helper

```javascript
import {
  mdRemarkable
} from 'ember-remarkable/helpers/md-remarkable';

module('MdRemarkableHelper');

test('it correctly converts markdown to html', function() {
  var result = mdRemarkable('# This should be a h1');
  equal(result.toString().trim(), '<h1>This should be a h1</h1>');
});
```

You can verify that the test is failing with `ember t`.

### Implementing the helper

```javascript
import Ember from 'ember';

export function mdRemarkable(markdownInput) {
  var md = new Remarkable();
  return new Ember.Handlebars.SafeString(md.render(markdownInput));
}

export default Ember.Handlebars.makeBoundHelper(mdRemarkable);
```

Now, you can run the tests with `ember t` and see that the test is passing, however, the linting tests
are now failing because we are implicitly calling the `Remarkable` constructor, and jshint doesn't now
that it is accessible globally.

```
not ok 4 PhantomJS 1.9 - JSHint - ember-export-application-global/helpers: ember-export-application-global/helpers/md-remarkable.js should pass jshint
    ---
        actual: >
            null
        message: >
            ember-export-application-global/helpers/md-remarkable.js should pass jshint.
            ember-export-application-global/helpers/md-remarkable.js: line 5, col 16, 'Remarkable' is not defined.

            1 error
        Log: >
    ...
```

The easy fix is to modify the `.jshintrc` to make it not complain, however, we can also create a shim
to mimic ES6 functionality.

#### Creating a shim

First, we need to create a vendor file since that will be automatically merged into the app:

```
mkdir vendor/ember-remarkable
touch vendor/ember-remarkable/shim.js
```

Now we can create the shim:

```javascript
/* globals Remarkable */

define('remarkable', [], function() {
  'use strict';

  return {
    'default': remarkable
  };
});
```

This defines an ES6 shim so that we can leverage the `import Remarkable from 'remarkable'` ES6
import syntax. However, we aren't quite done yet because we need to import the shim into the app,
so you will need to modify your `index.js` to the following:

```javascript
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-remarkable',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  included: function(app) {
    this._super.included(app);
    this.app.import(app.bowerDirectory + '/remarkable/dist/remarkable.js');
    this.app.import('vendor/ember-remarkable/shim.js', {
      type: 'vendor',
      exports: { 'remarkable': ['default'] }
    });
  }
};
```

This still leaves `Remarkable` in the global scope, attached to the `window`, however we get to
leverage module `import`s, which will allow us to future-proof this implementation and avoid
modifying the jshinting.

Now, we can import the module in the helper file:

```javascript
import Ember from 'ember';
import Remarkable from 'remarkable';

export function mdRemarkable(markdownInput) {
  var md = new Remarkable();
  return new Ember.Handlebars.SafeString(md.render(markdownInput));
}

export default Ember.Handlebars.makeBoundHelper(mdRemarkable);
```

And, if we run the tests again, everything passes!

## Creating the initializer

```
ember g initializer ember-remarkable
```

Here, we can import the addon helper and register it as a Handlebars helper:

```javascript
import Ember from 'ember';
import { mdRemarkable } from 'ember-remarkable/helpers/md-remarkable';

export function initialize(/* container, application */) {
  Ember.Handlebars.helper('md-remarkable', mdRemarkable);
};

export default {
  name: 'ember-remarkable',
  initialize: initialize
};
```

This will register the helper, but allow the app to override the addon if they so choose.
