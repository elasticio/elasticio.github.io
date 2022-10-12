---
title: HJSON Usage Example
layout: component
description: In this article you will see a flow with which you will clearly see how and where the HJSON component is used.
icon: hjson.png
icontext: HJSON component
category: hjson
updatedDate: 2022-10-07
ComponentVersion: 1.0.4
---

## JSON to HJSON

The first flow allows you to convert a JSON document to HJSON through the work of this component. Flow is as simple as possible and is a webhook which waits to send a JSON document (request body) and then converts it to HJSON and sends it back. Here you can see how HJSON component configuration looks like:

![JSON to HJSON 1](img/json-to-hjson-1.png)

Using Webhook we will send a small JSON code we want to convert into HJSON:

![JSON to HJSON 2](img/json-to-hjson-2.png)

As a result of the component's work, we will receive a document in the HJSON format:

![JSON to HJSON 3](img/json-to-hjson-3.png)

## HJSON to JSON

The second flow is exactly the same except that it works in the opposite direction. Here you can see how HJSON configuration looks like:

![HJSON to JSON 1](img/hjson-to-json-1.png)

Using Webhook we will send a small HJSON document we want to convert into JSON:

![HJSON to JSON 2](img/hjson-to-json-2.png)

> **Please Note:** in order to pass an HJSON document in an inline string, we will need to make a json document containing that string.

As a result of the component's work, we will receive a document in the JSON format:

![HJSON to JSON 3](img/hjson-to-json-3.png)
