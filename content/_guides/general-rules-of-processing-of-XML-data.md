---
title: General rules of processing of XML data
description: Article about your possibilities to represent XML data on platform.
layout: article
section: Working with XML
category: XML
order: 1
---

## Description

As you know {{site.data.tenant.name}} iPaaS uses common data format for messages
that are transferred between components and it is JSON. Common format allows
re-usability of the components due to standardisation, however, you have following
possibilities to represent XML data in {{site.data.tenant.name}}:

## XML converted to and from JSON

When XML data is coming into the system it will be parsed into a JSON. JSON has
some advantages and disadvantages compared to XML, however, JSON vs. XML discussion i
s out of the scope of that article, more information can be found
[here](https://stackoverflow.com/questions/4862310/json-and-xml-comparison).

Internally we use [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js)
library to transform the XML to JSON (if the transformation is required, see this
[article](/guides/getting-XML-data-into-the-platform)
for more information) with following settings:

| Setting Name | Value |
|---------------------|-------|
| **trim** | `false` |
| **normalize** | `false` |
| **explicitArray** | `false` |
| **normalizeTags** | `false` |
| **attrkey** | `"_attr"` |
| **tagNameProcessors** | Here we replace all `:` with `-` to avoid conflicts in mapper processing |

More information on configuration options and their semantics you can find
[here](https://github.com/Leonidas-from-XIV/node-xml2js#options).

Here you can see some of the examples of such transformation:

**Incoming XML**

```xml
<purchaseOrder orderDate="1999-10-20">
    <shipTo country="US">
        <name>Alice Smith</name>
        <street>123 Maple Street</street>
        <city>Mill Valley</city>
        <state>CA</state>
        <zip>90952</zip>
    </shipTo>
    <billTo country="US">
        <name>Robert Smith</name>
        <street>8 Oak Avenue</street>
        <city>Old Town</city>
        <state>PA</state>
        <zip>95819</zip>
    </billTo>
    <comment>Hurry, my lawn is going wild!</comment>
    <items>
        <item partNum="872-AA">
            <productName>Lawnmower</productName>
            <quantity>1</quantity>
            <USPrice>148.95</USPrice>
            <comment>Confirm this is electric</comment>
        </item>
        <item partNum="926-AA">
            <productName>Baby Monitor</productName>
            <quantity>1</quantity>
            <USPrice>39.98</USPrice>
            <shipDate>1999-05-21</shipDate>
        </item>
    </items>
</purchaseOrder>
```

**Resulting JSON**

```js
{
  "purchaseOrder": {
    "_attr": {
      "orderDate": "1999-10-20"
    },
    "shipTo": {
      "_attr": {
        "country": "US"
      },
      "name": "Alice Smith",
      "street": "123 Maple Street",
      "city": "Mill Valley",
      "state": "CA",
      "zip": "90952"
    },
    "billTo": {
      "_attr": {
        "country": "US"
      },
      "name": "Robert Smith",
      "street": "8 Oak Avenue",
      "city": "Old Town",
      "state": "PA",
      "zip": "95819"
    },
    "comment": "Hurry, my lawn is going wild!",
    "items": {
      "item": [
        {
          "_attr": {
            "partNum": "872-AA"
          },
          "productName": "Lawnmower",
          "quantity": "1",
          "USPrice": "148.95",
          "comment": "Confirm this is electric"
        },
        {
          "_attr": {
            "partNum": "926-AA"
          },
          "productName": "Baby Monitor",
          "quantity": "1",
          "USPrice": "39.98",
          "shipDate": "1999-05-21"
        }
      ]
    }
  }
}
```

**And here is more complicated SOAP envelope sample, incoming XML:**

```xml
<?xml version="1.0"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
    <SOAP-ENV:Header>
        <Configuration Supplier="TT" FlowId="abc123">
            <ApiHost>https://int.foo.com</ApiHost>
            <ApiKey>foo</ApiKey>
            <ApiSecret>bar</ApiSecret>
            <Currency>USD</Currency>
        </Configuration>
    </SOAP-ENV:Header>
    <SOAP-ENV:Body>
        <OTA_HotelAvailRQ xmlns="http://www.opentravel.org/OTA/2003/05" EchoToken="2590cbc9-50f2-4161-babb-c97cc07dfe7d"
                          PrimaryLangID="en-US" TimeStamp="2016-12-05T01:10:14.057-08:00" Version="1.0">
            <POS>
                <Source>
                    <RequestorID ID="GOOGLE" ID_Context="BAR" Type="18"/>
                </Source>
            </POS>
        </OTA_HotelAvailRQ>
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

**Resulting JSON:**

```js
{
  "SOAP-ENV-Envelope": {
    "_attr": {
      "xmlns:SOAP-ENV": "http://schemas.xmlsoap.org/soap/envelope/"
    },
    "SOAP-ENV-Header": {
      "Configuration": {
        "_attr": {
          "Supplier": "TT",
          "FlowId": "abc123"
        },
        "ApiHost": "https://int.foo.com",
        "ApiKey": "foo",
        "ApiSecret": "bar",
        "Currency": "USD"
      }
    },
    "SOAP-ENV-Body": {
      "OTA_HotelAvailRQ": {
        "_attr": {
          "xmlns": "http://www.opentravel.org/OTA/2003/05",
          "EchoToken": "2590cbc9-50f2-4161-babb-c97cc07dfe7d",
          "PrimaryLangID": "en-US",
          "TimeStamp": "2016-12-05T01:10:14.057-08:00",
          "Version": "1.0"
        },
        "POS": {
          "Source": {
            "RequestorID": {
              "_attr": {
                "ID": "GOOGLE",
                "ID_Context": "BAR",
                "Type": "18"
              }
            }
          }
        }
      }
    }
  }
}
```

## XML transferred as attachment

You can accept, process and send XML data as a message attachment. Attachment
is an external data that is stored externally (inside the e.io cluster) and
referenced in {{site.data.tenant.name}} message under the attachments node.

When processing XML as attachment, it will be stored as it is, won't be validated
or parsed and available to every component that would like to
read/parse/validate/transform it, however default data transformation components
(e.g. [mapper](/components/mapper)) will not understand
it and won't be able to work with it out-of-the-box.

## XML accepted as RAW in the body

In case you need the XML in the body to stay intact and passed along to the next
step you can use the use `raw` query parameter (`?raw=true`) like below:

```xml
curl -X POST -H "Content-Type: application/xml" \
  -d '<foo>Hello XML!</foo>' \
  https://in.platform.address/hooks/your-hook?raw=true
```

**This scenario only would work in case when XML is being posted to the webhook.**


## Related links

- [JSON and XML comparison](https://stackoverflow.com/questions/4862310/json-and-xml-comparison)
- [Node-xml2js](https://github.com/Leonidas-from-XIV/node-xml2js)
- [Getting XML data into the platform](/guides/getting-XML-data-into-the-platform)
- [Mapper component](/components/mapper)
