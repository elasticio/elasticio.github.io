---
title: Creating a webhook flow
layout: article
section: Tutorials
description: In this article we will cover how to create an integration flow which gets triggered by the changes in an external system.
order: 2
category: integration-flow
since: 20180111
---

In this article we will cover how to create an [integration flow](integration-flow) which gets triggered by the changes in an external system. We will create an integration flow that exposes an externally-reachable URL to accept HTTP requests in JSON format. The received payload gets interpreted as a pet and gets stored into the [Petstore API]({{site.data.tenant.petStoreDocs}}).

If this is your first experience with the {{site.data.tenant.name}} platform, then please follow every step to create your first integration flow. If you have already followed the steps in [Creating your first integration flow?](first-flow) tutorial, then some steps would be the same to you and you are welcome to skip them.

## Setting up the webhook

When you login you will have a similar view of the {{site.data.tenant.name}} platform.

{% include img.html
url="/assets/img/getting-started/webhook-flow/start_screen.png"
title="Start screen" %}

Go to the main menu by clicking on the burger button and go to the *Flows* tab. After that, click on **Add New Flow** to load the integration flow designer.

{% include img.html
url="/assets/img/getting-started/webhook-flow/flows_tab.png"
title="Flows tab" %}

{% include img.html
url="/assets/img/getting-started/webhook-flow/add_new_flow.png"
title="Add New Flow button" %}

The designer helps building the flows from the reusable integration components such as `Triggers` and `Actions`. Every integration flow starts with a `Trigger` component to retrieve or receive data from the source. In this case we will start with setting up the webhook to receive the data. Let us find the *Webhook component* in the list of integration components.

{% include img.html
url="/assets/img/getting-started/webhook-flow/select_webhook.png"
title="Selecting the webhook component" %}

Type `webhook` in the search bar to find it and click on *Choose Webhook* afterwards to select it.
In the next step, you can create or choose an existing [credential](/guides/credential),
as shown in the screenshot below.

{% include img.html
url="/assets/img/getting-started/webhook-flow/choose_credentials.png"
title="Add credentials" %}

If you already have a credential for a webhook, select it to proceed.
Otherwise click on *Create new credentials* link as shown on the screenshot above.

{% include img.html
url="/assets/img/getting-started/webhook-flow/create_credentials.png"
title="Create credentials" %}

As you can see in the screenshot above there are multiple types of credentials
available to choose in the *Type* drop-down. We will cover the Webhook credential
[later in this article](#securing-your-webhooks). For now let's choose the `No Auth` option to
continue with webhook creation and click on *Save*. The result should look like in the following
screenshot.

{% include img.html
url="/assets/img/getting-started/webhook-flow/credential_types.png"
title="Types of credential" %}

Next we need to give the sample data structure which the webhook expects to receive from the external system. Click on *Add sample manually* or *Send sample request* button to add your sample. You can also just Skip the Sample. To *Send sample request* you can use [Postman](https://www.postman.com).

![Add sample manually](/assets/img/getting-started/webhook-flow/add_sample_manually.png "Add sample manually")


Paste the following `JSON` in the input field:

```js
{
  "petname": "Gromit",
  "petstatus": "Sold"
}
```

You can also generate a sample automatically:

![Generate sample](/assets/img/getting-started/webhook-flow/add_sample_auto.png)

The sample gets evaluated for the correctness of the format. Click on *Save* button to continue.

![Webhook step summary](/assets/img/getting-started/webhook-flow/webhook-step-summary.png "Webhook step summary")

Screenshot above shows the Webhook step summary page where you can add a note to describe the step and change the step name. Click on *Finish step* button to finish the Webhook step and load the component chooser again.

## Choosing the data target

We have the data source, now we need to choose the data target. After completing the trigger configuration you need to choose an `action` component to send the data from the webhook. Let us choose the *Petstore API (Node.js)* component.

![Choose Petstore component](/assets/img/getting-started/webhook-flow/choose_petstore.png "Choose Petstore component")

For that purpose type `petstore` in the search bar and you will find it. Next click on *Choose Petstore API (Node.js)* button.

Next you will see the page *Choose Credentials* where you can either use an existing credential or click on *+connect new credentials* link to create new credentials.

![Create credentials to access](/assets/img/getting-started/webhook-flow/choose_credentials_petstore.png "Create credentials to access")

Let us fill-in an input form for these two fields:

![Credential creation process](/assets/img/getting-started/webhook-flow/create-credentials_petstore.png "Credential creation process")

*   **Account name**: allows you to give your credential a meaningful name. You can leave this unchanged or give your own name.

*   **API key**: used to authenticate with the [Petstore API]({{site.data.tenant.petStoreDocs}}). Please use the API key `{{site.data.tenant.petStoreApiKey}}`.

Click on *Save* to verify the credentials. The verification can take no more than 30 seconds.

![Mapping the values](/assets/img/getting-started/webhook-flow/mapping_values.png "Mapping the values")

The screenshot above demonstrates the mapping of data between the data from webhook and the Petstore action two fields. Please select these properties by pressing the drop-down menu on the right of each input field as shown.

The `petname` gets mapped with the *Name* field and the `petstatus` with the *Status* field respectively.

![Retrieve the sample](/assets/img/getting-started/webhook-flow/retrieve_sample.png "Retrieve the sample")

On the next page click on *Retrieve sample* to retrieve the sample. When the sample gets retrieved click on *Continue*.

![Petstore step summary](/assets/img/getting-started/webhook-flow/petstore_step_summary.png "Petstore step summary")

We have finished configuring this step and reached the summary page for the *Petstore API* component. Here we can add note or change the step name. You could add more steps after this moment but we recommend you not to at this stage. 

![Publish the draft](/assets/img/getting-started/webhook-flow/publish_draft.png "Publish the draft")

Success, the first draft version of your integration flow is ready! Click on **Publish Draft** button to save this draft.

> **Note** You must publish your draft to save and proceed. You can not start your flow without publishing it.

## Running and monitoring the flow

Now that our flow is published we can start it.

![Set to live and copy the link](/assets/img/getting-started/webhook-flow/webhook_url.png "Set to live and copy the link")

Click on *Start* button to set your flow live. Before navigating away from this page copy and save the generated webhook address (URL). The URL has the following structure:
```
https://in.{{site.data.tenant.name}}/hook/FLOW_ID
```

For the demonstration purposes, we will use an application called [Postman](https://www.getpostman.com/) to `POST` payloads to the copied webhook address.

![Sending data using Postman](/assets/img/getting-started/webhook-flow/sending_data.png "Sending data using Postman")

Open the Postman and follow these steps:

1.  Choose the HTTP `POST` in the left upper corner.
2.  Paste the copied webhook URL into the address field.
3.  Select the HTTP post *Body* tab, then select *raw* and choose the `JSON (application/json)` from a drop-down selector menu. Now paste an example `JSON` into the input field. We used this `JSON`:
```js
{
  "petname": "Gromit",
  "petstatus": "Sold"
}
```
4.  Click on *Send* button in the right upper corner to send the data to your webhook flow. In response, {{site.data.tenant.name}} platform will reply with a similar message shown on the screenshot.

Keep sending your data to the webhook address.

![The view after 3 requests](/assets/img/getting-started/webhook-flow/after_3_requests.png "The view after 3 requests")

Here we have the Dashboard view after your flow gets executed 3 times. You can view the details of each execution by clicking on the name of your flow in the runlog.

Your flow is now active and working! Go ahead, make another one. Try using different [integration components](integration-component) to build more nice flows.

## Securing your webhooks

As discussed above webhooks can be secured with credentials. There are four
types of webhook credentials:

*   `No Auth` - used to make the webhook URL accessible by anyone,
*   `Basic Auth` - used to define username and password to authenticate the webhook clients using [Basic Access Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
*   `API Key Auth` - used to define an API key for the webhook clients,
*   `HMAC verification` - used to create a *HMAC* signature of the payload

Let's explore the `Basic Auth` type as an example. In the following screenshot
you see a credential configuration page when `Basic Auth` type is chosen.

![Basic Auth method](/assets/img/getting-started/webhook-flow/basic_auth_method.png "Basic Auth method")

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
  "petstatus": "Sold"
}'
```

In the example above `{FLOW_ID}` is the ID of your flow shown on the
[flow summary screen](#running-and-monitoring-the-flow). The variables
`{USERNAME}` and `{PASSWORD}` are the ones you entered when creating a
credential for your webhook.

## Related links

- [integration components](integration-component)
- [Petstore API]({{site.data.tenant.petStoreDocs}})
- [Postman](https://www.getpostman.com/)
- [Integration Component Overview](integration-component)
- [Basic Access Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
