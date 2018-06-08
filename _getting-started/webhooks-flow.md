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
In the next step, you can create or choose an existing [credential](credential),
as shown in the screenshot below.

![Add credentials](/assets/img/getting-started/webhook-flow/webhook-flow-03.png "Add credentials")

If you already have a credential for a webhook, just choose it to proceed.
Otherwise click on *Connect new credentials* link as shown on the screenshot above.

![Types of credentials](/assets/img/getting-started/webhook-flow/webhook-flow-05.png "Types of credentials")

As you can see in the screenshot above there are multiple types of credentials
available to choose in the *Type* dropdown. We will cover the Webhook credential
[later in this article](#securing-your-webhooks). For now let's just choose the `No Auth` option to
continue with webhook creation. The result should look like in the following
screenshot.

![Create credentials](/assets/img/getting-started/webhook-flow/webhook-flow-04.png "Create credentials")

Now click on *Save* to continue to with webhook creation.

![Add sample manually](/assets/img/getting-started/webhook-flow/webhook-flow-07.png "Add sample manually")

Next we need to give the sample data structure which the webhook expects to receive from the external system. Click on *Add sample manually* button to add your sample.

![Select the format](/assets/img/getting-started/webhook-flow/webhook-flow-08.png "Select the format")

Next we need to choose the format you want to provide your input sample. Please choose your favourite format in the *Format type*. The supported types are:

*   `JSON`: your sample must be a valid JSON object
*   `XML`: your sample must be a valid XML structure
*   `List of properties`: must be a comma-separated list of property names.

Let's choose `JSON` type to provide a sample as a JSON object.

![Paste the JSON](/assets/img/getting-started/webhook-flow/webhook-flow-09.png "Paste the JSON")

Paste the following `JSON` in the input field:

```js
{
  "petname": "Gromit",
  "petstatus": "sold"
}
```
The sample gets evaluated for the correctness of the format. Click on *Save* button to continue.

![Finish webhook configuration](/assets/img/getting-started/webhook-flow/webhook-flow-10.png "Finish webhook configuration")

We have now the sample data for our webhook. Please click on *Continue* button to finish configuring the webhook component and load the step summary page.

![Webhook step summary](/assets/img/getting-started/webhook-flow/webhook-flow-11.png "Webhook step summary")

Screenshot above shows the Webhook step summary page where you can add a note to describe the step and change the step name. Click on *Add another step* button to finish the Webhook step and load the component chooser again.


## Choosing the data target

We have the data source, now we need to choose the data target. After completing the trigger configuration you need to choose an `action` component to send the data from the webhook. Let us choose the *Petstore API (Node.js)* component.

![Choose Petstore component](/assets/img/getting-started/webhook-flow/webhook-flow-12.png "Choose Petstore component")

For that purpose type `petstore` in the search bar and you will find it. Next click on *Choose Petstore API (Node.js)* button.

![Create the credentials to access](/assets/img/getting-started/webhook-flow/webhook-flow-13.png "Create the credentials to access")

Next you will see the page *Choose Credentials* where you can either use an existing credential or click on *+connect new credentials* link to create new credentials.

![Credential creation process](/assets/img/getting-started/webhook-flow/webhook-flow-14.png "Credential creation process")

Let us fill-in an input form for these two fields:
*   **Account name**: allows you to give your credential a meaningful name. You can leave this unchanged or give your own name.
*   **API key**: used to authenticate with the [Petstore API]({{site.data.tenant.petStoreDocs}}). Please use the API key `{site.data.tenant.petStoreApiKey}}`.

Click on *Save* to verify the credentials. The verification can take no more than 30 seconds. Upon completion you will see the page to choose one of the 2 available actions in the Petstore component.

![Select action](/assets/img/getting-started/webhook-flow/webhook-flow-15.png "Select action")

A typical {{site.data.tenant.name}} platform component can have more than one action to change or add the records at the target API. Here we use the Petstore component to learn the {{site.data.tenant.name}} platform. It provides 2 different actions to create pets with their statuses. These two actions differ by the implemented code style. Let's select *Create a Pet With Promise* and continue.

![Mapping the values](/assets/img/getting-started/webhook-flow/webhook-flow-16.png "Mapping the values")

The screenshot above demonstrates the mapping of data between the data from webhook and the Petstore action two fields. Please select these properties by pressing the drop-down menu on the right of each input field as shown.

The `petname` gets mapped with the *Name* field and the `petstatus` with the *Status* field respectively. Click on *Continue* button after you have done with the mapping.


![Retrieve the sample](/assets/img/getting-started/webhook-flow/webhook-flow-17.png "Retrieve the sample")

On the next page click on *Retrieve sample from Petstore API (Node.js)* to retrieve the sample. When the sample gets retrieved click on *Choose this sample* to continue.

![Petstore step summary](/assets/img/getting-started/webhook-flow/webhook-flow-18.png "Petstore step summary")

We have finished configuring this step and reached the summary page for the *Petstore API* component. Here we can add note or change the step name. You could add more steps after this moment but we recommend you not to at this stage. Click on *I’m done* button once. You can name your integration flow or accept the suggested name by clicking on *I'm done* one more time to finish configuring this step.

![Publish the draft](/assets/img/getting-started/webhook-flow/webhook-flow-19.png "Publish the draft")

Success, the first draft version of your integration flow is ready! Click on *Publish Draft* button to save this draft.

> **Note** You must publish your draft to save and proceed. You can not start your flow without publishing it.

## Running and monitoring the flow

Now that our flow is published we can start it.

![Set to live and copy the link](/assets/img/getting-started/webhook-flow/webhook-flow-20.png "Set to live and copy the link")

Click on *Start* button to set your flow live. Before navigating away from this page copy and save the generated webhook address (URL). The URL has the following structure:
```
https://in.{{site.data.tenant.name}}/hook/FLOW_ID
```

For the demonstration purposes, we will use an application called [Postman](https://www.getpostman.com/) to `POST` payloads to the copied webhook address.

![Sending data using Postman](/assets/img/getting-started/webhook-flow/webhook-flow-21.png "Sending data using Postman")

Open the Postman and follow these steps:

1.  Choose the HTTP `POST` in the left upper corner.
2.  Paste the copied webhook URL into the address field.
3.  Select the HTTP post *Body* tab, then select *raw* and choose the `JSON (application/json)` from a drop-down selector menu. Now paste an example `JSON` into the input field. We used this `JSON`:
```js
{
  "petname": "Gromit",
  "petstatus": "sold"
}
```
4.  Click on *Send* button in the right upper corner to send the data to your webhook flow. In response, {{site.data.tenant.name}} platform will reply with a similar message shown on the screenshot.

Keep sending your data to the webhook address.

![The view after 3 requests](/assets/img/getting-started/webhook-flow/webhook-flow-22.png "The view after 3 requests")

Here we have the Dashboard view after your flow gets executed 3 times. You can view the details of each execution by clicking on the name of your flow in the runlog.

Your flow is now active and working! Go ahead, make another one. Try using different [integration components](integration-component) to build more nice flows.

## Securing your webhooks

As discussed above webhhoks can be secured with credentials. There are four
types of webhook credentials:

*   `No Auth` - used to make the webhook URL accessible by anyone,
*   `Basic Auth` - used to define username and password to authenticate the webhook clients using [Basic Access Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
*   `API Key Auth` - used to define an API key for the webhook clients,
*   `HMAC verification` - used to create a *HMAC* signature of the payload

Let's explore the `Basic Auth` type as an example. In the following screenshot
you see a credential configuration page when `Basic Auth` type is chosen.

![Basic Auth method](/assets/img/getting-started/webhook-flow/webhook-flow-06.png "Basic Auth method")

As you can see above you need to enter a username and a password which will
be used to authenticate all the incoming requests to the webhook URL using the
[Basic Access Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
mechanism. Any request that is not authorized will be responded with
`401 UNAUTHORIZED` error. Now let's see how to send a request to a secured
webhook URL using `curl` on a terminal.

```sh
curl -X POST https://in.{{site.data.tenant.name}}/hook/{FLOW_ID} -u {USERNAME}:{PASSWORD} \
-H 'Content-Type: application/json' -d '{
  "petname": "Gromit",
  "petstatus": "sold"
}'
```

In the example above `{FLOW_ID}` is the ID of your flow shown on the
[flow summary screen](#running-and-monitoring-the-flow). The variables
`{USERNAME}` and `{PASSWORD}` are the ones you entered when creating a
credential for your webhook.
