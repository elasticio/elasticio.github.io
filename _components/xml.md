---
title: Xml component
layout: article
section: Utility Components
---



## Description
This is an open source component for Converting XML to and from JSON on elastic.io platform.
Component to be used on the elastic.io platform, which is able to convert XML to and from JSON.
### Purpose
This component has 3 actions allowing users to pass in either generic but well format XML/JSON string or XML attachment and produces a generic string of the other file type. The output then can be maped and used in other components.

### How it works.
Before you can deploy any code into elastic.io you must be a registered elastic.io platform user. Please see our home page at http://www.elastic.io to learn how.

### Requirements
#### Environment variables
No environment variables need to be set.

## Actions

### XML to JSON
Takes XML string and converts it to generic JSON object.

#### Schemas
[input schema](lib/schemas/xmlToJson.in.json) \
[output schema](lib/schemas/xmlToJson.out.json)

### JSON to XML
Takes the body of message passed into the component and converts to generic XML string

#### Schemas
[output schema](lib/schemas/jsonToXml.out.json)

### XML Attachment to Json
Looks at the json array of attachments passed in to component and converts all XML found to generic JSON object

#### Input field
**Pattern to Match Files** - enter pattern for filtering files by name or leave this field empty for processing all incoming *.xml files.

#### Schemas
[output schema](lib/schemas/xmlToJson.out.json)

#### Known limitations
 - The maximum size of incoming file for processing is 5 MiB. If the size of incoming file will be more than 5 MiB, action will throw error `Attachment *.xml is to large to be processed my XML component. File limit is: 5242880 byte, file given was: * byte.`.
 - Action does not support local agents due to current platform limitations.

## License

Apache-2.0 © [elastic.io GmbH](https://elastic.io)
Icon made by Freepik from www.flaticon.com
