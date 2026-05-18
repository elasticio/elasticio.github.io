---
title: SOAP Triggers
layout: component
description: SOAP component triggers.
icon: soap.png
icontext: SOAP component
category: soap
updatedDate: 2026-05-18
ComponentVersion: 1.2.11
---

## Receive SOAP Request

A webhook trigger that receives SOAP requests and validates the message body against the provided WSDL.

{% include img.html max-width="100%" url="img/soap-recive-trigger.png" title="Receive SOAP Request" %}

### Input Field Descriptions
* **WSDL URI** - Publicly accessible URL of the WSDL.
* **Binding** - Select one of the bindings described in the WSDL.
* **Operation** - Select an operation available for the chosen binding.
* **Validation** - If `Enabled`, the SOAP body is validated against the WSDL schema.

### Example of usage

#### Configuration:

**WSDL URI:** `http://www.dneonline.com/calculator.asmx?wsdl` | **Operation:** `Add`

#### Request Body:

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <Add xmlns="http://tempuri.org/">
      <intA>10</intA>
      <intB>20</intB>
    </Add>
  </soap:Body>
</soap:Envelope>
```

#### Output:

```json
{
  "Add": {
    "intA": 10,
    "intB": 20
  }
}
```