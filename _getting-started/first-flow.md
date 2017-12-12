---
title: Creating your first integration flow?
layout: article
section: Tutorials
order: 1
category: integration-flow
---

In this article we will cover how to create your first [integration flow](integration-flow) to synchronize the data between two applications or services. We assume that this is your first experience with the {{site.data.tenant.name}} platform and present every step in detail. Please follow the steps to create your first fully functioning integration flow.

## Choosing the data source

![Start creating your first flow](/assets/img/getting-started/first-flow/getting-started-flow-001.png "Start creating your first flow")

When you login first time you will have a similar view of the **{{site.data.tenant.name}}** platform. Click to start creating your first flow.

After clicking on `+Add new flow` button you will see the **integration designer** which is the place to build integrations from reusable integration components. An integration flow always starts with a `trigger` component which is responsible to retrieve data from the data source. Let's find the `Petstore component` in the designer.

![Select our Petstore component](/assets/img/getting-started/first-flow/getting-started-flow-002.png "Select our Petstore component")

For that purpose type `petstore` in the search bar and you will find it. Next click on `Choose Petstore API (Node.js)` button.

![Create the credentials to access](/assets/img/getting-started/first-flow/getting-started-flow-003.png "Create the credentials to access")

Next you will see the page **Choose Credentials** where you need to click on **+connect new credentials** link to create your first credentials. Let us fill-in an input form for these two fields:
*   **Account name** - you can leave this unchanged or provide your own.
*   **API key** - please use `elasticio` to get access to our [Petstore API](https://petstore.elastic.io/docs/).

![Select the trigger](/assets/img/getting-started/first-flow/getting-started-flow-004.png "Select the trigger")

Click on **Save** to verify the credentials. This process takes not more than 30 seconds. Upon completion you will see the page to choose the Trigger for the Petstore API (Node.js) component. Select for example the **Get Pets By Status With Promises** radio button to continue.

![Choose trigger parameter](/assets/img/getting-started/first-flow/getting-started-flow-005.png "Choose trigger parameter")

The **Get Pets By Status With Promises** trigger returns Available, Pending and Sold values for the **Pet Status** parameter. Click on drop-down menu to open it. Select the **Available** option and click on continue.

![Retrieve the sample](/assets/img/getting-started/first-flow/getting-started-flow-006.png "Retrieve the sample")

Now we retrieve a sample from Petstore API where the pet status is `Available`.

![Choose this sample](/assets/img/getting-started/first-flow/getting-started-flow-007.png "Choose this sample")

When the process is successful you will see the following page to choose retrieved sample.

![Continue to finish step1 configuration](/assets/img/getting-started/first-flow/getting-started-flow-008.png "Continue to finish step1 configuration")

Next you will see the Retrieve sample page again. **Please click on Continue button here to go further.**

**Please don't click on retrieve sample from Petstore API (Node.js) button again.** You will be getting back to the previous stage to select the sample again. This is not a problem, but not necessary at this stage.

## Choosing the data target

After choosing the data source now we need to choose the data target. After completing the last stage above you will get back to the component chooser again so that you can select your next integration component to build the integration flow.

![Choosing the E-mail component](/assets/img/getting-started/first-flow/getting-started-flow-009.png "Choosing the E-mail component")

Let us choose the **E-mail** component and we find it in the component list similarly.

![Input fields for E-mail component](/assets/img/getting-started/first-flow/getting-started-flow-010.png "Input fields for E-mail component")

For E-mail component there is no need to go through credential creation stage. We jump into configuration of the **To**, **Subject** and **Body** input fields.

**To field** expects a standard e-mail address in a `string` format like `"your@email.com"`

Please enter your e-mail address to receive the message. Note that if you enter the address without `" "` it will get rejected.

**Subject field** expects a `string`. Here we use some advance JSONata expression:

```
$count(pets.id) & " " & "new pets found"
```

Please note that we will not dive into JSONata at the moment, copy and paste this expression into the **Subject** field.

**Body field** expects a `string` data format as well. Here is another JSONata expression to copy and paste:

```
"Darling, I found some adorable pets for us. Here are their names: " & $join(pets.name, ", ") &". Which one shall I buy?"
```

![Retrieve a sample from Email](/assets/img/getting-started/first-flow/getting-started-flow-011.png "Retrieve a sample from Email")

Click continue after filling-in the input form to proceed further. On next page click on **Retrieve sample from E-Mail** to start the process of sample generation.

![Continue with the Email components' sample](/assets/img/getting-started/first-flow/getting-started-flow-012.png "Continue with the Email components' sample")

When the sample gets retrieved click on **Choose this sample** to proceed further.

![Almost done with the flow](/assets/img/getting-started/first-flow/getting-started-flow-013.png "Almost done with the flow")

We have almost reached the end of flow configuration. Two components are already selected and it would be enough for this example. You could add more steps after this moment but we would advise you not to at this stage. Click on **I'm done** button once.

![Save and continue](/assets/img/getting-started/first-flow/getting-started-flow-014.png "Save and continue")

You can name your integration flow or accept the suggested name by clicking on **I'm done** one more time to finish and save your flow.


## Running and monitoring the flow

Success, your integration flow is ready!

![Click to start your flow](/assets/img/getting-started/first-flow/getting-started-flow-015.png "Click to start your flow")

Now you can start you flow by clicking **Start Flow** button.

![Flow is active](/assets/img/getting-started/first-flow/getting-started-flow-016.png "Flow is active")

Your flow is now active and you can not edit any configurations unless you stop your flow. Go to Dashboard to see the results of your first integration flow execution.

![Dashboard with first execution](/assets/img/getting-started/first-flow/getting-started-flow-017.png "Dashboard with first execution")

Here we are in the Dashboard view where in the **Runlog** part you can see the first execution. You can come back to this view from everywhere by clicking the Dashboard icon in the left-side menu. Let us check the details of the execution by clicking on the name of the flow in the runlog.

![Flow execution view](/assets/img/getting-started/first-flow/getting-started-flow-018.png "Flow execution view")

Here we are in the execution view. Click on the component icons to view the logs for each step in your first integration flow. When you have examined all the logs you can return to the Dashboard. After couple of minutes we can visit the Dashboard again.

![Dashboard with 3 executions](/assets/img/getting-started/first-flow/getting-started-flow-019.png "Dashboard with 3 executions")

Here we have the Dashboard view after your flow gets executed 3 times. You can view the details of each execution by clicking on the name of your flow in the runlog.

Your flow is now active and working! Go ahead, make another one. Try using different [integration components](integration-component) to build your flow.
