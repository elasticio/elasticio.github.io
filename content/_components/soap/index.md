---
title: SOAP component
layout: component
section: Protocol components
description: A companenet that enables seamless integration with SOAP-based Web Services.
icon: soap.png
icontext: SOAP component
category: soap
updatedDate: 2026-05-18
ComponentVersion: 1.2.11
---

## Table of Contents
* [Description](#description)
* [Core Concepts: Server vs Client](#core-concepts-server-vs-client)
* [Requirements](#requirements)
* [How it Works](#how-it-works)
* [Credentials](#credentials)
* [Triggers](#triggers)
    * [Receive SOAP Request](#receive-soap-request)
* [Actions](#actions)
    * [Call](#call)
    * [Soap Reply](#soap-reply)
* [Known Limitations](#known-limitations)
* [API and Documentation links](#api-and-documentation-links)

## Description

The SOAP Component enables seamless integration with SOAP-based Web Services. It supports both consuming external services and exposing your own SOAP endpoints.

## Core Concepts: Server vs Client

Understanding how to use this component depends on whether you want to **call** a service or **provide** a service.

| Feature | Role | Purpose | Typical Usage |
| :--- | :--- | :--- | :--- |
| **Trigger: Receive SOAP Request** | **Server** | Exposes a Webhook URL that accepts SOAP XML. | Acting as a SOAP endpoint for external systems. |
| **Action: Call** | **Client** | Sends a SOAP request to an external WSDL URI. | Fetching data from a 3rd party SOAP service. |
| **Action: Soap Reply** | **Responder** | Sends the HTTP response back to the Trigger caller. | Returning a "Result" to the system that called your flow. |

---

## Requirements

The platform supports the following SOAP protocol versions:
*   SOAP 1.1
*   SOAP 1.2

Component supports the following WSDL styles:
*   RPC/Literal
*   Document/Encoded
*   Document/Literal

### Environment variables

* `EIO_REQUIRED_RAM_MB` - The recommended value for allocated memory is `2048MB`.

## How it Works

### Acting as a SOAP Client (Calling an external service)
1.  Locate and select the SOAP component and choose the **Call** action.
2.  Provide the WSDL URL (e.g., `http://dneonline.com/calculator.asmx?WSDL`).
3.  Select the **Binding** and **Operation** in that exact order.
4.  Map your JSON data to the generated input fields.
5.  The component converts your JSON to XML, sends it to the server, and returns the response as JSON.

### Acting as a SOAP Server (Exposing your own endpoint)
1.  Use the **Receive SOAP Request** trigger. This provides a Webhook URL for your flow.
2.  Provide a WSDL. The trigger uses this as a **Contract** to know what XML structure to expect.
3.  Select the **Binding** and **Operation** in that exact order.
4.  When an external system sends XML to your Webhook, the trigger validates it and converts it to JSON.
5.  Use the **Soap Reply** action at the end of your flow to return a response to the original caller.

---

## Credentials

The component functionally supports:
*   **No Auth**
*   **Basic Auth**

#### Username (Basic Auth)
The username required for the Basic authorization header in the SOAP request.

#### Password (Basic Auth)
The password required for the Basic authorization header in the SOAP request.

> **Important:** Although the UI may display additional authentication types such as API Key or HMAC, these are **not supported** for outgoing calls in the current version.

---

## Triggers

  1. [Receive SOAP Request](/components/soap/triggers#receive-soap-request)                                                 
  A webhook trigger that receives SOAP requests and validates the message body against the provided WSDL.

## Actions

  1. [Call](/components/soap/actions#call)                                                                                    
  Executes a call to an external SOAP service over HTTP.

  2. [Soap Reply](/components/soap/actions#soap-reply)                                                                        
  Sends an HTTP response back to the original caller of the **Receive SOAP Request** trigger.

## Known limitations

*   **WSDL Support:** This version includes improved support for complex WSDLs and external XSD schemas via network-based fetching.
*   **Unsupported Styles:** RPC/SOAP-Encoded styles are not supported.
      *   **All major frameworks for web services support Document/literal messages. Most of the popular frameworks also have some support for rpc/encoded, so developers can still use it to create encoded-only services.** As a result it is hard to estimate the number of web services, in production use, work only with SOAP encoded messages. However, there is a tendency to move away from RPC/encoded towards Document/literal. Since the SOAP encoding specification does not guarantee 100% inter-operability and there are vendor deviations in the implementation of RPC/encoded.
*   **Namespaces:** Namespaces are currently ignored during JSON conversion.
*   **SOAP Headers:** Custom SOAP headers are not yet supported.
*   **Message Format:** Multipart message formats are not supported; only the first part is processed.
*   **Sample Retrieval:** The "Retrieve Sample" feature may not always represent actual runtime behavior.

## API and Documentation links

*   [Apache Axis2](http://axis.apache.org/axis2/java/core/)
*   [FasterXML JsonSchemaGenerator](https://github.com/FasterXML/jackson-module-jsonSchema)