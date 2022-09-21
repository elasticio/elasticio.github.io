---
title: HJSON component
layout: component
section: Utility components
description: A component to parse, validate, generate HJSON data for the platform.
icon: hjson.png
icontext: HJSON component
category: hjson
updatedDate: 2022-09-09
ComponentVersion: 1.0.3
---

## General information

### Description

Component to parse, validate, generate HJSON (https://hjson.github.io/) data for [{{site.data.tenant.name}}](http://www.{{site.data.tenant.name}}) platform.

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Convert Action
Action to convert data from HJSON to JSON and vise verse

#### Config Fields

* **Direction** - (Dropdown, required): Direction to perform convert `HJSON to JSON` or `JSON to HJSON`
* **Input Format** - (Dropdown, required): Input source for origin data. `From Attachment` (url to platform storage) or `From Inline` (simple inline input)
* **Output Format** - (Dropdown, required): Output source for result data. `Attachment` (attachment will be saved in platform storage and attachment description will be emitted) or `Inline` (simple inline output)

#### Input Metadata

If Direction is HJSON to JSON & Output Format is Inline:
* **HJSON to convert** - (object, required): JSON object
If Direction is JSON to HJSON & Input Format is From Inline:
* **JSON to convert** - (object, required): HJSON object
If Input Format is From Attachment:
* **Attachment URL** - (string, required): url to attachment from platform storage. If Maester attachment URL provided - do not forget to append `?storage_type=maester` to URL

#### Output Metadata

If Direction is HJSON to JSON & Output Format is Inline:
* **Resulting JSON** - (object, required): JSON object
If Direction is JSON to HJSON & Input Format is From Inline:
* **Resulting HJSON** - (string, required): HJSON object
If Output Format is Attachment:
* **Attachment Url** -  (string, required): Url for attachment saved in platform storage
* **Size** - (positive integer, required): Size in bytes
* **Type** - (string, required): Either .json or .hjson
* **Content-Type** - (string, required): Either application/json or application/hjson
* **Attachment Creation Time** - (timestamp, required): Timestamp, when the attachment was created
