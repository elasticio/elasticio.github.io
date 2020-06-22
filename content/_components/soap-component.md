---
title: soap-component
layout: article
section: PLACEHOLDER
---
---

[![CircleCI](https://circleci.com/gh/elasticio/soap-component.svg?style=svg)](https://circleci.com/gh/elasticio/soap-component)
# SOAP Component
## Table of Contents
* [Description](#description)
   * [Purpose](#purpose)
   * [Completeness Matrix](#completeness-matrix)
   * [How it works](#how-it-works)
        * [Step 1](#step-1)
        * [Step 2](#step-2)
        * [Step 3](#step-3)
        * [Step 4](#step-4)
        * [Step 5](#step-5)
        * [Step 6](#step-6)
   * [Requirements](#requirements)
   * [Environment variables](#environment-variables)
* [Credentials](#credentials)
    * [Type](#type)
    * [Username](#username-basic-auth-type)
    * [Password](#password-basic-auth-type)
* [Triggers](#actions)
   * [Receive SOAP Request](#receive-soap-request)
     * [Input fields description](#input-fields-description)
     * [Example of usage](#example-of-usage)
     * [Known Limitations](#known-limitations)
* [Actions](#actions)
   * [Call](#call)
     * [Input fields description](#input-fields-description)
     * [SOAP Fault](#soap-fault)
     * [Input Json Schema](#input-json-schema)
     * [Output Json Schema](#output-json-schema)
     * [Additional info](#additional-info)
   * [Soap Reply](#soap-reply)
     * [Input fields description](#input-fields-description)
     * [Input json schema](#input-json-schema)
     * [Output json schema](#output-json-schema)
     * [Current limitations](#current-limitations))
* [API and Documentation links](#api-and-documentation-links)
* [License](#license)

## Description
The SOAP Component provides the SOAP Web Services work opportunity within a open integration hub flow.

### Purpose
As an integration platform, open integration hub should has an opportunity to invoke SOAP Web services over HTTP.

### Completeness Matrix
![image](https://user-images.githubusercontent.com/36419533/65602890-eddfab80-dfa4-11e9-8d76-bd758aafa403.png)

[SOAP component completeness matrix](https://docs.google.com/spreadsheets/d/1bNDN_E9kBgeKrSu-NWDp3Zsrf6V7ud8hi2HPKlPCmcQ)

### How it works
#### Step 1
Find and select SOAP component in the component repository
![Step 1](https://user-images.githubusercontent.com/13310949/43515103-5de72b58-958a-11e8-88ce-5870003867a1.png)
#### Step 2
Create new or select existing credentials
![Step 2](https://user-images.githubusercontent.com/13310949/43514620-3c2b9efa-9589-11e8-9d9e-c82b1d66e5eb.png)
#### Step 3
Specify WSDL URL, then choose binding and operation consecutively. **The order matters!**
![Step 3](https://user-images.githubusercontent.com/13310949/43522182-365e9fbe-95a1-11e8-8226-3e3679afbe17.png)
#### Step 4
Configure an input data and click "Continue"
![Step 4](https://user-images.githubusercontent.com/13310949/43514773-9036472a-9589-11e8-83d6-95759f1a2cc9.png)
#### Step 5
Retrieve sample or add sample manually
![Step 5: Retrieve sample](https://user-images.githubusercontent.com/13310949/43514839-bace8e16-9589-11e8-92d2-e54890472dbb.png)
#### Step 6
Retrieve sample result
![Step 6: Retrieve sample result](https://user-images.githubusercontent.com/13310949/43515232-aca5be76-958a-11e8-95a0-c723f9323e4f.png)

### Requirements
The platform supports next SOAP protocol versions:
* SOAP 1.1
* SOAP 1.2

Component supports next wsdl styles:
* RPC/Literal
* Document/Encoded
* Document/Literal

#### Environment variables
``` OIH_REQUIRED_RAM_MB - recommended value of allocated memory is 2048MB ```

## Credentials

### Type
Call action supports next authorization type:
* **No Auth**
* **Basic Auth**
### Username (Basic auth type)
Username for Basic authorization header in the SOAP request
### Password (Basic auth type)
Password for Basic authorization header in the SOAP request

NOTE: Error would not be thrown on invalid credentials, as credenteals does not contain WSDL url.
In case of invalid credentials error expected on sample retrieve step: Unexprected reponse from server satus code: 401 Anunthorized
## Triggers
### Receive SOAP Request
Webhook that validates input body over WSDL.
#### Input fields description
* **WSDL URI** - Public URL address of the WSDL
* **Binding** - One of the bindings available and described in the WSDL, which you want to use for a SOAP call
* **Operation** - One of the operations available for the binding you have selected above.
* **Validation** - If `Enabled` validate the SOAP Body over wsdl, if `Disabled` does not validate a SOAP Input Body
#### Example of usage
##### Configuration:
* **WSDL URI** - `http://www.dneonline.com/calculator.asmx?wsdl`
* **Binding** - `CalculatorSoap12`
* **Operation** - `Add`
* **Validation** - `Enabled`
##### Request Body:
```xml
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <Add xmlns="http://tempuri.org/">
      <intA>1</intA>
      <intB>1</intB>
    </Add>
  </soap:Body>
</soap:Envelope>
```
##### Output:
```JSON
{
  "Add": {
    "intA": "1",
    "intB": "1"
  }
}
```
#### Known Limitations
1. Namespaces ignored and SOAP Body with 2 tags that have same name but in different namespaces would be invalid
2. SOAP Headers not supported yet
3. Retrieve Sample does not represent actual behaviour of component 

## Actions
### Call
Makes a call to SOAP service over HTTP using public WSDL URL.
Call action supports Basic Authorization, choose Basic Authorization type in credentials and provide credentials for WSDL.

#### Input fields description
* **WSDL URI** - Public URL address of the WSDL
* **Binding** - One of the bindings available and described in the WSDL, which you want to use for a SOAP call
* **Operation** - One of the operations available for the binding you have selected above.

#### SOAP Fault
A SOAP fault is used to carry error information within a SOAP message. The component handles SOAP faults and emits platform exception in this case.
SOAP Fault should comply with the [W3C SOAP Fault standard](https://www.w3.org/TR/soap12-part1/#soapfault).

#### Input json schema
The component does not have static input json schema as it is dynamically generated for every wsdl/binding/operation specified in the process of configuration the component input fields.
[Apache Axis2](http://axis.apache.org/axis2/java/core/) and [FasterXML JsonSchemaGenerator](https://github.com/FasterXML/jackson-module-jsonSchema) tools are used by the component internally to generate an input metadata.
You can refer these tools documentation in order to get deeper understanding about the product.

#### Output json schema
Output json schema is generated dynamically the same as for the input (see above).

## Additional info
<span style="color:red">You should specify input fields exactly in the order below. You'll get an error otherwise</span>.
1. WSDL URI
2. Binding
3. Operation

### Soap Reply
Wraps and returns input data as SOAP response by provided SOAP metadata

#### Input fields description
* **WSDL URI** - Public URL address of the WSDL
* **Binding** - One of the bindings available and described in the WSDL, which you want to use for a SOAP call
* **Operation** - One of the operations available for the binding you have selected above.

#### Input json schema
The component does not have static input json schema as it is dynamically generated for every wsdl/binding/operation specified in the process of configuration the component input fields.
[Apache Axis2](http://axis.apache.org/axis2/java/core/) and [FasterXML JsonSchemaGenerator](https://github.com/FasterXML/jackson-module-jsonSchema) tools are used by the component internally to generate an input metadata.
You can refer these tools documentation in order to get deeper understanding about the product.

#### Output json schema
Output json schema is generated dynamically the same as for the input (see above).

#### Input data example:
```json
{
  "AddResponse": {
    "AddResult": 3
  }
}
```

#### Output data example:
```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <soap:Body>
        <AddResponse xmlns="http://example.org/">
            <AddResult>3</AddResult>
        </AddResponse>
    </soap:Body>
</soap:Envelope>
```

### Current limitations
The following are limitations of this connector:

* RPC/SOAP-Encoded styles are not supported.

>All major frameworks for web services support Document/literal messages. Most of the popular frameworks also have some support for rpc/encoded, so developers can still use it to create encoded-only services.
As a result it is hard to estimate how many web services, in production use, work only with SOAP encoded messages.
However there is a tendency to move away from RPC/encoded towards Document/literal.
This is so, because the SOAP encoding specification does not guarantee 100% interoperability and there are vendor deviations in the implementation of RPC/encoded.

* Only self-containing WSDLs are supported now. This means that WSDL containing external XSD schemas will not work in this version of the component.
* WS-Security header isn`t supported.
* WS-Addressing isn`t supported.
* Custom SOAP headers can not be added.
* The WSDL and associated schemas must be accessible via a publicly accessible URL. File upload of the WSDL and/or XSD schemas is not supported.
* Component does not support multipart format of message in the SOAP request element. Only first part of request element will be processed in the current component version.

## API and Documentation links
* [Apache Axis2](http://axis.apache.org/axis2/java/core/)
* [FasterXML JsonSchemaGenerator](https://github.com/FasterXML/jackson-module-jsonSchema)

## License
 © [Elastic.io GmbH](https://elastic.io)
