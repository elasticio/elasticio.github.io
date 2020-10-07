---
title: Building integration flow
description: This article describes how to build an integration using platform features.
layout: article
section: Building integration flows
category: building integration flows
order: 1
---

This document provides a step-by-step instruction on building a Integration Flow. It is intended for platform users who have at least some experience in building Flow. The integration flow in this document was created using many platform features such as: [Transforming data](/guides/transforming-data), [Content-Based Routing](/guides/content-based-router) and [Passthrough Feature](/getting-started/passthrough-feature).

In this example, we will create a flow that will send an email informing about the availability of sufficient renewable energy in the city in the next 3 days:

![Endflow](/assets/img/integrator-guide/building-integration-flow/endflow.png)

We used a Google Spreadsheet as a database containing information about name, city, postal code, API-key and email:

![Database](/assets/img/integrator-guide/building-integration-flow/database.png)

We could have used other components for this task, such as [JDBC component](/components/jdbc), but in our case there is not much data, so the Google Spreadsheet is more convenient.

## Configuring trigger

As a trigger, we use a [Google Spreadsheet component](/components/gspreadsheet) that allows us to read information from a spreadsheet above. To do this, we need to select the spreadsheet - `Database` in our case - we need and configure the rest of the input:

![Database](/assets/img/integrator-guide/building-integration-flow/gspreadsheet-input.png)

After successful configuration, request a sample:

![Gspreadsheet Sample](/assets/img/integrator-guide/building-integration-flow/gspreadsheet-sample.png)

## REST API Configuration

In the next step, we will use the [REST API component](/components/rest-api) to get green energy information for the next 3 days for a specific city. We will take the necessary data such as `postal code` and `API-key` from the previous step:

![REST API Input](/assets/img/integrator-guide/building-integration-flow/rest-api-input.png)

As a sample, you will receive a large amount of data that needs to be processed in the next step:

![REST API Sample](/assets/img/integrator-guide/building-integration-flow/rest-api-sample.png)

## Transformation Configuration

After we have received a large amount of data from the REST API component, we need to process it. We are interested in the average amount of available renewable energy in the city for the next 3 days. To get this figure, we create a variable `Mean` that equals the arithmetic mean of the renewable energy over 3 days. To accomplish this task, we use the [JSONata aka Transformation component](/components/jsonata):

![Jsonata Input](/assets/img/integrator-guide/building-integration-flow/jsonata-input.png)

We used the JSONata expression to get the value we needed. You can learn more about this in the [Transforming data](/guides/transforming-data) article. As a result of mapping you can see the `Mean` variable. The same you can see in the Sample:

![Jsonata Sample](/assets/img/integrator-guide/building-integration-flow/jsonata-sample.png)

## Routing

Our ultimate goal is to send 3 different emails: if the energy is less than `50`, then it is not enough, more than `50` but less than `54`, then it is enough and more than `54`, then it is in excess. In other words, we have a criteria for creating 3 different branches. To create them we use a [Router component](/components/router):

![Router Input](/assets/img/integrator-guide/building-integration-flow/router-input.png)

Now we need to configure the 3 remaining steps:

![Three Branches](/assets/img/integrator-guide/building-integration-flow/3-branches.png)

To learn more about Routing please read [Content-Based Routing](/guides/content-based-router) article.

## E-mail Configuration

Now we just have to send emails to people from the database, which says how much renewable energy is in the next 3 days in their city. To do this, we will use a [Email component](/components/email):

![Email Input](/assets/img/integrator-guide/building-integration-flow/email-input.png)

As you can see, we took data such as `email`, `name` and `city name` from the first step of our integration flow. We can do this with [Passthrough Feature](/getting-started/passthrough-feature). Below you can see how to take information from the previous steps in the JSONata mode.

![Passthrough](/assets/img/integrator-guide/building-integration-flow/passthrough.png)

We configure the two remaining branches accordingly, depending on the amount of renewable energy available. As a result, the email will look like this:

![Received Email](/assets/img/integrator-guide/building-integration-flow/received-email.png)

As you can see, the text says that there is not enough energy because the `Mean` variable is equal `49.6`.
