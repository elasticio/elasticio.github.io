---
title: Edifact-parser component
layout: component
section: Protocol components
description: A international standard for electronic data interchange (EDI).
icon: edifact.png
icontext: Edifact-parser component
category: Edifact-parser component
createdDate: 2017-08-16
updatedDate: 2017-08-25
---


## Authentication

This component requires no authentication.

## How it works

EDIFACT Parser component expects an incoming message(es) with EDI attachment(s) in it. You can test it using SFTP component like this:

![image](https://user-images.githubusercontent.com/56208/29717917-46ad444e-89b1-11e7-8d84-1059f3959472.png)

Sample EDI file you can find [here](https://raw.githubusercontent.com/elasticio/edifact-parser-component/master/samples/INVOICE.edi), and [here](https://github.com/elasticio/edifact-parser-component/blob/master/samples/INVOICE.edi.json) you will see resulting JSON message body after parsing.


## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

* *Parse* - Parses an incoming EDIFACT attachment.
