---
title: Router component
layout: article
section: Utility Components
---


Examines the message content and routes the message onto a different flow branch 
based on data contained in the message.
This component implements the The [Content-Based Router](http://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentBasedRouter.html) pattern from Enterprise Integration Patterns (EIP).

## How it works?

Here is the sample integration flow with CBR inside it:

```json
{
    "data": {
        "attributes": {
            "name": "CBR Test",
            "type": "ordinary",
            "graph": {
                "nodes": [
                    {
                        "command": "elasticio/webhook:receive@latest",
                        "fields": {
                            "payload": "test"
                        },
                        "id": "in"
                    },
                    {
                        "command": "elasticio/router:route@latest",
                        "id": "router"
                    },
                    {
                        "command": "elasticio/code:execute@latest",
                        "fields": {
                            "code": "console.log('one');emitter.emit('data',msg)"
                        },
                        "id": "one"
                    },
                    {
                        "command": "elasticio/code:execute@latest",
                        "fields": {
                            "code": "console.log('two');emitter.emit('data',msg)"
                        },
                        "id": "two"
                    },
                    {
                        "command": "elasticio/code:execute@latest",
                        "fields": {
                            "code": "console.log('default');emitter.emit('data',msg)"
                        },
                        "id": "default"
                    }
                ],
                "edges": [
                    {
                        "source": "in",
                        "target": "router"
                    },
                    {
                        "config": {
                            "condition": "$number(test) > 10"
                        },
                        "source": "router",
                        "target": "one"
                    },
                    {
                        "config": {
                            "condition": "$number(test) > 20"
                        },
                        "source": "router",
                        "target": "two"
                    },
                    {
                        "source": "router",
                        "target": "default"
                    }
                ]
            }
        },
        "type": "flow"
    }
}
```


As you can see it's a simple integration flow that has following structure:

![image](https://user-images.githubusercontent.com/56208/27584735-5c2955ca-5b39-11e7-9a2d-a40f10d3261c.png)

The content based router (CBR) component has a single input and multiple outputs (edges).
Outgoing edge from CBR component should have a conifguration property called ``condition`` that defines a [JSONata](http://jsonata.org/) expression. Expression on each edge is validated based on message that arrived to the CBR component.
If condition is evaluated to ``true`` then a copy of the message is sent to the component connected to the outgoing edge.

If condition is not defined on the outgoung edge, then this edge considered to be **default** edge. Default edge will get all
messages that didn't matched **any** other edges. Please note - CBR component may only have a single **default** edge.
Multilple default edges will fail validation of elastic.io API.

Now let us examine our sample from above:
 - Incoming webhook has a message like
 ```json
    {
        "test":"12345"
    }
 ```
 - As you can see CBR component has 3 outgoing edges, conditions are
  - ``$number(test) > 10`` for edge that is connected to step ID ``one``
  - ``$number(test) > 30`` for edge that is connected to step ID ``two``
  - Last edge has no condition, therefore a default edge connected to step ``default``
