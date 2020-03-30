---
title: Microsoft Dynamics NAV OData component
layout: component
section: ERP components
description: Microsoft Dynamics NAV is a global enterprise resource planning (ERP) solution that provides small and midsize businesses greater control over their financials and can simplify their supply chain, manufacturing, and operations.
icon: microsoft-dynamic-nav-odata.png
icontext: Microsoft-Dynamics-NAV-Odata component
category: Microsoft Dynamics NAV Odata
createdDate: 2020-03-10
updatedDate: 2020-03-25
---

## Latest changelog

**1.0.0 (March 19, 2020)**

* add deleteObjectsByCriteria action

> To see the full **changelog** please use the following [link](/components/microsoft-dynamics-nav-odata/changelog).


## General information

Microsoft Dynamics NAV component for the [{{site.data.tenant.name}} platform](http://www.{{site.data.tenant.name}}).

### Description

This is the component for working with Microsoft Dynamics NAV OData API on [{{site.data.tenant.name}} platform](http://www.{{site.data.tenant.name}}).

### Purpose

The component provides ability to connect to Microsoft Dynamics NAV.

### Completeness Matrix

The [component completeness](completeness-matrix) matrix gives the technical
details about Salesforce objects this component covers.

## Requirements

### Environment variables

|Name|Mandatory|Description|Values|
|----|---------|-----------|------|
|`LOG_LEVEL`| false | Controls logger level | `trace`, `debug`, `info`, `warning`, `error` |


## Credentials

 - **Username** - the name of the user who has rights to access Dynamics 365 Business Central / NAVOData, for your Dynamics 365 Business Central / NAVOData service NTLM authentication.
 - **Password** - the password, for your Dynamics NAVOData service NTLM authentication.
 - **Service URL** - the address of any acceptable URL where the Dynamics 365 Business Central / NAVOData service is located.

## Triggers

This component has no trigger functions. This means it will not be accessible to select as a first component during the integration flow design.

## Actions

### Delete Object By Unique Criteria

Delete an existing entry with the criteria provided.

#### List of Expected Config fields

 - **Object Type to Delete** - select the type of object which you want to delete.

#### Expected input metadata

Input metadata is dynamically generated for specified object type. You need to set unique keys which specified in the Microsoft NAV OData metadata. For example:

- **Object type**: Sales Order

- **Json schema**:

```json

{
  "Document_Type": {
    "type": "string",
    "required": true,
    "title": "Document_Type"
  },
  "No": {
    "type": "string",
    "required": true,
    "title": "No"
  }
}
```

You can find xml metadata using next url template: `http://hostname:port/DynamicsNAV80/OData/$metadata`.

#### Expected output metadata

Output metadata is dynamically generated for specified object type.

- **Object type**: Sales Order

- **Json schema**:

```json

{
	"type": "object",
	"properties": {
		"result": {
			"type": "string"
		},
		"criteria": {
			"type": "object",
			"properties": {
				"Document_Type": {
					"type": "string"
				},
				"No": {
					"type": "string"
				}
			}
		}
	}
}
```

## Links to documentation

[Microsoft OData](https://docs.microsoft.com/en-us/odata/)
