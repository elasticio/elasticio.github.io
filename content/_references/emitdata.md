---
title: EmitData
description: Emit `data` event is used to return the results of the component execution.
layout: article
section: Sailor
since: 20180430
order: 3
category: events
---

> emit `data` event is used to return the results of the component execution.

## Example 1

Here an example how it can be used:

```js
function emitData() {
    this.logger.info('About to say hello to ' + name + ' again');

    var body = {
      greeting: name + ' How are you today?',
      originalGreeting: msg.body.greeting
    };

    var data = messages.newMessageWithBody(body);

    self.emit('data', data);
  }
```

## Example 2

Here is anouther example of usage:

```js
function emitData(result) {
        this.logger.info("Emitting data");
        var body = result.body;

        this.logger.info(_.pick(body, ['sku', 'quantityOnStock']));

        var msg = messages.newMessageWithBody(body);

        self.emit('data', msg);
 }
 ```
