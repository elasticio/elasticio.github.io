---
title: SAP ECC (R/3, ERP) Component
layout: component
section: ERP components
description: A component that communicates with provided SAP ECC (R/3, ERP) system.
icon: sap-r3.png
icontext: SAP ECC Component
category: sap-r3
createdDate: 2019-08-19
updatedDate: 2019-11-05
---

## General Information

### How works

Communication with SAP ECC (R3) established using SAP Java Connector (SAP JCo).

### API Version

SAP Java Connector 3.0.19 SDK is being used.

## Requirements

### Environment Variables

| Name | Mandatory | Description | Values |
|----|---------|-----------|------|
| `LOG_LEVEL` | false | Log Level. Default value (`info`) | `fatal` `error` `warn` `info` `debug` `trace` |
| `EIO_REQUIRED_RAM_MB` | false | Recommended value of allocated memory, MB | `512` |

## Credentials

1. `Connection Type` - Mandatory. type of connection. Options: `Application Server` and `Message Server`. Application Server (AS) provides programming interfaces to handle data (get, create, update, delete). The application server exposes two interfaces: ABAP and Java.
The SAP Message Server manages communication between the application servers, passes requests from one application server to another within the system and contains information about application server groups and the current load balancing within them. It uses this information to choose an appropriate server when a user logs on to the system.
2. `SAP Message Service` - Mandatory for connection type: `Message Server`.
3. `SAP System Number` - Mandatory. System Number of SAP ECC (R/3, ERP) DB.
4. `SAP Client Number` - Client Number of SAP ECC (R/3, ERP). Client number may be different for different installations. But here is an example of clients available in one of the standard installation types (an extraction from SAP's official documentation):
  -    `000` - serves as standard delivery client (as usual in on-premise deployments)
  -    `100` - is the primary demo client that contains the pre-configured scenarios and sample data.
  -    `200` - can be used to experience the activation of SAP Best Practices on your own (see the SAP Best Practices implementation guide for details)
  -    `300` - contains the activated Best Practices based on the White-list approach
  -    `400` - contains the activated Best Practices based on the merged-client-000 approach
5.  `SAP Hostname` - Mandatory. Domain or IP of SAP ECC (R/3, ERP) System.
6.  `SAP User Name` - Mandatory. Username that used for SAP ECC (R/3, ERP) connection.
7.  `SAP Password` - Mandatory. Password that used for SAP ECC (R/3, ERP) connection.
8.  `SAP Language` - Language to operate in SAP ECC (R/3, ERP).

## Triggers

This component has no trigger functions. This means you can not select it as a first
component during the integration flow design.

## Actions

### Call RFC Service

Generic action which gives possibility to call an RFC function on the SAP ECC platform.

#### Call RFC Service. Configuration fields

1.  `RFC Group Search Filter` - [wildcard expression](https://help.sap.com/doc/saphelp_470/4.7/es-ES/85/dae7c04bac11d1890e0000e8322f96/content.htm?no_cache=true) used for filtering groups, default value: `*`
2.  `RFC Group` - group of RFC functions, selected value is used by RFC Function field. Shows 100 groups that match regular expression provided in `RFC Group Search Filter` configuration parameter.
3.  `RFC Function Search Filter` - [wildcard expression](https://help.sap.com/doc/saphelp_470/4.7/es-ES/85/dae7c04bac11d1890e0000e8322f96/content.htm?no_cache=true) used for filtering functions, default value: `*`
4.  `RFC Function` - Required. Function to be called by component. Shows 100 functions that match regular expression provided in `RFC Function Search Filter` that belongs to group provided: in `RFC Group` configuration parameters.

> **Note 1:** When retrieving function's metadata you may get the following message:
> **We are sorry! Field `CustomFields[*]` can not be mapped with the graphical UI. Mapping of array elements is possible in "Developer Mode" using JSONata expressions.**
> Please contact our support for assistance and visit [http://docs.jsonata.org](http://docs.jsonata.org) for more examples of JSONata expressions.

> **Note 2:** as `RFC Function` and `RFC Group` fields shows not more than 100 items you need to complete filter fields of each configuration field in order to get needed object. You can find more information about *Wildcard Characters* in the [SAP Help Portal](https://help.sap.com/doc/saphelp_470/4.7/es-ES/85/dae7c04bac11d1890e0000e8322f96/content.htm?no_cache=true)

#### Call RFC Service. Usage Examples

**1.** Call standard `STFC_CONNECTION` function.

`RFC Function Search Filter`: STFC_CONNECTION

`RFC Function`: STFC_CONNECTION

```json
{
  "importParameters": {
    "REQUTEXT": "Hello SAP"
  }
}
```
**2.** Call standard `RFC_SYSTEM_INFO` function.

`RFC Function Search Filter`: RFC_SYSTEM_INFO

`RFC Function`: RFC_SYSTEM_INFO

```json
{}
```

**3.** Call predefined `BAPI_CUSTOMER_GETLIST` function.

`RFC Function Search Filter`: BAPI_CUSTOMER_GETLIST

`RFC Function`: BAPI_CUSTOMER_GETLIST

```json
{
  "importParameters": {
    "MAXROWS": 100
  },
  "tableParameters": {
    "IDRANGE": [
      {
        "SIGN": "I",
        "OPTION": "NE",
        "HIGH": "0",
        "LOW": "0"
      }
    ]
  }
}
```

## Known Limitations

1.  Chain function call in one transaction context not supported
2.  IDOC mechanism of RFC function call not supported
3.  Component does not support Local Agents
4.  Asynchronous operations are not supported


## Deployment limitations

### Technical details

A component can be deployed to the platform starting from the version
`3.19.0-rc.1`. Sap Jco client library is not supported in the default version of the task docker image.

Steps to deploy the component:

1.  Push the HEAD master version of the component to the component repository.
2.  Run gradle clean build.
3.  Build a local docker image using a docker file from the component repository.

```sh
docker build . --no-cache -t 10.25.0.54:31001/elasticio/5d5a7ffa8cd40800110e37e3:test19
```
where
*   `10.25.0.54` - IP address one of platform nodes
*   `31001` - port of docker registry
*   `test19` - tag of the docker image which you will use for new component version

4.  Push docker image to the docker registry (you need VPN access to the platform subnet):

```sh
docker push 10.25.0.54:31001/elasticio/5d5a7ffa8cd40800110e37e3:test19
```

5.  Find document in the collection `repobuilds` which connected with your last `git push` and update version of docker image to `test19`

```
"dockerImage" : "elasticio/5d5a7ffa8cd40800110e37e3:test20",
```
