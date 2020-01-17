---
title: SAP ECC (R/3, ERP) Component
layout: component
section: ERP components
description: A component that communicates with provided SAP ECC (R/3, ERP) system.
icon: sap-r3.png
icontext: SAP ECC Component
category: sap-r3
createdDate: 2019-08-19
updatedDate: 2020-01-17
---

## Latest changelog

**1.2.0 (January 14, 2019)**

* Implement RFC [Server Trigger](#rfc-server-only-for-realtime-flows)

> To see the full **changelog** please use the following [link](/components/sap-r3/changelog).

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

### RFC Server (Only for Realtime flows)

Generic trigger which gives possibility to receive RFC calls from the SAP ECC platform.

#### RFC Server. Config fields

1. `RFC Group Search Filter` - [wildcard expression](https://help.sap.com/doc/saphelp_470/4.7/es-ES/85/dae7c04bac11d1890e0000e8322f96/content.htm?no_cache=true) is used for filtering groups, default value: `*`
2. `RFC Group` - group of RFC functions, selected value is used by RFC Function field. Shows 100 groups that match regular expression provided in `RFC Group Search Filter` configuration parameter.
3. `RFC Function Search Filter` - [wildcard expression](https://help.sap.com/doc/saphelp_470/4.7/es-ES/85/dae7c04bac11d1890e0000e8322f96/content.htm?no_cache=true) is used for filtering functions, default value: `*`
4. `RFC Function` - Required. Function to be called by the SAP ECC system. Shows 100 functions that match regular expression provided in `RFC Function Search Filter` that belongs to group provided: in `RFC Group` configuration parameters.

RFC Server provides an opportunity to expose any function, which exists on the remote SAP RFC repository.
For this purpose, credentials for the connection to the remote repository and RFC Server connection should be provided.
See example bellow:

![credentials](https://user-images.githubusercontent.com/13310949/71813522-7d0b5d80-3082-11ea-9bfd-2fd546480f28.png)

Additionally, to this, the server supports `FTP_R3_TO_CLIENT` function can receive binary data from the remote sap system and upload this data to [attachments](https://docs.elastic.io/guides/using-attachments.html)

#### Configuration steps on the SAP ECC side

##### 1.Ensure, that registration of tp `EIO_SAP_CONNECTOR` from integration platform host allowed.

 By default the gateway is not allowing the program ID `EIO_SAP_CONNECTOR` to be registered from the integration platform host. In this case, RFC connection fails error below when try to extract data from SAP using **SAP ECC (R/3, ERP) Connector**.

```
LOCATION  SAP-Gateway on host <hostname> / sapgw
ERROR    registration of tp <program id> from host <external host>  not allowed
```

There are two possible reasons:

- Parameter  `gw/acl_mode = 1` and not reginfo file has been set. This is the default value for **NEW INSTALLATIONS** for **Netweaver  7.0x** since December 2012 (including 7.20) and for  **Netweaver 7.3X** since August 2012
- There is a **reginfo** file that doesn't allow the registration of that external program
So, The "reg_info" file from the SAP gateway that appears in the error message ("SAP-Gateway on host <hostname> / sapgw<nr>") creating a line that allows this registration.
The location of the "reg_info" file is specified by parameter `gw/reg_info` and should contain lines like:

 ```
 #VERSION=2
 P TP=<program ID> HOST=<external host> CANCEL=internal,<external host> ACCESS=*
  ...
 # the following lines should be the LAST lines in the reginfo
 #
 P TP=* HOST=<LIST> CANCEL=<LIST> ACCESS=<LIST>
 P TP=* HOST=local
 ```

 Also, you can use the Gateway ACL editor. See details by the [link](https://help.sap.com/doc/saphelp_nw75/7.5.5/en-US/e2/16d0427a2440fc8bfc25e786b8e11c/content.htm?no_cache=true).

 Then, reload the new settings via transaction **SMGW**.

##### 2.Create RFC Destination 'EIO_SERVER' using transaction **SM59**

![Step_1](https://user-images.githubusercontent.com/13310949/70803152-0dc08780-1dbc-11ea-906b-c5adc6bb9fa5.png)

- New destination must have type **T** (TCP/IP Connections)
- Select **Registered Server Program** activation type
- Specify Program ID which specified in the component credentials

![Step_2](https://user-images.githubusercontent.com/13310949/70803279-6001a880-1dbc-11ea-8c6d-f1f41053e9cc.png)

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

1. Chain function call in one transaction context not supported.
2. IDOC mechanism of RFC function call not supported.
3. Component does not support Local Agents.
4. Asynchronous operations are not supported.
5. `RFC Server` trigger currently supports callback requests only. RFC server can not define the RFC call response.
After receiving the request the server responses with an input BAPI structure.
6. `RFC Server` trigger works for realtime flows only.

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
