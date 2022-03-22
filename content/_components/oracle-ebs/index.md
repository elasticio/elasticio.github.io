---
title: Oracle E-Business Suite Component
layout: component
section: ERP components
description: A component for working with Oracle E-Business Suite services on the platform.
icon: oracle-ebs.png
icontext: Oracle E-Business Suite Component
category: oracle-ebs
updatedDate: 2020-09-20
ComponentVersion: 1.0.0
---

## Description

This is the component for working with Oracle E-Business Suite services on [{{site.data.tenant.name}} platform](http://www.{{site.data.tenant.name}}).

### Purpose

The component allows you to connect to Oracle E-Business Suite through REST services provided by Oracle E-Business Suite Integrated SOA Gateway (ISG). For more information about Oracle EBS, visit the [Oracle’s official documentation](https://www.oracle.com/applications/ebusiness/products.html).

## Requirements

To use the Oracle EBS connector, you need the following:

* `REST Service Locator` deployed as a REST service (default alias: `servicelocator`).
* Configuring REST web services in Oracle EBS and deploying them via the Integration Repository.

### Deploy the REST Service Locator

Here is a short version from Oracle Developer's Guide [Using Java APIs as REST Services](https://docs.oracle.com/cd/E26401_01/doc.122/e20927/T511473T634173.htm):

1. Log in to Oracle EBS with the credentials that have the `Integration Administrator` role.
2. In the left **Navigator** panel select the **Integration Repository** link.
3. In the Integration Repository tab, click **Search** button.
4. In the **Internal Name** input enter `oracle.apps.fnd.rep.ws.service.EbsRestLocator` and click Go button.
5. Click the **REST Service Locator** interface name link.
6. In the **REST Web Service tab**, enter the Service Alias: `servicelocator` and click **Deploy** button.

## Credentials

REST Web Service is secured by HTTP Basic Authentication at HTTP Transport level.
You need EBS domain name or IP address, user name and password.

|Name|Description|
|----|-----------|
| EBS Domain | Specify your EBS domain name or IP address. |
| Username | Specify your username for access to ESB service. |
| Password | Specify your password for access to ESB service. |
| Service Locator Name | If REST Service Locator deployed under alias different from `servicelocator` you may specify it explicitly in the **Service Locator** name input. |

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Execute method

Execute a method with the specified parameters on EBS server and return results.

#### List of Expected Config fields

* **Interface name** - a dropdown list where you should choose an interface name which you want to use.
* **Method name** - a dropdown list where you should choose a method name from the selected interface.

#### Expected input/output metadata

Method input formats are all unique and created dynamically.

## Known limitations

* `base64Binary` data types not supported
* custom data types represented in UI as an `object`
