---
title: Building a component in Node.js
layout: article
section: Developing Components
category: component
order: 2
---

The {{site.data.tenant.name}} platform supports `Node.js` programming language for building integration components.

To help you create a component in `Node.js` we have created a simple [Petstore component in Node.js](https://github.com/elasticio/petstore-component-nodejs "Petstore Component in Node.js") which connects to the [Petstore API](https://petstore.elastic.io/docs/ "Petstore API") and demonstrates multiple features of the platform.

## node.js component structure overview

| **File Name** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| [logo.png](#logo) | image | suggested | Logo of your component |
| [component.json](#componentjson) | JSON | Yes | Description of the component structure |
| [package.json](#packagejson) | JSON | Yes | description of the package |
| [verifyCredentials.js](#credentials) | JavaScript | suggested | the main function to verify the credentials |
| [lib](#lib) | directory | suggested | main component directory |

## Logo

If you have a logo for the component, you can place the file called logo.png in the root directory of the component. Typically the logo of the API vendor gets used as component logo. If you did not provide any logo, the component will show a generic logo for your component.

Here are the requirements for the logo file:

*   The name must be `logo.png` (PNG format). Do not change it.
*   The logo should have at least 128 x 128 pixels in dimension.


## component.json

The file **component.json** is the component descriptor which must be located in the root directory of the component. This descriptor is interpreted by the platform to gather all the required information to be presented to the user in the platform UI. For example, you can define simple things like component's title in the component descriptor but also the component's authentication mechanism. The descriptor is the only place to list the functionality provided by the component, the so called `triggers` and `actions`.

**Please note that your `component.json` file should have/describe at least one trigger or action.**

```js
{
  "title": "Petstore API (Node.js)",
  "description": "elastic.io component for the Petstore API",
  "docsUrl": "https://github.com/elasticio/petstore-component-nodejs",
  "credentials": {
    "fields": {
      "apiKey": {
        "label": "API key",
        "required": true,
        "viewClass": "TextFieldWithNoteView",
        "note": "Please use <strong>elasticio</strong> as API key. For more details see <a href="https://petstore.elastic.io/docs/">Petstore API docs</a>."
      }
    }
  },
  "triggers": {
    "getPetsByStatusWithGenerators": {
      "main": "./lib/triggers/getPetsByStatusWithGenerators.js",
      "type": "polling",
      "title": "Get Pets By Status With Generators",
      "fields": {
        "status": {
          "label": "Pet Status",
          "required": true,
          "viewClass": "SelectView",
          "model": {
            "available": "Available",
            "pending": "Pending",
            "sold": "Sold"
          },
          "prompt": "Select Pet Status"
        }
      },
      "metadata": {
        "out": "./lib/schemas/getPetsByStatus.out.json"
      }
    },
    "getPetsByStatusWithPromises": {
      "main": "./lib/triggers/getPetsByStatusWithPromises.js",
      "type": "polling",
      "title": "Get Pets By Status With Promises",
      "fields": {
        "status": {
          "label": "Pet Status",
          "required": true,
          "viewClass": "SelectView",
          "model": {
            "available": "Available",
            "pending": "Pending",
            "sold": "Sold"
          },
          "prompt": "Select Pet Status"
        }
      },
      "metadata": {
        "out": "./lib/schemas/getPetsByStatus.out.json"
      }
    },
    "getPetsByStatusWithDynamicSelectModel": {
      "main": "./lib/triggers/getPetsByStatusWithDynamicSelectModel.js",
      "type": "polling",
      "title": "Get Pets By Status With Dynamic Select Model",
      "fields": {
        "status": {
          "label": "Pet Status",
          "required": true,
          "viewClass": "SelectView",
          "model": "getStatusModel",
          "prompt": "Select Pet Status"
        }
      },
      "metadata": {
        "out": "./lib/schemas/getPetsByStatus.out.json"
      }
    }
  },
  "actions": {
    "createPetWithPromise": {
      "main": "./lib/actions/createPetWithPromise.js",
      "title": "Create a Pet With Promise",
      "metadata": {
        "in": "./lib/schemas/createPet.in.json",
        "out": "./lib/schemas/createPet.out.json"
      }
    },
    "createPetWithGenerators": {
      "main": "./lib/actions/createPetWithGenerators.js",
      "title": "Create a Pet With Generators",
      "metadata": {
        "in": "./lib/schemas/createPet.in.json",
        "out": "./lib/schemas/createPet.out.json"
      }
    }
  }
}
```

## package.json

The **package.json** describes the component, the author and the dependencies that this component should have for a correct deployed into our system.
```js
{
  "name": "@elasticio/petstore-component-nodejs",
  "version": "0.0.1",
  "description": "elastic.io component for the Petstore API",
  "scripts": {
    "test": "exit 0"
  },
  "repository": {
    "type": "git",
    "url": "git@github.com:elasticio/petstore-component-nodejs.git"
  },
  "author": "elastic.io GmbH",
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

For example when we have a new release of [elasticio-sailor-nodejs](https://github.com/elasticio/sailor-nodejs), this is the place to make changes so the new sailor gets used during your next deployment.


## verifyCredentials.js

When creating an elastic.io component you may allow users to check entered credentials for validity, during the integration flow creation. This feature is useful when users need to type-in passwords, host-names, IP addresses, etc. Credentials verification is an optional step but it makes the user flow much more reliable and usable.

For node.js component you can use any libraries and/or functionality at your disposal to authorise the user credentials. But for the platform to find and call your verification code you have to make sure that:

*   Your component has a `verifyCredentails.js` file in the **root of the folder structure**
*   Your `verifyCredentials.js` file is a [common.js module](http://wiki.commonjs.org/wiki/Modules/1.1)
*   It returns one function that accepts **two parameters**: `credentials` and `cb` (callback).
*   All the credentials for verification gets passed through **credentials** parameter which is an object. This object can contain the properties that match or correspond to the account definition parameters from the `component.json`.

Here is the skeleton structure for the verify Credentials for a reference. You are welcome to use it as a starting point to write your own `verifyCredentails.js`:

```js
// here you can place your variables

// This function gets called by the platform to verify credentials
module.exports = function verifyCredentials(credentials, cb) {
    // In credentials you will find what users entered in account form
    console.log('Credentials passed for verification %j', credentials)
    if (true) {
        // Verified
        return cb(null, {verified: true});
    } else {
       // Verification failed
       return cb(null , {verified: false});
    }
}
```

The use of any specific verification method is dependant on the project and the third party API that gets communicated the credentials with. We will not dive into details of every possible solution for your chosen third party API here.

## lib

This is the directory which contains the core files of the component. These files gets referred from `component.json` directly. **This structure and the naming is optional but if you decide to change it don't forget to properly describe it in `component.json` for the consistency.**

The structure of an example `lib` directory is below:

*   **actions** - the part containing the Action functions.   
    *   `createPetWithGenerators.js` - this is the action which gets executed when selected
    *   `createPetWithPromise.js`
*   **schemas** - this is the place where you describe the format of the Action and Trigger functions   
    *   `createPet.in.json` - this is the input schema for both action functions
    *   `createPet.out.json` - this is the output schema for both action functions
    *   `getPetsByStatus.out.json` - this is the output schema for all trigger functions
*   **triggers** - the part containing the Trigger functions   
    *   `getPetsByStatusWithDynamicSelectModel.js` - this is a trigger function
    *   `getPetsByStatusWithGenerators.js`
    *   `getPetsByStatusWithPromises.js`
