---
title: Using Snapshots
layout: article
section: Building integration flows
order: 2
since: 20191023
---

This document provides a quick guide on [creating](#creating-a-snapshot) and [using Snapshots](#using-snapshots) for Components in your Flows.

## Creating a Snapshot
To create a [Snapshot](/getting-started/snapshot-overview.html), you need to emit it from your Component function:

`emit('snapshot',snapshot)`

Let's see how it works with querying objects by timestamp:

1\. Query all objects since 2017, 1 Jan to establish the first point of reference. Typically, this happens on the first global sync between two systems.

2\. Iterate over all objects. In some cases this stage can take a while due to the amount of data in the source system, therefore it is recommended to use paging if the originating API supports it.

3\. Calculate the last update date based on returned objects. It's not recommended to calculate the last date as current time as you can miss some objects. This stage is also dependent on the originating API properties.

4\. Emit the new last date as snapshot after iterating through all objects.

Having gone through this list, here is what we get:

```
params.snapshot = snapshot;

if (!params.snapshot || typeof params.snapshot !== "string" || params.snapshot === '') {
  // Empty snapshot
      console.warn("Warning: expected string in snapshot but found : ", params.snapshot);
      params.snapshot = new Date("2017-01-01T00:00:00.000Z").toISOString();
  }

 var newSnapshot = new Date().toISOString();

...
...
emitSnapshot(newSnapshot);
```

**IMPORTANT:** Please remember that there can be only one snapshot per step in a Flow. Each time another snapshot is made, the last one is overwritten.


## Using Snapshots

**EXAMPLE, using Outlook Component - don't forget to check comments:**

```
/* eslint no-console: 0 no-invalid-this: 0*/
'use strict';
const messages = require('EXAMPLE-node').messages;
const co = require('co');
const MicrosoftGraph = require('msgraph-sdk-javascript');
const rp = require('request-promise');

/**
 * This method will be called from Platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 * @param snapshot - snapshot that stores the data between the runs
 */
function processAction(msg, cfg, snapshot) {
    console.log('Snapshot is %j', snapshot);

    // Should be in ISO-Date format
    snapshot.lastModifiedDateTime = snapshot.lastModifiedDateTime || new Date(0).toISOString();

    // Main loop
    return co(function* mainLoop() {
        console.log('Refreshing an OAuth Token');
        const newToken = yield rp({
            method: 'POST',
            uri: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
            json: true,
            form: {
                refresh_token: cfg.oauth.refresh_token,
                scope: cfg.oauth.scope,
                grant_type: 'refresh_token',
                client_id: process.env.MSAPP_CLIENT_ID,
                client_secret: process.env.MSAPP_CLIENT_SECRET
            }
        });
        console.log('Updating token');
        this.emit('updateKeys', {
            oauth: newToken
        });

        const client = MicrosoftGraph.init({
            defaultVersion: 'v1.0',
            debugLogging: true,
            authProvider: (done) => {
                done(null, newToken.access_token);
            }
        });

        console.log('Selecting contacts that was modified since %s', snapshot.lastModifiedDateTime);
        const contacts = yield client
            .api('/me/contacts')
            .orderby('lastModifiedDateTime asc')
            .top(900)
            .filter('lastModifiedDateTime gt ' + snapshot.lastModifiedDateTime)
            .get();
        const values = contacts.value;
        console.log('Found %s contacts', values.length);
        if (values.length > 0) {
            const message = messages.newMessageWithBody({
                contacts: values
            });
            this.emit('data', message);
            let lmdate = new Date(values[values.length - 1].lastModifiedDateTime);
            // The output value has always 0 milliseconds
            // we need to set the milliseconds value to 999 in order not to see
            // the duplicate results
            lmdate.setMilliseconds(999);
            snapshot.lastModifiedDateTime = lmdate.toISOString();
        } else {
            console.log('No contacts modified since %s were found', snapshot.lastModifiedDateTime);
        }
        console.log('Processing completed, new lastModifiedDateTime is ' + snapshot.lastModifiedDateTime);
        this.emit('snapshot', snapshot);
    }.bind(this));
}

module.exports.process = processAction;
```

**IMPORTANT:** Please remember that there can be only one snapshot per step in a Flow. Each time another snapshot is made, the last one is overwritten.
