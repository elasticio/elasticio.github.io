---
title: ID Linking Usage Example
layout: component
description: Usage Example for the ID Linking component
icon: id-linking.png
icontext: ID Linking component
category: id-linking
updatedDate: 2022-11-24
ComponentVersion: 1.2.0
---

This documentation provides a detailed usage example for the ID Linking component in {{site.data.tenant.name}} integration platform. The ID Linking component allows you to store and retrieve IDs associated with data objects in a reliable and efficient manner.

## Use Case

The use case scenario involves a Webhook real-time flow where data is received and stored by the Maester component. After a certain period, another real-time flow is triggered, and based on a specific ID, the stored data needs to be retrieved. The ID Linking component plays a crucial role in storing and managing these IDs.

## First Flow

In the first flow, data is received via the Webhook component, which contains information about an order for calculating product costs. The Maester component stores this data and associates it with a dynamically generated Maester Object ID. The ID Linking component is then used to store this ID for future retrieval.

<details close markdown="block"><summary><strong>First flow view</strong></summary>

{% include img.html max-width="100%" url="img/first-flow.png" title="First flow" %}

</details>

The flow consists of the following steps:

### First flow - Step 1

The Webhook component receives the order data.

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

### First flow - Step 2

The Maester component stores the received data using the dynamically generated Maester Object ID.

{% include img.html max-width="100%" url="img/1-2-maester-config.png" title="Maester configuration" %}

Sample example of Maester component data:

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
  "metaHeaders": [],
  "searchHeaders": []
}
```

### First flow - Step 3

The ID Linking component stores the Maester Object ID, linking it to the order value from the Webhook data.

{% include img.html max-width="100%" url="img/1-3-id-linking-config.png" title="Id Linking configuration" %}

```json
{
  "result": {
    "systemAId": "0406654608",
    "systemBId": "bf485bcd-e0db-4f2d-a805-e5084a4cf26c"
  }
}
```

### First flow - Step 4

The Jsonata component calculates the sum of the order, which can be sent to a CRM or database.

{% include img.html max-width="100%" url="img/1-4-jsonata.png" title="Jsonata configuration" %}

JSONata expression:

```
{
  "sum, €": $getPassthrough()."step_1".body.Price * $getPassthrough()."step_1".body.Quantity
}
```

<details close markdown="block"><summary><strong>Please note that you need to use the previous credentials or create new ones with the same Bucket ID.</strong></summary>

{% include img.html max-width="100%" url="img/note-1.png" title="First note" %}

</details>

## Second Flow

In the second flow, data is received via the Webhook component, which contains information about the order description for calculating product dimensions. The ID Linking component retrieves the Maester Object ID associated with the order value from the previous flow. The Maester component then retrieves the stored data using the obtained ID. Finally, the Transformation component calculates the dimensions of the order.

<details close markdown="block"><summary><strong>Second flow view</strong></summary>

{% include img.html max-width="100%" url="img/second-flow.png" title="Second flow" %}

</details>

The flow consists of the following steps:

### Second flow - Step 1

The Webhook component receives the order description data.

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

### Second flow - Step 2

The ID Linking component retrieves the Maester Object ID associated with the order value from the Webhook data. It waits for the object to exist before triggering the Webhook.

{% include img.html max-width="100%" url="img/2-2-id-linking-config.png" title="Id Linking configuration" %}

Sample example of ID Linking component with the received Maester Object ID:

<details close markdown="block"><summary><strong>ID Linking sample with the received Maester Object ID.</strong></summary>

{% include img.html max-width="100%" url="img/id-linking-sample.png" title="ID Linking sample with the received Maester Object ID." %}

</details>

<details close markdown="block"><summary><strong>Please note that you need to use the previous credentials or create new ones with the same Bucket ID.</strong></summary>

{% include img.html max-width="100%" url="img/note-2.png" title="Second note" %}

</details>


### Second flow - Step 3

The Maester component receives the stored data using the retrieved Maester Object ID.

{% include img.html max-width="100%" url="img/2-3-maester-config.png" title="Maester configuration" %}

### Second flow - Step 4

The Jsonata component calculates the dimensions of the order.

{% include img.html max-width="100%" url="img/2-4-jsonata-config.png" title="Jsonata configuration" %}

JSONata expression:

```
{
  "Weight, kg": data.body.Quantity * $getPassthrough()."step_1".body.Description.Weight,
  "Volume, m³": 0.001 * $getPassthrough()."step_1".body.Description.Width * $getPassthrough()."step_1".body.Description.Height * $getPassthrough()."step_1".body.Description.Depth
}
```

### Second flow - Step 5

The Maester component deletes the stored object to optimize storage.

{% include img.html max-width="100%" url="img/2-5-maester-config.png" title="Maester configuration" %}

### Second flow - Step 6

The ID Linking component deletes the linked object for the Maester Object ID associated with the order value.

{% include img.html max-width="100%" url="img/2-6-id-linking-config.png" title="Id Linking configuration" %}
