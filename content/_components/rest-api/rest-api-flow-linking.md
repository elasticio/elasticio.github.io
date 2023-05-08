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

The REST API component can be used as a link between multiple flows, using Webhook and HTTP Reply components. In this case, we have a Webhook URL that can be accessed either from another flow or from a third-party application, so this method is recommended when you want to make a flow call more flexible. It's worth adding that this type of flow connection is not recommended in other cases, because it puts a much larger load than the Flow-Linking or PubSub components due to creating Webhooks and making API requests.

The REST API component can serve as a bridge between multiple flows by using Webhook and HTTP Reply components. This approach is particularly useful when you need to make a flow call more flexible, as the Webhook URL can be accessed from another flow or a third-party application. However, it's important to note that this type of flow connection should not be used in other cases because it can create a heavier load than the Flow-Linking or PubSub components due to the creation of Webhooks and API requests.

## Example

### Description

To give you an example, you can imagine two streams. One will perform the operation of splitting a string into an array of strings through a separator.

{% include img.html max-width="100%" url="img/second-step.png" title="Second step" %}

The second flow will send the original string to the other flow and receive the processed array of strings, then writing it to the database.

{% include img.html max-width="100%" url="img/second-step.png" title="Second step" %}

### Side flow

The side flow will be triggered by the Webhook, retrieving the source string.

{% include img.html max-width="100%" url="img/second-step.png" title="Second step" %}

With a simple JSONata expression, the string will be converted to an array of strings and returned back via HTTP Reply

{% include img.html max-width="100%" url="img/second-step.png" title="Second step" %}

As a result, we get an isolated Webhook URL when we send a POST request with a body string that needs to be separated through a comma separator. This Webhook is available to any application, including other flow/.

### Main flow

The main flow will send a request with a source string to the other flow and use the result of the other flow.

{% include img.html max-width="100%" url="img/second-step.png" title="Second step" %}
{% include img.html max-width="100%" url="img/second-step.png" title="Second step" %}

As a result, we get communication between the two components through HTTP requests.
