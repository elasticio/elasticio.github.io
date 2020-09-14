---
title: Google Spreadsheets Usage Example
layout: component
description: Google Spreadsheets Usage Example.
icon: gspreadsheet.png
icontext: Google Spreadsheets component
category: gspreadsheet
createdDate: 2020-03-20
updatedDate: 2020-03-20
---

## Introduction

Google tables are used for a huge number of tasks. In our case, we use tables as a small database that contains data about customers of a small company. We will use the component as a trigger and source of information for our stream, which will perform the simplest task - send an email to a new client from different cities. The table contains three parameters: city name, customer name and his email:

![Customer List](img/spreadsheet.png)

## Flow example

In this example, we want to send welcome emails to new customers in different cities. To accomplish the task, we created this flow:

![Example Flow](img/example-flow.png)

First, use a Google Spreadsheets component **"Get Spreadsheet Row"** function that will allow you to use the information from the pre-created spreadsheet you saw above. In our example, we are using a row as a dimension and first row as a header.

![Google Spreadsheet configure input](img/gspreadsheet-configure-input.png)

Here you can see a Sample. All the data we need - city, customer name and customer email - we received and divided into 12 separate Samples.

![Google Spreadsheet Sample](img/gspreadsheet-sample.png)

After that use a[Router component](/components/router/index) to sort the data by city. To do this, create 4 different branches, in each of which select a criteria for routing. In our case, this is the name of the city: Berlin, Chicago, Sydney and Boston:

![Router configure input](img/router-input.png)

Here you can see 4 brunches, each of which sends a welcome email to customers in different cities:

![4 branches](img/4-branches.png)

The last step is to configure the [E-mail component](/components/email/index). In our case, we are welcoming a new client in one of 4 cities. Thanks to the [Router component](/components/router/index), each client will receive a message in accordance with their city:

![Email component - configure input](img/email-input.png)
