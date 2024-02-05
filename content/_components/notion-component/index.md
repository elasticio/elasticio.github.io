---
title: Notion Component
layout: component
section: Service components
description: Notion component is designed to interact with Notion API.
icon: notion.png
icontext: Notion component
category: notion
updatedDate: 2024-02-02
ComponentVersion: 1.0.0
---


## Description

Notion Component is designed to interact with [Notion API](https://developers.notion.com/reference/intro).

The current release of the component tested on API version `2022-06-28` with `https://api.notion.com/v1/` basic path.

## Credentials

To be able to connect to Notion API you will need to proceed with the following steps:

- The workspace owner needs to create [Internal integrations](https://developers.notion.com/docs/create-a-notion-integration) through the [Integration dashboard](https://www.notion.so/my-integrations).
- Once an internal integration has been added to a workspace, members must [give the integration permission](https://www.notion.so/help/add-and-manage-connections-with-the-api#add-connections-to-pages) to access specific pages or databases through Notion’s UI by adding a connection to the pages or databases.

Component credentials configuration fields:

- **Internal Integration Secret** (string, required) - Put here your secret from internal integration `Secrets` section.
- **API version** (string, optional, defaults to `2022-06-28`) - You can provide the needed API version here, [more information can be found here](https://developers.notion.com/reference/versioning).

## Triggers

This component has no trigger functions. This means it will not be accessible to select as a first component during the integration flow design.

## Actions

### Make Raw Request

Executes custom requests utilizing plain Notion REST API.

#### Configuration Fields
- **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as an error, defaults to `false`.

#### Input Metadata
- **URL** - (string, required): Path of the resource relative to the base URL (here comes a part of the path that goes after `https://api.notion.com/v1/`).
- **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata
- **Status Code** - (number, required): HTTP status code of the response.
- **HTTP headers** - (object, required): HTTP headers of the response.
- **Response Body** - (object, optional): HTTP response body.


### Upsert Object

Updates existing or creates a new object.

#### Configuration Fields
- **Object Type** - (dropdown, required): Object-type to upsert. Currently, supported types are: `Page`, `Database` and `Block`.
- **Operation** - (dropdown, required): Create a new record or update existing.
#### Input Metadata:
Dynamically generated fields according to the chosen `Object Type` and `Operation` Each field will have a tooltip with a description of what they expected to be and links to official documentation with examples:

{% include img.html max-width="100%" url="img/upsert_mapping.png" title="Upsert Mapping" %}

#### Output Metadata
Result object from the upsert
