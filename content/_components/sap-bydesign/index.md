---
title: SAP ByDesign component
layout: article
section: ERP components
category: sap-byDesign
---

## Description

The component that provides an opportunity to interact with the SAP Business
ByDesign API. SAP Business ByDesign (ByD) is a cloud enterprise resource
planning software (Cloud ERP) operated as software as a service by SAP SE.

## Environment variables

| Name | Mandatory | Description | Values |
|-------------------- |---------|-----------|------|
| `LOG_LEVEL`           | false   | Log Level. Default value (`INFO`) | `FATAL` `ERROR` `WARN` `INFO` `DEBUG` `TRACE` |
| `EIO_REQUIRED_RAM_MB` | false   | Default value: `256`MB | Recommended value: `2048`MB |


## Credentials

| Property name | Required | Description | Example |
|-------------|--------|-----------|-------|
| Service URL | true   | `https://my3443532.sapbydesign.com` |
| Username    | true   | Username for authentication | `sapAdmin` |
| Password    | true   | Password for authentication | `adminPassw` |

> **Important:** User should have access rights to get `WSIL` service descriptor
> and rights to call a service operation specified during the `Call Service` configuration.

## Triggers

This component has no trigger functions. This means you can not select it as a first
component during the integration flow design.

## Actions

### Call Service

Calls SAP ByDesign service for specified binding and operation.

#### Input fields description

| Input field | Required | Description | Example |
|--------------|--------|---------|---------|
| Service Name | true   | Service of SAP By Design to call | `Query Accounts` |
| Binding      | true   | SOAP Service binding             | `binding_SOAP12` |
| Operation    | true   | SOAP Service operation           | `FindByElements` |


## Request examples

1.  Query Accounts ![Query Accounts](img/action-query-accounts.png). Example in metadata:
```json
{
    "CustomerByElementsQuery_sync": {
      "customerSelectionByElements": {
        "selectionByCreationDateTime": [
          {
            "inclusionExclusionCode": "I",
            "intervalBoundaryDateTime": "7",
            "upperBoundaryDateTime": "2019-01-01T00:00:00Z"
          }
        ]
      },
      "processingConditions": {
        "queryHitsMaximumNumberValue": 2,
        "queryHitsUnlimitedIndicator": false
      }
    }
}
```
2.  Query Price Lists ![Query Price Lists](img/action-query-pricelists.png). Example in metadata:
```json
{
    "SalesPriceListFindByTypeCodeAndPropertyIDAndPropertyValueQuery_sync": {
      "salesPriceList": {
        "lastChangedDatetimeInterval": {
          "lowerBoundaryDateTime": "2001-01-01T00:00:00Z",
          "upperBoundaryDateTime": "2019-01-01T00:00:00Z"
        }
      }
    }
}
```
3.  Query Sales Orders ![Query Sales Orders](img/action-query-salesorders.png). Example in metadata:
```json
 {
    "SalesOrderByElementsQuery_sync": {
      "salesOrderSelectionByElements": {
        "selectionByLastChangedDate": [
          {
            "inclusionExclusionCode": "I",
            "IntervalBoundaryTypeCode": "7",
            "upperBoundaryDateTime": "2019-01-01T00:00:00Z"
          }
        ]
      },
      "processingConditions": {
        "queryHitsMaximumNumberValue": 2,
        "queryHitsUnlimitedIndicator": false
      }
    }
 }
```
4.  Query Materials ![Query Materials](img/action-query-materials.png). Example in metadata:
```json
{
    "MaterialByElementsQuery_sync": {
      "materialSelectionByElements": {
        "SelectionByLastChangeSinceDateTime": "2001-01-01T00:00:00Z"
      },
      "processingConditions": {
        "queryHitsMaximumNumberValue": 2,
        "queryHitsUnlimitedIndicator": false
      }
    }
}
```

5.  Product Availability (Available To Promise Check) ![Determine availability of products](img/action-determine-availability.png). Example in metadata:
```json
{
    "ProductAvailabilityDeterminationQuery_sync": {
      "productAvailabilityDeterminationQuery": {
        "productAndSupplyPlanningArea": [
          {
            "supplyPlanningAreaID": {
              "value": "P1100"
            },
            "productInternalID": {
              "value": "P100101"
            },
            "productTypeCode": "1"
          }
        ],
        "productAvailabilityDeterminationHorizonDuration": "P2D",
        "considerScopeOfCheckIndicator": false
      }
    }
  }
```


## Limitations

version: 2.0.0

*   Component has no Trigger functions.

## License

© [{{site.data.tenant.name}} GmbH](https://www.{{site.data.tenant.name}})
