---
title: IPass Core Usage Example
layout: component
description: Usage Example for the IPass Core component
icon: ipaas-core.png
icontext: IPaas Core component
category: ipaas-core
updatedDate: 2022-12-02
ComponentVersion: 1.5.1
---

This article will show you where and how to use the IPaas Core component. Through a few examples, you'll discover some of the component's possible use cases and gain a better understanding of how it works.

## Calculate Flow Dependencies

The Calculate Flow Dependencies function is designed to retrieve information about a flow **in the current workspace**, including its topics, secrets, credentials, and components. This information can be further processed for various use cases. For example, you could use this function to obtain the necessary data to generate a report about a particular flow. To illustrate, consider the following simple flow.

![image4.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ae249693-a784-4848-98b1-f29f4df0770f/image4.png)

To use the component, we need to specify the mode as **Calculate Flow Dependencies**, create the necessary credentials for authentication, and specify the flow ID of the flow we want to retrieve dependencies for. The 'Calculate Flow Dependencies' mode instructs the component to retrieve information about the flow's topics, secrets, credentials, and components, which can be used for further data processing or analysis.

>**Please Note:** If the user creating the flow using this component has access to the flow whose dependencies need to be retrieved, the fields for the credentials can be left blank. In this case, the component will automatically use the current user's email, API key, and platform instance URL. However, it is still necessary to create the credentials for authentication purposes.

In this example, we specify the FlowID of the flow shown in the screenshot below. When the flow is executed and the HTTPReply component is triggered, the result message returned will be a confirmation that the flow has been successfully executed. The message will contain relevant information about the flow's execution status and any errors encountered during the process.

![image2.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9c2776ce-98b3-46ca-bafc-37c579e3845d/image2.png)

<details close markdown="block"><summary><strong>Result</strong></summary>

```json
{
  "responseBody": {
    "topics": [],
    "credentials": [
      {
        "id": "WEBHOOK_CREDENTIALS_ID",
        "name": "Test no auth creds",
        "component": {
          "id": "55ba18e35d04040500000004",
          "name": "webhook",
          "team_name": "elasticio"
        }
      },
      {
        "id": "DROPBOX_CREDENTIALS_ID",
        "name": "Test creds",
        "component": {
          "id": "5e8edcd78e3acb9d03765511",
          "name": "dropbox-component",
          "team_name": "elasticio"
        }
      }
    ],
    "secrets": [
      {
        "id": "REST_API_SECRETS_ID",
        "name": "Rest dropbox auth",
        "auth_client": {
          "id": "REST_API_AUTH_CLIENT_ID",
          "name": "REST API api-key"
        },
        "component": {
          "id": "5f7f16a5eceeac001187426e",
          "name": "rest-api-v2",
          "team_name": "elasticio"
        }
      }
    ],
    "components": [
      {
        "id": "55ba18e35d04040500000004",
        "repo_name": "webhook",
        "team_name": "elasticio",
        "title": "Webhook",
        "description": "Webhooks allow you to collect information about events as they happen in near real-time. Provide a URL, select when and where you want that URL to receive data about events on your list, and we'll send it to you as the events take place.  It is recommended that you specify a URL using https.",
        "name": "webhook",
        "version_number": "1.2.11"
      },
      {
        "id": "5f7f16a5eceeac001187426e",
        "repo_name": "rest-api-v2",
        "team_name": "elasticio",
        "title": "REST API V2",
        "description": "A generic connector for accessing HTTP and REST APIs .",
        "name": "rest-api-v2",
        "version_number": "2.0.13"
      },
      {
        "id": "610bb01937de140011488619",
        "repo_name": "csv-v3",
        "team_name": "elasticio",
        "title": "CSV",
        "description": "A comma-separated values (CSV) file stores tabular data (numbers and text) in plain-text form",
        "name": "csv-v3",
        "version_number": "3.1.5"
      },
      {
        "id": "5e8edcd78e3acb9d03765511",
        "repo_name": "dropbox-component",
        "team_name": "elasticio",
        "title": "Dropbox",
        "description": "Dropbox is a cloud storage service, which allows anyone upload and transfer files to the cloud, and access files later.",
        "name": "dropbox-component",
        "version_number": "5"
      }
    ]
  },
  "statusCode": 200
}
```

</details>

>**Please note** that in order for this component to function properly, the flow must be fully created and published, rather than just in draft form with an assigned ID. If the flow is not published and remains in draft status, the output may not be as expected, as shown in the example below.

![image1.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/495509a0-4d1f-4210-b8d9-052472e63dce/image1.png)

## Lookup Object (at Most One)

The Lookup Object (at Most One) feature allows you to get complete information about a flow by several criteria. During component configuration, you can select the object type (currently only the Flow type is available).

It is also necessary to select the unique criteria by which the search will be carried out. At the moment there are 3 viable options: by FlowID, by Flow Name & WorkspaceID, and by Flow Name & Workspace Name. It is also possible to specify with two checkboxes whether to allow empty results and the possibility of criteria to be omitted.

When using this component, it is important to select the unique criteria that will be used for the search. There are currently three viable options available:
* searching by FlowID
* searching by Flow Name and WorkspaceID
* searching by Flow Name and Workspace Name.

Additionally, there are two checkboxes that can be used to allow empty results and to indicate whether criteria can be omitted.

During the mapping stage, you can specify which flow you want to retrieve by selecting the search criteria defined in the mapping. This allows you to retrieve the specific data you need from the identified flow.

*Note: Actually, the search for your criteria has already been performed after completing the configuration settings and you only need to select from the options, to do this you can hover over the question mark and see which options are available based on your credentials specified in the credentials configuration step.*

![image3.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d396775e-b34e-424f-8232-cb9a7d6a3c6a/image3.png)

Also, in the mapping step, you can select two additional options Include Data Samples and Remove Non-writeable Properties. Both parameters handle the content of the resulting message. With Include Data Samples enabled, you can see additional information about the Samples in the flow components. And with Remove Non-Writeable Properties, you will remove from the message some of the flow attributes that the integrator can write (see the [documentation of the Ipaas core component](https://docs.elastic.io/components/ipaas-core/index.html#lookup-object-at-most-one) for more details).

The only possible use of this component is to obtain complete information about the flow with the ability to further process this data. In the example below I have shown how to sample flow data from the screenshot below. During configuration, the data samples and non-writable properties were turned off to reduce the size of the text in the example.

![image8.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2a0de32f-2f56-402e-8697-4dbcdee3dbc1/image8.png)

**Data sample for flow on the screenshot above:**

```json
{
  "id": "633c0f1bc77907001212b27a",
  "type": "flow",
  "links": {
    "self": "/v2/flows/633c0f1bc77907001212b27a"
  },
  "attributes": {
    "api_version": "2.0",
    "default_mapper_type": "jsonata",
    "description": null,
    "graph": {
      "nodes": [
        {
          "id": "step_1",
          "component_id": {
            "componentId": "55ba18e35d04040500000004",
            "componentDevTeam": "elasticio",
            "componentName": "webhook",
            "componentSemanticVersion": "1.2.11"
          },
          "command": {
            "actionOrTrigger": "receive",
            "componentVersion": "29564aa50829942d81c821550cbb6a97cd168f61"
          },
          "name": "",
          "description": "",
          "first": true,
          "credentials_id": {
            "credentialId": "Credential_ID",
            "credentialName": "Credential_name"
          }
        },
        {
          "id": "step_2",
          "component_id": {
            "componentId": "58a30bd961763000199ba049",
            "componentDevTeam": "elasticio",
            "componentName": "filter",
            "componentSemanticVersion": "1.1.3"
          },
          "command": {
            "actionOrTrigger": "SimpleJSONataFilter",
            "componentVersion": "4194b4d2b5d7d6c3dce0ec2747df8ca08c064554"
          },
          "name": "",
          "description": "",
          "fields": {
            "expression": "$exists($.\"Product_discount\") != 0",
            "assertion": true
          }
        },
        {
          "id": "step_3",
          "component_id": {
            "componentId": "59a3e5d4418dee00192eb0b6",
            "componentDevTeam": "elasticio",
            "componentName": "jsonata",
            "componentSemanticVersion": "1.0.11"
          },
          "command": {
            "actionOrTrigger": "transform",
            "componentVersion": "6d2f7160f70b7fb871194ec587ad009509788355"
          },
          "name": "",
          "description": "",
          "fields": {
            "expression": "{\n\"Sale_price\":$getPassthrough().\"step_1\".body.\"Product_price\"-$round($getPassthrough().\"step_1\".body.\"Product_price\")*($getPassthrough().\"step_1\".body.\"Product_discount\"/100)\n}"
          }
        }
      ],
      "edges": [
        {
          "id": "step_1:step_2",
          "source": "step_1",
          "target": "step_2"
        },
        {
          "id": "step_2:step_3",
          "source": "step_2",
          "target": "step_3"
        }
      ]
    },
    "nodes_config": {},
    "name": "Filter component",
    "type": "ordinary",
    "stats_enabled": true
  },
  "relationships": {
    "user": {
      "data": {
        "id": "607013a4a17cbd0011eaa456",
        "type": "user"
      },
      "links": {
        "self": "/v2/users/607013a4a17cbd0011eaa456"
      }
    },
    "workspace": {
      "data": {
        "id": "58dcfe0f52f01e0019e7484e",
        "type": "workspace"
      },
      "links": {
        "self": "/v2/workspaces/58dcfe0f52f01e0019e7484e"
      }
    },
    "versions": {
      "links": {
        "related": "/v2/flows/633c0f1bc77907001212b27a/versions"
      }
    },
    "latest_version": {
      "data": {
        "id": "9bf56c63ec17ee4c7ce046954e58cc447313418f",
        "type": "flow-version"
      },
      "links": {
        "self": "/v2/flows/633c0f1bc77907001212b27a/versions/9bf56c63ec17ee4c7ce046954e58cc447313418f",
        "related": "/v2/flows/633c0f1bc77907001212b27a/versions/9bf56c63ec17ee4c7ce046954e58cc447313418f"
      }
    }
  }
}
```

*Note. When using a function with the ability to search by flow name, you may encounter a situation of duplicate flow names. Be vigilant to avoid duplicate flow names, it will help prevent errors like those in the screenshot below.*

![image7.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/be0cc7af-9f1d-424d-8bdd-1d13338d2e85/image7.png)

# **Lookup Objects (plural)**

The IPaas core component can operate in Lookup Objects (plural) mode. As the name implies, it is the same as the Lookup object(at most one) but is designed to get data from multiple flows at the same time.

The principle of configuration is almost no different from the Lookup object(at most one) except for a few things. First, at the configuration stage, it is possible to select Emitting behavior (emit individually, emit page and fetch all). This is typical for all components which can emit data about multiple objects and is responsible for the format of emitting data.

![image5.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/59e9e507-19b0-4766-9962-aff8b0e7e489/image5.png)

There are three standard fields in the settings: Sort flows list by certain fields, Search Criteria and Remove Non-Writeable Properties, and Page Size and Page Number, provided that Emit page mode was selected in the configuration settings.

![image6.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0b501ddc-32f8-46e5-92bc-14b6a9c40fe8/image6.png)

The first of the three main mapping parameters are the Sort flows list by certain fields to set the desired sorting for the received objects. Among the allowed values created_at, updated_at, name, and by the same value, but in descending order (respectively a variable with a minus sign, like "-name")

Also, a boolean parameter Remove Non Writable Properties, which allows you to specify whether the final data needs to use values as in Lookup Object(at most one)

And the most important parameter is Search Criteria, which allows you to specify a sorting criterion for finding the right flow. Among the criteria, you can explicitly specify filter by draft, status, type, user, and search by name or description (see the [documentation](https://docs.elastic.io/components/ipaas-core/index.html#lookup-objects-plural) for details)

The main and only use of this flow is, as in the case with Lookup Object(at most one) to get complete information about the flows by a given criterion. This action can be used to obtain data for further processing or to obtain information about the number of flows with a certain criterion, that is, to collect statistics.

An example would be a simple flow structure with an iPaaS component. For example, the workspace specified in the credentials has several flows with the word HJSON in the flow name. You can use the Lookup Objects(plural) function with HJSON in the search criteria to display all information about these flows.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1746ae44-ac8f-4b54-8f8a-9e77b34e8e15/Untitled.png)

As a result, we will get complete information about these flows. For brevity, we will cut out some of the information about the flows, since it corresponds to the information provided by the Lookup Objects(at most one) function.

```json
{
  "results": [
    {
      "id": "6311c719f23e210012a3ff0b",
      "type": "flow",
      "links": {
        "self": "/v2/flows/6311c719f23e210012a3ff0b"
      },
      "attributes": {
        "api_version": "2.0",
        "created_at": "2022-09-02T09:04:25.974Z",
        "current_status": "inactive",
        "default_mapper_type": "jsonata",
        "description": "This flow allows transform json-based body to hjson format with simple request.\nDon't forget to follow rule: request body must contain body object with json right attributes.\n",
        ...
        }
      }
    },
    {
      "id": "6311db11d17be30011246c42",
      "type": "flow",
      "links": {
        "self": "/v2/flows/6311db11d17be30011246c42"
      },
      "attributes": {
        "api_version": "2.0",
        "created_at": "2022-09-02T10:29:37.570Z",
        "current_status": "inactive",
        "default_mapper_type": "jsonata",
        "description": "This flow allows transform HJOSN-based body to JSON format with simple request.\nDon't forget follow rule: request body must contain hjson_body parameter with a hjson string!",
        ...
        }
      }
    }
  ]
}
```

# ****Raw Request****

The Raw Request function is a request to the [elastic.io](http://elastic.io/) API using all the rules typical for working with APIs. The appearance of this function is due to the mechanism of the iPaaS component, as all the functionality of this component works through this API. The Raw Request feature allows you to customize your flows to meet your requirements. In fact, you can completely replace this function with the Rest API component, but Raw Request allows you to access [Elastic.io API](https://api.elastic.io/docs/v2/) a bit more conveniently, as it works on the credentials you've prepared in advance.

To take a simple endpoint [`https://api.elastic.io/v2/users/me`](https://api.elastic.io/v2/users/me) as an example. With a GET request to it, we can output information about the current user.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/861aefc5-a2d0-41c1-89d7-6a6744db5d49/Untitled.png)

You can select the method used, Request Body for requests in which it is accepted, and the boolean parameter Throw error on 404 Response code for cases where it is needed. You also need to specify the URL to the specified endpoint, note that if you specify the URL correctly, you need to omit the initial part of the address, including the protocol part `https:/`, the API address [`api.elastic.io`](http://api.elastic.io/) and the versioned part, including the trailing slash `/v2/`.

The result of the component will be an API response to the corresponding request.
