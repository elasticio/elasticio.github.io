---
title: IPass Core Usage Example
layout: component
description: Usage Example for the IPass Core component
icon: ipaas-core.png
icontext: IPaas Core component
category: ipaas-core
updatedDate: 2023-07-07
ComponentVersion: 1.5.2
---

This article will show you where and how to use the IPaas Core component. Through a few examples, you'll discover some of the component's possible use cases and gain a better understanding of how it works.

## Calculate Flow Dependencies

The Calculate Flow Dependencies function is designed to retrieve information about a flow **in the current workspace**, including its topics, secrets, credentials, and components. This information can be further processed for various use cases. For example, you could use this function to obtain the necessary data to generate a report about a particular flow. To illustrate, consider the following simple flow.

{% include img.html max-width="100%" url="img/calculate-flow-dependencies-simple-flow.png" title="Calculate Flow Dependencies simple flow" %}

To use the component, we need to specify the mode as **Calculate Flow Dependencies**, create the necessary credentials for authentication, and specify the flow ID of the flow we want to retrieve dependencies for. The 'Calculate Flow Dependencies' mode instructs the component to retrieve information about the flow's topics, secrets, credentials, and components, which can be used for further data processing or analysis.

>**Please Note:** If the user creating the flow using this component has access to the flow whose dependencies need to be retrieved, the fields for the credentials can be left blank. In this case, the component will automatically use the current user's email, API key, and platform instance URL. However, it is still necessary to create the credentials for authentication purposes.

In this example, we specify the FlowID of the flow shown in the screenshot below. When the flow is executed and the HTTPReply component is triggered, the result message returned will be a confirmation that the flow has been successfully executed. The message will contain relevant information about the flow's execution status and any errors encountered during the process.

{% include img.html max-width="80%" url="img/get-csv-from-dropbox.png" title="Get CSV from Dropbox" %}

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

{% include img.html max-width="100%" url="img/calculate-flow-dependencies-ipaas-core-sample.png" title="Ipaas Core sample" %}

## Lookup Object (at Most One)

The Lookup Object (at Most One) feature allows you to get complete information about a flow by several criteria. During component configuration, you can select the object type (currently only the Flow type is available).

It is also necessary to select the unique criteria by which the search will be carried out. At the moment there are 3 viable options: by FlowID, by Flow Name & WorkspaceID, and by Flow Name & Workspace Name. It is also possible to specify with two checkboxes whether to allow empty results and the possibility of criteria to be omitted.

When using this component, it is important to select the unique criteria that will be used for the search. There are currently three viable options available:
* searching by FlowID
* searching by Flow Name and WorkspaceID
* searching by Flow Name and Workspace Name.

Additionally, there are two checkboxes that can be used to allow empty results and to indicate whether criteria can be omitted.

During the mapping stage, you can specify which flow you want to retrieve by selecting the search criteria defined in the mapping. This allows you to retrieve the specific data you need from the identified flow.

> **Please Note:** Once you have completed the configuration settings for this component, the search based on your specified criteria has already been performed. To select the desired flow, you can simply hover over the question mark icon to see the available options, which are based on the credentials specified in the credentials configuration step

{% include img.html max-width="50%" url="img/info.png" title="Info" %}

Additionally, in the mapping step, you have the option to select two additional parameters: Include Data Samples and Remove Non-writeable Properties. These parameters affect the content of the resulting message. Enabling Include Data Samples provides additional information about the samples in the flow components. On the other hand, enabling Remove Non-writeable Properties will remove certain flow attributes from the message that the integrator cannot write.

> Please see the Lookup Object (at Most One) action [documentation](/components/ipaas-core/index#lookup-object-at-most-one) for more details.

The primary purpose of this component is to retrieve comprehensive information about a flow, which can then be further processed. In the example below, we have demonstrated how to extract sample flow data based on the provided screenshot. For the sake of brevity, the configuration in the example has disabled data samples and non-writable properties, resulting in reduced text size.

{% include img.html max-width="80%" url="img/filter-component-flow.png" title="Filter component flow" %}

<details close markdown="block"><summary><strong>Data sample for flow on the screenshot above</strong></summary>

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

</details>

> **Please note** that when using the function that allows searching by flow name, it is important to be aware of potential duplicate flow names. It is crucial to exercise vigilance and avoid duplicating flow names to prevent errors, as depicted in the screenshot below.

{% include img.html max-width="100%" url="img/error.png" title="Error" %}

## Lookup Objects (plural)

The Ipaas Core component can operate in Lookup Objects (plural) mode. As the name implies, it functions similarly to the Lookup object (which operates on at most one flow), but it is specifically designed to retrieve data from multiple flows simultaneously.

The configuration principle of the Ipaas Core component in Lookup Objects mode(plural) is similar to that of the Lookup object (which operates on at most one flow), with a few distinctions. Firstly, during the configuration stage, you have the option to select the Emitting behavior (emit individually, emit page, and fetch all). This behavior is common among components that can emit data for multiple objects and determines the format in which the data is emitted.

{% include img.html max-width="100%" url="img/lookup-objects-plural-config.png" title="Lookup Objects (plural) config" %}

There are three standard fields in the settings: Sort flows list by certain fields, Search Criteria and Remove Non-Writeable Properties, and Page Size and Page Number, provided that Emit page mode was selected in the configuration settings.

The settings for the this mode include three standard fields:
* Sort flows list by specific fields
* Search Criteria and Remove Non-Writeable Properties
* Page Size and Page Number

These settings are applicable when the Emit page mode is selected in the configuration settings.

{% include img.html max-width="100%" url="img/lookup-objects-plural-mapping.png" title="Lookup Objects (plural) mapping" %}

The first of the three main mapping parameters is `Sort flows list by certain fields`, which allows you to set the desired sorting for the received objects. You can use values such as `created_at`, `updated_at`, and `name` to sort in ascending order. To sort in descending order, prepend the field with a minus sign (e.g., '-name').

Another important parameter is `Remove Non-Writable Properties`, a boolean parameter that determines whether the final data should include non-writable properties, similar to the behavior in Lookup Object (at most one).

The most crucial parameter is `Search Criteria`, which enables you to specify the sorting criteria for finding the desired flow. You can explicitly filter by criteria such as draft, status, type, user, and search by name or description.

> Please see the Lookup Object (plural) action [documentation](/components/ipaas-core/index#lookup-objects-plural) for more details.

The primary and sole purpose of this flow is similar to that of the Lookup Object (at most one): to retrieve comprehensive information about flows based on a specified criterion. This action can be used to obtain data for further processing or to gather statistics by determining the number of flows that meet a specific criterion.

For instance, let's consider a simple flow structure with an iPaaS component. Suppose the workspace specified in the credentials contains multiple flows with the term 'HJSON' in their flow names. In such a case, you can utilize the Lookup Objects (plural) function by specifying `HJSON` in the search criteria to retrieve and display comprehensive information about all the flows matching this criterion.

{% include img.html max-width="100%" url="img/lookup-objects-plural-config-and-mapping.png" title="Lookup Objects (plural) config + mapping" %}

As a result, we will obtain comprehensive information about these flows. To maintain brevity, we can exclude redundant details about the flows, as they align with the information provided by the Lookup Objects (at most one) function

<details close markdown="block"><summary><strong>Click to expand</strong></summary>

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
        }
      }
  ]
}
```

</details>

## Raw Request

The Raw Request function enables making requests to the {{site.data.tenant.name}} API, following the typical rules for working with APIs. This function is an integral part of the iPaaS component, as all the component's functionality operates through this API. The Raw Request feature provides flexibility to customize your flows according to your requirements. While you can substitute this function entirely with the Rest API component, Raw Request offers the advantage of conveniently accessing the {{site.data.tenant.name}} API using the credentials you have prepared in advance.

We will take a simple endpoint `https://api.{{site.data.tenant.name}}/v2/users/me` as an example. With a GET request to it, we can output information about the current user.

{% include img.html max-width="100%" url="img/raw-request-mapping.png" title="raw Request mapping" %}

You have the option to select the method used, such as Request Body for requests that accept it, and the boolean parameter `Throw error on 404 Response code` for cases where it is necessary. Additionally, you need to specify the URL for the desired endpoint. Please note that when specifying the URL correctly, you should omit the initial part of the address, including the protocol (https:/), the API address (api.{{site.data.tenant.name}}), and the versioned part, which includes the trailing slash (/v2/).


The result of the component will be an API response to the corresponding request.

```json
{
  "body": {
    "data": {
      "id": "607013a4a17cbd0011eaa456",
      "type": "user",
      "links": {
        "self": "/v2/users/607013a4a17cbd0011eaa456"
      },
      "attributes": {
        "first_name": "EIO",
        "last_name": "Support",
        "email": "helpme@{{site.data.tenant.name}}",
        "registered": "2021-04-09T08:43:16.434Z",
        "last_login": "2022-10-13T11:41:40.894Z"
      }
    },
    "meta": {}
  },
  "statusCode": 200
}
```
