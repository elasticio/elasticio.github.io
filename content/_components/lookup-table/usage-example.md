---
title: Lookup Table Usage Example
layout: component
description: Usage Example for the Lookup Table component.
icon: lookup.png
icontext: Lookup component
category: lookup
ComponentVersion: 1.1.7
updatedDate: 2022-10-21
---

## Scenario

Suppose you have a CSV table that contains department identifiers and emails. Your goal is to create a flow that notifies each department when a parcel has been sent. The Lookup Table component's credentials can store a CSV table with your data. It searches for a value from **column X** and returns the corresponding value from **column Y**. The main difference between the Lookup Table component and the Configuration component is that the latter uses JSON expressions in its credentials and cannot establish relationships between values.

{% include img.html max-width="100%" url="img/lookup-table-cred.png" title="Lookup credentials" %}

## Client use case

We have the 1st step [Webhook](/components/webhook) component which receives **shipment data**.

{% include img.html max-width="100%" url="img/webhook-shipment-data.png" title="Webhook shipment data" %}

The next step is the 2nd step, which involves using the Lookup Table component along with its corresponding **Credentials** and **Configuration**. In this step, the Department ID field is extracted from the Webhook and used as an input value within the **Mapping** process. If the lookup operation is successful, the resulting output will be the email address associated with the department. However, if the lookup fails, an error will be thrown.

{% include img.html max-width="100%" url="img/lookup-table-use-case-cred.png" title="Lookup table use case credentials" %}

{% include img.html max-width="100%" url="img/lookup-table-use-case-config.png" title="Lookup table use case configuration" %}

{% include img.html max-width="100%" url="img/lookup-table-use-case-mapping.png" title="Lookup table use case mapping" %}


Following that, the third step involves using the [E-Mail](/components/email) component, which is responsible for sending a notification to the respective department, indicating that the parcel has been sent.

{% include img.html max-width="100%" url="img/email-mapping-1.png" title="Email mapping 1" %}

{% include img.html max-width="100%" url="img/email-mapping-2.png" title="Email mapping 2" %}

As a result, we will see the desired message in the mail:

{% include img.html max-width="100%" url="img/notification-email.png" title="Notification email" %}
