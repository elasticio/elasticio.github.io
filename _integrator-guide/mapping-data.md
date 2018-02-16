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

Screenshot above shows the stage in integration flow designer where the actual mapping or matching of the values is done. The *Petstore API* component expects values in two fields. These two fields are required (red exclamation marks), which means without providing the values for them we will no be able to proceed further and click on *Continue* button. Let us proceed with the mapping.

![Mapping: Selecting drop-down](/assets/img/integrator-guide/data-mapper/mapper-02.png "Mapping: Selecting drop-down")

To map the *Name* field click on drop-down menu on the right side and select the matching value from the provided values in the *Data* tab. For example our incoming data has a field `name` which we match with the *Name* field from *Petstore API* component.

![Mapping result of the field](/assets/img/integrator-guide/data-mapper/mapper-03.png "Mapping result of the field")

The screenshot above shows the successful mapping result which is `Gromit`. Notice that you have jumped to the *Mapping results* tab here which shows the successful evaluation result. Note also the green check-mark appeared besides the mapping field. This means the mapping of this field is accepted.

![Expressions tab](/assets/img/integrator-guide/data-mapper/mapper-04.png "Expressions tab")

Before going further we can check the *Expressions* tab here. Here you can look under the hood of the [JSONata](http://jsonata.org/) powered mapper and see the list of expression and functions that is possible to use. We have already used them in the [how to create your first integration flow](/getting-started/first-flow) tutorial.

We can match the *Status* field with the incoming `status` value as well to complete the mapping and go forward.

> **Note** The mapped values are from the incoming data sample. They will be replaced with different values if dependent on incoming data. These values serve as metadata.

## Developer mode

As you have noticed we have been mapping the values using the *Integrator mode* of mapping. This is a convenient way to choose the values from the drop-down menu and possibly use some JSONata expressions in the way. What if you need some more power, what if you need to control the mapping exactly how it should be done?

For that reason we have the *Developer mode* which gives a complete freedom to map and match the fields.

![Developer mode first view](/assets/img/integrator-guide/data-mapper/mapper-05.png "Developer mode first view")

Screenshot above shows the view when the *Developer mode* is first selected. If the receiving component has an incoming schema then it will be used by {{site.data.tenant.name}} to populate the parameter values. The upper part is the editable area where you can change the values and the lower part will show the JSONata evaluation result.

![Developer mode edited values](/assets/img/integrator-guide/data-mapper/mapper-06.png "Developer mode edited values")

We have changed the values to match better our case and we can see the mapping result below. Now if we would like to add more parameters to the mapping structure we can edit the `JSON`.

![Error in mapping](/assets/img/integrator-guide/data-mapper/mapper-07.png "Error in mapping")

Screenshot above shows the incomplete `JSON` structure which is not accepted by {{site.data.tenant.name}} and the error is shown in the Mapping result field.

## Developer or Integrator mode

We have learned how to use the *Integrator* and *Developer* modes. It is possible to switch between them during the design of integration flow but not after the flow is published.

![Integrator mode saved](/assets/img/integrator-guide/data-mapper/mapper-08.png "Integrator mode saved")

Screenshot above shows the case when the *Integrator mode* was used to map the values. The flow is published with this mode and it can not be change unless a new draft version is created and the mode is changed.

![Developer mode saved](/assets/img/integrator-guide/data-mapper/mapper-09.png "Developer mode saved")

Screenshot above shows the case when the *Developer mode* was used to map the values.



## TODO

* Working with strings
* Working with numbers
* Working with dates and times
* Working with arrays
