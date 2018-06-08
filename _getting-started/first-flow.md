---
title: Creating your first integration flow?
layout: article
section: Tutorials
order: 1
category: integration-flow
since: 20171218
---

In this article we will cover how to create your first [integration flow](integration-flow) to synchronize the data between two applications or services.

We assume that this is your first experience with the {{site.data.tenant.name}} platform, so we explain every step in detail. Please follow these steps to create your first integration flow.

## Choosing the data source

When you login first time you will have a similar view of the {{site.data.tenant.name}} platform.

![Start creating your first flow](/assets/img/getting-started/first-flow/getting-started-flow-001.png "Start creating your first flow")

To start click on *+Add new flow* button to load the integration flow designer.

The designer helps building the flows from the reusable integration components such as `triggers` and `actions`.
Every integration flow starts with a `trigger` component to retrieve data from the source. To start let us find the
*Petstore component* in the list of integration components.

![Select our Petstore component](/assets/img/getting-started/first-flow/getting-started-flow-002.png "Select our Petstore component")

For that purpose type `petstore` in the search bar and you will find it. Next click on *Choose Petstore API (Node.js)* button.

![Create the credentials to access](/assets/img/getting-started/first-flow/getting-started-flow-003.png "Create the credentials to access")

Next you will see the page *Choose Credentials* where you need to click on *+connect new credentials* link to create your first credentials. Let us fill-in an input form for these two fields:
*   **Account name** - you can leave this unchanged or provide your own.
*   **API key** - please use `{{site.data.tenant.petStoreApiKey}}` to get access to our [Petstore API]({{site.data.tenant.petStoreDocs}}).

Click on *Save* to verify the credentials. The verification can take no more than 30 seconds. Upon completion you will
see the page to choose one of the 3 triggers available in the Petstore component.

![Select the trigger](/assets/img/getting-started/first-flow/getting-started-flow-004.png "Select the trigger")

Typically a component can have more than one triggers to retrieve different objects from the source API. Here we use the Petstore
component to learn the {{site.data.tenant.name}} platform. It provides 3 different triggers to retrieve
pets by their status. These 3 triggers differ by the implemented code style. So select any of them, for example
click on the *Get Pets By Status With Promises* radio button to continue.

![Choose trigger parameter](/assets/img/getting-started/first-flow/getting-started-flow-005.png "Choose trigger parameter")

The *Get Pets By Status With Promises* trigger returns `Available`, `Pending` and `Sold` values for the `Pet Status` parameter. Click on drop-down menu to open it. Select the `Available` option and click on *Continue* button.

![Retrieve the sample](/assets/img/getting-started/first-flow/getting-started-flow-006.png "Retrieve the sample")

Now we retrieve a sample from Petstore API where the pet status is `Available`. When the process is successful you will see the following page to choose retrieved sample.

![Choose this sample](/assets/img/getting-started/first-flow/getting-started-flow-007.png "Choose this sample")

Click to *Choose this sample* and continue. Next you will see the Retrieve sample page again.

![Continue to finish step1 configuration](/assets/img/getting-started/first-flow/getting-started-flow-008.png "Continue to finish step1 configuration")

Please click on Continue button here to go further.

> **Note**: Please don't click on *Retrieve sample from Petstore API (Node.js)* button again. You will get back to the earlier stage to select the sample again. This is not a problem, but unnecessary at this stage.

## Choosing the data target

We have the data source, now we need to choose the data target. After completing the trigger configuration you need to choose an `action` component to send the data from the Petstore API to. Let us choose the *E-Mail* component.

![Choosing the E-mail component](/assets/img/getting-started/first-flow/getting-started-flow-009.png "Choosing the E-mail component")

We can find it in the list of components. The E-Mail component has no credentials, so we jump directly to the mapping of data between Petstore and E-Mail components.

![Input fields for E-mail component](/assets/img/getting-started/first-flow/getting-started-flow-010.png "Input fields for E-mail component")

The screenshot above demonstrates the mapping of data between the Petstore trigger and E-Mail action. The E-Mail components requires a configuration of 3 following fields to work properly:

*   **To** field: expects an e-mail address wrapped by colons, such as `"your@email.com"`. E-Mail component will use this field to send the data to. Note that if you enter the address without wrapping them by `" "` it will get rejected.

*   **Subject** field: expects email's subject as a `string` expression. Here we use some advance JSONata expression: `$count(pets.id) & " " & "new pets found"`
Please note that we will not dive into JSONata at the moment, copy and paste this expression into the *Subject* field.

*   **Body** field: expects email's body as a `string`. Here is another JSONata expression to copy and paste:
``
"Darling, I found some adorable pets for us. Here are their names: " & $join(pets.name, ", ") &". Which one shall I buy?"
``

Click *Continue* after filling-in the form to continue.

![Retrieve a sample from Email](/assets/img/getting-started/first-flow/getting-started-flow-011.png "Retrieve a sample from Email")

On the next page click on *Retrieve sample from E-Mail* to retrieve the sample.

![Continue with the Email components' sample](/assets/img/getting-started/first-flow/getting-started-flow-012.png "Continue with the Email components' sample")

When the sample gets retrieved click on *Choose this sample* to continue.

![Almost done with the flow](/assets/img/getting-started/first-flow/getting-started-flow-013.png "Almost done with the flow")

We have finished configuring this demonstration flow. You could add more steps after this moment but we recommend you not to at this stage. Click on *I’m done* button once.

![Save and continue](/assets/img/getting-started/first-flow/getting-started-flow-014.png "Save and continue")

You can name your integration flow or accept the suggested name by clicking on *I'm done* one more time to finish and save your flow.


## Running and monitoring the flow

Success, your integration flow is ready!

![Click to start your flow](/assets/img/getting-started/first-flow/getting-started-flow-015.png "Click to start your flow")

Now you can start you flow by clicking *Start Flow* button.

![Flow is active](/assets/img/getting-started/first-flow/getting-started-flow-016.png "Flow is active")

Your flow is now active, congratulations! You can not edit your flow without stopping it. Go to Dashboard to see the results of your first integration flow execution.

![Dashboard with first execution](/assets/img/getting-started/first-flow/getting-started-flow-017.png "Dashboard with first execution")

Here we are in the Dashboard view. In the *Runlog* part you can see the first execution. You can come back to this view from everywhere by clicking the Dashboard icon in the left-side menu. Let us check the details of the execution by clicking on the name of the flow in the runlog.

![Flow execution view](/assets/img/getting-started/first-flow/getting-started-flow-018.png "Flow execution view")

Here we are in the execution view. Click on the component icons to view the logs for each step in your first integration flow. When you have examined the logs, you can return to the Dashboard. After a couple of minutes we can visit the Dashboard again.

![Dashboard with 3 executions](/assets/img/getting-started/first-flow/getting-started-flow-019.png "Dashboard with 3 executions")

Here we have the Dashboard view after your flow gets executed 3 times. You can view the details of each execution by clicking on the name of your flow in the runlog.

Your flow is now active and working! Go ahead, make another one. Try using different [integration components](integration-component) to build your flow.
