---
title: Sailor Hooks
layout: article
section: Sailor
since: 20180430
order: 0
category: sailor
---

## Init hook

```js
/**
* cfg - This is the same config as the one passed to "processMessage" method of the trigger or action
*/
exports.init = function(cfg) {
    //do stuff
    return Promise.resolve();
}
```

## Startup hook

```js
/**
* cfg - This is the same config as the one passed to "processMessage" method of the trigger or action
*/
exports.startup = function(cfg) {
    //do stuff
    const data = {
        message: 'Hello from STARTUP_HOOK'
    };
    return Promise.resolve(data);
}
```

  * Only on the first trigger

  * Called without this

  * May return promise

  * May return value

  * May throw - not recommended

  * May return a promise that will fail


### Startup logs can be found in the tab of the component on execution page

  * TBD - Separate them under different tab in UI

  * TBD - Where to see restart errors?overwritten

  * Startup state data - either return value or the result of the promise

### Okay

  * Results will be stored as the startup state, previous will be overwritten with warning

  * After that init hook will be run, etc

### Not okay  

  * Sailor will exit the process

  * Platform will restart the component immediately

  * If init wont' happen it will be removed after 5 minutes (see restart policy)

  * In the next scheduling interval initialisation will repeat

## Shutdown hook

```js
/**
* cfg - This is the same config as the one passed to "processMessage" method of the trigger or action
* startData - result from the startup
*/
exports.shutdown = function(cfg, startData) {
    //corresponding to the startup example above, startData is { message: 'Hello from STARTUP_HOOK' }
    //do stuff
    return Promise.resolve();
}
```

  * Only on the first trigger

  * One stop is pressed      

     * If task is running then containers are shutdown

     * If task is sleeping then do nothing

  * Start new trigger container

  * Trigger starts without this context - it's not possible to log errors or send new data

  * Should either return value (ignored) or promise (resolved).

  * Startup data is removed after shutdown hook

  * Call the shutdown hook, parameters that are passed is from the startup results or {} if nothing was returned

  * Errors are ignored

  * If shutdown hook won't complete within 60 seconds then container will be killed

  * As soon as user pressed stop, task is marked as inactive and 'webhooks gateway' will start responding with the error (Task either does not exist or is inactive) to possible data


TBD - log for shutdown hooks?
