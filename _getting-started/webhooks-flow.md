---
title: Creating a webhook flow
layout: article
section: Tutorials
order: 2
category: integration-flow
since: 20180111
---

In this article we will cover how to create an [integration flow](integration-flow) which gets triggered by the changes in an external system. We will create an integration flow that exposes an externally-reachable URL to accept HTTP requests in JSON format. The received payload gets interpreted as a pet and gets stored into the [Petstore API](https://petstore.elastic.io/docs/).

If this is your first experience with the {{site.data.tenant.name}} platform, then please follow every step to create your first integration flow. If you have already followed the steps in [Creating your first integration flow?](first-flow) tutorial, then some steps would be the same to you and you are welcome to skip them.

## Setting up the webhook

When you login you will have a similar view of the {{site.data.tenant.name}} platform.

![Start creating your flow](/assets/img/getting-started/webhook-flow/webhook-flow-01.png "Start creating your first flow")

To start click on *+Add new flow* button to load the integration flow designer.

The designer helps building the flows from the reusable integration components such as `triggers` and `actions`. Every integration flow starts with a `trigger` component to retrieve or receive data from the source. In this case we will start with setting up the webhook to receive the data. Let us find the *webhook component* in the list of integration components.

![Selecting the webhook component](/assets/img/getting-started/webhook-flow/webhook-flow-02.png "Selecting the webhook component")

Type `webhook` in the search bar to find it and click on *Choose Webhook* afterwards to select it.

![HMAC configuration](/assets/img/getting-started/webhook-flow/webhook-flow-03.png "HMAC configuration")

In configure input step we have the *HMAC verification shared secret* field. This configuration is for securing your webhook. We will cover this configuration elsewhere. For now, we will skip this optional step. Please click on *Continue* button to go forward.

![Add sample manually](/assets/img/getting-started/webhook-flow/webhook-flow-04.png "Add sample manually")

Next we need to give the sample data structure which the webhook expects to receive from the external system. Click on *Add sample manually* button to add your sample.

![Select the format](/assets/img/getting-started/webhook-flow/webhook-flow-05.png "Select the format")

Next we need to choose the format you want to provide your input sample. Please choose your favourite format in the *Format type*. The supported types are:

*   `JSON`: your sample must be a valid JSON object
*   `XML`: your sample must be a valid XML structure
*   `List of properties`: must be a comma-separated list of property names.

Let's choose `JSON` type to provide a sample as a JSON object.

![Paste the JSON](/assets/img/getting-started/webhook-flow/webhook-flow-06.png "Paste the JSON")

Paste the following `JSON` in the input field:

```js
{
  "pet_name": "Gromit",
  "pet_status": "sold"
}
```
The sample gets evaluated for the correctness of the format. Click on *Save* button to continue.

![Finish webhook configuration](/assets/img/getting-started/webhook-flow/webhook-flow-07.png "Finish webhook configuration")

We have now the sample data for our webhook. Please click on *Continue* button to finish configuring the webhook component and load the component chooser again.

## Choosing the data target

We have the data source, now we need to choose the data target. After completing the trigger configuration you need to choose an `action` component to send the data from the webhook. Let us choose the *Petstore API (Node.js)* component.

![Choose Petstore component](/assets/img/getting-started/webhook-flow/webhook-flow-08.png "Choose Petstore component")

For that purpose type `petstore` in the search bar and you will find it. Next click on *Choose Petstore API (Node.js)* button.

![Create the credentials to access](/assets/img/getting-started/webhook-flow/webhook-flow-09.png "Create the credentials to access")

Next you will see the page *Choose Credentials* where you can either use an existing credential or click on *+connect new credentials* link to create new credentials.

![Credential creation process](/assets/img/getting-started/webhook-flow/webhook-flow-10.png "Credential creation process")

Let us fill-in an input form for these two fields:
*   **Account name**: allows you to give your credential a meaningful name. You can leave this unchanged or give your own name.
*   **API key**: used to authenticate with the [Petstore API](https://petstore.elastic.io/docs/). Please use the API key `elasticio`.

Click on *Save* to verify the credentials. The verification can take no more than 30 seconds. Upon completion you will
see the page to choose one of the 3 triggers available in the Petstore component.

![Select action](/assets/img/getting-started/webhook-flow/webhook-flow-11.png "Select action")

A typical {{site.data.tenant.name}} platform component can have more than one action to change or add the records at the target API. Here we use the Petstore component to learn the {{site.data.tenant.name}} platform. It provides 2 different actions to create pets with their statuses. These two actions differ by the implemented code style. Let's select *Create a Pet With Promise* and continue.

![Mapping the values](/assets/img/getting-started/webhook-flow/webhook-flow-12.png "Mapping the values")

The screenshot above demonstrates the mapping of data between the data from webhook and the Petstore action two fields. Please select these properties by pressing the drop-down menu on the right of each input field as shown.

The `pet_name` gets mapped with the *Name* field and the `pet_status` with the *Status* field respectively. Click on *Continue* button after you have done with the mapping.


![Retrieve the sample](/assets/img/getting-started/webhook-flow/webhook-flow-13.png "Retrieve the sample")

On the next page click on *Retrieve sample from Petstore API (Node.js)* to retrieve the sample. When the sample gets retrieved click on *Choose this sample* to continue.

![Name and save the flow](/assets/img/getting-started/webhook-flow/webhook-flow-14.png "Name and save the flow")

We have finished configuring this demonstration flow. You could add more steps after this moment but we recommend you not to at this stage. Click on *I’m done* button once. You can name your integration flow or accept the suggested name by clicking on *I'm done* one more time to finish and save your flow.

## Running and monitoring the flow

Success, your integration flow is ready! You may start your flow now.

![Set to live and copy the link](/assets/img/getting-started/webhook-flow/webhook-flow-15.png "Set to live and copy the link")

Before navigating away from this page copy and save the generated webhook address (URL). The URL has the following structure:
```
https://in.{{site.data.tenant.name}}/hook/FLOW_ID
```

For the demonstration purposes, we will use an application called [Postman](https://www.getpostman.com/) to `POST` payloads to the copied webhook address.

![Sending data using Postman](/assets/img/getting-started/webhook-flow/webhook-flow-16.png "Sending data using Postman")

Open the Postman and follow these steps:

1.  Choose the HTTP `POST` in the left upper corner.
2.  Paste the copied webhook URL into the address field.
3.  Select the HTTP post *Body* tab, then select *raw* and choose the `JSON (application/json)` from a drop-down selector menu. Now paste an example `JSON` into the input field. We used this `JSON`:
```js
{
  "pet_name": "Preston",
  "pet_status": "sold"
}
```
4.  Click on *Send* button in the right upper corner to send the data to your webhook flow. In response, {{site.data.tenant.name}} platform will reply with a similar message shown on the screenshot.

Keep sending your data to the webhook address.

![The view after 3 requests](/assets/img/getting-started/webhook-flow/webhook-flow-17.png "The view after 3 requests")

Here we have the Dashboard view after your flow gets executed 3 times. You can view the details of each execution by clicking on the name of your flow in the runlog.

Your flow is now active and working! Go ahead, make another one. Try using different [integration components](integration-component) to build more nice flows.
