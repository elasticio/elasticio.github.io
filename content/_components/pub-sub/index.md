---
title: Pub-Sub component
layout: component
section: Protocol components
description: An open-source Component for publish–subscribe messaging pattern on platform.
icon: pub-sub.png
icontext: Pub-Sub component
category: pub-sub
updatedDate: 2022-11-04
ComponentVersion: 1.0.9
---

## Description

A component for [publish–subscribe](https://en.wikipedia.org/wiki/Publish-subscribe_pattern) messaging pattern on {{site.data.tenant.name}} platform.
This feature implements conditional logic for data flow in a loosely coupled way, using a "contract" between the Publisher and its Subscribers. Such a "contract" is called a `Topic`.

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Pub-Sub component like [changelog](/components/pub-sub/technical-notes#changelog).

### Requirements

#### Environment variables

By default no environment variable is necessary to operate the component.

## Topics

A Topic is a named JSON schema to be used to communicate in a PubSub style.
Topic can be created via UI or [API-call](https://api.elastic.io/docs/v2/#pub/sub-topics) and contains following information:
- a unique name within the Workspace
- JSON schema describing the objects to be exchanged

For example, here is the topic that contains information about some person:

<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

```
{
    "data": {
        "type": "topic",
        "attributes": {
            "name": "The person",
            "schema": {
                "$id": "https://example.com/person.schema.json",
                "title": "Person",
                "type": "object",
                "properties": {
                    "firstName": {
                        "type": "string",
                        "description": "The person's first name."
                    },
                    "lastName": {
                        "type": "string",
                        "description": "The person's last name."
                    },
                    "age": {
                        "description": "Age in years which must be equal to or greater than zero.",
                        "type": "number",
                        "minimum": 0
                    }
                }
            }
        }
    }
}
```

</details>

## Triggers

### Subscribe

Trigger, which receives data of a certain type from a Topic as an input and starts the Flow execution after this.
When you create a Subscriber Flow you must choose a Topic on which your flow will be listening for messages.
You can create as many Subscriber Flows as you want, and they will process messages from the Publisher independently.

<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

![Trigger input](img/trigger-input.png)

>**Please Note:** Topics can only be accessed if they are already in your workspace.Topic can be created via UI or [API-call](https://api.elastic.io/docs/v2/#pub/sub-topics).

![Publisher](img/publisher.png)

For our example, we have created a special flow that publishes messages for our trigger.

>**Please Note:** You need to know what your flow sample will look like in order to work with it further.

Since we know what our sample should be, we can add it manually:

![Trigger sample](img/trigger-sample.png)

This sample can be used later in your Flows as usual.

```
    {
        "firstName": "dolore",
        "lastName": "ut enim sunt tempor eu",
        "age": 54053437
    }
```

</details>

## Actions

### Publish

Action that publishes a message of a certain type to the topic to be later received by loosely coupled Subscribers.
During the creation of a Publisher Flow you must choose a `topic` created earlier, by which your Publisher Flow will communicate with it's Subscribers. As you can see, we have already used this action for our `Subscribe` trigger before. After you have chosen the topic you need, you can enter new data.

<details close markdown="block"><summary><strong>Click to expand for more details:</strong></summary>

![Action configure input](img/publisher.png)

Connection between the Publisher and the Subscriber is loosely coupled. This means that your Publisher will never
know if there any subscribers at all, and if they processed incoming message.

</details>
