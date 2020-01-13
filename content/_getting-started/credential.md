---
title: Understanding credentials
layout: article
section: Basic Concepts
description: What is a credential in general. How to create and use the credential in your integration components.
order: 4
category: integration-flow
---

An [integration flow](integration-flow) runs on behalf of a person or an
organization to synchronize data between multiple applications. Each step
of an integration flow is accessing a particular application, for example
through an API, to retrieve, store or update some data. Usually
an API requires a client to authenticate before the data can be accessed.
Each step of an integration flow needs a `credential`. Simply
put, a credential is an object holding the required information to
authenticate with an API. Let's have a look at a couple of credential
objects:

*   **API Key**: if the integration component is sending requests to a REST API
using API key for authorization, then a credential is a simple object
holding the API key.
*   **OAuth2**: In case of a component authorizing through OAuth2, the credential
object holds multiple values, such as `access_key`, `refresh_key`, `scope`, etc.
*   **Database credentials**: If a component goes directly into an application's
database, the credential object holds database host url, port, database name,
username, password.

As you can see in the examples above, a `credential` is specific to the
API it is used to authenticate with. This means a credential for a
*Salesforce* component will not work with a credential for a *Database*
component or any other API.

## Creating a credential for a flow

When [creating a flow](first-flow) an credential must be chosen. You can
either chose an existing one or create a new one. The following screenshot
demonstrates how the credential is created for the [Petstore API](https://petstore.elastic.io/docs/)
component.

To create a credential, open the Navigational Menu and go to *Credentials*. Then click *Create New Credential* button:

![Petstore API - Creating a credential for a flow](/assets/img/getting-started/credential/creds.gif)

You will need to fill in data for two input fields:
-   **Account name** - an optional name for this credential
-   **API key** - an API key to authenticate with the
[Petstore API]({{site.data.tenant.petStoreDocs}}). You can use the
`{{site.data.tenant.petStoreApiKey}}` API key to try out this API.

Once a credential is saved, it will be linked with the current step of
the flow. It can be also reused in other steps of the same flow or other
flows using same component.

Credentials are structured by components. The green number on a component icon tells you how many credentials exist for that component.

>**Please note** that before saving a credential, the {{site.data.tenant.name}} platform performs a verification by sending a "dry" request to the particular API. This allows us to avoid saving invalid credentials caused by typos, invalidated API keys, etc.

A new credential can be added by pressing the `Add New Credential` button that you can see at the end of the video above. An existing credential can also be edited or deleted. This is accomplished by clicking the `Edit` or `Delete` button on an existing credential.


>**Please note** that it is not possible to delete a credential used by an active integration flow as the flow would become broken. If you try to delete such a credential, a corresponding error message will be displayed. Please delete these flow first or reconfigure them to use another credentials.

## Related links

- [Integration flows](integration-flow)
- [Creating a flow](first-flow)
- [Petstore API](https://petstore.elastic.io/docs/)
