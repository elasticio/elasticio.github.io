---
title: SOAP Actions
layout: component
description: SOAP component actions.
icon: soap.png
icontext: SOAP component
category: soap
updatedDate: 2026-05-18
ComponentVersion: 1.2.11
---

## Call

Executes a call to an external SOAP service over HTTP.

Call action supports Basic Authorization, choose Basic Authorization type in credentials and provide credentials for WSDL.

{% include img.html max-width="100%" url="img/soap-call-action.png" title="Call action" %}

### Input fields description

* **WSDL URI** - Publicly accessible URL of the WSDL.
* **Binding** - Select one of the bindings described in the WSDL.
* **Operation** - Select an operation available for the chosen binding.
* **Request Timeout** - The timeout period in milliseconds (1-1,140,000). Defaults to `60,000`.

### SOAP Fault Handling
If the server returns a SOAP Fault, the component emits a platform exception by default. 
Example of a SOAP 1.2 Fault converted to JSON:
```json
{
  "Fault": {
    "faultcode": "S:Server",
    "reason": "Server error java.lang.NullPointerException"
  }
}
```

### Input json schema

The component does not have static input json schema as it is dynamically generated
for every wsdl/binding/operation specified during the configuration of the component input fields.
[Apache Axis2](http://axis.apache.org/axis2/java/core/) and [FasterXML JsonSchemaGenerator](https://github.com/FasterXML/jackson-module-jsonSchema) tools are used by the component internally to generate an input metadata.
You can refer these tools documentation to get deeper understanding about the product.

### Output json schema

Output json schema is generated dynamically the same as for the input (see above).

## Soap Reply

Sends an HTTP response back to the original caller of the **Receive SOAP Request** trigger.

{% include img.html max-width="100%" url="img/soap-reply-action.png" title="Soap Reply" %}

### Input fields description

*   **WSDL URI** - Public URL address of the WSDL
*   **Binding** - One of the bindings available and described in the WSDL, which you want to use for a SOAP call
*   **Operation** - One of the operations available for the binding you have selected above.

### Input json schema

The component does not have static input json schema as it is dynamically generated for every wsdl/binding/operation specified during the configuration of the component input fields.
[Apache Axis2](http://axis.apache.org/axis2/java/core/) and [FasterXML JsonSchemaGenerator](https://github.com/FasterXML/jackson-module-jsonSchema) tools are used by the component internally to generate an input metadata.
You can refer these tools documentation to get deeper understanding about the product.

### Output json schema

Output json schema is generated dynamically the same as for the input (see above).

### Input Data Example:
If your flow calculated a sum of `30`, you would map it to the **Soap Reply** input:
```json
{
  "AddResponse": {
    "AddResult": 30
  }
}
```

### Output Data Example (XML sent back to caller):
```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <AddResponse xmlns="http://tempuri.org/">
            <AddResult>30</AddResult>
        </AddResponse>
    </soap:Body>
</soap:Envelope>
```