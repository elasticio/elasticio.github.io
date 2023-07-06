---
title: Mapping Data
description: This article shows how to map the data between integration components to keep them in sync.
layout: article
section: Data transfer
category: data-transfer
order: 0
redirect_from:
  - /guides/new-mapper.html
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
[**Petstore component**](/components/petstore-nodejs/). Let us jump into the integration
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

## JSONata Mode

{% include img.html max-width="80%" url="/assets/img/integrator-guide/data-mapper/mapper-04.png" title="Expressions tab" %}

Before going further we can check the **JSONata Mode** here **(1)**. Here you
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

> **Note** During the flow building process the platform evaluates mapping
> expressions using samples. During the component execution it evaluates
> these expressions based on the incoming data which can differ from the presented sample.
> **Use data samples as close to your real data as possible to avoid inconsistencies in outcome.**

## Required and optional fields

There is a way to filter mapping view to see mandatory fields only by hiding optional fields:

{% include img.html max-width="60%" url="/assets/img/integrator-guide/data-mapper/filtering-required-optional.gif" title="Hiding and showing optional fields" %}


## Developer mode

In the previous section you learned how to map data between two steps of an
integration flow using a JSONata expression. This is a convenient approach, however,
the graphical mapping in the **Integrator mode** has certain limitations.

The following short animation demonstrates how to switch to the **Developer mode**.

{% include img.html max-width="80%" url="/assets/img/integrator-guide/data-mapper/integrator-developer-mode-switch.gif" title="Switch to Developer mode" %}

In the **Developer mode** you can write a JSON containing JSONata expressions for
the entire input object instead of defining expressions for each individual field as in case
of the **Integrator mode**.

Here you can write your own JSON if you know the meta-model of input data structure
or open the **Fields** menu which lists all incoming meta-model fields. For example
the Petstore component has two fields to choose from:

{% include img.html max-width="80%" url="/assets/img/integrator-guide/data-mapper/fields-incoming-meta-model.png" title="Field menu: incoming meta-model fields" %}

The Fields menu will contain more values for components with extensive meta-model
structure such as the case of the [Salesforce component](/components/salesforce/):

{% include img.html max-width="80%" url="/assets/img/integrator-guide/data-mapper/fields-complex-case.png" title="Field menu: complex incoming meta-model fields" %}

In this long list you can **Search** to find the parameter you need and click on
**plus sign** to add to the JSON structure.

> **Please Note** The platform user interface assumes that you know what you are
> mapping when you switch to Developer mode. It will allow an empty JSON `{}`
> as an input structure. **You are responsible to ensure the validity of your mapping.**

To avoid unexpected results we recommend to:

*   Include and map the **Required** fields to avoid unexpected behaviour from the API provider.
*   Make sure to use correct data **Type** while filling-in the parameter values.

When you write a JSONata expression which contains property not included in input
meta-data the platform user interface will block switching back to Integrator mode.

{% include img.html max-width="80%" url="/assets/img/integrator-guide/data-mapper/mapping-metadata-not-included.png" title="Mapping when the property not included in meta-data." %}

### Evaluate results

You are already familiar with evaluation function. In the Developer mode it evaluates
the whole JSON structure in input field rather than individual fields like in the
Integrator mode.

The following animation shows how you can use the **Fields** menu to choose values,
fill-in, get their property values and **Evaluate** the result.

{% include img.html max-width="80%" url="/assets/img/integrator-guide/data-mapper/developer-mode-using.gif" title="Using Fields menu in Developer mode" %}

We can see in the evaluation stage how the platform interface replaces the property
values `name` and `status` to their real values from the incoming payload.

When you enter an incorrect JSON and press Evaluate the platform UI will check it
and you will get an error in the **Mapping result** section:

{% include img.html max-width="80%" url="/assets/img/integrator-guide/data-mapper/error-json.png" title="Error in input JSON" %}

> **Note** You can switch between *Developer* and *Integrator* modes during the
> design of integration flow but not after you publish it. To change the mapping
> mode, create a new draft version of a flow.

## Array-to-array Mapping

You can map the incoming array values with an outgoing array fields, we call this
an array-to-array mapping.

You can use both **Integrator** or **Developer** modes to map array structure.
However, when you have complex array-to-array case we recommend using the developer
mode since the Integrator mode has certain limitations.

*   You can map data from objects inside the arrays.
*   You can't map properties from objects located in multiple arrays.
*   Due to complexity and limitations, when you map array-to-array Integrator mode, the mapping will not be saved if you switch to Developer mode and, vice-versa.

When in Integrator mode, the system checks if the incoming array has properties
to map. If not then the previous step is disabled.

{% include img.html max-width="80%" url="/assets/img/integrator-guide/data-mapper/mapping-array-step-disabled.png" title="Disabled step in array mapping" %}

Alternatively, when there are array parameters to map you can access the incoming
data fields.

{% include img.html max-width="80%" url="/assets/img/integrator-guide/data-mapper/mapping-array.png" title="Array mapping" %}

> For complex cases of array-to-array mapping we recommend switching to Developer
> mode where you can write extensive JSONata expressions and use data from
> different arrays simultaneously.

## Support arrays of Objects

When working with arrays in the context of mapping data, you may have encountered limitations in representing values that are not objects. Our platform utilizes [JSON](https://datatracker.ietf.org/doc/html/rfc7159) as the data interchange format, which imposes certain constraints, including the lack of support for arrays containing values. Therefore, in our platform, we only support arrays that consist of objects. This section aims to explain where this limitation arises and provide solutions for working with arrays effectively.

### Example

Let's consider a scenario where you receive the following payload through a [Webhook](/components/webhook/) trigger:

```json
{
  "body": {
    "registered": true,
    "header": [
      "customer_id"
    ],
    "rows": [
      [
        "ozzy.osbourne@example.com"
      ],
      [
        "michael.jackson@example.com"
      ],
      [
        "janis.joplin@example.com"
      ],
      [
        "whitney.houston@example.com"
      ]
    ]
  }
}
```

Suppose you want to extract user emails from the rows array and use them in the URL field of your [REST API](/components/rest-api/). To achieve this, you need to split the `rows` array, treating each value as a separate URL.

<details close markdown="block"><summary><strong>Attempting an Incorrect Approach</strong></summary>

Initially, you may attempt to split the sample provided by the [Webhook](/components/webhook/) component to extract array values.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/data-mapper/splitter-config-incorrect.png" title="Splitter configuration" %}

However, this sample does not contain a name and is not an object but a simple array value.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/data-mapper/splitter-config-sample-incorrect.png" title="Splitter sample" %}

In [JSON](https://datatracker.ietf.org/doc/html/rfc7159), you cannot directly interact with an array of values in this manner.

```json
[
  [
    "ozzy.osbourne@example.com"
  ],
  [
    "michael.jackson@example.com"
  ],
  [
    "janis.joplin@example.com"
  ],
  [
    "whitney.houston@example.com"
  ]
]
```

Consequently, you won't be able to utilize the [Splitter](/components/splitter/) component to work with this array of values as expected.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/data-mapper/rest-api-config-incorrect.png" title="Unable to utilize" %}

</details>

<details close markdown="block"><summary><strong>Adopting the Correct Approach</strong></summary>

To overcome this limitation, each element within the array should be represented as an object.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/data-mapper/splitter-config.png" title="Splitter configuration" %}

In JSON, to create an object, we need to provide a name. By using the dot notation before the `{ }`, we can assign a name to each value within the `rows` array.

```
body.rows @ $email.{ "email": $email }
```

Consequently, each sample becomes an object.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/data-mapper/splitter-config-sample.png" title="Splitter sample" %}

This results in an array of objects.

```json
[
  {
    "email": [
      "ozzy.osbourne@example.com"
    ]
  },
  {
    "email": [
      "michael.jackson@example.com"
    ]
  },
  {
    "email": [
      "janis.joplin@example.com"
    ]
  },
  {
    "email": [
      "whitney.houston@example.com"
    ]
  }
]
```

The [Splitter](/components/splitter/) component sample can now be used in the URL field.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/data-mapper/rest-api-config-1.png" title="Sample in URL field" %}

As shown, the value is placed inside the object, which is an array.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/data-mapper/rest-api-config-2.png" title="Sample is an array" %}

To extract this value, switch to JSONata mode instead of the Integrator mode.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/data-mapper/rest-api-config-3.png" title="JSONata mode" %}

Then, specify zero within `[ ]` as the first element of the array.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/data-mapper/rest-api-config-4.png" title="JSONata mode" %}

Finally, you will obtain the email value, and each subsequent iteration will provide the next email from the array of objects.

{% include img.html max-width="100%" url="/assets/img/integrator-guide/data-mapper/rest-api-config-5.png" title="Email value" %}

</details>

In conclusion, [JSON](https://datatracker.ietf.org/doc/html/rfc7159) offers a high level of interoperability for data exchange across platforms. However, it does have limitations concerning support for object arrays. It is crucial to be aware of these limitations to set up your flow logic correctly.
