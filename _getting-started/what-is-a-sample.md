---
title: What is a Sample?
collection: Getting Started
layout: article
section: Basic Concepts
category: component
order: 1
since: 20190208
---

In this article we are going to talk about Date Samples and find out what lays behind the `Data Sample` term. 

## Introducing Sample 

In terms of our platform by the `Data Sample,` we should understand some specific data example (representation) that is being retrieved from an external server, API system or platform. This is a key component for data mapping and building an integration flows.

The Date Sample will work (and will be available for retrieving) while configuring the Flow only. Please see this [article](#getting-started/first-flow.html) for more information on how to configure an Integration Flow properly. 

> **Please note**, the `Data Sample` is not a predefined set of tools that is used to for simplifying any routine tasks. It is a specific tool made for system's steps debugging and its proper setup.

Bottom line, the sample is made for two things:

1. It is a bug tracking tool (basically, it acts as a Console Log).

2. And an Input Data example for the next step in a Flow.


To demonstrate how the samples are working; let's consider an example of creating a Flow.

## Building a Flow

Let's consider a case where we would need connecting to some of the External API source and retrieving the necessary data from it. 

1. So the first step will be logging in and creating a flow. To do that, please navigate to your *Workspace > Integrate > Flows* and click the *Add New Flow* button in the upper right corner.
![Adding New Flow](/assets/img/getting-started/sample/adding-new-flow.png "Adding New Flow")  
2. Click the *Add your first step* button to start and select the necessary component. We would go for the *Petstore API (Node.js)* one. In case you need to set up the *Webhook Flow* check this [article](#getting-started/webhooks-flow.html) for more information.
![Selecting Component](/assets/img/getting-started/sample/selecting-component.png "Selecting Component") 
3. On the next step you will be asked to enter (or connect new) the necessary credentials to proceed further.
4. On the *Choose Trigger/Action* step you would need to select the necessary function. Let's go with the *Get Pets By Status With Generators.*get-pets.png
![Choose Trigger](/assets/img/getting-started/sample/get-pets.png "Choose Trigger")
5. In this step we will get our data mapped. Refer to this [article](#guides/mapping-data.html) for more details regarding the mapping data. For now, please choose the needed status on the *Configure Input* tab and click *Continue* to retrieve all the pets with the necessary status. 
![Pet Status](/assets/img/getting-started/sample/pet-status.png "Pet Status")
6. Here is an essential step where we are getting our Samples. Let's describe what has just happened here. We connected to an external API source and sent a request to retrieve the specific data (Pets with the 'available' status). As an evaluation result we received the following code:
```sh
{
  "pets": [
    {
      "category": {
        "name": "dogs",
        "id": 1
      },
      "name": "Brownie",
      "status": "available",
      "id": 1
    },
    {
      "category": {
        "name": "dogs",
        "id": 1
      },
      "name": "Doggie",
      "status": "available",
      "id": 2
    },
    {
      "category": {
        "name": "dogs",
        "id": 1
      },
      "name": "Fluffy",
      "status": "available",
      "id": 3
    },
    {
      "category": {
        "name": "dogs",
        "id": 1
      },
      "name": "Toffy",
      "status": "available",
      "id": 4
    },
    {
      "category": {
        "name": "cats",
        "id": 2
      },
      "name": "Rambo",
      "status": "available",
      "id": 5
    },
    {
      "category": {
        "name": "dods",
        "id": 1
      },
      "name": "Attila",
      "status": "available",
      "id": 6
    },
    {
      "category": {
        "name": "dogs",
        "id": 1
      },
      "name": "Rocky",
      "status": "available",
      "id": 7
    },
    {
      "category": {
        "name": "cats",
        "id": 2
      },
      "name": "Cattie",
      "status": "available",
      "id": 8
    }
  ]
}
```
![Retrieving Samples](/assets/img/getting-started/sample/retrieving-samples.png "Retrieving Samples")
7. We have already checked that there were no bugs or any kind of errors during the component set up and all the requested data was successfully retrieved from an external API source. So we got all the necessary input data for setting up the next component in our Flow. Let's click the *Continue* button to move on.
![Summary](/assets/img/getting-started/sample/summary.png "Summary")
8. Now we can send the following data to where ever we need. Let's go with setting up the *E-mail* component to be able transferring the data to the permanent e-mail address.
![E-mail Component](/assets/img/getting-started/sample/email-component.png "E-mail Component")
9. Fill in all the required e-mail credentials on the *Configure Input* step. Use the ``` '' ``` apostrophes for your e-mail address, for example ```your_email@mail.com ```. You can also enter the following string ``` pets[0].name ``` to get the first available pet shown in the subject field. This string ```$string($$)``` in the *body* will provide you with the following output in the body of your e-mail message:
```sh
{
    "pets": [
        {
            "category": {
                "name": "dogs", 
                "id": 1
            }, 
            "name": "Brownie", 
            "status": "available", 
            "id": 1
        }, 
        {
            "category": {
                "name": "dogs", 
                "id": 1
            }, 
            "name": "Doggie", 
            "status": "available", 
            "id": 2
        }, 
        {
            "category": {
                "name": "dogs", 
                "id": 1
            }, 
            "name": "Fluffy", 
            "status": "available", 
            "id": 3
        }, 
        {
            "category": {
                "name": "dogs", 
                "id": 1
            }, 
            "name": "Toffy", 
            "status": "available", 
            "id": 4
        }, 
        {
            "category": {
                "name": "cats", 
                "id": 2
            }, 
            "name": "Rambo", 
            "status": "available", 
            "id": 5
        }, 
        {
            "category": {
                "name": "dods", 
                "id": 1
            }, 
            "name": "Attila", 
            "status": "available", 
            "id": 6
        }, 
        {
            "category": {
                "name": "dogs", 
                "id": 1
            }, 
            "name": "Rocky", 
            "status": "available", 
            "id": 7
        }, 
        {
            "category": {
                "name": "cats", 
                "id": 2
            }, 
            "name": "Cattie", 
            "status": "available", 
            "id": 8
        }
    ], 
    "elasticio": {
        "step_1": {
            "metadata": { }, 
            "headers": { }, 
            "body": {
                "pets": [
                    {
                        "category": {
                            "name": "dogs", 
                            "id": 1
                        }, 
                        "name": "Brownie", 
                        "status": "available", 
                        "id": 1
                    }, 
                    {
                        "category": {
                            "name": "dogs", 
                            "id": 1
                        }, 
                        "name": "Doggie", 
                        "status": "available", 
                        "id": 2
                    }, 
                    {
                        "category": {
                            "name": "dogs", 
                            "id": 1
                        }, 
                        "name": "Fluffy", 
                        "status": "available", 
                        "id": 3
                    }, 
                    {
                        "category": {
                            "name": "dogs", 
                            "id": 1
                        }, 
                        "name": "Toffy", 
                        "status": "available", 
                        "id": 4
                    }, 
                    {
                        "category": {
                            "name": "cats", 
                            "id": 2
                        }, 
                        "name": "Rambo", 
                        "status": "available", 
                        "id": 5
                    }, 
                    {
                        "category": {
                            "name": "dods", 
                            "id": 1
                        }, 
                        "name": "Attila", 
                        "status": "available", 
                        "id": 6
                    }, 
                    {
                        "category": {
                            "name": "dogs", 
                            "id": 1
                        }, 
                        "name": "Rocky", 
                        "status": "available", 
                        "id": 7
                    }, 
                    {
                        "category": {
                            "name": "cats", 
                            "id": 2
                        }, 
                        "name": "Cattie", 
                        "status": "available", 
                        "id": 8
                    }
                ]
            }, 
            "attachments": { }, 
            "id": "64e34181-0524-4314-8e10-ff21d792469a"
        }
    }
}
```
![Configure Input Email](/assets/img/getting-started/sample/configure-input-email.png "Configure Input Email")
10. Now we are retrieving the Sample to make sure everything is working as it should. Click *Retrieve sample from E-Mail* button on the *Generate sample* tab to make sure everything work properly. As we can see the Logs look fine, there is no errors. So we can Use this sample and finishing up with your Flow setup.
![Retrieving Email Sample](/assets/img/getting-started/sample/retrieving-sample-email.png "Retrieving Email Sample")
11. This is how our *Data Samples Flow* should look. All we have to do now is click the *Publish the Draft* button and *Start the Flow*.
![Flow Overview](/assets/img/getting-started/sample/flow-overview.png "Flow Overview")
12. As a result we should receive an e-mail message with the following output.
![Successful Email Message](/assets/img/getting-started/sample/successful-email-message.png "Successful Email Message")

That is how the `Data Samples` is used within our platform.

## Summary

Below are some of the key features we have learned from this article.

* It is essential to understand that the `Data Sample` is not a predefined set of tools. It is a specific tool for retrieving data from an external source;

* The `Data Sample` will only work while configuring an integration flow;

* The `Data Samples` were made for debugging and as the specific input data example for a next step's functional check.
