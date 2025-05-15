---
title: Pub-Sub Usage Example
layout: component
description: Usage Example for the Pub-Sub component.
icon: pub-sub.png
icontext: Pub-Sub component
category: pub-sub
updatedDate: 2025-05-12
ComponentVersion: 1.0.11
---
## Introduction

Now let's move on to the implementation of our Publisher flow. Let's imagine that some service collects news from some resources and transmits the data within our Topic template to the flow via Webhook. After that, we put the Pub-Sub component in Publisher mode and configure it as follows: specify the Topic we created earlier, then in the mapping tab based on our JSON schema we will need to specify the contents of the fields of this schema.

{% include img.html max-width="80%" url="img/pub-sub-config-1.png" title="Pub-Sub Configuration" %}

Also, prepare our Subscribers. For the example, we will use three flows, each of which will perform a specific function.

{% include img.html max-width="80%" url="img/three-flows.png" title="Three flows" %}

## First flow - E-mail sender

The first flow takes some fields from the received message and does an E-mail to the required addresses.

{% include img.html max-width="80%" url="img/email-sender.png" title="E-mail sender" %}

## Second flow - Write statistics in Spreadsheets

The second flow writes the necessary information in Google Spreadsheets.

{% include img.html max-width="80%" url="img/write-statistics.png" title="Write statistics in Spreadsheets" %}

## Third flow - Write data to FTP

The third flow is a prototype of the database, which should store all the data obtained. For a simpler implementation, a CSV document was chosen, which is stored on a remote FTP Server.

{% include img.html max-width="80%" url="img/csv-configuration.png" title="CSV configuration" %}

By sending a request to Webhook in the Publisher thread we start three flows at once.

{% include img.html max-width="80%" url="img/executions.png" title="Executions" %}

## Result of three flows

As a result, we will get:

* an E-mail to the specified address:

{% include img.html max-width="75%" url="img/new-mail.png" title="New Mail" %}

* a Google Spreadsheet with the selected data:

{% include img.html max-width="100%" url="img/news-statistics-spreadsheet.png" title="News Statistics Spreadsheet" %}

* a CSV document on the remote server:

{% include img.html max-width="100%" url="img/csv-table.png" title="CSV Table" %}

## Conclusion

As a result, the **PubSub** component is a powerful tool to perform any number of asynchronously performed tasks on a specified data template, with the ability to select specific data from Topic and further manipulate them, which simplifies the work and increases the speed of tasks of various types.
