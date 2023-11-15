---
title: REST API flow linking
layout: component
description: Information on how works REST API flow linking.
icon: rest-api.png
icontext: REST API component
category: rest-api
updatedDate: 2022-09-14
ComponentVersion: 2.0.14
---

## REST API component as a link

The *REST API component* can serve as a bridge between multiple flows by using *Webhook* and *HTTP Reply* components. This approach is particularly useful when you need to make a flow call more flexible, as the Webhook URL can be accessed from another flow or a third-party application. However, it's important to note that this type of flow connection should not be used in other cases because it can create a heavier load than the *Flow-Linking* or *PubSub* components due to the creation of Webhooks and API requests.

## Example

### Description

To give you an example, you can imagine two Flows. Side Flow will perform the operation of splitting a string into an array of strings through a separator.

{% include img.html max-width="100%" url="img/side-flow.png" title="Side flow" %}

The main Flow will send the original string to the other Flow and receive the processed array of strings, then writing it to the database.

{% include img.html max-width="100%" url="img/main-flow.png" title="Main flow" %}

### Side flow

The side Flow will be triggered by the Webhook, retrieving the source string.

{% include img.html max-width="100%" url="img/side-flow-webhook.png" title="Side flow webhook" %}

With a simple JSONata expression, the string will be converted to an array of strings and returned back via *HTTP Reply*

{% include img.html max-width="100%" url="img/side-flow-jsonata.png" title="Side flow jsonata" %}

As a result, we obtain an isolated Webhook URL that can be accessed by any application, including other flows. When we send a POST request with a body string that needs to be separated through a comma separator, this Webhook is triggered.

### Main flow

The main flow will send a request with a source string to the other flow and use the result of the other flow.

{% include img.html max-width="100%" url="img/main-flow-webhook.png" title="Main flow webhook" %}
{% include img.html max-width="100%" url="img/main-flow-rest-api.png" title="Main flow rest api" %}

As a result, we get communication between the two components through HTTP requests.
