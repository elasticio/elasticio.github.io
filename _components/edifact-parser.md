---
title: Edifact-parser component
layout: article
section: Utility Components
---

> Integration component for elastic.io that parses EDIFACT files

# edifact-parser-component
EDIFACT Parser component for the [elastic.io platform](http://www.elastic.io). It reads incoming attachments and
parses them using EDI parser.


## Authentication

This component requires no authentication.

## How it works

EDIFACT Parser component expects an incoming message(es) with EDI attachment(s) in it. You can test it using SFTP component like this:

![image](https://user-images.githubusercontent.com/56208/29717917-46ad444e-89b1-11e7-8d84-1059f3959472.png)

Sample EDI file you can find [here](https://raw.githubusercontent.com/elasticio/edifact-parser-component/master/samples/INVOICE.edi), and [here](https://github.com/elasticio/edifact-parser-component/blob/master/samples/INVOICE.edi.json) you will see resulting JSON message body after parsing.

## License

Apache-2.0 © [elastic.io GmbH](http://elastic.io)


[npm-image]: https://badge.fury.io/js/edifact-parser-component.svg
[npm-url]: https://npmjs.org/package/edifact-parser-component
[travis-image]: https://travis-ci.org/elasticio/edifact-parser-component.svg?branch=master
[travis-url]: https://travis-ci.org/elasticio/edifact-parser-component
[daviddm-image]: https://david-dm.org/elasticio/edifact-parser-component.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/elasticio/edifact-parser-component
