---
title: What is a credential?
layout: article
section: Basic Concepts
order: 3
category: integration-flow
---

An [integration flow](integration-flow) runs on behalf of a person or an
organization to synchronize data between multiple applications. Each step
of an integration flow is accessing a particular application, for example
through an API, in order to retrieve, store or update some data. Usually
an API requires a client to authenticate before the data can be access.
This is each step of an integration flow needs a `credential`. Simply
spoken, a credential is an object holding the required information to
authenticate with an API. Let's have a look at a couple of credential
objects:

* API Key: if the integration component is sending requests to a REST API
using API key for authorization, then a credential is a simple object
holding the API key.
* OAuth2: In case of a component authorizing through OAuth2, the credential
object holds multiple values, such as `access_key`, `refresh_key`, `scope`, etc.
* Database credentials: If a component goes directly into an application's
database, the credential object holds database host url, port, database name,
username, password.

As you can see in the examples above, a `credential` is specific to the
API it is used to authenticate with. This means a credential for a
*Salesforce* component will not work with a credential for a *Database*
component or any other API.

# Creating a credential for a flow

When [creating a flow](first-flow) an credential must be chosen. You can
either chose an existing one or create a new one. The following screenshot
demonstrates how a credential is created for a trigger component for the
[Petstore API](https://petstore.elastic.io/docs/).

![Create the credentials to access](/assets/img/getting-started/first-flow/getting-started-flow-003.png "Create the credentials to access")

As you can see in the screenshot above, a user is asked to provide values
for two input fields:
*   **Account name** - an optional name for this credential
*   **API key** - an API key to authenticate with the
[Petstore API]({{site.data.tenant.petStoreDocs}}). You can use the
`{{site.data.tenant.petApiKey}}` API key to try out this API.

Once a credential is saved, it will be linked with the current step of
the flow. It can be also reused in other steps of the same flow or other
flows using same component.

> **Note** Before saving a credential, the {{site.data.tenant.name}} platform performs a verification by sending a "dry" request to the particular API. This allows us to avoid saving invalid credentials caused by typos, invalidated API keys, etc.

# Managing credentials

All the created credentials can be managed in one place. If you wish to
have an on overview of all your credentials just go to `Settings` page
where you will find the `Security Credentials` area, as shown in the
screenshot below.

![The settings page](/assets/img/getting-started/tour/tour6.png "The settings page")

Now go into `Security Credentials` to find an overview of credentials,
shown in the following screenshot:

![Credentials overview](/assets/img/getting-started/credential/credentials-overview.png "Credentials overview")

As you can see in the screenshot above the credentials are structured by
components. You will probably recall that we mentioned above that a
`credential` is specific to the API it is used to authenticate with. The
green number on a component icon tells you how many credentials exist for that
component. Now if you click on a component, you will see the list of
credentials for a given component, as shown in the screenshot below.

![Component credentials](/assets/img/getting-started/credential/credentials-petstore.png "Component credentials")

In the screenshot above you can see al available credentials for the
`Petstore` component belonging to a user. A new credential can be added by
pressing the `Add New Account` button. An existing credential can also be
edited or deleted. This is accomplished by clicking the `Edit` or `Delete`
button on an existing credential. The following screenshot shows how a credential
is edited.

![Editing a credential](/assets/img/getting-started/credential/credentials-edit.png "Editing a credential")


> **Note** Please note that it is not possible to delete a credential used by an active integration flow as the flow would become broken. If you try to delete such a credential, a corresponding error message will be displays. Please delete these flow first or reconfigure them to use another credentials.

