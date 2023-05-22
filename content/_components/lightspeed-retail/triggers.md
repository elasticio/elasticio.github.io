---
title: Lightspeed-retail triggers
layout: component
description: Lightspeed-retail API component triggers.
icon: lightspeed-retail.png
icontext: Lightspeed-retail component
category: lightspeed-retail
updatedDate: 2023-04-07
ComponentVersion: 1.0.2
---

## Polling entity

This trigger polls for existing and updated objects where you can select object type.

![Trigger - Polling entity](https://user-images.githubusercontent.com/40201204/50015199-9dc3c980-ffce-11e8-904c-4852c0c2f4f8.png)

### Input fields description

* **Object Type** - you should select the type of object which updates you want to get.
* **Polling Field** - you can use any field existing at current object, which has datatype like DATE, DATETIME or TIMESTAMP.
* **Batch Size for request pagination** - count of entries which you will get by one request ().
