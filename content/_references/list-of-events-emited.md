---
title: List of events emitted by the components
layout: article
section: Sailor
since: 20180430
order: 2
category: events
---


Here is a growing list of events which are exposed by the {{site.data.tenant.name}} sailor. Meaning **if the component is emitting any of these events they would be recognised and processed accordingly** by the platform:

## List of events

| Event | Description |
|------ |-------------|
| [data](/references/emitdata) | This event is used to emit or return the values from the executions.|
| [error](/references/emiterror) | This event is used to emit the error messages which are occurring in the executions.|
| snapshot | 	Using this event one can emit the Snapshot object.|
| [end](/references/emitend | 	This event emits the End execution, indicating that the data processing is complete.|
| updateKeys | 	This event is used to emit or update the OAuth Keys.|
| httpReply | This event emits/sends back the HTTP Reply.|
