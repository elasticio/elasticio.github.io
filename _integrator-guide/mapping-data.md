---
title: Mapping data
layout: article
section: Data transformation
category: data-transformation
order: 0
since: 20180216
---

In this article we will explain how to map the data between integration components to keep them in sync.

An integration flow on {{site.data.tenant.name}} platform must have at least two components, one trigger and one action. Trigger emits a data for the action component to receive and process it. Between these two components seats the {{site.data.tenant.name}} **data mapper**, which maps or matches the incoming data to the specific fields where the next component expects them to receive.

To understand how the data-mapping works in practice visit our tutorials section. We recommend starting from steps-by-step instructions in [how to create your first integration flow](/getting-started/first-flow) followed by the [creating a webhook flow](/getting-started/webhook-flow) articles as an introduction to the data-mapping.

If you have already followed the tutorials you realise that the data-mapping on {{site.data.tenant.name}} platform is an important part of the integration process which warrants detailed explanation in its own.

## Mapping simple values

Let us consider a simple scenario when we have an incoming data through the *Webhook* component like the following `JSON` structure.

```js
{
  "name": "Gromit",
  "status": "sold"
}
```

We intend to map these values into outgoing fields in *Petstore API* component. Let us jump into the integration flow design right at the mapping stage.

![Mapping: Configure input](/assets/img/integrator-guide/data-mapper/mapper-01.png "Mapping: Configure input")

The screenshot above shows the stage in integration flow designer where the actual mapping or matching of the values is done. The *Petstore API* operation for creating a Pet requires a name and a status for the new pet. That's why the component asks the user to provide input in two fields: `Name` and `Status`. These two fields are required (red exclamation marks), which means without providing the values for them we won't be able to proceed further and click on *Continue* button. Let us proceed with the mapping.

![Mapping: Selecting drop-down](/assets/img/integrator-guide/data-mapper/mapper-02.png "Mapping: Selecting drop-down")

To map the *Name* field click on a drop-down menu on the right side and select the matching value from the provided values in the *Data* tab. For example, our incoming data has a field `name` which we match with the *Name* field from *Petstore API* component.

![Mapping result of the field](/assets/img/integrator-guide/data-mapper/mapper-03.png "Mapping result of the field")

The screenshot above shows the successful mapping result which is `Gromit`. Notice that you have jumped to the *Mapping results* tab here which shows the successful evaluation result. Note also the green check-mark appeared besides the mapping field. This means the mapping of this field is valid.

![Expressions tab](/assets/img/integrator-guide/data-mapper/mapper-04.png "Expressions tab")

Before going further we can check the *Expressions* tab here. Here you can look under the hood of the [JSONata](http://jsonata.org/) powered mapper and see the list of expression and functions that is possible to use. We have already used them in the [how to create your first integration flow](/getting-started/first-flow) tutorial.

We can match the *Status* field with the incoming `status` value as well to complete the mapping and go forward.

> **Note** During the mapping process the mapping expressions is evaluated on the samples. During the component execution {{site.data.tenant.name}} evaluates these expressions based on the incoming data which will differ from the presented sample.

## Using advanced mapping mode

In the previous section you learned how to map data between two steps of an integration flow using a JSONata expression. This is a convenient approach, however, the graphical mapping in the *Integrator mode* has certain limitations. For example, the array-to-array mapping is only possible in the *Developer mode*. For that purpose we recommend switching to the *Developer mode* to continue.

> **Note** Array-to-array mappings is only possible in the *Developer mode*.

The following screenshot demonstrates the *Developer mode*.

![Developer mode](/assets/img/integrator-guide/data-mapper/mapper-05.png "Developer mode")

In the *Developer mode* you can write a single JSONata expressions for the entire input object instead of defining expressions for each individual field as in case of the *Integrator mode*.

To use the *Developer mode*, you need to know the meta-model of input data: the structure of the object and the property names. Without having access to component's source code knowing the input model is impossible.

Therefore, when you switch from *Integrator mode* to *Developer mode*, the mapper input field is pre-populated with a required JSON expression. {{site.data.tenant.name}} generates it from the incoming meta-model parameter values and random property values. You can write your mapping by overriding the property values.

![Developer mode edited values](/assets/img/integrator-guide/data-mapper/mapper-06.png "Developer mode edited values")

The above screenshot shows how the property values is replaced by the variables `name` and `status`. These variables get their values from the incoming payload of the Webhook component.

> **Please note** your expression is evaluated as you are typing it. The result is shown at once below the mapper input field, in the *Mapping result* section. If you give an invalid expression, an error message is displayed.

![Error in mapping](/assets/img/integrator-guide/data-mapper/mapper-07.png "Error in mapping")

The screenshot above shows the incomplete `JSON` structure which is not accepted by {{site.data.tenant.name}} and the error is shown in the *Mapping result* section.

> **Note** You can switch between *Developer* and *Integrator* modes during the design of integration flow but not after the flow is published. To change the mapping mode a new [draft version of a flow](managing-flow-history) must be created.
