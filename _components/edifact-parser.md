---
title: Edifact-parser component
layout: article
section: Utility Components
---

> Integration component for {{site.data.tenant.name}} that parses EDIFACT files

# edifact-parser-component
EDIFACT Parser component for the [{{site.data.tenant.name}} platform](http://www.{{site.data.tenant.name}}). It reads incoming attachments and
parses them using EDI parser.


## Authentication

This component requires no authentication.

## How it works

EDIFACT Parser component expects an incoming message(es) with EDI attachment(s) in it. You can test it using SFTP component like this:

![image](https://user-images.githubusercontent.com/56208/29717917-46ad444e-89b1-11e7-8d84-1059f3959472.png)

Sample EDI file you can find [here](https://raw.githubusercontent.com/elasticio/edifact-parser-component/master/samples/INVOICE.edi), and [here](https://github.com/elasticio/edifact-parser-component/blob/master/samples/INVOICE.edi.json) you will see resulting JSON message body after parsing.

## License

Apache-2.0 © [{{site.data.tenant.name}} GmbH](http://{{site.data.tenant.name}})
