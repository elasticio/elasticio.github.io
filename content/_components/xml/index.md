---
title: XML component
layout: component
section: Protocol components
description: XML is used to describe the transportation, structure, and storage of data.
icon: xml.png
icontext: XML component
category: XML
createdDate: 2016-12-29
updatedDate: 2020-01-30
---

## Latest changelog

**1.2.1 (March 30, 2020)**

* Minor logs impovements in "XML to JSON" action

> To see the full **changelog** please use the following [link](/components/xml/changelog).

## Purpose

Allows users to convert XML attachments and strings to and from JSON This component
has 3 actions allowing users to pass in either generic but well format XML/JSON
string or XML attachment and produces a generic string of the other file type.
The output then can be mapped and used in other components.


## Requirements

Provided XML document (for XML to JSON) should be [well-formed](https://en.wikipedia.org/wiki/Well-formed_document) to parse correctly. You will get an error otherwise.

### Environment variables

No required environment variables.

## Trigger

This component has no trigger functions. This means you can not select it as a first
component during the integration flow design.

## Actions

### XML to JSON

Takes XML string and converts it to generic JSON object.

### XML Attachment to JSON

Looks at the JSON array of attachments passed in to component and converts all
XML that it finds to generic JSON objects and produces one outbound message per
matching attachment. As input, the user can enter a patter pattern for filtering
files by name or leave this field empty for processing all incoming `*.xml` files.

### JSON to XML
Takes the body of message passed into the component and converts to generic XML string.

## Known limitations

 *   The maximum size of incoming file for processing is 5 MB. If the size of incoming file will be more than 5 MB, action will throw an error
```sh
Attachment *.xml is to large to be processed my XML component.
File limit is: 5242880 byte, file given was: * byte
```
*  Action does not support local agents due to current platform limitations.

## Additional Info

Icon made by Freepik from [www.flaticon.com](https://www.flaticon.com)
