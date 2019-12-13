---
title: How to define environment variables for components
layout: article
section: Environment Variables
order: 1
category: environment-variables
---

## Description

Environment variables are an essential part of the {{site.data.tenant.name}} platform environment. Apart from the ever growing [list of system-wide variables](/references/envirament-variables-available-during-component-execution), it is possible and rather encouraged, to define custom environment variables.

## Why use environment variables?

Let us consider the following use case when a component is developed for a CRM, Shop or ERP. If this particular component is intended to be used only for one specific client then many values can be hard-coded inside the component.

What if the component is developed to work for different clients? All the hard-coded values for the different clients need to be rewritten again and again. This will introduce an unnecessary amount of overhead work and be the potential source of errors.



Here are a couple of examples where the environment variables are implemented.

## Example1: Environment Variables as OAuth Client keys

Connecting an external service with {{site.data.tenant.name}} platform is usually handled through the security credentials which are used to establish a communication between our platform and the external service.

In the cases when a system-wide deployed component is used on our main tenant (https://app.elastic.io) then login/password pair or API Keys are usually enough. The establishment of a secure connection with the external servers is handled by our system using our own OAuth Client keys and OAuth Apps created by us. For this case no further configuration is necessary.

When the component is deployed separately into your repository on the main tenant or on your own dedicated tenant, then it is necessary to establish custom OAuth keys and create separate OAuth Apps in addition to supplying the usual login/password information.

For example, here is how you can [create your own OAuth App for Salesforce](/components/salesforce/creating-oauth-app-for-salesforce). After the creation of OAuth App {{site.data.tenant.name}} platform needs to be given the specific details such as the **OAuth client key** and the **OAuth client secret** so that it can connect to your Salesforce instance. {{site.data.tenant.name}} Salesforce component is configured to expect these parameters as environment variables.

### Exposing envVars in the Node.js code

When you define any environment variables in your code {{site.data.tenant.name}} platform has no knowledge of them unless they are properly exposed. To expose all the environment variables they must be declared in the component descriptor file component.json, as shown below. This is required to inform the {{site.data.tenant.name}} platform that these environmental variables are required for the component to operate properly. The platform will display warnings if the declared variables are not defined (see below).

In the most cases `envVars` are defined in the `component.json` as it is done in the case of Salesforce:

```js
"envVars": {
  "SALESFORCE_KEY": {
    "required": true,
    "description": "Your Salesforce OAuth client key"
    },
  "SALESFORCE_SECRET": {
    "required": true,
    "description": "Your Salesforce OAuth client secret"
   }
}
```

Following the above definition it is then used further down like this:

```js
"oauth2": {
  "client_id": "{{SALESFORCE_KEY}}",
  "client_secret": "{{SALESFORCE_SECRET}}",
  "auth_uri": "https://{{prodEnv}}.salesforce.com/services/oauth2/authorize",
  "token_uri": "https://{{prodEnv}}.salesforce.com/services/oauth2/token"
}
```

These are just small parts of the whole component.json which can be viewed fully in [Salesforce-component GitHub repository](https://github.com/elasticio/salesforce-component).

>**Please note:** the actual `clent_id` and `clent_secret` [are defined inside](https://github.com/elasticio/salesforce-component/blob/master/lib/helpers/oauth-utils.js) the`oauth-utils.js` and not only in `component.json`

## Example2: Advance case of HTTP(S) PROXY setup

Here is more advanced use case connected with deployment and connection of component behind an HTTP(S) PROXY. This is particularly useful in case of the on-premise installation of {{site.data.tenant.name}} platform when all the communication needs to go through the PROXY server.

Depending on the used programming language and libraries some of the implementations can vary significantly. For example in the simple case of defining HTTP PROXY. If we follow the simple case of `envVars` described above then for Node.js code we would need to define it like in `component.json`:

```js
"envVars": {
  "HTTP_PROXY": {
    "required": true,
    "description": "Your HTTP PROXY and port http://proxy:1234"
   },
  "HTTPS_PROXY": {
    "required": true,
    "description": "Your HTTPS PROXY and port https://proxy:1234"
  }
}
```

In some cases, this type of definition might not be sufficient. For example `curl` and `wget` respect the `HTTP_PROXY` and `HTTPS_PROXY` environment variables. Most Node.js libraries do it the same way while Java rather expects `http.proxyHost` and `http.proxyPort` system properties defined in the **gradle.properties** file as it already explained in the Java components behind a proxy guide.

Some Node.js libraries have their own different way to use proxy setups. For example, when [Microsoft SDK](https://github.com/microsoftgraph/msgraph-sdk-javascript) is used then the necessary setup needs to follow a specific approach used in superagent to send HTTP requests. The problem is that **superagent** does not respect `HTTP_PROXY` and `HTTPS_PROXY` variables as most Node.js libraries do, but wants these configurations to be passed [directly to the constructor](https://github.com/visionmedia/superagent).
