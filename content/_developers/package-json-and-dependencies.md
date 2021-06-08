---
title: package.json and Dependencies
description: Here is how to make sure to have all the correct dependencies for your component.
layout: article
section: Behaviour Checks
order: 1
redirect_from:
  - /guides/package-json-and-dependencies.html
---

## Using external modules

Before we begin a word of caution:

> Node.js and all the dependencies need to be installed on your local computer in order for this instruction to work. How to install the Node.js on your local computer is beyond the scope of this help page.
From here on we would assume that you have all the necessary preconditions for developing your code in Node.js.

While developing a component is node.js it is important to have all the dependencies right. If you are calling any modules from your programs that are required to run your component then the packages that include them need to be included as well. The logic is the following:

**You need to add any dependencies in your component's package.json** file in the section of dependencies like it's done for our [Petstore component]({{site.data.tenant.petStoreSourceNodeJS}}):

```json
{
  "name": "petstore-component-nodejs",
  "version": "0.0.1",
  "description": "{{site.data.tenant.name}} component for the Petstore API",
  "scripts": {
    "test": "exit 0"
  },
  "repository": {
    "type": "git",
    "url": "git@github.com:elasticio/petstore-component-nodejs.git"
  },
  "author": "{{site.data.tenant.companyName}}",
  "license": "BSD-2-Clause",
  "engines": {
    "node": "6.4.0"
  },
  "dependencies": {
    "elasticio-sailor-nodejs": "2.0.1",
    "elasticio-node": "0.0.7",
    "co": "4.6.0",
    "request": "2.76.0",
    "request-promise": "4.1.1"
  }
}
```

When you include the required dependencies it will be included in your component
during the deployment into {{site.data.tenant.name}} platform. More information is available from the official NPM home page about using a [package.json](https://docs.npmjs.com/creating-a-package-json-file).

## Adding Dependencies

Normally if you have a missing package in your project you do:

```sh
npm install name_of_dependency
```

If you add an additional argument `--save` like this

```sh
npm install name_of_dependency --save
```

After this, your dependency will be added to the **package.json** file as well.

The official NPM page has full fledged documentation about [installing NPM packages locally](https://docs.npmjs.com/downloading-and-installing-packages-locally) which can be consulted for more options.

## Resolving the dependencies

If you need to check for the missing dependencies for any program included (for example `code.js`) in your component you could follow instructions presented here.

  1. You could remove or move to somewhere else the `node_modules` directory. Usually, this directory can be found in the root of your component directory.

  2. Call NPM to install the packages again: `npm install`. This will install all the packages listed in package.json.

  3. Load Node.js by typing `node` on command line and take the file in question and run: `require('./path/to/code.js')`

If all goes well without errors then your file `code.js` has no missing dependencies. Otherwise, you will get errors for missing dependencies which needs to be added inside the package.json as a required package so it would be fetched and included during the deployment.

## Related links

- [Petstore component]({{site.data.tenant.petStoreSourceNodeJS}})
- [Creating a package.json file](https://docs.npmjs.com/creating-a-package-json-file)
- [Downloading and installing packages locally](https://docs.npmjs.com/downloading-and-installing-packages-locally)
