---
title: Configuration Usage Example
layout: component
description: In this article we demonstrate the function of the Configuration Component within an integration flow.
icon: configuration.png
icontext: Configuration component
category: configuration
updatedDate: 2021-11-26
ComponentVersion: 0.0.7
---

## Online Shop example

In our example, we will be sending emails to our important customers. We will get access to the clients' IDs with the help of a Configuration component that will later pass this data on to get access to the clients' email addresses from the CRM system.

As the first step, we will use the Simpe trigger component, since there is no trigger function in the Configuration component:

![Configuration usage example 1](img/configuration-usage-1.png)

In the second step we will use the Configuration component with our credentials - it emits JSON which was put in the credential field. Credential field consist of IDs of the most important clients:

![Configuration usage example 1](img/configuration-usage-2.png)

The third step uses the REST API v2 component which makes an API call to the CRM system that retrieves email addresses by client IDs:

![Configuration usage example 3](img/configuration-usage-3.png)

Here you can see the client email addresses Sample data:

![Configuration usage example 4](img/configuration-usage-4.png)

The final step is the E-Mail component which sends mail to our clients.

![Configuration usage example 5](img/configuration-usage-5.png)

As a result, you can see an example of an email that our client will receive:

![Configuration usage example 6](img/configuration-usage-6.png)
