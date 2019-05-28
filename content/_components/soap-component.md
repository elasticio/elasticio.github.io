---
title: Soap component
layout: article
section: Utility Components
---


## Description
The SOAP Component provides the SOAP Web Services work opportunity within a {{site.data.tenant.name}} flow.

### Purpose

As an integration platform, {{site.data.tenant.name}} should has an opportunity to invoke SOAP Web services over HTTP.

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
``` EIO_REQUIRED_RAM_MB - recommended value of allocated memory is 2048MB ```
## Credentials

### Type
You can select next authorization type:
* **No Auth**
* **Basic Auth**
* **API Key Auth** <span style="color:red">(*not supported yet*)</span>.
### Username (Basic auth type)
Username for Basic authorization header in the SOAP request
### Password (Basic auth type)
Password for Basic authorization header in the SOAP request

## Actions
### Call
Makes a call to SOAP service over HTTP using public WSDL URL

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
