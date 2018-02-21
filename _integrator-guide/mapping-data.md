---
title: Mapping data
layout: article
section: Data transformation
order: 1
since: 20180216
---

In this article we will explain how to map the data between integration components to keep them in sync.

An integration flow on {{site.data.tenant.name}} platform must have at least two components, one trigger and one action. Trigger emits a data for the action component to receive and process it. Between these two components seats the {{site.data.tenant.name}} **data mapper**, which maps or matches the incoming data to the specific fields where the next component expects them to receive.

To understand how the data-mapping works in practice visit our tutorials section. We recommend starting from steps-by-step instructions in [how to create your first integration flow](/getting-started/first-flow) followed by the [creating a webhook flow](/getting-started/webhook-flow) articles as an introduction to the data-mapping.

If you have already followed the tutorials you realise that the data-mapping on {{site.data.tenant.name}} platform is an important part of the integration process which warrants detailed explanation in its own.

## Mapping simple values

Let us consider a simple scenario when we have an incomming data through the *WebHook* component like the following `JSON` structure.

```js
{
  "name": "Gromit",
  "status": "sold"
}
```

We intend to map these values into outgoing fields in *Petstore API* component. Let us jump into the integration flow design right at the mapping stage.

![Mapping: Configure input](/assets/img/integrator-guide/data-mapper/mapper-01.png "Mapping: Configure input")

The screenshot above shows the stage in integration flow designer where the actual mapping or matching of the values is done. The *Petstore API* operation for creating a Pet requires a name and a status for the new pet. That's why the component asks the user to provide input in two fields: `Name` and `Status`. These two fields are required (red exclamation marks), which means without providing the values for them we will no be able to proceed further and click on *Continue* button. Let us proceed with the mapping.

![Mapping: Selecting drop-down](/assets/img/integrator-guide/data-mapper/mapper-02.png "Mapping: Selecting drop-down")

To map the *Name* field click on drop-down menu on the right side and select the matching value from the provided values in the *Data* tab. For example our incoming data has a field `name` which we match with the *Name* field from *Petstore API* component.

![Mapping result of the field](/assets/img/integrator-guide/data-mapper/mapper-03.png "Mapping result of the field")

The screenshot above shows the successful mapping result which is `Gromit`. Notice that you have jumped to the *Mapping results* tab here which shows the successful evaluation result. Note also the green check-mark appeared besides the mapping field. This means the mapping of this field is valid.

![Expressions tab](/assets/img/integrator-guide/data-mapper/mapper-04.png "Expressions tab")

Before going further we can check the *Expressions* tab here. Here you can look under the hood of the [JSONata](http://jsonata.org/) powered mapper and see the list of expression and functions that is possible to use. We have already used them in the [how to create your first integration flow](/getting-started/first-flow) tutorial.

We can match the *Status* field with the incoming `status` value as well to complete the mapping and go forward.

> **Note** During the mapping process the mapping expressions are evaluated on the samples. During component execution these expressions will be evaluated on the incoming data which are, of course, different from the samples.

## Using advanced mapping mode

In the previous section you learned how to map data between two steps of
an integration flow using JSONata expression. This is a quite convenient
approach, however, the graphical mapping in the *Integrator mode* has some limitations.
For example defining array-to-array mappings is only possible in the *Developer mode*.
For that purpose you can switch to the *Developer mode*.

> **Note** Array-to-array mappings is only possible in the *Developer mode*.

The following screenshot demonstrates the *Developer mode*.

![Developer mode](/assets/img/integrator-guide/data-mapper/mapper-05.png "Developer mode")

In the screenshot above you can see the mapper in *Developer mode*. In
this mode you write a single JSONata expressions for the entire input object
instead of defining expressions for each individual field. In order to use
the *Developer mode* an integrator needs to know the meta-model
of input data: the structure of the object and the property names. Without
having access to component's source code knowing the input model is impossible. For that
purpose, when you switch from *Integrator mode* to *Developer mode* , the
mapper input field we be prepopulated with a JSONata expression that represents
the required input. This expression is a generated JSON object with random
property values. You can start writing your mapping by overriding property values.
The following screenshot demonstrates how a generated JSONata expression can be changed.

![Developer mode edited values](/assets/img/integrator-guide/data-mapper/mapper-06.png "Developer mode edited values")

Please note that your expression is evaluated as you are typing it. The
evaluation result is immediately shown in the *Mapping result* section
below the mapper input field. If you provide an invalid expression, an
error message will be displayed, as shown in the following screenshot.

![Error in mapping](/assets/img/integrator-guide/data-mapper/mapper-07.png "Error in mapping")

The screenshot above shows the incomplete `JSON` structure which is not
accepted by {{site.data.tenant.name}} and the error is shown in the *Mapping result* section.

> **Note** You can switch between *Developer* and *Integrator* modes during the design of integration flow but not after the flow is published. To change the mapping mode a new [draft version of a flow](managing-flow-history) must be created.
