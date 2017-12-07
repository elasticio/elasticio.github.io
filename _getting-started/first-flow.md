---
title: Creating your first integration flow?
layout: article
section: Tutorials
order: 1
category: integration-flow
---

In this article we will cover how to create your first [integration flow](integration-flow) to synchronize the data between two applications or services. We assume that this is your first experience with the {{site.data.tenant.name}} platform and present every step in detail. Please follow the steps to create your first fully functioning integration flow.

## Step1 Petstore component

When you login first time you will have a similar view of the **{{site.data.tenant.name}}** platform. Click to start with your first flow:

![Start creating your first flow](/assets/img/getting-started/first-flow/getting-started-flow-001.png "Start creating your first flow")

After clicking on **+Add new flow** you will see the list of integration components where you can choose the **Petstore API (Node.js)** component. Type `petstore` in the search bar to find it:

![Select our Petstore component](/assets/img/getting-started/first-flow/getting-started-flow-002.png "Select our Petstore component")

Next you will see the page **Choose Credentials** where you need to click on **+connect new credentials** link to create your first credentials. Let us fill-in an input form for these two fields:
*   **Account name** - you can leave this unchanged or provide your own.
*   **API key** - please use `elasticio` to get access to our [Petstore API](https://petstore.elastic.io/docs/).

![Create the credentials to access](/assets/img/getting-started/first-flow/getting-started-flow-003.png "Create the credentials to access")

Click on **Save** to verify the credentials. This process takes not more than 30 seconds. Upon completion you will see the page to choose the Trigger for the Petstore API (Node.js) component. Select for example the **Get Pets By Status With Promises** radio button to continue.

![Select the trigger](/assets/img/getting-started/first-flow/getting-started-flow-004.png "Select the trigger")

The **Get Pets By Status With Promises** trigger returns Available, Pending and Sold values for the **Pet Status** parameter. Click on drop-down menu to open it. Select the **Available** option and click on continue.

![Choose trigger parameter](/assets/img/getting-started/first-flow/getting-started-flow-005.png "Choose trigger parameter")

Now we retrieve a sample from Petstore API where the pet status is `Available`:

![Retrieve the sample](/assets/img/getting-started/first-flow/getting-started-flow-006.png "Retrieve the sample")

When the process is successful you will see the following page to choose retrieved sample:

![Choose this sample](/assets/img/getting-started/first-flow/getting-started-flow-007.png "Choose this sample")

Next you will see the Retrieve sample page again. **Please click on Continue button here to go further.**

![Continue to finish step1 configuration](/assets/img/getting-started/first-flow/getting-started-flow-008.png "Continue to finish step1 configuration")

**Please don't click on retrieve sample from Petstore API (Node.js) button again.** You will be getting back to the previous stage to again select the sample. This is not a problem, but not necessary at this stage.

## Step2 E-mail component

After the last stage in step1 you will be getting back to the component chooser again so that you can select your next integration component to build the integration flow.

Let us choose the **E-mail** component and we find it in the component list similarly:

![Choosing the E-mail component](/assets/img/getting-started/first-flow/getting-started-flow-009.png "Choosing the E-mail component")

For E-mail component there is no need to go through credential creation stage. We jump into configuration of the **To**, **Subject** and **Body** input fields.

![Input fields for E-mail component](/assets/img/getting-started/first-flow/getting-started-flow-010.png "Input fields for E-mail component")

**To field** expects a standard e-mail address in a `string` format like:

```
"your@email.com"
```

Please enter your e-mail address to receive the message. Note that if you enter the address without `" "` it will get rejected.

**Subject field** expects a `string`. Here we use some advance JSONata expression:

```
$count(pets.id) & " " & "new pets found"
```

Please note that we will not necessary dive into JSONata at the moment. This is an example to copy and paste into the **Subject** field.

**Body field** expects a `string` data format as well. Here is another JSONata expression to copy and paste:

```
"Darling, I found some adorable pets for us. Here are their names: " & $join(pets.name, ", ") &". Which one shall I buy?"
```

Click continue after filling-in the input form to proceed further.

![text](/assets/img/getting-started/first-flow/getting-started-flow-011.png "text")

![text](/assets/img/getting-started/first-flow/getting-started-flow-012.png "text")

![text](/assets/img/getting-started/first-flow/getting-started-flow-013.png "text")

![text](/assets/img/getting-started/first-flow/getting-started-flow-014.png "text")

![text](/assets/img/getting-started/first-flow/getting-started-flow-015.png "text")

![text](/assets/img/getting-started/first-flow/getting-started-flow-016.png "text")

![text](/assets/img/getting-started/first-flow/getting-started-flow-017.png "text")

![text](/assets/img/getting-started/first-flow/getting-started-flow-018.png "text")

![text](/assets/img/getting-started/first-flow/getting-started-flow-019.png "text")
