---
layout: component
title: Maester Usage Example
description: Usage Example for the Maester Component
icon: maester.png
icontext: Maester Component
category: maester
updatedDate: 2022-08-26
ComponentVersion: 1.0.5
---

## Use case

You're looking to create a seamless real-time flow using [Webhooks](/components/webkook/). The flow starts when an external source calls a Webhook endpoint with some data that you need to store. Within a short span of time, another individual will initiate a different real-time flow by calling a separate endpoint with a specific ID. Using this ID as a reference, you aim to retrieve the previously stored data. To process the results, you intend to utilize a [Batch](/components/batch/) or [Pub-Sub](/components/pub-sub/) component as the trigger.

In this scenario, the Webhook plays a crucial role, as it allows you to capture incoming data and initiate subsequent actions. However, it's important to note that Maester lacks trigger functions but can still be used effectively alongside the Webhook.

## First flow

In the first flow, data related to the order is received through the Webhook, providing information necessary for calculating the costs of the products. Leveraging the Maester component, this data can be stored and subsequently accessed in other flows or processes.

<details close markdown="block"><summary><strong>First flow view</strong></summary>

{% include img.html max-width="100%" url="img/flow-view.png" title="First flow view" %}

</details>

Our initial step involves a Webhook component which receives specific data.

```json
{
  "Order": "0406654608",
  "ProductID": 858383,
  "City": "Berlin",
  "Address": "Friedrichsruher Str. 37",
  "Price": 34.45,
  "Quantity": 30
}
```

In the second step, the Maester component stores the data received from the [Webhook](/components/webkook/). To avoid the need for constructing Custom Headers, we utilize the Maester Object ID as the Upsert Criteria.

{% include img.html max-width="100%" url="img/step-2-maester-config.png" title="First flow - maester configuration" %}

<details close markdown="block"><summary><strong>Maester sample</strong></summary>

```json
    {
      "data": {
        "body": {
          "Order": "0406654608",
          "ProductID": 858383,
          "City": "Berlin",
          "Address": "Friedrichsruher Str. 37",
          "Price": 34.45,
          "Quantity": 30
        }
      },
      "maesterObjectId": "bf485bcd-e0db-4f2d-a805-e5084a4cf26c",
      "headers": []
    }
```

</details>

The third step [ID Linking](/components/id-linking/) component will store Maester Objects ID. We rely on the order value as specified in the Webhook data.

{% include img.html max-width="100%" url="img/step-3-id-linking-config.png" title="First flow - id linking configuration" %}

In the fourth step, the [Transformation](/components/jsonata/) component performs the calculation for the total sum of the order. Subsequently, this calculated data can be sent to various destinations such as our CRM, database, and other relevant systems.

{% include img.html max-width="100%" url="img/step-4-jsonata-config.png" title="First flow - jsonata configuration" %}

JSONata expression:

```
{
"sum, €": $getPassthrough()."step_1".body.Price * $getPassthrough()."step_1".body.Quantity
}
```

## Second flow

In the second flow, data regarding the order description is received via the [Webhook](/components/webkook/), enabling the calculation of product dimensions. These calculations rely on the information obtained in the first flow.

<details close markdown="block"><summary><strong>Second flow view</strong></summary>

{% include img.html max-width="100%" url="img/flow-view-second.png" title="Second flow view" %}

</details>

The initial step of our process involves a Webhook component designed to receive incoming data

```json
{
  "Order": "0406654608",
  "Description": {
    "Width": 300,
    "Height": 200,
    "Depth": 210,
    "Weight": 0.75
  }
}
```

In the second step, the ID Linking component retrieves the Maester Objects ID by relying on the order value specified in the Webhook data. To ensure timely [Webhook](/components/webkook/) triggers, we employ the ['Wait for object to exist'](/components/id-linking/index#config-fields-1) behavior.

{% include img.html max-width="100%" url="img/step-2-2-id-linking-config.png" title="Second flow - id linking configuration" %}

The third step involves the Maester component retrieving the stored data using its Maester Object ID.

{% include img.html max-width="100%" url="img/step-2-3-maester-config.png" title="Second flow - maester configuration" %}

In the fourth step, the [Transformation](/components/jsonata/) component calculates the dimensions of the order. Subsequently, this data can be sent to our shipping partner and other relevant recipients.

{% include img.html max-width="100%" url="img/step-2-4-jsonata-config.png" title="Second flow - jsonata configuration" %}

JSONata expression:

```
{
"Weight, kg": data.body.Quantity*$getPassthrough()."step_1".body.Description.Weight,
"Volume, m³": 0.001 * $getPassthrough()."step_1".body.Description.Width * $getPassthrough()."step_1".body.Description.Height * $getPassthrough()."step_1".body.Description.Depth
}
```

In the fifth step, the Maester component efficiently manages storage by deleting the stored object after it has been used. Given the frequency of triggering the flow multiple times per hour, this optimization ensures optimal Maester storage utilization.

{% include img.html max-width="100%" url="img/step-2-5-maester-config.png" title="Second flow - maester configuration" %}

In the sixth and last step, the [ID Linking](/components/id-linking/) component will delete the linked object corresponding to the Maester Object ID. This deletion relies on the order value specified in the Webhook data.

{% include img.html max-width="100%" url="img/step-2-6-id-linking-config.png" title="Second flow - id linking configuration" %}
