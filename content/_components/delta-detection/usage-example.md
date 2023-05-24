---
layout: component
title: Delta Detection Usage Example
description: Usage Example for the Delta Detection component.
icon: delta-detection.png
icontext: Delta Detection Component
category: delta-detection
updatedDate: 2023-01-03
ComponentVersion: 2.2.0
---


The primary function of the Delta Detection component is to search for changes, which is referred to as Delta Detection. This action allows for the resolution of data modifications. Let's illustrate the component's functionality with a simple example:

{% include img.html max-width="40%" url="img/flow-view.png" title="Flow view" %}

In the flow above, we query a specific page within the Google Spreadsheet. If we detect any differences, we proceed to update the database and subsequently send an email notification to inform us about the update.

To enable regular polling of the page, we implemented a Simple trigger that runs the flow at specified time intervals.

To ensure the proper functioning of the Spreadsheet component, it is essential to have the pre-existing data from the Sheet, against which we will compare for any changes.

{% include img.html max-width="100%" url="img/news-statistics.png" title="News Statistics" %}

When configuring a component, we specify all the necessary parameters.

{% include img.html max-width="100%" url="img/get-data-spreadsheet.png" title="Get Data Spreadsheet" %}

When configuring the Delta Detection component, we need to define the Object ID, which serves as a unique identifier for the object stored in the Bucket and holds the hash data. In this scenario, it is recommended to utilize the ID of the last record in the Spreadsheet as the Object ID, achieved through the JSONata expression `result[-1].id`.

Additionally, we must specify the Object Data, which is the object containing the data we will be searching for changes. In this case, the Object Data will consist of an array comprising the results obtained from the Spreadsheet.

> **Please note** that the current flow configuration is suitable only when there is a maximum of one new entry in the table during each time interval defined in the Simple Trigger configuration. If the number of new entries exceeds this limit, multiple entries will be assigned the same identifier, leading to potential confusion. It is crucial to ensure that the ID in the table remains unique; otherwise, bucket objects with the same ID will be overwritten.

{% include img.html max-width="100%" url="img/delta-detection-config.png" title="Delta Detection Configuration" %}

When creating a sample, we can observe that Delta Detection provides three output parameters: the object ID, the date of the last check for changes, and the object hash. These parameters enable us to determine whether any changes have occurred in the data.

{% include img.html max-width="100%" url="img/delta-detection-sample.png" title="Delta Detection Sample" %}

Next, we proceed to configure the database component, which will handle the insertion of modified or newly added records into the database. To ensure the pipeline operates smoothly, we add an Email component at the end, allowing for notifications regarding any altered data.

Once the flow is published and activated, it will begin executing at the designated intervals. By accessing the Executions page, we can monitor the behavior when no changes are detected.

{% include img.html max-width="40%" url="img/executions.png" title="Executions" %}

The flow initiates by retrieving data from Google Spreadsheet. Delta Detection is performed, and if no changes are detected, the flow comes to a halt. We can verify this information by referring to the Delta Detection logs.

{% include img.html max-width="100%" url="img/delta-detection-logs.png" title="Logs" %}

In the event that a new line is added to the document, during the subsequent triggered flow, Delta Detection will identify the changes made to the document. As a result, the flow pipeline will continue to execute until completion, which involves updating the database and sending an email notification indicating that changes have been committed.

{% include img.html max-width="100%" url="img/news-statistics-end.png" title="News Statistics end" %}

{% include img.html max-width="80%" url="img/email.png" title="Email" %}
