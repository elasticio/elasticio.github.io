---
title: xml
layout: article
section: PLACEHOLDER
---
---

# XML Component [![CircleCI](https://circleci.com/gh/elasticio/xml-component.svg?style=svg)](https://circleci.com/gh/elasticio/xml-component)

## Description
elastic.io iPaaS component to convert between XML and JSON data. 

### Purpose
Allows users to convert XML attachments and strings to and from JSON
This component has 3 actions allowing users to pass in either generic but well format XML/JSON string or XML attachment 
and produces a generic string of the other file type. The output then can be maped and used in other components.

### Requirements
Provided XML document (for `XML to JSON`) should be [well-formed](https://en.wikipedia.org/wiki/Well-formed_document) 
in order to be parsed correctly. You will get an error otherwise.

#### Environment variables 
No environment variables need to be set.

## Actions

### XML to JSON
Takes XML string and converts it to generic JSON object.

### XML Attachment to JSON
Looks at the JSON array of attachments passed in to component and converts all XML that it finds to generic JSON objects 
and produces one outbound message per matching attachment. As input, the user can enter a patter pattern for filtering 
files by name or leave this field empty for processing all incoming *.xml files.  

### JSON to XML 
Treats incoming message body as JSON and converts it to a generic XML string.

## Known limitations
 - The maximum size of incoming file for processing is 5 MiB. If the size of incoming file will be more than 5 MiB, 
 action will throw error `Attachment *.xml is to large to be processed by XML component. File limit is: 5242880 byte, 
 file given was: * byte.`. 
 - `XML Attachemnt to JSON` action does not support local agents due to current platform limitations.
 
## Additional Info
Icon made by Freepik from www.flaticon.com 

## License

Apache-2.0 © [elastic.io GmbH](https://elastic.io)
