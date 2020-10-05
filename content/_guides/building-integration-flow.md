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
