---
title: Basic Data Mapping
description: This article shows how to map the data between integration components to keep them in sync.
layout: article
section: Data transfer
category: data-transfer
order: 0
since: 20180216
---

{{page.description}}

An integration flow on {{site.data.tenant.name}} platform must have at least two
components, one trigger and one action. Trigger emits a data for the action
component to receive and process it. Between these two components seats the
{{site.data.tenant.name}} **data mapper**, which maps or matches the incoming data
to the specific fields where the next component expects them to receive.

To understand how the data-mapping works in practice visit our tutorials and
platform feature sections. We recommend starting from steps-by-step instructions
in [how to create your first integration flow](/getting-started/first-flow) and
[creating a webhook flow](/getting-started/webhooks-flow) followed by the
[data samples](/getting-started/data-sample-overview) articles as an introduction
to the data-mapping.

If you have already followed the tutorials you realise that the data-mapping on
{{site.data.tenant.name}} platform is an important part of the integration process
which warrants detailed explanation in its own.

## Mapping simple values

Let us consider a simple scenario when we have an incoming data through the
[**Webhook component**](/components/webhook/) like the following `JSON` structure.

```js
{
  "name": "Gromit",
  "status": "Sold"
}
```

You can add this structure manually using the appropriate function:

{% include img.html max-width="80%" url="/assets/img/integrator-guide/data-mapper/mapping-webhook.png" title="Mapping: Configure input" %}

We intend to map these values into outgoing fields in the
[**Petstore component**](/components/petstore/). Let us jump into the integration
flow design right at the mapping stage.

{% include img.html max-width="80%" url="/assets/img/integrator-guide/data-mapper/mapper-01.png" title="Mapping: Configure input" %}

The screenshot above shows the stage in integration flow designer where you can do
the actual mapping or matching of the values. Here we choose to create a Pet and
need to provide values for **Name** and **Status** required fields (red asterisks)
to proceed further.

Here we will map these required fields using incoming data from the previous step(s).

{% include img.html max-width="80%" url="/assets/img/integrator-guide/data-mapper/mapper-02.png" title="Mapping: Selecting drop-down" %}

To map the **Name** field click on cross to open a drop-down menu **(1)**, choose
the step you need **(2)** and select the matching value from the provided values **(3)** .
For example, our incoming data has a field `name` which we match with the **Name**
field from the Petstore component.

{% include img.html max-width="80%" url="/assets/img/integrator-guide/data-mapper/mapper-03.png" title="Mapping result of the field" %}

The screenshot above shows the successful mapping result which is `Gromit`. You
have to click to the **Eye button** here which shows the successful evaluation result.

{% include img.html max-width="80%" url="/assets/img/integrator-guide/data-mapper/mapper-04.png" title="Expressions tab" %}

Before going further we can check the **JSONata* Mode** here **(1)**. Here you
can look under the hood of the [JSONata](http://jsonata.org/) powered mapper and
see the list **(2)** of expressions and functions you can use. We have already
used them in the [how to create your first integration flow](/getting-started/first-flow) tutorial.

We can match the **Status** field with the incoming `status` value as well to
complete the mapping and go forward. Using the **Status** field as an example,
you can see that there are fields that accept **fixed values**. In this case,
the Petstore component accepts: `available`, `pending` and `sold` values.

{% include img.html max-width="80%" url="/assets/img/integrator-guide/data-mapper/mapping-petstore-status.png" title="Expressions tab" %}

If you enter an incorrect value, the platform user field as well as the step
number will be highlighted in orange:

{% include img.html max-width="80%" url="/assets/img/integrator-guide/data-mapper/incorrect-value.png" title="Expressions tab" %}

> **Note** During the mapping process the mapping expressions is evaluated on
> the samples. During the component execution {{site.data.tenant.name}} evaluates
> these expressions based on the incoming data which will differ from the presented sample.

## Using advanced mapping mode

In the previous section you learned how to map data between two steps of an
integration flow using a JSONata expression. This is a convenient approach, however, 
the graphical mapping in the *Integrator mode* has certain limitations.

The following screenshot demonstrates the *Developer mode*.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/data-mapper/mapper-05.png" title="Developer mode" %}

In the *Developer mode* you can write a single JSONata expressions for the entire input object instead of defining expressions for each individual field as in case of the *Integrator mode*.

To use the *Developer mode*, you need to know the meta-model of input data: the structure of the object and the property names. Without having access to component's source code knowing the input model is impossible.

Therefore, when you switch from *Integrator mode* to *Developer mode*, the mapper input field is pre-populated with a required JSON expression. {{site.data.tenant.name}} generates it from the incoming meta-model parameter values and random property values. You can write your mapping by overriding the property values.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/data-mapper/mapper-06.png" title="Developer mode edited values" %}

The above screenshot shows how the property values is replaced by the variables `name` and `status`. These variables get their values from the incoming payload of the Webhook component. To get a mapping result, you should evaluate the expression by clicking the corresponding button.

> **Please note** your expression is evaluated as you are typing it. The result is shown at once below the mapper input field, in the *Mapping result* section. If you give an invalid expression, an error message is displayed.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/data-mapper/mapper-07.png" title="Error in mapping" %}

The screenshot above shows the incomplete `JSON` structure which is not accepted by {{site.data.tenant.name}} and the error is shown in the *Mapping result* section.

There is a way to filter mapping view to see mandatory fields only by hiding optional fields:

{% include img.html max-width="100%" url="/assets/img/integrator-guide/data-mapper/hide-optional-fields.gif" title="Hiding optional fields" %}

> **Note** You can switch between *Developer* and *Integrator* modes during the design of integration flow but not after the flow is published. To change the mapping mode a new draft version of a flow must be created.

## Array-to-array Mapping
Now you can map not just individual objects, but entire arrays in the *Integrator mode*. [Array-to-array mapping](#array-to-array-mapping) was only possible in the *Developer mode* before. If you saw arrays in *Integrator mode*, you would get the following message:

{% include img.html max-width="100%" url="/assets/img/integrator-guide/data-mapper/old-array-to-array.png" title="No array mapping" %}

Obviously, the mapping result will also be an array. The mapper will take objects from the original array, and map them to the resulting array. Note that mapping of arrays has following limitations:

- It is only possible to map data from objects inside arrays
- It is impossible to map properties from objects located in multiple arrays
- If you map an array in *Integrator mode*, the mapping will not be saved if you switch to *Developer mode*, and vice-versa.

Here is an example of array mapping:

{% include img.html max-width="100%" url="/assets/img/integrator-guide/data-mapper/mapper-08.png" title="No array mapping" %}


## Related links

- [Data Sample](/getting-started/data-sample-overview)
- [Creating a Basic Integration Flow](/getting-started/first-flow)
- [Creating a webhook flow](/getting-started/webhooks-flow)
