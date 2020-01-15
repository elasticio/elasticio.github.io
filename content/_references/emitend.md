---
title: EmitEnd
layout: article
section: Sailor
since: 20180430
order: 5
category: events
---

> emit `end` event is used to inform the flow that the component has finished the execution.

## Basic implementation

It is a source of many controversial error reports where without emit `end` event the function of the component is waiting till it is killed by the system. To avoid this kind of errors it is recommended to **announce the end of a program** using the emit `end` event so the next stage can begin. Here is the basic implementation of this event:

```js
function emitEnd() {
   this.logger.info('Finished execution');
   self.emit('end');
 }
```
