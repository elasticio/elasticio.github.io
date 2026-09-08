---
title: Google Spreadsheets v2 component
layout: component
section: Office components
description: iPaaS component to read and write to Google Spreadsheets (Google Sheets)
icon: gspreadsheet.png
icontext: Google Spreadsheets component
category: gspreadsheet-v2
updatedDate: 2025-08-06
ComponentVersion: 1.1.1
---

## Table of Contents

* [Description](#description)
  * [Completeness Matrix](/components/gspreadsheet-v2/technical-notes#completeness-matrix)
  * [Google preparations](#google-preparations)
  * [Environment variables](#environment-variables)
* [Credentials](#credentials)
* [Triggers](#triggers)
  * [Get Spreadsheet Row (trigger)](#get-spreadsheet-row) 
* [Actions](#actions) 
  * [Read Spreadsheet](#read-spreadsheet) 
  * [Create new Spreadsheet](#create-new-spreadsheet) 
  * [Add Spreadsheet Row](#add-spreadsheet-row)
  * [Get Spreadsheet Row (action)](#get-spreadsheet-row-action) 
* [Recommendations](#recommendations)
* [Limitations](#limitations)

## Description

iPaaS component to read and write to Google Spreadsheets (Google Sheets).

This component is a new version of [Google Spreadsheets component](/components/gspreadsheet/index)  but with breaking changes:
* Use [Faceless](/guides/secrets) service for authentication 
* Added `Create/Upsert/Update Spreadsheet Row` action
* Added `Read Spreadsheet` action

### Google preparations

Before building any integration flow you must at first configure the app from inside the Google Developers Console.
1. In order to do this you, go to the `API & Service` page and enable the following:
- Google Drive API
- Google Sheets API
2. Go to the `Credentials` section and create a new credential of type  `OAuth client ID`.
- Set Application type to `Web application`
- Add Authorized [redirect URI](/guides/oauth-callback-redirect-url) as: `https://{your-tenant-address}/callback/oauth2`

In case of new domain you may get message like `This app isn't verified`. Please refer to this doc to check how to proceed: [https://support.google.com/cloud/answer/7454865](https://support.google.com/cloud/answer/7454865)

### Environment variables

| Name | Mandatory | Description | Values |
|:---|:---:|:---|:---|
| `REQUEST_MAX_RETRY` | No | Specifies the maximum number of times the system retries an API request after an error. Default: `3`. | Any `integer` greater than `0` |
| `REQUEST_RETRY_DELAY` | No | Specifies the delay between retry attempts, in milliseconds. Default: `1000`. | Any `integer` greater than `0` |
| `REQUEST_TIMEOUT` | No | Specifies the HTTP request timeout, in milliseconds. Default: `120000`. | Any `integer` greater than `0` |
| `EIO_REQUIRED_RAM_MB` | No | Specifies the amount of memory allocated to the system. The recommended value is `512 MB`. | Any `integer` greater than `0` |

## Credentials

To get `Client ID` and `Client Secret` please use the [Google Developers Console](https://console.developers.google.com). As a [callback](/guides/oauth-callback-redirect-url) please use `https://your-tenant.address/callback/oauth2`.
During credentials creation you would need to:
- select existing Auth Client from drop-down list ``Choose Auth Client`` or create the new one.
  For creating Auth Client you should specify following fields:

| Field name | Mandatory | Description |
|:---|:---:|:---|
| Name | Yes | Your Auth Client's name |
| Client ID | Yes | Your OAuth client key |
| Client Secret | Yes | Your OAuth client secret |
| Authorization Endpoint | Yes | Your OAuth authorization endpoint: `https://accounts.google.com/o/oauth2/v2/auth` |
| Token Endpoint | Yes | Your OAuth token endpoint for refreshing the access token: `https://www.googleapis.com/oauth2/v4/token` |

- fill field ``Name Your Credential``
- fill field ``Scopes (Comma-separated list)`` as `https://www.googleapis.com/auth/spreadsheets, https://www.googleapis.com/auth/drive.metadata.readonly`
- fill field ``Additional parameters (Comma-separated list)`` as `access_type:offline,prompt:consent`
- click on ``Authenticate`` button - the process would take you to Google to log-in and give permissions to the platform to access your Spreadsheets.
- optional fill field `Enter number of retries`
- optional fill field `Max number of calls per second`
- click on ``Verify`` button for verifying your credentials
- click on ``Save`` button for saving your credentials

- Enter number of retries (Default: 5)

**⚠️ IMPORTANT**
> **Please Note:** that Google applies quotas and limitations to their services. You can check the actual values here: [https://developers.google.com/sheets/api/limits](https://developers.google.com/sheets/api/limits)

In case an API call throws a quota limit exceeded exception (or any other exception, e.g. a connectivity problem, etc.), the component will retry the call based on [Exponential backoff algorithm](https://developers.google.com/sheets/api/limits#exponential) (factor = 2) number of times configured in this field. The default value is 5.

E.g. Setting this to 1 means do a normal call once, then if failed - retry it once.

> **Please Note:**  that you should carefully calculate and plan a strategy to handle an expected load to the component.
Note also that Google's quota applies to credentials, not to a step in a flow. This means that if there is a default limit to 60 requests per minute per user per project and there is a component that makes exactly 60 requests per minute, adding a second component with the same user credentials would cause a quota exceeding. This is where careful calculating of number of retries and delay between calls is are very important. 

- Max number of calls per second (Default: 5)

If you want to slow down requests to your API you can set a number of requests per second and the component will delay calling the next request after the previous request (`1 / number of requests per second * 1000 ms` ).
The calculated delay value can not be more than 1140 seconds (19 minutes due to platform limitations).

> **Please Note:** if result quota restriction will be less than 1 request/min the component `Retrieve Sample` task won't succeed

> **Please Note:** If you don't set a value to either `Enter number of retries` or `Max number of calls per second` fields, they will remain empty. The component will consider them as the default values (5 in both cases).


## Triggers

### Get Spreadsheet Row (trigger)
{: #get-spreadsheet-row}
	
The  **New Spreadsheet Row** *trigger* reads the data in each row of a given Google Spreadsheet
and passes it to the next stage of your integration flow.

#### The process

First, the system reads all the rows from a given Google
Spreadsheet and processes it further along with your designed integration flow. It will
also create an initial state of your spreadsheet, we call it a ***snapshot***,
in order to have something to compare with after your data is updated.

After the initial read, any further requests for an update will be compared to this
snapshot and in case any changes are detected they will be passed along with the integration
flow as well. If `Select All Data` configuration property has value `Yes`, the system will read all the rows from a given Google
Spreadsheet whenever flow processes the message.


#### Input fields description

| Input field | Required | Description | Example |
|:---|:---:|:---|:---|
| Spreadsheet | Yes | Spreadsheet that will be used to read data. | `MyTestSpreadsheet` |
| Worksheet | Yes | Worksheet within the spreadsheet that will be used to read data. | `Sheet1` |
| Dimension | Yes | The major dimension of the values. | `ROWS`, `COLUMNS` |
| Use first row/column as header | Yes | Specify `Yes` if your data has a header in the first row/column and you want to use these values as JSON keys in the output message. If you specify `No`, JSON keys will be taken from the row/column index according to A1 notation. See the example below. | `Yes` |
| Select All Data | Yes | Specify `Yes` to fetch all spreadsheet data whenever the step starts. If you specify `No`, the step emits only delta changes (rows that were added after the last step run). | `No` |

**⚠️ IMPORTANT** Using `Use first row/column as header` feature, you must be sure that header values are unique.

Values from spreadsheets return as 'UNFORMATTED_VALUE' [type](https://developers.google.com/sheets/api/reference/rest/v4/ValueRenderOption)

#### Cases with ROWS dimension:

![Table](https://user-images.githubusercontent.com/13310949/59919432-14cf9400-9430-11e9-9522-3d20c3fa2337.png)

After a trigger execution, data will be extracted from the table above and the following message will be emitted:

##### 1. Dimension: `ROWS`, Use first row/column as header: `Yes`
```js
  {
    "FirstName": "Tom1",
    "LastName": "Smith1"
  }
  {
    "FirstName": "Tom2",
    "LastName": "Smith2"
  } 
  -----------------------
  {
    "FirstName": "Tom10",
    "LastName": "Smith10"
  }

```
##### 2. Dimension: `ROWS`, Use first row/column as header: `No`
```js
  {
    "A": "FirstName",
    "B": "LastName"
  }
  {
    "A": "Tom1",
    "B": "Smith1"
  }
  {
    "A": "Tom2",
    "B": "Smith2"
  }
 ---------------------
  {
    "A": "Tom10",
    "B": "Smith10"
  }
```

#### Cases with COLUMNS dimension:

![Table](https://user-images.githubusercontent.com/13310949/59920466-45fd9380-9433-11e9-91bc-35e2043b15a4.png)

After a trigger execution, data will be extracted from the table above and the following message will be emitted:

##### 1. Dimension: `COLUMNS`, Use first row/column as header: `Yes`
```js
  {
    "FirstName": "Tom1",
    "LastName": "Smith1"
  }
  {
    "FirstName": "Tom2",
    "LastName": "Smith2"
  } 
  -----------------------
  {
    "FirstName": "Tom10",
    "LastName": "Smith10"
  }

```

##### 2. Dimension: `COLUMNS`, Use first row/column as header: `No`
```js
  {
    "1": "FirstName",
    "2": "LastName"
  }
  {
    "1": "Tom1",
    "2": "Smith1"
  }
  {
    "1": "Tom2",
    "2": "Smith2"
  }
 ---------------------
  {
    "1": "Tom10",
    "2": "Smith10"
  }
```

## Actions

### Read Spreadsheet

Action read spreadsheet. This action is based on [Google Spreadsheets API v4](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/get). All data structures and limitations are the same to Google API.

> **Please Note:** Place (start) your table in the top left corner (cell) for data to be processed in the right way. 

#### Configuration Fields

* **Spreadsheet** - (dropdown, required): Spreadsheet name selected from dropdown.
* **Worksheet** - (dropdown, required): Worksheet to read.
* **Dimension** - (dropdown, required): The major dimension of the values. `ROWS` or `COLUMNS`.
* **Use first row or column as a header** - (dropdown, required): If `yes` first row or column will be skipped.
* **Emit Behavior** - (dropdown, required): A way to emit items. `Emit Individually` or `Fetch All`.

#### Input Metadata

N/A

#### Output Metadata

If `Emit Behavior` = `Fetch All`: object with key `result` - array of items.
If `Emit Behavior` = `Emit Individually`:  object with key `result` - each item emitted individually.

### Create new Spreadsheet

Action to create a new Google spreadsheet. This action is based on [Google Spreadsheets API v4](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/create).
The action needs a JSON instance of a [Spreadsheet](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets#Spreadsheet) object in order to create a new spreadsheet.
All data structures and limitations are the same to Google API.

#### Json schema type

<details close markdown="block"><summary><strong>Click to expand Input schema: </strong></summary>
```json
{
  "properties": {
    "properties": {
      "properties": {
        "autoRecalc": {
          "enum": [
            "RECALCULATION_INTERVAL_UNSPECIFIED",
            "ON_CHANGE",
            "MINUTE",
            "HOUR"
          ],
          "type": "string"
        },
        "defaultFormat": {
          "properties": {
            "hyperlinkDisplayType": {
              "type": "string",
              "enum": [
                "HYPERLINK_DISPLAY_TYPE_UNSPECIFIED",
                "LINKED",
                "PLAIN_TEXT"
              ]
            },
            "horizontalAlignment": {
              "type": "string",
              "enum": [
                "HORIZONTAL_ALIGN_UNSPECIFIED",
                "LEFT",
                "CENTER",
                "RIGHT"
              ]
            },
            "textFormat": {
              "properties": {
                "underline": {
                  "type": "boolean"
                },
                "foregroundColor": {
                  "properties": {
                    "red": {
                      "format": "float",
                      "type": "number"
                    },
                    "green": {
                      "format": "float",
                      "type": "number"
                    },
                    "blue": {
                      "format": "float",
                      "type": "number"
                    },
                    "alpha": {
                      "format": "float",
                      "type": "number"
                    }
                  },
                  "id": "Color",
                  "type": "object"
                },
                "bold": {
                  "type": "boolean"
                },
                "fontFamily": {
                  "type": "string"
                },
                "italic": {
                  "type": "boolean"
                },
                "strikethrough": {
                  "type": "boolean"
                },
                "fontSize": {
                  "format": "int32",
                  "type": "integer"
                }
              },
              "id": "TextFormat",
              "type": "object"
            },
            "backgroundColor": {
              "properties": {
                "red": {
                  "format": "float",
                  "type": "number"
                },
                "green": {
                  "format": "float",
                  "type": "number"
                },
                "blue": {
                  "format": "float",
                  "type": "number"
                },
                "alpha": {
                  "format": "float",
                  "type": "number"
                }
              },
              "id": "Color",
              "type": "object"
            },
            "padding": {
              "properties": {
                "right": {
                  "format": "int32",
                  "type": "integer"
                },
                "bottom": {
                  "format": "int32",
                  "type": "integer"
                },
                "top": {
                  "format": "int32",
                  "type": "integer"
                },
                "left": {
                  "format": "int32",
                  "type": "integer"
                }
              },
              "id": "Padding",
              "type": "object"
            },
            "verticalAlignment": {
              "enum": [
                "VERTICAL_ALIGN_UNSPECIFIED",
                "TOP",
                "MIDDLE",
                "BOTTOM"
              ],
              "type": "string"
            },
            "borders": {
              "properties": {
                "bottom": {
                  "properties": {
                    "color": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "width": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "style": {
                      "enum": [
                        "STYLE_UNSPECIFIED",
                        "DOTTED",
                        "DASHED",
                        "SOLID",
                        "SOLID_MEDIUM",
                        "SOLID_THICK",
                        "NONE",
                        "DOUBLE"
                      ],
                      "type": "string"
                    }
                  },
                  "id": "Border",
                  "type": "object"
                },
                "top": {
                  "properties": {
                    "color": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "width": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "style": {
                      "enum": [
                        "STYLE_UNSPECIFIED",
                        "DOTTED",
                        "DASHED",
                        "SOLID",
                        "SOLID_MEDIUM",
                        "SOLID_THICK",
                        "NONE",
                        "DOUBLE"
                      ],
                      "type": "string"
                    }
                  },
                  "id": "Border",
                  "type": "object"
                },
                "left": {
                  "properties": {
                    "color": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "width": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "style": {
                      "enum": [
                        "STYLE_UNSPECIFIED",
                        "DOTTED",
                        "DASHED",
                        "SOLID",
                        "SOLID_MEDIUM",
                        "SOLID_THICK",
                        "NONE",
                        "DOUBLE"
                      ],
                      "type": "string"
                    }
                  },
                  "id": "Border",
                  "type": "object"
                },
                "right": {
                  "properties": {
                    "color": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "width": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "style": {
                      "enum": [
                        "STYLE_UNSPECIFIED",
                        "DOTTED",
                        "DASHED",
                        "SOLID",
                        "SOLID_MEDIUM",
                        "SOLID_THICK",
                        "NONE",
                        "DOUBLE"
                      ],
                      "type": "string"
                    }
                  },
                  "id": "Border",
                  "type": "object"
                }
              },
              "id": "Borders",
              "type": "object"
            },
            "textDirection": {
              "enum": [
                "TEXT_DIRECTION_UNSPECIFIED",
                "LEFT_TO_RIGHT",
                "RIGHT_TO_LEFT"
              ],
              "type": "string"
            },
            "textRotation": {
              "properties": {
                "angle": {
                  "format": "int32",
                  "type": "integer"
                },
                "vertical": {
                  "type": "boolean"
                }
              },
              "id": "TextRotation",
              "type": "object"
            },
            "wrapStrategy": {
              "enum": [
                "WRAP_STRATEGY_UNSPECIFIED",
                "OVERFLOW_CELL",
                "LEGACY_WRAP",
                "CLIP",
                "WRAP"
              ],
              "type": "string"
            },
            "numberFormat": {
              "properties": {
                "type": {
                  "enum": [
                    "NUMBER_FORMAT_TYPE_UNSPECIFIED",
                    "TEXT",
                    "NUMBER",
                    "PERCENT",
                    "CURRENCY",
                    "DATE",
                    "TIME",
                    "DATE_TIME",
                    "SCIENTIFIC"
                  ],
                  "type": "string"
                },
                "pattern": {
                  "type": "string"
                }
              },
              "id": "NumberFormat",
              "type": "object"
            }
          },
          "id": "CellFormat",
          "type": "object"
        },
        "timeZone": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "locale": {
          "type": "string"
        },
        "iterativeCalculationSettings": {
          "properties": {
            "convergenceThreshold": {
              "format": "double",
              "type": "number"
            },
            "maxIterations": {
              "format": "int32",
              "type": "integer"
            }
          },
          "id": "IterativeCalculationSettings",
          "type": "object"
        }
      },
      "id": "SpreadsheetProperties",
      "type": "object"
    },
    "namedRanges": {
      "type": "array",
      "items": {
        "properties": {
          "range": {
            "properties": {
              "startColumnIndex": {
                "format": "int32",
                "type": "integer"
              },
              "sheetId": {
                "format": "int32",
                "type": "integer"
              },
              "endRowIndex": {
                "type": "integer",
                "format": "int32"
              },
              "endColumnIndex": {
                "format": "int32",
                "type": "integer"
              },
              "startRowIndex": {
                "format": "int32",
                "type": "integer"
              }
            },
            "id": "GridRange",
            "type": "object"
          },
          "name": {
            "type": "string"
          },
          "namedRangeId": {
            "type": "string"
          }
        },
        "id": "NamedRange",
        "type": "object"
      }
    },
    "developerMetadata": {
      "type": "array",
      "items": {
        "properties": {
          "metadataValue": {
            "type": "string"
          },
          "metadataKey": {
            "type": "string"
          },
          "metadataId": {
            "format": "int32",
            "type": "integer"
          },
          "location": {
            "properties": {
              "dimensionRange": {
                "properties": {
                  "sheetId": {
                    "format": "int32",
                    "type": "integer"
                  },
                  "dimension": {
                    "enum": [
                      "DIMENSION_UNSPECIFIED",
                      "ROWS",
                      "COLUMNS"
                    ],
                    "type": "string"
                  },
                  "startIndex": {
                    "format": "int32",
                    "type": "integer"
                  },
                  "endIndex": {
                    "format": "int32",
                    "type": "integer"
                  }
                },
                "id": "DimensionRange",
                "type": "object"
              },
              "spreadsheet": {
                "type": "boolean"
              },
              "sheetId": {
                "format": "int32",
                "type": "integer"
              },
              "locationType": {
                "enum": [
                  "DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED",
                  "ROW",
                  "COLUMN",
                  "SHEET",
                  "SPREADSHEET"
                ],
                "type": "string"
              }
            },
            "id": "DeveloperMetadataLocation",
            "type": "object"
          },
          "visibility": {
            "enum": [
              "DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED",
              "DOCUMENT",
              "PROJECT"
            ],
            "type": "string"
          }
        },
        "id": "DeveloperMetadata",
        "type": "object"
      }
    },
    "sheets": {
      "type": "array",
      "items": {
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "properties": {
                "columnMetadata": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "pixelSize": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "hiddenByFilter": {
                        "type": "boolean"
                      },
                      "hiddenByUser": {
                        "type": "boolean"
                      },
                      "developerMetadata": {
                        "type": "array",
                        "items": {
                          "properties": {
                            "metadataValue": {
                              "type": "string"
                            },
                            "metadataKey": {
                              "type": "string"
                            },
                            "metadataId": {
                              "format": "int32",
                              "type": "integer"
                            },
                            "location": {
                              "properties": {
                                "dimensionRange": {
                                  "properties": {
                                    "sheetId": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "dimension": {
                                      "enum": [
                                        "DIMENSION_UNSPECIFIED",
                                        "ROWS",
                                        "COLUMNS"
                                      ],
                                      "type": "string"
                                    },
                                    "startIndex": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "endIndex": {
                                      "format": "int32",
                                      "type": "integer"
                                    }
                                  },
                                  "id": "DimensionRange",
                                  "type": "object"
                                },
                                "spreadsheet": {
                                  "type": "boolean"
                                },
                                "sheetId": {
                                  "format": "int32",
                                  "type": "integer"
                                },
                                "locationType": {
                                  "enum": [
                                    "DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED",
                                    "ROW",
                                    "COLUMN",
                                    "SHEET",
                                    "SPREADSHEET"
                                  ],
                                  "type": "string"
                                }
                              },
                              "id": "DeveloperMetadataLocation",
                              "type": "object"
                            },
                            "visibility": {
                              "enum": [
                                "DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED",
                                "DOCUMENT",
                                "PROJECT"
                              ],
                              "type": "string"
                            }
                          },
                          "id": "DeveloperMetadata",
                          "type": "object"
                        }
                      }
                    },
                    "id": "DimensionProperties",
                    "type": "object"
                  }
                },
                "startColumn": {
                  "format": "int32",
                  "type": "integer"
                },
                "rowMetadata": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "pixelSize": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "hiddenByFilter": {
                        "type": "boolean"
                      },
                      "hiddenByUser": {
                        "type": "boolean"
                      },
                      "developerMetadata": {
                        "type": "array",
                        "items": {
                          "properties": {
                            "metadataValue": {
                              "type": "string"
                            },
                            "metadataKey": {
                              "type": "string"
                            },
                            "metadataId": {
                              "format": "int32",
                              "type": "integer"
                            },
                            "location": {
                              "properties": {
                                "dimensionRange": {
                                  "properties": {
                                    "sheetId": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "dimension": {
                                      "enum": [
                                        "DIMENSION_UNSPECIFIED",
                                        "ROWS",
                                        "COLUMNS"
                                      ],
                                      "type": "string"
                                    },
                                    "startIndex": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "endIndex": {
                                      "format": "int32",
                                      "type": "integer"
                                    }
                                  },
                                  "id": "DimensionRange",
                                  "type": "object"
                                },
                                "spreadsheet": {
                                  "type": "boolean"
                                },
                                "sheetId": {
                                  "format": "int32",
                                  "type": "integer"
                                },
                                "locationType": {
                                  "enum": [
                                    "DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED",
                                    "ROW",
                                    "COLUMN",
                                    "SHEET",
                                    "SPREADSHEET"
                                  ],
                                  "type": "string"
                                }
                              },
                              "id": "DeveloperMetadataLocation",
                              "type": "object"
                            },
                            "visibility": {
                              "enum": [
                                "DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED",
                                "DOCUMENT",
                                "PROJECT"
                              ],
                              "type": "string"
                            }
                          },
                          "id": "DeveloperMetadata",
                          "type": "object"
                        }
                      }
                    },
                    "id": "DimensionProperties",
                    "type": "object"
                  }
                },
                "rowData": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "values": {
                        "type": "array",
                        "items": {
                          "properties": {
                            "textFormatRuns": {
                              "type": "array",
                              "items": {
                                "properties": {
                                  "format": {
                                    "properties": {
                                      "underline": {
                                        "type": "boolean"
                                      },
                                      "foregroundColor": {
                                        "properties": {
                                          "red": {
                                            "format": "float",
                                            "type": "number"
                                          },
                                          "green": {
                                            "format": "float",
                                            "type": "number"
                                          },
                                          "blue": {
                                            "format": "float",
                                            "type": "number"
                                          },
                                          "alpha": {
                                            "format": "float",
                                            "type": "number"
                                          }
                                        },
                                        "id": "Color",
                                        "type": "object"
                                      },
                                      "bold": {
                                        "type": "boolean"
                                      },
                                      "fontFamily": {
                                        "type": "string"
                                      },
                                      "italic": {
                                        "type": "boolean"
                                      },
                                      "strikethrough": {
                                        "type": "boolean"
                                      },
                                      "fontSize": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "TextFormat",
                                    "type": "object"
                                  },
                                  "startIndex": {
                                    "format": "int32",
                                    "type": "integer"
                                  }
                                },
                                "id": "TextFormatRun",
                                "type": "object"
                              }
                            },
                            "formattedValue": {
                              "type": "string"
                            },
                            "hyperlink": {
                              "type": "string"
                            },
                            "pivotTable": {
                              "properties": {
                                "criteria": {
                                  "additionalProperties": {
                                    "properties": {
                                      "visibleValues": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        }
                                      }
                                    },
                                    "id": "PivotFilterCriteria",
                                    "type": "object"
                                  },
                                  "type": "object"
                                },
                                "rows": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "repeatHeadings": {
                                        "type": "boolean"
                                      },
                                      "sourceColumnOffset": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sortOrder": {
                                        "enum": [
                                          "SORT_ORDER_UNSPECIFIED",
                                          "ASCENDING",
                                          "DESCENDING"
                                        ],
                                        "type": "string"
                                      },
                                      "valueBucket": {
                                        "properties": {
                                          "valuesIndex": {
                                            "format": "int32",
                                            "type": "integer"
                                          },
                                          "buckets": {
                                            "type": "array",
                                            "items": {
                                              "properties": {
                                                "numberValue": {
                                                  "format": "double",
                                                  "type": "number"
                                                },
                                                "errorValue": {
                                                  "properties": {
                                                    "type": {
                                                      "enum": [
                                                        "ERROR_TYPE_UNSPECIFIED",
                                                        "ERROR",
                                                        "NULL_VALUE",
                                                        "DIVIDE_BY_ZERO",
                                                        "VALUE",
                                                        "REF",
                                                        "NAME",
                                                        "NUM",
                                                        "N_A",
                                                        "LOADING"
                                                      ],
                                                      "type": "string"
                                                    },
                                                    "message": {
                                                      "type": "string"
                                                    }
                                                  },
                                                  "id": "ErrorValue",
                                                  "type": "object"
                                                },
                                                "stringValue": {
                                                  "type": "string"
                                                },
                                                "boolValue": {
                                                  "type": "boolean"
                                                },
                                                "formulaValue": {
                                                  "type": "string"
                                                }
                                              },
                                              "id": "ExtendedValue",
                                              "type": "object"
                                            }
                                          }
                                        },
                                        "id": "PivotGroupSortValueBucket",
                                        "type": "object"
                                      },
                                      "showTotals": {
                                        "type": "boolean"
                                      },
                                      "valueMetadata": {
                                        "type": "array",
                                        "items": {
                                          "properties": {
                                            "value": {
                                              "properties": {
                                                "numberValue": {
                                                  "format": "double",
                                                  "type": "number"
                                                },
                                                "errorValue": {
                                                  "properties": {
                                                    "type": {
                                                      "enum": [
                                                        "ERROR_TYPE_UNSPECIFIED",
                                                        "ERROR",
                                                        "NULL_VALUE",
                                                        "DIVIDE_BY_ZERO",
                                                        "VALUE",
                                                        "REF",
                                                        "NAME",
                                                        "NUM",
                                                        "N_A",
                                                        "LOADING"
                                                      ],
                                                      "type": "string"
                                                    },
                                                    "message": {
                                                      "type": "string"
                                                    }
                                                  },
                                                  "id": "ErrorValue",
                                                  "type": "object"
                                                },
                                                "stringValue": {
                                                  "type": "string"
                                                },
                                                "boolValue": {
                                                  "type": "boolean"
                                                },
                                                "formulaValue": {
                                                  "type": "string"
                                                }
                                              },
                                              "id": "ExtendedValue",
                                              "type": "object"
                                            },
                                            "collapsed": {
                                              "type": "boolean"
                                            }
                                          },
                                          "id": "PivotGroupValueMetadata",
                                          "type": "object"
                                        }
                                      },
                                      "groupRule": {
                                        "properties": {
                                          "histogramRule": {
                                            "properties": {
                                              "end": {
                                                "format": "double",
                                                "type": "number"
                                              },
                                              "interval": {
                                                "format": "double",
                                                "type": "number"
                                              },
                                              "start": {
                                                "format": "double",
                                                "type": "number"
                                              }
                                            },
                                            "id": "HistogramRule",
                                            "type": "object"
                                          },
                                          "dateTimeRule": {
                                            "properties": {
                                              "type": {
                                                "type": "string",
                                                "enum": [
                                                  "DATE_TIME_RULE_TYPE_UNSPECIFIED",
                                                  "SECOND",
                                                  "MINUTE",
                                                  "HOUR",
                                                  "HOUR_MINUTE",
                                                  "HOUR_MINUTE_AMPM",
                                                  "DAY_OF_WEEK",
                                                  "DAY_OF_YEAR",
                                                  "DAY_OF_MONTH",
                                                  "DAY_MONTH",
                                                  "MONTH",
                                                  "QUARTER",
                                                  "YEAR",
                                                  "YEAR_MONTH",
                                                  "YEAR_QUARTER",
                                                  "YEAR_MONTH_DAY"
                                                ]
                                              }
                                            },
                                            "id": "DateTimeRule",
                                            "type": "object"
                                          },
                                          "manualRule": {
                                            "properties": {
                                              "groups": {
                                                "type": "array",
                                                "items": {
                                                  "properties": {
                                                    "groupName": {
                                                      "properties": {
                                                        "numberValue": {
                                                          "format": "double",
                                                          "type": "number"
                                                        },
                                                        "errorValue": {
                                                          "properties": {
                                                            "type": {
                                                              "enum": [
                                                                "ERROR_TYPE_UNSPECIFIED",
                                                                "ERROR",
                                                                "NULL_VALUE",
                                                                "DIVIDE_BY_ZERO",
                                                                "VALUE",
                                                                "REF",
                                                                "NAME",
                                                                "NUM",
                                                                "N_A",
                                                                "LOADING"
                                                              ],
                                                              "type": "string"
                                                            },
                                                            "message": {
                                                              "type": "string"
                                                            }
                                                          },
                                                          "id": "ErrorValue",
                                                          "type": "object"
                                                        },
                                                        "stringValue": {
                                                          "type": "string"
                                                        },
                                                        "boolValue": {
                                                          "type": "boolean"
                                                        },
                                                        "formulaValue": {
                                                          "type": "string"
                                                        }
                                                      },
                                                      "id": "ExtendedValue",
                                                      "type": "object"
                                                    },
                                                    "items": {
                                                      "type": "array",
                                                      "items": {
                                                        "properties": {
                                                          "numberValue": {
                                                            "format": "double",
                                                            "type": "number"
                                                          },
                                                          "errorValue": {
                                                            "properties": {
                                                              "type": {
                                                                "enum": [
                                                                  "ERROR_TYPE_UNSPECIFIED",
                                                                  "ERROR",
                                                                  "NULL_VALUE",
                                                                  "DIVIDE_BY_ZERO",
                                                                  "VALUE",
                                                                  "REF",
                                                                  "NAME",
                                                                  "NUM",
                                                                  "N_A",
                                                                  "LOADING"
                                                                ],
                                                                "type": "string"
                                                              },
                                                              "message": {
                                                                "type": "string"
                                                              }
                                                            },
                                                            "id": "ErrorValue",
                                                            "type": "object"
                                                          },
                                                          "stringValue": {
                                                            "type": "string"
                                                          },
                                                          "boolValue": {
                                                            "type": "boolean"
                                                          },
                                                          "formulaValue": {
                                                            "type": "string"
                                                          }
                                                        },
                                                        "id": "ExtendedValue",
                                                        "type": "object"
                                                      }
                                                    }
                                                  },
                                                  "id": "ManualRuleGroup",
                                                  "type": "object"
                                                }
                                              }
                                            },
                                            "id": "ManualRule",
                                            "type": "object"
                                          }
                                        },
                                        "id": "PivotGroupRule",
                                        "type": "object"
                                      },
                                      "label": {
                                        "type": "string"
                                      }
                                    },
                                    "id": "PivotGroup",
                                    "type": "object"
                                  }
                                },
                                "valueLayout": {
                                  "type": "string",
                                  "enum": [
                                    "HORIZONTAL",
                                    "VERTICAL"
                                  ]
                                },
                                "source": {
                                  "properties": {
                                    "startColumnIndex": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "sheetId": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "endRowIndex": {
                                      "type": "integer",
                                      "format": "int32"
                                    },
                                    "endColumnIndex": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "startRowIndex": {
                                      "format": "int32",
                                      "type": "integer"
                                    }
                                  },
                                  "id": "GridRange",
                                  "type": "object"
                                },
                                "columns": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "repeatHeadings": {
                                        "type": "boolean"
                                      },
                                      "sourceColumnOffset": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sortOrder": {
                                        "enum": [
                                          "SORT_ORDER_UNSPECIFIED",
                                          "ASCENDING",
                                          "DESCENDING"
                                        ],
                                        "type": "string"
                                      },
                                      "valueBucket": {
                                        "properties": {
                                          "valuesIndex": {
                                            "format": "int32",
                                            "type": "integer"
                                          },
                                          "buckets": {
                                            "type": "array",
                                            "items": {
                                              "properties": {
                                                "numberValue": {
                                                  "format": "double",
                                                  "type": "number"
                                                },
                                                "errorValue": {
                                                  "properties": {
                                                    "type": {
                                                      "enum": [
                                                        "ERROR_TYPE_UNSPECIFIED",
                                                        "ERROR",
                                                        "NULL_VALUE",
                                                        "DIVIDE_BY_ZERO",
                                                        "VALUE",
                                                        "REF",
                                                        "NAME",
                                                        "NUM",
                                                        "N_A",
                                                        "LOADING"
                                                      ],
                                                      "type": "string"
                                                    },
                                                    "message": {
                                                      "type": "string"
                                                    }
                                                  },
                                                  "id": "ErrorValue",
                                                  "type": "object"
                                                },
                                                "stringValue": {
                                                  "type": "string"
                                                },
                                                "boolValue": {
                                                  "type": "boolean"
                                                },
                                                "formulaValue": {
                                                  "type": "string"
                                                }
                                              },
                                              "id": "ExtendedValue",
                                              "type": "object"
                                            }
                                          }
                                        },
                                        "id": "PivotGroupSortValueBucket",
                                        "type": "object"
                                      },
                                      "showTotals": {
                                        "type": "boolean"
                                      },
                                      "valueMetadata": {
                                        "type": "array",
                                        "items": {
                                          "properties": {
                                            "value": {
                                              "properties": {
                                                "numberValue": {
                                                  "format": "double",
                                                  "type": "number"
                                                },
                                                "errorValue": {
                                                  "properties": {
                                                    "type": {
                                                      "enum": [
                                                        "ERROR_TYPE_UNSPECIFIED",
                                                        "ERROR",
                                                        "NULL_VALUE",
                                                        "DIVIDE_BY_ZERO",
                                                        "VALUE",
                                                        "REF",
                                                        "NAME",
                                                        "NUM",
                                                        "N_A",
                                                        "LOADING"
                                                      ],
                                                      "type": "string"
                                                    },
                                                    "message": {
                                                      "type": "string"
                                                    }
                                                  },
                                                  "id": "ErrorValue",
                                                  "type": "object"
                                                },
                                                "stringValue": {
                                                  "type": "string"
                                                },
                                                "boolValue": {
                                                  "type": "boolean"
                                                },
                                                "formulaValue": {
                                                  "type": "string"
                                                }
                                              },
                                              "id": "ExtendedValue",
                                              "type": "object"
                                            },
                                            "collapsed": {
                                              "type": "boolean"
                                            }
                                          },
                                          "id": "PivotGroupValueMetadata",
                                          "type": "object"
                                        }
                                      },
                                      "groupRule": {
                                        "properties": {
                                          "histogramRule": {
                                            "properties": {
                                              "end": {
                                                "format": "double",
                                                "type": "number"
                                              },
                                              "interval": {
                                                "format": "double",
                                                "type": "number"
                                              },
                                              "start": {
                                                "format": "double",
                                                "type": "number"
                                              }
                                            },
                                            "id": "HistogramRule",
                                            "type": "object"
                                          },
                                          "dateTimeRule": {
                                            "properties": {
                                              "type": {
                                                "type": "string",
                                                "enum": [
                                                  "DATE_TIME_RULE_TYPE_UNSPECIFIED",
                                                  "SECOND",
                                                  "MINUTE",
                                                  "HOUR",
                                                  "HOUR_MINUTE",
                                                  "HOUR_MINUTE_AMPM",
                                                  "DAY_OF_WEEK",
                                                  "DAY_OF_YEAR",
                                                  "DAY_OF_MONTH",
                                                  "DAY_MONTH",
                                                  "MONTH",
                                                  "QUARTER",
                                                  "YEAR",
                                                  "YEAR_MONTH",
                                                  "YEAR_QUARTER",
                                                  "YEAR_MONTH_DAY"
                                                ]
                                              }
                                            },
                                            "id": "DateTimeRule",
                                            "type": "object"
                                          },
                                          "manualRule": {
                                            "properties": {
                                              "groups": {
                                                "type": "array",
                                                "items": {
                                                  "properties": {
                                                    "groupName": {
                                                      "properties": {
                                                        "numberValue": {
                                                          "format": "double",
                                                          "type": "number"
                                                        },
                                                        "errorValue": {
                                                          "properties": {
                                                            "type": {
                                                              "enum": [
                                                                "ERROR_TYPE_UNSPECIFIED",
                                                                "ERROR",
                                                                "NULL_VALUE",
                                                                "DIVIDE_BY_ZERO",
                                                                "VALUE",
                                                                "REF",
                                                                "NAME",
                                                                "NUM",
                                                                "N_A",
                                                                "LOADING"
                                                              ],
                                                              "type": "string"
                                                            },
                                                            "message": {
                                                              "type": "string"
                                                            }
                                                          },
                                                          "id": "ErrorValue",
                                                          "type": "object"
                                                        },
                                                        "stringValue": {
                                                          "type": "string"
                                                        },
                                                        "boolValue": {
                                                          "type": "boolean"
                                                        },
                                                        "formulaValue": {
                                                          "type": "string"
                                                        }
                                                      },
                                                      "id": "ExtendedValue",
                                                      "type": "object"
                                                    },
                                                    "items": {
                                                      "type": "array",
                                                      "items": {
                                                        "properties": {
                                                          "numberValue": {
                                                            "format": "double",
                                                            "type": "number"
                                                          },
                                                          "errorValue": {
                                                            "properties": {
                                                              "type": {
                                                                "enum": [
                                                                  "ERROR_TYPE_UNSPECIFIED",
                                                                  "ERROR",
                                                                  "NULL_VALUE",
                                                                  "DIVIDE_BY_ZERO",
                                                                  "VALUE",
                                                                  "REF",
                                                                  "NAME",
                                                                  "NUM",
                                                                  "N_A",
                                                                  "LOADING"
                                                                ],
                                                                "type": "string"
                                                              },
                                                              "message": {
                                                                "type": "string"
                                                              }
                                                            },
                                                            "id": "ErrorValue",
                                                            "type": "object"
                                                          },
                                                          "stringValue": {
                                                            "type": "string"
                                                          },
                                                          "boolValue": {
                                                            "type": "boolean"
                                                          },
                                                          "formulaValue": {
                                                            "type": "string"
                                                          }
                                                        },
                                                        "id": "ExtendedValue",
                                                        "type": "object"
                                                      }
                                                    }
                                                  },
                                                  "id": "ManualRuleGroup",
                                                  "type": "object"
                                                }
                                              }
                                            },
                                            "id": "ManualRule",
                                            "type": "object"
                                          }
                                        },
                                        "id": "PivotGroupRule",
                                        "type": "object"
                                      },
                                      "label": {
                                        "type": "string"
                                      }
                                    },
                                    "id": "PivotGroup",
                                    "type": "object"
                                  }
                                },
                                "values": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "formula": {
                                        "type": "string"
                                      },
                                      "calculatedDisplayType": {
                                        "enum": [
                                          "PIVOT_VALUE_CALCULATED_DISPLAY_TYPE_UNSPECIFIED",
                                          "PERCENT_OF_ROW_TOTAL",
                                          "PERCENT_OF_COLUMN_TOTAL",
                                          "PERCENT_OF_GRAND_TOTAL"
                                        ],
                                        "type": "string"
                                      },
                                      "summarizeFunction": {
                                        "type": "string",
                                        "enum": [
                                          "PIVOT_STANDARD_VALUE_FUNCTION_UNSPECIFIED",
                                          "SUM",
                                          "COUNTA",
                                          "COUNT",
                                          "COUNTUNIQUE",
                                          "AVERAGE",
                                          "MAX",
                                          "MIN",
                                          "MEDIAN",
                                          "PRODUCT",
                                          "STDEV",
                                          "STDEVP",
                                          "VAR",
                                          "VARP",
                                          "CUSTOM"
                                        ]
                                      },
                                      "sourceColumnOffset": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "name": {
                                        "type": "string"
                                      }
                                    },
                                    "id": "PivotValue",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "PivotTable",
                              "type": "object"
                            },
                            "userEnteredFormat": {
                              "properties": {
                                "hyperlinkDisplayType": {
                                  "type": "string",
                                  "enum": [
                                    "HYPERLINK_DISPLAY_TYPE_UNSPECIFIED",
                                    "LINKED",
                                    "PLAIN_TEXT"
                                  ]
                                },
                                "horizontalAlignment": {
                                  "type": "string",
                                  "enum": [
                                    "HORIZONTAL_ALIGN_UNSPECIFIED",
                                    "LEFT",
                                    "CENTER",
                                    "RIGHT"
                                  ]
                                },
                                "textFormat": {
                                  "properties": {
                                    "underline": {
                                      "type": "boolean"
                                    },
                                    "foregroundColor": {
                                      "properties": {
                                        "red": {
                                          "format": "float",
                                          "type": "number"
                                        },
                                        "green": {
                                          "format": "float",
                                          "type": "number"
                                        },
                                        "blue": {
                                          "format": "float",
                                          "type": "number"
                                        },
                                        "alpha": {
                                          "format": "float",
                                          "type": "number"
                                        }
                                      },
                                      "id": "Color",
                                      "type": "object"
                                    },
                                    "bold": {
                                      "type": "boolean"
                                    },
                                    "fontFamily": {
                                      "type": "string"
                                    },
                                    "italic": {
                                      "type": "boolean"
                                    },
                                    "strikethrough": {
                                      "type": "boolean"
                                    },
                                    "fontSize": {
                                      "format": "int32",
                                      "type": "integer"
                                    }
                                  },
                                  "id": "TextFormat",
                                  "type": "object"
                                },
                                "backgroundColor": {
                                  "properties": {
                                    "red": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "green": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "blue": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "alpha": {
                                      "format": "float",
                                      "type": "number"
                                    }
                                  },
                                  "id": "Color",
                                  "type": "object"
                                },
                                "padding": {
                                  "properties": {
                                    "right": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "bottom": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "top": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "left": {
                                      "format": "int32",
                                      "type": "integer"
                                    }
                                  },
                                  "id": "Padding",
                                  "type": "object"
                                },
                                "verticalAlignment": {
                                  "enum": [
                                    "VERTICAL_ALIGN_UNSPECIFIED",
                                    "TOP",
                                    "MIDDLE",
                                    "BOTTOM"
                                  ],
                                  "type": "string"
                                },
                                "borders": {
                                  "properties": {
                                    "bottom": {
                                      "properties": {
                                        "color": {
                                          "properties": {
                                            "red": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "green": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "blue": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "alpha": {
                                              "format": "float",
                                              "type": "number"
                                            }
                                          },
                                          "id": "Color",
                                          "type": "object"
                                        },
                                        "width": {
                                          "format": "int32",
                                          "type": "integer"
                                        },
                                        "style": {
                                          "enum": [
                                            "STYLE_UNSPECIFIED",
                                            "DOTTED",
                                            "DASHED",
                                            "SOLID",
                                            "SOLID_MEDIUM",
                                            "SOLID_THICK",
                                            "NONE",
                                            "DOUBLE"
                                          ],
                                          "type": "string"
                                        }
                                      },
                                      "id": "Border",
                                      "type": "object"
                                    },
                                    "top": {
                                      "properties": {
                                        "color": {
                                          "properties": {
                                            "red": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "green": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "blue": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "alpha": {
                                              "format": "float",
                                              "type": "number"
                                            }
                                          },
                                          "id": "Color",
                                          "type": "object"
                                        },
                                        "width": {
                                          "format": "int32",
                                          "type": "integer"
                                        },
                                        "style": {
                                          "enum": [
                                            "STYLE_UNSPECIFIED",
                                            "DOTTED",
                                            "DASHED",
                                            "SOLID",
                                            "SOLID_MEDIUM",
                                            "SOLID_THICK",
                                            "NONE",
                                            "DOUBLE"
                                          ],
                                          "type": "string"
                                        }
                                      },
                                      "id": "Border",
                                      "type": "object"
                                    },
                                    "left": {
                                      "properties": {
                                        "color": {
                                          "properties": {
                                            "red": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "green": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "blue": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "alpha": {
                                              "format": "float",
                                              "type": "number"
                                            }
                                          },
                                          "id": "Color",
                                          "type": "object"
                                        },
                                        "width": {
                                          "format": "int32",
                                          "type": "integer"
                                        },
                                        "style": {
                                          "enum": [
                                            "STYLE_UNSPECIFIED",
                                            "DOTTED",
                                            "DASHED",
                                            "SOLID",
                                            "SOLID_MEDIUM",
                                            "SOLID_THICK",
                                            "NONE",
                                            "DOUBLE"
                                          ],
                                          "type": "string"
                                        }
                                      },
                                      "id": "Border",
                                      "type": "object"
                                    },
                                    "right": {
                                      "properties": {
                                        "color": {
                                          "properties": {
                                            "red": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "green": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "blue": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "alpha": {
                                              "format": "float",
                                              "type": "number"
                                            }
                                          },
                                          "id": "Color",
                                          "type": "object"
                                        },
                                        "width": {
                                          "format": "int32",
                                          "type": "integer"
                                        },
                                        "style": {
                                          "enum": [
                                            "STYLE_UNSPECIFIED",
                                            "DOTTED",
                                            "DASHED",
                                            "SOLID",
                                            "SOLID_MEDIUM",
                                            "SOLID_THICK",
                                            "NONE",
                                            "DOUBLE"
                                          ],
                                          "type": "string"
                                        }
                                      },
                                      "id": "Border",
                                      "type": "object"
                                    }
                                  },
                                  "id": "Borders",
                                  "type": "object"
                                },
                                "textDirection": {
                                  "enum": [
                                    "TEXT_DIRECTION_UNSPECIFIED",
                                    "LEFT_TO_RIGHT",
                                    "RIGHT_TO_LEFT"
                                  ],
                                  "type": "string"
                                },
                                "textRotation": {
                                  "properties": {
                                    "angle": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "vertical": {
                                      "type": "boolean"
                                    }
                                  },
                                  "id": "TextRotation",
                                  "type": "object"
                                },
                                "wrapStrategy": {
                                  "enum": [
                                    "WRAP_STRATEGY_UNSPECIFIED",
                                    "OVERFLOW_CELL",
                                    "LEGACY_WRAP",
                                    "CLIP",
                                    "WRAP"
                                  ],
                                  "type": "string"
                                },
                                "numberFormat": {
                                  "properties": {
                                    "type": {
                                      "enum": [
                                        "NUMBER_FORMAT_TYPE_UNSPECIFIED",
                                        "TEXT",
                                        "NUMBER",
                                        "PERCENT",
                                        "CURRENCY",
                                        "DATE",
                                        "TIME",
                                        "DATE_TIME",
                                        "SCIENTIFIC"
                                      ],
                                      "type": "string"
                                    },
                                    "pattern": {
                                      "type": "string"
                                    }
                                  },
                                  "id": "NumberFormat",
                                  "type": "object"
                                }
                              },
                              "id": "CellFormat",
                              "type": "object"
                            },
                            "effectiveFormat": {
                              "properties": {
                                "hyperlinkDisplayType": {
                                  "type": "string",
                                  "enum": [
                                    "HYPERLINK_DISPLAY_TYPE_UNSPECIFIED",
                                    "LINKED",
                                    "PLAIN_TEXT"
                                  ]
                                },
                                "horizontalAlignment": {
                                  "type": "string",
                                  "enum": [
                                    "HORIZONTAL_ALIGN_UNSPECIFIED",
                                    "LEFT",
                                    "CENTER",
                                    "RIGHT"
                                  ]
                                },
                                "textFormat": {
                                  "properties": {
                                    "underline": {
                                      "type": "boolean"
                                    },
                                    "foregroundColor": {
                                      "properties": {
                                        "red": {
                                          "format": "float",
                                          "type": "number"
                                        },
                                        "green": {
                                          "format": "float",
                                          "type": "number"
                                        },
                                        "blue": {
                                          "format": "float",
                                          "type": "number"
                                        },
                                        "alpha": {
                                          "format": "float",
                                          "type": "number"
                                        }
                                      },
                                      "id": "Color",
                                      "type": "object"
                                    },
                                    "bold": {
                                      "type": "boolean"
                                    },
                                    "fontFamily": {
                                      "type": "string"
                                    },
                                    "italic": {
                                      "type": "boolean"
                                    },
                                    "strikethrough": {
                                      "type": "boolean"
                                    },
                                    "fontSize": {
                                      "format": "int32",
                                      "type": "integer"
                                    }
                                  },
                                  "id": "TextFormat",
                                  "type": "object"
                                },
                                "backgroundColor": {
                                  "properties": {
                                    "red": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "green": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "blue": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "alpha": {
                                      "format": "float",
                                      "type": "number"
                                    }
                                  },
                                  "id": "Color",
                                  "type": "object"
                                },
                                "padding": {
                                  "properties": {
                                    "right": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "bottom": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "top": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "left": {
                                      "format": "int32",
                                      "type": "integer"
                                    }
                                  },
                                  "id": "Padding",
                                  "type": "object"
                                },
                                "verticalAlignment": {
                                  "enum": [
                                    "VERTICAL_ALIGN_UNSPECIFIED",
                                    "TOP",
                                    "MIDDLE",
                                    "BOTTOM"
                                  ],
                                  "type": "string"
                                },
                                "borders": {
                                  "properties": {
                                    "bottom": {
                                      "properties": {
                                        "color": {
                                          "properties": {
                                            "red": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "green": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "blue": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "alpha": {
                                              "format": "float",
                                              "type": "number"
                                            }
                                          },
                                          "id": "Color",
                                          "type": "object"
                                        },
                                        "width": {
                                          "format": "int32",
                                          "type": "integer"
                                        },
                                        "style": {
                                          "enum": [
                                            "STYLE_UNSPECIFIED",
                                            "DOTTED",
                                            "DASHED",
                                            "SOLID",
                                            "SOLID_MEDIUM",
                                            "SOLID_THICK",
                                            "NONE",
                                            "DOUBLE"
                                          ],
                                          "type": "string"
                                        }
                                      },
                                      "id": "Border",
                                      "type": "object"
                                    },
                                    "top": {
                                      "properties": {
                                        "color": {
                                          "properties": {
                                            "red": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "green": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "blue": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "alpha": {
                                              "format": "float",
                                              "type": "number"
                                            }
                                          },
                                          "id": "Color",
                                          "type": "object"
                                        },
                                        "width": {
                                          "format": "int32",
                                          "type": "integer"
                                        },
                                        "style": {
                                          "enum": [
                                            "STYLE_UNSPECIFIED",
                                            "DOTTED",
                                            "DASHED",
                                            "SOLID",
                                            "SOLID_MEDIUM",
                                            "SOLID_THICK",
                                            "NONE",
                                            "DOUBLE"
                                          ],
                                          "type": "string"
                                        }
                                      },
                                      "id": "Border",
                                      "type": "object"
                                    },
                                    "left": {
                                      "properties": {
                                        "color": {
                                          "properties": {
                                            "red": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "green": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "blue": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "alpha": {
                                              "format": "float",
                                              "type": "number"
                                            }
                                          },
                                          "id": "Color",
                                          "type": "object"
                                        },
                                        "width": {
                                          "format": "int32",
                                          "type": "integer"
                                        },
                                        "style": {
                                          "enum": [
                                            "STYLE_UNSPECIFIED",
                                            "DOTTED",
                                            "DASHED",
                                            "SOLID",
                                            "SOLID_MEDIUM",
                                            "SOLID_THICK",
                                            "NONE",
                                            "DOUBLE"
                                          ],
                                          "type": "string"
                                        }
                                      },
                                      "id": "Border",
                                      "type": "object"
                                    },
                                    "right": {
                                      "properties": {
                                        "color": {
                                          "properties": {
                                            "red": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "green": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "blue": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "alpha": {
                                              "format": "float",
                                              "type": "number"
                                            }
                                          },
                                          "id": "Color",
                                          "type": "object"
                                        },
                                        "width": {
                                          "format": "int32",
                                          "type": "integer"
                                        },
                                        "style": {
                                          "enum": [
                                            "STYLE_UNSPECIFIED",
                                            "DOTTED",
                                            "DASHED",
                                            "SOLID",
                                            "SOLID_MEDIUM",
                                            "SOLID_THICK",
                                            "NONE",
                                            "DOUBLE"
                                          ],
                                          "type": "string"
                                        }
                                      },
                                      "id": "Border",
                                      "type": "object"
                                    }
                                  },
                                  "id": "Borders",
                                  "type": "object"
                                },
                                "textDirection": {
                                  "enum": [
                                    "TEXT_DIRECTION_UNSPECIFIED",
                                    "LEFT_TO_RIGHT",
                                    "RIGHT_TO_LEFT"
                                  ],
                                  "type": "string"
                                },
                                "textRotation": {
                                  "properties": {
                                    "angle": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "vertical": {
                                      "type": "boolean"
                                    }
                                  },
                                  "id": "TextRotation",
                                  "type": "object"
                                },
                                "wrapStrategy": {
                                  "enum": [
                                    "WRAP_STRATEGY_UNSPECIFIED",
                                    "OVERFLOW_CELL",
                                    "LEGACY_WRAP",
                                    "CLIP",
                                    "WRAP"
                                  ],
                                  "type": "string"
                                },
                                "numberFormat": {
                                  "properties": {
                                    "type": {
                                      "enum": [
                                        "NUMBER_FORMAT_TYPE_UNSPECIFIED",
                                        "TEXT",
                                        "NUMBER",
                                        "PERCENT",
                                        "CURRENCY",
                                        "DATE",
                                        "TIME",
                                        "DATE_TIME",
                                        "SCIENTIFIC"
                                      ],
                                      "type": "string"
                                    },
                                    "pattern": {
                                      "type": "string"
                                    }
                                  },
                                  "id": "NumberFormat",
                                  "type": "object"
                                }
                              },
                              "id": "CellFormat",
                              "type": "object"
                            },
                            "note": {
                              "type": "string"
                            },
                            "userEnteredValue": {
                              "properties": {
                                "numberValue": {
                                  "format": "double",
                                  "type": "number"
                                },
                                "errorValue": {
                                  "properties": {
                                    "type": {
                                      "enum": [
                                        "ERROR_TYPE_UNSPECIFIED",
                                        "ERROR",
                                        "NULL_VALUE",
                                        "DIVIDE_BY_ZERO",
                                        "VALUE",
                                        "REF",
                                        "NAME",
                                        "NUM",
                                        "N_A",
                                        "LOADING"
                                      ],
                                      "type": "string"
                                    },
                                    "message": {
                                      "type": "string"
                                    }
                                  },
                                  "id": "ErrorValue",
                                  "type": "object"
                                },
                                "stringValue": {
                                  "type": "string"
                                },
                                "boolValue": {
                                  "type": "boolean"
                                },
                                "formulaValue": {
                                  "type": "string"
                                }
                              },
                              "id": "ExtendedValue",
                              "type": "object"
                            },
                            "dataValidation": {
                              "properties": {
                                "showCustomUi": {
                                  "type": "boolean"
                                },
                                "strict": {
                                  "type": "boolean"
                                },
                                "inputMessage": {
                                  "type": "string"
                                },
                                "condition": {
                                  "properties": {
                                    "type": {
                                      "type": "string",
                                      "enum": [
                                        "CONDITION_TYPE_UNSPECIFIED",
                                        "NUMBER_GREATER",
                                        "NUMBER_GREATER_THAN_EQ",
                                        "NUMBER_LESS",
                                        "NUMBER_LESS_THAN_EQ",
                                        "NUMBER_EQ",
                                        "NUMBER_NOT_EQ",
                                        "NUMBER_BETWEEN",
                                        "NUMBER_NOT_BETWEEN",
                                        "TEXT_CONTAINS",
                                        "TEXT_NOT_CONTAINS",
                                        "TEXT_STARTS_WITH",
                                        "TEXT_ENDS_WITH",
                                        "TEXT_EQ",
                                        "TEXT_IS_EMAIL",
                                        "TEXT_IS_URL",
                                        "DATE_EQ",
                                        "DATE_BEFORE",
                                        "DATE_AFTER",
                                        "DATE_ON_OR_BEFORE",
                                        "DATE_ON_OR_AFTER",
                                        "DATE_BETWEEN",
                                        "DATE_NOT_BETWEEN",
                                        "DATE_IS_VALID",
                                        "ONE_OF_RANGE",
                                        "ONE_OF_LIST",
                                        "BLANK",
                                        "NOT_BLANK",
                                        "CUSTOM_FORMULA",
                                        "BOOLEAN"
                                      ]
                                    },
                                    "values": {
                                      "type": "array",
                                      "items": {
                                        "properties": {
                                          "relativeDate": {
                                            "enum": [
                                              "RELATIVE_DATE_UNSPECIFIED",
                                              "PAST_YEAR",
                                              "PAST_MONTH",
                                              "PAST_WEEK",
                                              "YESTERDAY",
                                              "TODAY",
                                              "TOMORROW"
                                            ],
                                            "type": "string"
                                          },
                                          "userEnteredValue": {
                                            "type": "string"
                                          }
                                        },
                                        "id": "ConditionValue",
                                        "type": "object"
                                      }
                                    }
                                  },
                                  "id": "BooleanCondition",
                                  "type": "object"
                                }
                              },
                              "id": "DataValidationRule",
                              "type": "object"
                            },
                            "effectiveValue": {
                              "properties": {
                                "numberValue": {
                                  "format": "double",
                                  "type": "number"
                                },
                                "errorValue": {
                                  "properties": {
                                    "type": {
                                      "enum": [
                                        "ERROR_TYPE_UNSPECIFIED",
                                        "ERROR",
                                        "NULL_VALUE",
                                        "DIVIDE_BY_ZERO",
                                        "VALUE",
                                        "REF",
                                        "NAME",
                                        "NUM",
                                        "N_A",
                                        "LOADING"
                                      ],
                                      "type": "string"
                                    },
                                    "message": {
                                      "type": "string"
                                    }
                                  },
                                  "id": "ErrorValue",
                                  "type": "object"
                                },
                                "stringValue": {
                                  "type": "string"
                                },
                                "boolValue": {
                                  "type": "boolean"
                                },
                                "formulaValue": {
                                  "type": "string"
                                }
                              },
                              "id": "ExtendedValue",
                              "type": "object"
                            }
                          },
                          "id": "CellData",
                          "type": "object"
                        }
                      }
                    },
                    "id": "RowData",
                    "type": "object"
                  }
                },
                "startRow": {
                  "format": "int32",
                  "type": "integer"
                }
              },
              "id": "GridData",
              "type": "object"
            }
          },
          "properties": {
            "properties": {
              "title": {
                "type": "string"
              },
              "tabColor": {
                "properties": {
                  "red": {
                    "format": "float",
                    "type": "number"
                  },
                  "green": {
                    "format": "float",
                    "type": "number"
                  },
                  "blue": {
                    "format": "float",
                    "type": "number"
                  },
                  "alpha": {
                    "format": "float",
                    "type": "number"
                  }
                },
                "id": "Color",
                "type": "object"
              },
              "index": {
                "format": "int32",
                "type": "integer"
              },
              "sheetId": {
                "format": "int32",
                "type": "integer"
              },
              "rightToLeft": {
                "type": "boolean"
              },
              "hidden": {
                "type": "boolean"
              },
              "gridProperties": {
                "properties": {
                  "hideGridlines": {
                    "type": "boolean"
                  },
                  "frozenRowCount": {
                    "format": "int32",
                    "type": "integer"
                  },
                  "frozenColumnCount": {
                    "format": "int32",
                    "type": "integer"
                  },
                  "columnCount": {
                    "format": "int32",
                    "type": "integer"
                  },
                  "columnGroupControlAfter": {
                    "type": "boolean"
                  },
                  "rowGroupControlAfter": {
                    "type": "boolean"
                  },
                  "rowCount": {
                    "format": "int32",
                    "type": "integer"
                  }
                },
                "id": "GridProperties",
                "type": "object"
              },
              "sheetType": {
                "enum": [
                  "SHEET_TYPE_UNSPECIFIED",
                  "GRID",
                  "OBJECT"
                ],
                "type": "string"
              }
            },
            "id": "SheetProperties",
            "type": "object"
          },
          "developerMetadata": {
            "type": "array",
            "items": {
              "properties": {
                "metadataValue": {
                  "type": "string"
                },
                "metadataKey": {
                  "type": "string"
                },
                "metadataId": {
                  "format": "int32",
                  "type": "integer"
                },
                "location": {
                  "properties": {
                    "dimensionRange": {
                      "properties": {
                        "sheetId": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "dimension": {
                          "enum": [
                            "DIMENSION_UNSPECIFIED",
                            "ROWS",
                            "COLUMNS"
                          ],
                          "type": "string"
                        },
                        "startIndex": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "endIndex": {
                          "format": "int32",
                          "type": "integer"
                        }
                      },
                      "id": "DimensionRange",
                      "type": "object"
                    },
                    "spreadsheet": {
                      "type": "boolean"
                    },
                    "sheetId": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "locationType": {
                      "enum": [
                        "DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED",
                        "ROW",
                        "COLUMN",
                        "SHEET",
                        "SPREADSHEET"
                      ],
                      "type": "string"
                    }
                  },
                  "id": "DeveloperMetadataLocation",
                  "type": "object"
                },
                "visibility": {
                  "enum": [
                    "DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED",
                    "DOCUMENT",
                    "PROJECT"
                  ],
                  "type": "string"
                }
              },
              "id": "DeveloperMetadata",
              "type": "object"
            }
          },
          "protectedRanges": {
            "type": "array",
            "items": {
              "properties": {
                "requestingUserCanEdit": {
                  "type": "boolean"
                },
                "range": {
                  "properties": {
                    "startColumnIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "sheetId": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "endRowIndex": {
                      "type": "integer",
                      "format": "int32"
                    },
                    "endColumnIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "startRowIndex": {
                      "format": "int32",
                      "type": "integer"
                    }
                  },
                  "id": "GridRange",
                  "type": "object"
                },
                "editors": {
                  "properties": {
                    "users": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "groups": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "domainUsersCanEdit": {
                      "type": "boolean"
                    }
                  },
                  "id": "Editors",
                  "type": "object"
                },
                "unprotectedRanges": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "startColumnIndex": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "sheetId": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "endRowIndex": {
                        "type": "integer",
                        "format": "int32"
                      },
                      "endColumnIndex": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "startRowIndex": {
                        "format": "int32",
                        "type": "integer"
                      }
                    },
                    "id": "GridRange",
                    "type": "object"
                  }
                },
                "namedRangeId": {
                  "type": "string"
                },
                "protectedRangeId": {
                  "format": "int32",
                  "type": "integer"
                },
                "warningOnly": {
                  "type": "boolean"
                }
              },
              "id": "ProtectedRange",
              "type": "object"
            }
          },
          "conditionalFormats": {
            "type": "array",
            "items": {
              "properties": {
                "ranges": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "startColumnIndex": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "sheetId": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "endRowIndex": {
                        "type": "integer",
                        "format": "int32"
                      },
                      "endColumnIndex": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "startRowIndex": {
                        "format": "int32",
                        "type": "integer"
                      }
                    },
                    "id": "GridRange",
                    "type": "object"
                  }
                },
                "gradientRule": {
                  "properties": {
                    "minpoint": {
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "INTERPOLATION_POINT_TYPE_UNSPECIFIED",
                            "MIN",
                            "MAX",
                            "NUMBER",
                            "PERCENT",
                            "PERCENTILE"
                          ]
                        },
                        "value": {
                          "type": "string"
                        },
                        "color": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        }
                      },
                      "id": "InterpolationPoint",
                      "type": "object"
                    },
                    "maxpoint": {
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "INTERPOLATION_POINT_TYPE_UNSPECIFIED",
                            "MIN",
                            "MAX",
                            "NUMBER",
                            "PERCENT",
                            "PERCENTILE"
                          ]
                        },
                        "value": {
                          "type": "string"
                        },
                        "color": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        }
                      },
                      "id": "InterpolationPoint",
                      "type": "object"
                    },
                    "midpoint": {
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "INTERPOLATION_POINT_TYPE_UNSPECIFIED",
                            "MIN",
                            "MAX",
                            "NUMBER",
                            "PERCENT",
                            "PERCENTILE"
                          ]
                        },
                        "value": {
                          "type": "string"
                        },
                        "color": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        }
                      },
                      "id": "InterpolationPoint",
                      "type": "object"
                    }
                  },
                  "id": "GradientRule",
                  "type": "object"
                },
                "booleanRule": {
                  "properties": {
                    "format": {
                      "properties": {
                        "hyperlinkDisplayType": {
                          "type": "string",
                          "enum": [
                            "HYPERLINK_DISPLAY_TYPE_UNSPECIFIED",
                            "LINKED",
                            "PLAIN_TEXT"
                          ]
                        },
                        "horizontalAlignment": {
                          "type": "string",
                          "enum": [
                            "HORIZONTAL_ALIGN_UNSPECIFIED",
                            "LEFT",
                            "CENTER",
                            "RIGHT"
                          ]
                        },
                        "textFormat": {
                          "properties": {
                            "underline": {
                              "type": "boolean"
                            },
                            "foregroundColor": {
                              "properties": {
                                "red": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "green": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "blue": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "alpha": {
                                  "format": "float",
                                  "type": "number"
                                }
                              },
                              "id": "Color",
                              "type": "object"
                            },
                            "bold": {
                              "type": "boolean"
                            },
                            "fontFamily": {
                              "type": "string"
                            },
                            "italic": {
                              "type": "boolean"
                            },
                            "strikethrough": {
                              "type": "boolean"
                            },
                            "fontSize": {
                              "format": "int32",
                              "type": "integer"
                            }
                          },
                          "id": "TextFormat",
                          "type": "object"
                        },
                        "backgroundColor": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        },
                        "padding": {
                          "properties": {
                            "right": {
                              "format": "int32",
                              "type": "integer"
                            },
                            "bottom": {
                              "format": "int32",
                              "type": "integer"
                            },
                            "top": {
                              "format": "int32",
                              "type": "integer"
                            },
                            "left": {
                              "format": "int32",
                              "type": "integer"
                            }
                          },
                          "id": "Padding",
                          "type": "object"
                        },
                        "verticalAlignment": {
                          "enum": [
                            "VERTICAL_ALIGN_UNSPECIFIED",
                            "TOP",
                            "MIDDLE",
                            "BOTTOM"
                          ],
                          "type": "string"
                        },
                        "borders": {
                          "properties": {
                            "bottom": {
                              "properties": {
                                "color": {
                                  "properties": {
                                    "red": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "green": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "blue": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "alpha": {
                                      "format": "float",
                                      "type": "number"
                                    }
                                  },
                                  "id": "Color",
                                  "type": "object"
                                },
                                "width": {
                                  "format": "int32",
                                  "type": "integer"
                                },
                                "style": {
                                  "enum": [
                                    "STYLE_UNSPECIFIED",
                                    "DOTTED",
                                    "DASHED",
                                    "SOLID",
                                    "SOLID_MEDIUM",
                                    "SOLID_THICK",
                                    "NONE",
                                    "DOUBLE"
                                  ],
                                  "type": "string"
                                }
                              },
                              "id": "Border",
                              "type": "object"
                            },
                            "top": {
                              "properties": {
                                "color": {
                                  "properties": {
                                    "red": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "green": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "blue": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "alpha": {
                                      "format": "float",
                                      "type": "number"
                                    }
                                  },
                                  "id": "Color",
                                  "type": "object"
                                },
                                "width": {
                                  "format": "int32",
                                  "type": "integer"
                                },
                                "style": {
                                  "enum": [
                                    "STYLE_UNSPECIFIED",
                                    "DOTTED",
                                    "DASHED",
                                    "SOLID",
                                    "SOLID_MEDIUM",
                                    "SOLID_THICK",
                                    "NONE",
                                    "DOUBLE"
                                  ],
                                  "type": "string"
                                }
                              },
                              "id": "Border",
                              "type": "object"
                            },
                            "left": {
                              "properties": {
                                "color": {
                                  "properties": {
                                    "red": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "green": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "blue": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "alpha": {
                                      "format": "float",
                                      "type": "number"
                                    }
                                  },
                                  "id": "Color",
                                  "type": "object"
                                },
                                "width": {
                                  "format": "int32",
                                  "type": "integer"
                                },
                                "style": {
                                  "enum": [
                                    "STYLE_UNSPECIFIED",
                                    "DOTTED",
                                    "DASHED",
                                    "SOLID",
                                    "SOLID_MEDIUM",
                                    "SOLID_THICK",
                                    "NONE",
                                    "DOUBLE"
                                  ],
                                  "type": "string"
                                }
                              },
                              "id": "Border",
                              "type": "object"
                            },
                            "right": {
                              "properties": {
                                "color": {
                                  "properties": {
                                    "red": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "green": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "blue": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "alpha": {
                                      "format": "float",
                                      "type": "number"
                                    }
                                  },
                                  "id": "Color",
                                  "type": "object"
                                },
                                "width": {
                                  "format": "int32",
                                  "type": "integer"
                                },
                                "style": {
                                  "enum": [
                                    "STYLE_UNSPECIFIED",
                                    "DOTTED",
                                    "DASHED",
                                    "SOLID",
                                    "SOLID_MEDIUM",
                                    "SOLID_THICK",
                                    "NONE",
                                    "DOUBLE"
                                  ],
                                  "type": "string"
                                }
                              },
                              "id": "Border",
                              "type": "object"
                            }
                          },
                          "id": "Borders",
                          "type": "object"
                        },
                        "textDirection": {
                          "enum": [
                            "TEXT_DIRECTION_UNSPECIFIED",
                            "LEFT_TO_RIGHT",
                            "RIGHT_TO_LEFT"
                          ],
                          "type": "string"
                        },
                        "textRotation": {
                          "properties": {
                            "angle": {
                              "format": "int32",
                              "type": "integer"
                            },
                            "vertical": {
                              "type": "boolean"
                            }
                          },
                          "id": "TextRotation",
                          "type": "object"
                        },
                        "wrapStrategy": {
                          "enum": [
                            "WRAP_STRATEGY_UNSPECIFIED",
                            "OVERFLOW_CELL",
                            "LEGACY_WRAP",
                            "CLIP",
                            "WRAP"
                          ],
                          "type": "string"
                        },
                        "numberFormat": {
                          "properties": {
                            "type": {
                              "enum": [
                                "NUMBER_FORMAT_TYPE_UNSPECIFIED",
                                "TEXT",
                                "NUMBER",
                                "PERCENT",
                                "CURRENCY",
                                "DATE",
                                "TIME",
                                "DATE_TIME",
                                "SCIENTIFIC"
                              ],
                              "type": "string"
                            },
                            "pattern": {
                              "type": "string"
                            }
                          },
                          "id": "NumberFormat",
                          "type": "object"
                        }
                      },
                      "id": "CellFormat",
                      "type": "object"
                    },
                    "condition": {
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "CONDITION_TYPE_UNSPECIFIED",
                            "NUMBER_GREATER",
                            "NUMBER_GREATER_THAN_EQ",
                            "NUMBER_LESS",
                            "NUMBER_LESS_THAN_EQ",
                            "NUMBER_EQ",
                            "NUMBER_NOT_EQ",
                            "NUMBER_BETWEEN",
                            "NUMBER_NOT_BETWEEN",
                            "TEXT_CONTAINS",
                            "TEXT_NOT_CONTAINS",
                            "TEXT_STARTS_WITH",
                            "TEXT_ENDS_WITH",
                            "TEXT_EQ",
                            "TEXT_IS_EMAIL",
                            "TEXT_IS_URL",
                            "DATE_EQ",
                            "DATE_BEFORE",
                            "DATE_AFTER",
                            "DATE_ON_OR_BEFORE",
                            "DATE_ON_OR_AFTER",
                            "DATE_BETWEEN",
                            "DATE_NOT_BETWEEN",
                            "DATE_IS_VALID",
                            "ONE_OF_RANGE",
                            "ONE_OF_LIST",
                            "BLANK",
                            "NOT_BLANK",
                            "CUSTOM_FORMULA",
                            "BOOLEAN"
                          ]
                        },
                        "values": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "relativeDate": {
                                "enum": [
                                  "RELATIVE_DATE_UNSPECIFIED",
                                  "PAST_YEAR",
                                  "PAST_MONTH",
                                  "PAST_WEEK",
                                  "YESTERDAY",
                                  "TODAY",
                                  "TOMORROW"
                                ],
                                "type": "string"
                              },
                              "userEnteredValue": {
                                "type": "string"
                              }
                            },
                            "id": "ConditionValue",
                            "type": "object"
                          }
                        }
                      },
                      "id": "BooleanCondition",
                      "type": "object"
                    }
                  },
                  "id": "BooleanRule",
                  "type": "object"
                }
              },
              "id": "ConditionalFormatRule",
              "type": "object"
            }
          },
          "columnGroups": {
            "type": "array",
            "items": {
              "properties": {
                "collapsed": {
                  "type": "boolean"
                },
                "range": {
                  "properties": {
                    "sheetId": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "dimension": {
                      "enum": [
                        "DIMENSION_UNSPECIFIED",
                        "ROWS",
                        "COLUMNS"
                      ],
                      "type": "string"
                    },
                    "startIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "endIndex": {
                      "format": "int32",
                      "type": "integer"
                    }
                  },
                  "id": "DimensionRange",
                  "type": "object"
                },
                "depth": {
                  "format": "int32",
                  "type": "integer"
                }
              },
              "id": "DimensionGroup",
              "type": "object"
            }
          },
          "basicFilter": {
            "properties": {
              "range": {
                "properties": {
                  "startColumnIndex": {
                    "format": "int32",
                    "type": "integer"
                  },
                  "sheetId": {
                    "format": "int32",
                    "type": "integer"
                  },
                  "endRowIndex": {
                    "type": "integer",
                    "format": "int32"
                  },
                  "endColumnIndex": {
                    "format": "int32",
                    "type": "integer"
                  },
                  "startRowIndex": {
                    "format": "int32",
                    "type": "integer"
                  }
                },
                "id": "GridRange",
                "type": "object"
              },
              "criteria": {
                "additionalProperties": {
                  "properties": {
                    "hiddenValues": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "condition": {
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "CONDITION_TYPE_UNSPECIFIED",
                            "NUMBER_GREATER",
                            "NUMBER_GREATER_THAN_EQ",
                            "NUMBER_LESS",
                            "NUMBER_LESS_THAN_EQ",
                            "NUMBER_EQ",
                            "NUMBER_NOT_EQ",
                            "NUMBER_BETWEEN",
                            "NUMBER_NOT_BETWEEN",
                            "TEXT_CONTAINS",
                            "TEXT_NOT_CONTAINS",
                            "TEXT_STARTS_WITH",
                            "TEXT_ENDS_WITH",
                            "TEXT_EQ",
                            "TEXT_IS_EMAIL",
                            "TEXT_IS_URL",
                            "DATE_EQ",
                            "DATE_BEFORE",
                            "DATE_AFTER",
                            "DATE_ON_OR_BEFORE",
                            "DATE_ON_OR_AFTER",
                            "DATE_BETWEEN",
                            "DATE_NOT_BETWEEN",
                            "DATE_IS_VALID",
                            "ONE_OF_RANGE",
                            "ONE_OF_LIST",
                            "BLANK",
                            "NOT_BLANK",
                            "CUSTOM_FORMULA",
                            "BOOLEAN"
                          ]
                        },
                        "values": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "relativeDate": {
                                "enum": [
                                  "RELATIVE_DATE_UNSPECIFIED",
                                  "PAST_YEAR",
                                  "PAST_MONTH",
                                  "PAST_WEEK",
                                  "YESTERDAY",
                                  "TODAY",
                                  "TOMORROW"
                                ],
                                "type": "string"
                              },
                              "userEnteredValue": {
                                "type": "string"
                              }
                            },
                            "id": "ConditionValue",
                            "type": "object"
                          }
                        }
                      },
                      "id": "BooleanCondition",
                      "type": "object"
                    }
                  },
                  "id": "FilterCriteria",
                  "type": "object"
                },
                "type": "object"
              },
              "sortSpecs": {
                "type": "array",
                "items": {
                  "properties": {
                    "dimensionIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "sortOrder": {
                      "enum": [
                        "SORT_ORDER_UNSPECIFIED",
                        "ASCENDING",
                        "DESCENDING"
                      ],
                      "type": "string"
                    }
                  },
                  "id": "SortSpec",
                  "type": "object"
                }
              }
            },
            "id": "BasicFilter",
            "type": "object"
          },
          "merges": {
            "type": "array",
            "items": {
              "properties": {
                "startColumnIndex": {
                  "format": "int32",
                  "type": "integer"
                },
                "sheetId": {
                  "format": "int32",
                  "type": "integer"
                },
                "endRowIndex": {
                  "type": "integer",
                  "format": "int32"
                },
                "endColumnIndex": {
                  "format": "int32",
                  "type": "integer"
                },
                "startRowIndex": {
                  "format": "int32",
                  "type": "integer"
                }
              },
              "id": "GridRange",
              "type": "object"
            }
          },
          "bandedRanges": {
            "type": "array",
            "items": {
              "properties": {
                "range": {
                  "properties": {
                    "startColumnIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "sheetId": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "endRowIndex": {
                      "type": "integer",
                      "format": "int32"
                    },
                    "endColumnIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "startRowIndex": {
                      "format": "int32",
                      "type": "integer"
                    }
                  },
                  "id": "GridRange",
                  "type": "object"
                },
                "bandedRangeId": {
                  "format": "int32",
                  "type": "integer"
                },
                "rowProperties": {
                  "properties": {
                    "firstBandColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "secondBandColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "footerColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "headerColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    }
                  },
                  "id": "BandingProperties",
                  "type": "object"
                },
                "columnProperties": {
                  "properties": {
                    "firstBandColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "secondBandColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "footerColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "headerColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    }
                  },
                  "id": "BandingProperties",
                  "type": "object"
                }
              },
              "id": "BandedRange",
              "type": "object"
            }
          },
          "charts": {
            "type": "array",
            "items": {
              "properties": {
                "chartId": {
                  "format": "int32",
                  "type": "integer"
                },
                "position": {
                  "properties": {
                    "newSheet": {
                      "type": "boolean"
                    },
                    "sheetId": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "overlayPosition": {
                      "properties": {
                        "offsetXPixels": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "anchorCell": {
                          "properties": {
                            "rowIndex": {
                              "format": "int32",
                              "type": "integer"
                            },
                            "columnIndex": {
                              "format": "int32",
                              "type": "integer"
                            },
                            "sheetId": {
                              "format": "int32",
                              "type": "integer"
                            }
                          },
                          "id": "GridCoordinate",
                          "type": "object"
                        },
                        "offsetYPixels": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "heightPixels": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "widthPixels": {
                          "format": "int32",
                          "type": "integer"
                        }
                      },
                      "id": "OverlayPosition",
                      "type": "object"
                    }
                  },
                  "id": "EmbeddedObjectPosition",
                  "type": "object"
                },
                "spec": {
                  "properties": {
                    "basicChart": {
                      "properties": {
                        "series": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "color": {
                                "properties": {
                                  "red": {
                                    "format": "float",
                                    "type": "number"
                                  },
                                  "green": {
                                    "format": "float",
                                    "type": "number"
                                  },
                                  "blue": {
                                    "format": "float",
                                    "type": "number"
                                  },
                                  "alpha": {
                                    "format": "float",
                                    "type": "number"
                                  }
                                },
                                "id": "Color",
                                "type": "object"
                              },
                              "lineStyle": {
                                "properties": {
                                  "type": {
                                    "type": "string",
                                    "enum": [
                                      "LINE_DASH_TYPE_UNSPECIFIED",
                                      "INVISIBLE",
                                      "CUSTOM",
                                      "SOLID",
                                      "DOTTED",
                                      "MEDIUM_DASHED",
                                      "MEDIUM_DASHED_DOTTED",
                                      "LONG_DASHED",
                                      "LONG_DASHED_DOTTED"
                                    ]
                                  },
                                  "width": {
                                    "format": "int32",
                                    "type": "integer"
                                  }
                                },
                                "id": "LineStyle",
                                "type": "object"
                              },
                              "series": {
                                "properties": {
                                  "sourceRange": {
                                    "properties": {
                                      "sources": {
                                        "type": "array",
                                        "items": {
                                          "properties": {
                                            "startColumnIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "sheetId": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "endRowIndex": {
                                              "type": "integer",
                                              "format": "int32"
                                            },
                                            "endColumnIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "startRowIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            }
                                          },
                                          "id": "GridRange",
                                          "type": "object"
                                        }
                                      }
                                    },
                                    "id": "ChartSourceRange",
                                    "type": "object"
                                  }
                                },
                                "id": "ChartData",
                                "type": "object"
                              },
                              "type": {
                                "enum": [
                                  "BASIC_CHART_TYPE_UNSPECIFIED",
                                  "BAR",
                                  "LINE",
                                  "AREA",
                                  "COLUMN",
                                  "SCATTER",
                                  "COMBO",
                                  "STEPPED_AREA"
                                ],
                                "type": "string"
                              },
                              "targetAxis": {
                                "enum": [
                                  "BASIC_CHART_AXIS_POSITION_UNSPECIFIED",
                                  "BOTTOM_AXIS",
                                  "LEFT_AXIS",
                                  "RIGHT_AXIS"
                                ],
                                "type": "string"
                              }
                            },
                            "id": "BasicChartSeries",
                            "type": "object"
                          }
                        },
                        "legendPosition": {
                          "enum": [
                            "BASIC_CHART_LEGEND_POSITION_UNSPECIFIED",
                            "BOTTOM_LEGEND",
                            "LEFT_LEGEND",
                            "RIGHT_LEGEND",
                            "TOP_LEGEND",
                            "NO_LEGEND"
                          ],
                          "type": "string"
                        },
                        "compareMode": {
                          "enum": [
                            "BASIC_CHART_COMPARE_MODE_UNSPECIFIED",
                            "DATUM",
                            "CATEGORY"
                          ],
                          "type": "string"
                        },
                        "domains": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "domain": {
                                "properties": {
                                  "sourceRange": {
                                    "properties": {
                                      "sources": {
                                        "type": "array",
                                        "items": {
                                          "properties": {
                                            "startColumnIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "sheetId": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "endRowIndex": {
                                              "type": "integer",
                                              "format": "int32"
                                            },
                                            "endColumnIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "startRowIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            }
                                          },
                                          "id": "GridRange",
                                          "type": "object"
                                        }
                                      }
                                    },
                                    "id": "ChartSourceRange",
                                    "type": "object"
                                  }
                                },
                                "id": "ChartData",
                                "type": "object"
                              },
                              "reversed": {
                                "type": "boolean"
                              }
                            },
                            "id": "BasicChartDomain",
                            "type": "object"
                          }
                        },
                        "lineSmoothing": {
                          "type": "boolean"
                        },
                        "headerCount": {
                          "type": "integer",
                          "format": "int32"
                        },
                        "stackedType": {
                          "type": "string",
                          "enum": [
                            "BASIC_CHART_STACKED_TYPE_UNSPECIFIED",
                            "NOT_STACKED",
                            "STACKED",
                            "PERCENT_STACKED"
                          ]
                        },
                        "threeDimensional": {
                          "type": "boolean"
                        },
                        "axis": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "position": {
                                "enum": [
                                  "BASIC_CHART_AXIS_POSITION_UNSPECIFIED",
                                  "BOTTOM_AXIS",
                                  "LEFT_AXIS",
                                  "RIGHT_AXIS"
                                ],
                                "type": "string"
                              },
                              "title": {
                                "type": "string"
                              },
                              "titleTextPosition": {
                                "properties": {
                                  "horizontalAlignment": {
                                    "enum": [
                                      "HORIZONTAL_ALIGN_UNSPECIFIED",
                                      "LEFT",
                                      "CENTER",
                                      "RIGHT"
                                    ],
                                    "type": "string"
                                  }
                                },
                                "id": "TextPosition",
                                "type": "object"
                              },
                              "format": {
                                "properties": {
                                  "underline": {
                                    "type": "boolean"
                                  },
                                  "foregroundColor": {
                                    "properties": {
                                      "red": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "green": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "blue": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "alpha": {
                                        "format": "float",
                                        "type": "number"
                                      }
                                    },
                                    "id": "Color",
                                    "type": "object"
                                  },
                                  "bold": {
                                    "type": "boolean"
                                  },
                                  "fontFamily": {
                                    "type": "string"
                                  },
                                  "italic": {
                                    "type": "boolean"
                                  },
                                  "strikethrough": {
                                    "type": "boolean"
                                  },
                                  "fontSize": {
                                    "format": "int32",
                                    "type": "integer"
                                  }
                                },
                                "id": "TextFormat",
                                "type": "object"
                              }
                            },
                            "id": "BasicChartAxis",
                            "type": "object"
                          }
                        },
                        "chartType": {
                          "enum": [
                            "BASIC_CHART_TYPE_UNSPECIFIED",
                            "BAR",
                            "LINE",
                            "AREA",
                            "COLUMN",
                            "SCATTER",
                            "COMBO",
                            "STEPPED_AREA"
                          ],
                          "type": "string"
                        },
                        "interpolateNulls": {
                          "type": "boolean"
                        }
                      },
                      "id": "BasicChartSpec",
                      "type": "object"
                    },
                    "orgChart": {
                      "properties": {
                        "selectedNodeColor": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        },
                        "parentLabels": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "labels": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "nodeSize": {
                          "type": "string",
                          "enum": [
                            "ORG_CHART_LABEL_SIZE_UNSPECIFIED",
                            "SMALL",
                            "MEDIUM",
                            "LARGE"
                          ]
                        },
                        "nodeColor": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        },
                        "tooltips": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        }
                      },
                      "id": "OrgChartSpec",
                      "type": "object"
                    },
                    "pieChart": {
                      "properties": {
                        "series": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "legendPosition": {
                          "enum": [
                            "PIE_CHART_LEGEND_POSITION_UNSPECIFIED",
                            "BOTTOM_LEGEND",
                            "LEFT_LEGEND",
                            "RIGHT_LEGEND",
                            "TOP_LEGEND",
                            "NO_LEGEND",
                            "LABELED_LEGEND"
                          ],
                          "type": "string"
                        },
                        "pieHole": {
                          "format": "double",
                          "type": "number"
                        },
                        "domain": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "threeDimensional": {
                          "type": "boolean"
                        }
                      },
                      "id": "PieChartSpec",
                      "type": "object"
                    },
                    "titleTextFormat": {
                      "properties": {
                        "underline": {
                          "type": "boolean"
                        },
                        "foregroundColor": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        },
                        "bold": {
                          "type": "boolean"
                        },
                        "fontFamily": {
                          "type": "string"
                        },
                        "italic": {
                          "type": "boolean"
                        },
                        "strikethrough": {
                          "type": "boolean"
                        },
                        "fontSize": {
                          "format": "int32",
                          "type": "integer"
                        }
                      },
                      "id": "TextFormat",
                      "type": "object"
                    },
                    "title": {
                      "type": "string"
                    },
                    "altText": {
                      "type": "string"
                    },
                    "titleTextPosition": {
                      "properties": {
                        "horizontalAlignment": {
                          "enum": [
                            "HORIZONTAL_ALIGN_UNSPECIFIED",
                            "LEFT",
                            "CENTER",
                            "RIGHT"
                          ],
                          "type": "string"
                        }
                      },
                      "id": "TextPosition",
                      "type": "object"
                    },
                    "histogramChart": {
                      "properties": {
                        "outlierPercentile": {
                          "format": "double",
                          "type": "number"
                        },
                        "showItemDividers": {
                          "type": "boolean"
                        },
                        "series": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "barColor": {
                                "properties": {
                                  "red": {
                                    "format": "float",
                                    "type": "number"
                                  },
                                  "green": {
                                    "format": "float",
                                    "type": "number"
                                  },
                                  "blue": {
                                    "format": "float",
                                    "type": "number"
                                  },
                                  "alpha": {
                                    "format": "float",
                                    "type": "number"
                                  }
                                },
                                "id": "Color",
                                "type": "object"
                              },
                              "data": {
                                "properties": {
                                  "sourceRange": {
                                    "properties": {
                                      "sources": {
                                        "type": "array",
                                        "items": {
                                          "properties": {
                                            "startColumnIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "sheetId": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "endRowIndex": {
                                              "type": "integer",
                                              "format": "int32"
                                            },
                                            "endColumnIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "startRowIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            }
                                          },
                                          "id": "GridRange",
                                          "type": "object"
                                        }
                                      }
                                    },
                                    "id": "ChartSourceRange",
                                    "type": "object"
                                  }
                                },
                                "id": "ChartData",
                                "type": "object"
                              }
                            },
                            "id": "HistogramSeries",
                            "type": "object"
                          }
                        },
                        "legendPosition": {
                          "enum": [
                            "HISTOGRAM_CHART_LEGEND_POSITION_UNSPECIFIED",
                            "BOTTOM_LEGEND",
                            "LEFT_LEGEND",
                            "RIGHT_LEGEND",
                            "TOP_LEGEND",
                            "NO_LEGEND",
                            "INSIDE_LEGEND"
                          ],
                          "type": "string"
                        },
                        "bucketSize": {
                          "format": "double",
                          "type": "number"
                        }
                      },
                      "id": "HistogramChartSpec",
                      "type": "object"
                    },
                    "candlestickChart": {
                      "properties": {
                        "domain": {
                          "properties": {
                            "reversed": {
                              "type": "boolean"
                            },
                            "data": {
                              "properties": {
                                "sourceRange": {
                                  "properties": {
                                    "sources": {
                                      "type": "array",
                                      "items": {
                                        "properties": {
                                          "startColumnIndex": {
                                            "format": "int32",
                                            "type": "integer"
                                          },
                                          "sheetId": {
                                            "format": "int32",
                                            "type": "integer"
                                          },
                                          "endRowIndex": {
                                            "type": "integer",
                                            "format": "int32"
                                          },
                                          "endColumnIndex": {
                                            "format": "int32",
                                            "type": "integer"
                                          },
                                          "startRowIndex": {
                                            "format": "int32",
                                            "type": "integer"
                                          }
                                        },
                                        "id": "GridRange",
                                        "type": "object"
                                      }
                                    }
                                  },
                                  "id": "ChartSourceRange",
                                  "type": "object"
                                }
                              },
                              "id": "ChartData",
                              "type": "object"
                            }
                          },
                          "id": "CandlestickDomain",
                          "type": "object"
                        },
                        "data": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "lowSeries": {
                                "properties": {
                                  "data": {
                                    "properties": {
                                      "sourceRange": {
                                        "properties": {
                                          "sources": {
                                            "type": "array",
                                            "items": {
                                              "properties": {
                                                "startColumnIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "sheetId": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "endRowIndex": {
                                                  "type": "integer",
                                                  "format": "int32"
                                                },
                                                "endColumnIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "startRowIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                }
                                              },
                                              "id": "GridRange",
                                              "type": "object"
                                            }
                                          }
                                        },
                                        "id": "ChartSourceRange",
                                        "type": "object"
                                      }
                                    },
                                    "id": "ChartData",
                                    "type": "object"
                                  }
                                },
                                "id": "CandlestickSeries",
                                "type": "object"
                              },
                              "closeSeries": {
                                "properties": {
                                  "data": {
                                    "properties": {
                                      "sourceRange": {
                                        "properties": {
                                          "sources": {
                                            "type": "array",
                                            "items": {
                                              "properties": {
                                                "startColumnIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "sheetId": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "endRowIndex": {
                                                  "type": "integer",
                                                  "format": "int32"
                                                },
                                                "endColumnIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "startRowIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                }
                                              },
                                              "id": "GridRange",
                                              "type": "object"
                                            }
                                          }
                                        },
                                        "id": "ChartSourceRange",
                                        "type": "object"
                                      }
                                    },
                                    "id": "ChartData",
                                    "type": "object"
                                  }
                                },
                                "id": "CandlestickSeries",
                                "type": "object"
                              },
                              "openSeries": {
                                "properties": {
                                  "data": {
                                    "properties": {
                                      "sourceRange": {
                                        "properties": {
                                          "sources": {
                                            "type": "array",
                                            "items": {
                                              "properties": {
                                                "startColumnIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "sheetId": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "endRowIndex": {
                                                  "type": "integer",
                                                  "format": "int32"
                                                },
                                                "endColumnIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "startRowIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                }
                                              },
                                              "id": "GridRange",
                                              "type": "object"
                                            }
                                          }
                                        },
                                        "id": "ChartSourceRange",
                                        "type": "object"
                                      }
                                    },
                                    "id": "ChartData",
                                    "type": "object"
                                  }
                                },
                                "id": "CandlestickSeries",
                                "type": "object"
                              },
                              "highSeries": {
                                "properties": {
                                  "data": {
                                    "properties": {
                                      "sourceRange": {
                                        "properties": {
                                          "sources": {
                                            "type": "array",
                                            "items": {
                                              "properties": {
                                                "startColumnIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "sheetId": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "endRowIndex": {
                                                  "type": "integer",
                                                  "format": "int32"
                                                },
                                                "endColumnIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "startRowIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                }
                                              },
                                              "id": "GridRange",
                                              "type": "object"
                                            }
                                          }
                                        },
                                        "id": "ChartSourceRange",
                                        "type": "object"
                                      }
                                    },
                                    "id": "ChartData",
                                    "type": "object"
                                  }
                                },
                                "id": "CandlestickSeries",
                                "type": "object"
                              }
                            },
                            "id": "CandlestickData",
                            "type": "object"
                          }
                        }
                      },
                      "id": "CandlestickChartSpec",
                      "type": "object"
                    },
                    "bubbleChart": {
                      "properties": {
                        "groupIds": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "bubbleLabels": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "bubbleMinRadiusSize": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "bubbleMaxRadiusSize": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "series": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "legendPosition": {
                          "type": "string",
                          "enum": [
                            "BUBBLE_CHART_LEGEND_POSITION_UNSPECIFIED",
                            "BOTTOM_LEGEND",
                            "LEFT_LEGEND",
                            "RIGHT_LEGEND",
                            "TOP_LEGEND",
                            "NO_LEGEND",
                            "INSIDE_LEGEND"
                          ]
                        },
                        "bubbleOpacity": {
                          "type": "number",
                          "format": "float"
                        },
                        "bubbleSizes": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "domain": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "bubbleBorderColor": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        },
                        "bubbleTextStyle": {
                          "properties": {
                            "underline": {
                              "type": "boolean"
                            },
                            "foregroundColor": {
                              "properties": {
                                "red": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "green": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "blue": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "alpha": {
                                  "format": "float",
                                  "type": "number"
                                }
                              },
                              "id": "Color",
                              "type": "object"
                            },
                            "bold": {
                              "type": "boolean"
                            },
                            "fontFamily": {
                              "type": "string"
                            },
                            "italic": {
                              "type": "boolean"
                            },
                            "strikethrough": {
                              "type": "boolean"
                            },
                            "fontSize": {
                              "format": "int32",
                              "type": "integer"
                            }
                          },
                          "id": "TextFormat",
                          "type": "object"
                        }
                      },
                      "id": "BubbleChartSpec",
                      "type": "object"
                    },
                    "waterfallChart": {
                      "properties": {
                        "connectorLineStyle": {
                          "properties": {
                            "type": {
                              "type": "string",
                              "enum": [
                                "LINE_DASH_TYPE_UNSPECIFIED",
                                "INVISIBLE",
                                "CUSTOM",
                                "SOLID",
                                "DOTTED",
                                "MEDIUM_DASHED",
                                "MEDIUM_DASHED_DOTTED",
                                "LONG_DASHED",
                                "LONG_DASHED_DOTTED"
                              ]
                            },
                            "width": {
                              "format": "int32",
                              "type": "integer"
                            }
                          },
                          "id": "LineStyle",
                          "type": "object"
                        },
                        "domain": {
                          "properties": {
                            "data": {
                              "properties": {
                                "sourceRange": {
                                  "properties": {
                                    "sources": {
                                      "type": "array",
                                      "items": {
                                        "properties": {
                                          "startColumnIndex": {
                                            "format": "int32",
                                            "type": "integer"
                                          },
                                          "sheetId": {
                                            "format": "int32",
                                            "type": "integer"
                                          },
                                          "endRowIndex": {
                                            "type": "integer",
                                            "format": "int32"
                                          },
                                          "endColumnIndex": {
                                            "format": "int32",
                                            "type": "integer"
                                          },
                                          "startRowIndex": {
                                            "format": "int32",
                                            "type": "integer"
                                          }
                                        },
                                        "id": "GridRange",
                                        "type": "object"
                                      }
                                    }
                                  },
                                  "id": "ChartSourceRange",
                                  "type": "object"
                                }
                              },
                              "id": "ChartData",
                              "type": "object"
                            },
                            "reversed": {
                              "type": "boolean"
                            }
                          },
                          "id": "WaterfallChartDomain",
                          "type": "object"
                        },
                        "firstValueIsTotal": {
                          "type": "boolean"
                        },
                        "hideConnectorLines": {
                          "type": "boolean"
                        },
                        "stackedType": {
                          "type": "string",
                          "enum": [
                            "WATERFALL_STACKED_TYPE_UNSPECIFIED",
                            "STACKED",
                            "SEQUENTIAL"
                          ]
                        },
                        "series": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "positiveColumnsStyle": {
                                "properties": {
                                  "label": {
                                    "type": "string"
                                  },
                                  "color": {
                                    "properties": {
                                      "red": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "green": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "blue": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "alpha": {
                                        "format": "float",
                                        "type": "number"
                                      }
                                    },
                                    "id": "Color",
                                    "type": "object"
                                  }
                                },
                                "id": "WaterfallChartColumnStyle",
                                "type": "object"
                              },
                              "data": {
                                "properties": {
                                  "sourceRange": {
                                    "properties": {
                                      "sources": {
                                        "type": "array",
                                        "items": {
                                          "properties": {
                                            "startColumnIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "sheetId": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "endRowIndex": {
                                              "type": "integer",
                                              "format": "int32"
                                            },
                                            "endColumnIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "startRowIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            }
                                          },
                                          "id": "GridRange",
                                          "type": "object"
                                        }
                                      }
                                    },
                                    "id": "ChartSourceRange",
                                    "type": "object"
                                  }
                                },
                                "id": "ChartData",
                                "type": "object"
                              },
                              "negativeColumnsStyle": {
                                "properties": {
                                  "label": {
                                    "type": "string"
                                  },
                                  "color": {
                                    "properties": {
                                      "red": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "green": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "blue": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "alpha": {
                                        "format": "float",
                                        "type": "number"
                                      }
                                    },
                                    "id": "Color",
                                    "type": "object"
                                  }
                                },
                                "id": "WaterfallChartColumnStyle",
                                "type": "object"
                              },
                              "hideTrailingSubtotal": {
                                "type": "boolean"
                              },
                              "customSubtotals": {
                                "type": "array",
                                "items": {
                                  "properties": {
                                    "label": {
                                      "type": "string"
                                    },
                                    "subtotalIndex": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "dataIsSubtotal": {
                                      "type": "boolean"
                                    }
                                  },
                                  "id": "WaterfallChartCustomSubtotal",
                                  "type": "object"
                                }
                              },
                              "subtotalColumnsStyle": {
                                "properties": {
                                  "label": {
                                    "type": "string"
                                  },
                                  "color": {
                                    "properties": {
                                      "red": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "green": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "blue": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "alpha": {
                                        "format": "float",
                                        "type": "number"
                                      }
                                    },
                                    "id": "Color",
                                    "type": "object"
                                  }
                                },
                                "id": "WaterfallChartColumnStyle",
                                "type": "object"
                              }
                            },
                            "id": "WaterfallChartSeries",
                            "type": "object"
                          }
                        }
                      },
                      "id": "WaterfallChartSpec",
                      "type": "object"
                    },
                    "fontName": {
                      "type": "string"
                    },
                    "maximized": {
                      "type": "boolean"
                    },
                    "treemapChart": {
                      "properties": {
                        "maxValue": {
                          "format": "double",
                          "type": "number"
                        },
                        "colorScale": {
                          "properties": {
                            "minValueColor": {
                              "properties": {
                                "red": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "green": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "blue": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "alpha": {
                                  "format": "float",
                                  "type": "number"
                                }
                              },
                              "id": "Color",
                              "type": "object"
                            },
                            "noDataColor": {
                              "properties": {
                                "red": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "green": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "blue": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "alpha": {
                                  "format": "float",
                                  "type": "number"
                                }
                              },
                              "id": "Color",
                              "type": "object"
                            },
                            "midValueColor": {
                              "properties": {
                                "red": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "green": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "blue": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "alpha": {
                                  "format": "float",
                                  "type": "number"
                                }
                              },
                              "id": "Color",
                              "type": "object"
                            },
                            "maxValueColor": {
                              "properties": {
                                "red": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "green": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "blue": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "alpha": {
                                  "format": "float",
                                  "type": "number"
                                }
                              },
                              "id": "Color",
                              "type": "object"
                            }
                          },
                          "id": "TreemapChartColorScale",
                          "type": "object"
                        },
                        "hideTooltips": {
                          "type": "boolean"
                        },
                        "hintedLevels": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "levels": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "minValue": {
                          "format": "double",
                          "type": "number"
                        },
                        "sizeData": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "textFormat": {
                          "properties": {
                            "underline": {
                              "type": "boolean"
                            },
                            "foregroundColor": {
                              "properties": {
                                "red": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "green": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "blue": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "alpha": {
                                  "format": "float",
                                  "type": "number"
                                }
                              },
                              "id": "Color",
                              "type": "object"
                            },
                            "bold": {
                              "type": "boolean"
                            },
                            "fontFamily": {
                              "type": "string"
                            },
                            "italic": {
                              "type": "boolean"
                            },
                            "strikethrough": {
                              "type": "boolean"
                            },
                            "fontSize": {
                              "format": "int32",
                              "type": "integer"
                            }
                          },
                          "id": "TextFormat",
                          "type": "object"
                        },
                        "headerColor": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        },
                        "parentLabels": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "labels": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "colorData": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        }
                      },
                      "id": "TreemapChartSpec",
                      "type": "object"
                    },
                    "hiddenDimensionStrategy": {
                      "enum": [
                        "CHART_HIDDEN_DIMENSION_STRATEGY_UNSPECIFIED",
                        "SKIP_HIDDEN_ROWS_AND_COLUMNS",
                        "SKIP_HIDDEN_ROWS",
                        "SKIP_HIDDEN_COLUMNS",
                        "SHOW_ALL"
                      ],
                      "type": "string"
                    },
                    "subtitleTextFormat": {
                      "properties": {
                        "underline": {
                          "type": "boolean"
                        },
                        "foregroundColor": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        },
                        "bold": {
                          "type": "boolean"
                        },
                        "fontFamily": {
                          "type": "string"
                        },
                        "italic": {
                          "type": "boolean"
                        },
                        "strikethrough": {
                          "type": "boolean"
                        },
                        "fontSize": {
                          "format": "int32",
                          "type": "integer"
                        }
                      },
                      "id": "TextFormat",
                      "type": "object"
                    },
                    "subtitle": {
                      "type": "string"
                    },
                    "subtitleTextPosition": {
                      "properties": {
                        "horizontalAlignment": {
                          "enum": [
                            "HORIZONTAL_ALIGN_UNSPECIFIED",
                            "LEFT",
                            "CENTER",
                            "RIGHT"
                          ],
                          "type": "string"
                        }
                      },
                      "id": "TextPosition",
                      "type": "object"
                    },
                    "backgroundColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    }
                  },
                  "id": "ChartSpec",
                  "type": "object"
                }
              },
              "id": "EmbeddedChart",
              "type": "object"
            }
          },
          "filterViews": {
            "type": "array",
            "items": {
              "properties": {
                "sortSpecs": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "dimensionIndex": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "sortOrder": {
                        "enum": [
                          "SORT_ORDER_UNSPECIFIED",
                          "ASCENDING",
                          "DESCENDING"
                        ],
                        "type": "string"
                      }
                    },
                    "id": "SortSpec",
                    "type": "object"
                  }
                },
                "namedRangeId": {
                  "type": "string"
                },
                "filterViewId": {
                  "format": "int32",
                  "type": "integer"
                },
                "criteria": {
                  "additionalProperties": {
                    "properties": {
                      "hiddenValues": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "condition": {
                        "properties": {
                          "type": {
                            "type": "string",
                            "enum": [
                              "CONDITION_TYPE_UNSPECIFIED",
                              "NUMBER_GREATER",
                              "NUMBER_GREATER_THAN_EQ",
                              "NUMBER_LESS",
                              "NUMBER_LESS_THAN_EQ",
                              "NUMBER_EQ",
                              "NUMBER_NOT_EQ",
                              "NUMBER_BETWEEN",
                              "NUMBER_NOT_BETWEEN",
                              "TEXT_CONTAINS",
                              "TEXT_NOT_CONTAINS",
                              "TEXT_STARTS_WITH",
                              "TEXT_ENDS_WITH",
                              "TEXT_EQ",
                              "TEXT_IS_EMAIL",
                              "TEXT_IS_URL",
                              "DATE_EQ",
                              "DATE_BEFORE",
                              "DATE_AFTER",
                              "DATE_ON_OR_BEFORE",
                              "DATE_ON_OR_AFTER",
                              "DATE_BETWEEN",
                              "DATE_NOT_BETWEEN",
                              "DATE_IS_VALID",
                              "ONE_OF_RANGE",
                              "ONE_OF_LIST",
                              "BLANK",
                              "NOT_BLANK",
                              "CUSTOM_FORMULA",
                              "BOOLEAN"
                            ]
                          },
                          "values": {
                            "type": "array",
                            "items": {
                              "properties": {
                                "relativeDate": {
                                  "enum": [
                                    "RELATIVE_DATE_UNSPECIFIED",
                                    "PAST_YEAR",
                                    "PAST_MONTH",
                                    "PAST_WEEK",
                                    "YESTERDAY",
                                    "TODAY",
                                    "TOMORROW"
                                  ],
                                  "type": "string"
                                },
                                "userEnteredValue": {
                                  "type": "string"
                                }
                              },
                              "id": "ConditionValue",
                              "type": "object"
                            }
                          }
                        },
                        "id": "BooleanCondition",
                        "type": "object"
                      }
                    },
                    "id": "FilterCriteria",
                    "type": "object"
                  },
                  "type": "object"
                },
                "title": {
                  "type": "string"
                },
                "range": {
                  "properties": {
                    "startColumnIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "sheetId": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "endRowIndex": {
                      "type": "integer",
                      "format": "int32"
                    },
                    "endColumnIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "startRowIndex": {
                      "format": "int32",
                      "type": "integer"
                    }
                  },
                  "id": "GridRange",
                  "type": "object"
                }
              },
              "id": "FilterView",
              "type": "object"
            }
          },
          "rowGroups": {
            "type": "array",
            "items": {
              "properties": {
                "collapsed": {
                  "type": "boolean"
                },
                "range": {
                  "properties": {
                    "sheetId": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "dimension": {
                      "enum": [
                        "DIMENSION_UNSPECIFIED",
                        "ROWS",
                        "COLUMNS"
                      ],
                      "type": "string"
                    },
                    "startIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "endIndex": {
                      "format": "int32",
                      "type": "integer"
                    }
                  },
                  "id": "DimensionRange",
                  "type": "object"
                },
                "depth": {
                  "format": "int32",
                  "type": "integer"
                }
              },
              "id": "DimensionGroup",
              "type": "object"
            }
          }
        },
        "id": "Sheet",
        "type": "object"
      }
    }
  },
  "id": "Spreadsheet",
  "type": "object"
}   
```
</details>

<details close markdown="block"><summary><strong>Click to expand Output schema: </strong></summary>
```json
{
  "properties": {
    "spreadsheetUrl": {
      "type": "string"
    },
    "properties": {
      "properties": {
        "autoRecalc": {
          "enum": [
            "RECALCULATION_INTERVAL_UNSPECIFIED",
            "ON_CHANGE",
            "MINUTE",
            "HOUR"
          ],
          "type": "string"
        },
        "defaultFormat": {
          "properties": {
            "hyperlinkDisplayType": {
              "type": "string",
              "enum": [
                "HYPERLINK_DISPLAY_TYPE_UNSPECIFIED",
                "LINKED",
                "PLAIN_TEXT"
              ]
            },
            "horizontalAlignment": {
              "type": "string",
              "enum": [
                "HORIZONTAL_ALIGN_UNSPECIFIED",
                "LEFT",
                "CENTER",
                "RIGHT"
              ]
            },
            "textFormat": {
              "properties": {
                "underline": {
                  "type": "boolean"
                },
                "foregroundColor": {
                  "properties": {
                    "red": {
                      "format": "float",
                      "type": "number"
                    },
                    "green": {
                      "format": "float",
                      "type": "number"
                    },
                    "blue": {
                      "format": "float",
                      "type": "number"
                    },
                    "alpha": {
                      "format": "float",
                      "type": "number"
                    }
                  },
                  "id": "Color",
                  "type": "object"
                },
                "bold": {
                  "type": "boolean"
                },
                "fontFamily": {
                  "type": "string"
                },
                "italic": {
                  "type": "boolean"
                },
                "strikethrough": {
                  "type": "boolean"
                },
                "fontSize": {
                  "format": "int32",
                  "type": "integer"
                }
              },
              "id": "TextFormat",
              "type": "object"
            },
            "backgroundColor": {
              "properties": {
                "red": {
                  "format": "float",
                  "type": "number"
                },
                "green": {
                  "format": "float",
                  "type": "number"
                },
                "blue": {
                  "format": "float",
                  "type": "number"
                },
                "alpha": {
                  "format": "float",
                  "type": "number"
                }
              },
              "id": "Color",
              "type": "object"
            },
            "padding": {
              "properties": {
                "right": {
                  "format": "int32",
                  "type": "integer"
                },
                "bottom": {
                  "format": "int32",
                  "type": "integer"
                },
                "top": {
                  "format": "int32",
                  "type": "integer"
                },
                "left": {
                  "format": "int32",
                  "type": "integer"
                }
              },
              "id": "Padding",
              "type": "object"
            },
            "verticalAlignment": {
              "enum": [
                "VERTICAL_ALIGN_UNSPECIFIED",
                "TOP",
                "MIDDLE",
                "BOTTOM"
              ],
              "type": "string"
            },
            "borders": {
              "properties": {
                "bottom": {
                  "properties": {
                    "color": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "width": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "style": {
                      "enum": [
                        "STYLE_UNSPECIFIED",
                        "DOTTED",
                        "DASHED",
                        "SOLID",
                        "SOLID_MEDIUM",
                        "SOLID_THICK",
                        "NONE",
                        "DOUBLE"
                      ],
                      "type": "string"
                    }
                  },
                  "id": "Border",
                  "type": "object"
                },
                "top": {
                  "properties": {
                    "color": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "width": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "style": {
                      "enum": [
                        "STYLE_UNSPECIFIED",
                        "DOTTED",
                        "DASHED",
                        "SOLID",
                        "SOLID_MEDIUM",
                        "SOLID_THICK",
                        "NONE",
                        "DOUBLE"
                      ],
                      "type": "string"
                    }
                  },
                  "id": "Border",
                  "type": "object"
                },
                "left": {
                  "properties": {
                    "color": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "width": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "style": {
                      "enum": [
                        "STYLE_UNSPECIFIED",
                        "DOTTED",
                        "DASHED",
                        "SOLID",
                        "SOLID_MEDIUM",
                        "SOLID_THICK",
                        "NONE",
                        "DOUBLE"
                      ],
                      "type": "string"
                    }
                  },
                  "id": "Border",
                  "type": "object"
                },
                "right": {
                  "properties": {
                    "color": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "width": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "style": {
                      "enum": [
                        "STYLE_UNSPECIFIED",
                        "DOTTED",
                        "DASHED",
                        "SOLID",
                        "SOLID_MEDIUM",
                        "SOLID_THICK",
                        "NONE",
                        "DOUBLE"
                      ],
                      "type": "string"
                    }
                  },
                  "id": "Border",
                  "type": "object"
                }
              },
              "id": "Borders",
              "type": "object"
            },
            "textDirection": {
              "enum": [
                "TEXT_DIRECTION_UNSPECIFIED",
                "LEFT_TO_RIGHT",
                "RIGHT_TO_LEFT"
              ],
              "type": "string"
            },
            "textRotation": {
              "properties": {
                "angle": {
                  "format": "int32",
                  "type": "integer"
                },
                "vertical": {
                  "type": "boolean"
                }
              },
              "id": "TextRotation",
              "type": "object"
            },
            "wrapStrategy": {
              "enum": [
                "WRAP_STRATEGY_UNSPECIFIED",
                "OVERFLOW_CELL",
                "LEGACY_WRAP",
                "CLIP",
                "WRAP"
              ],
              "type": "string"
            },
            "numberFormat": {
              "properties": {
                "type": {
                  "enum": [
                    "NUMBER_FORMAT_TYPE_UNSPECIFIED",
                    "TEXT",
                    "NUMBER",
                    "PERCENT",
                    "CURRENCY",
                    "DATE",
                    "TIME",
                    "DATE_TIME",
                    "SCIENTIFIC"
                  ],
                  "type": "string"
                },
                "pattern": {
                  "type": "string"
                }
              },
              "id": "NumberFormat",
              "type": "object"
            }
          },
          "id": "CellFormat",
          "type": "object"
        },
        "timeZone": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "locale": {
          "type": "string"
        },
        "iterativeCalculationSettings": {
          "properties": {
            "convergenceThreshold": {
              "format": "double",
              "type": "number"
            },
            "maxIterations": {
              "format": "int32",
              "type": "integer"
            }
          },
          "id": "IterativeCalculationSettings",
          "type": "object"
        }
      },
      "id": "SpreadsheetProperties",
      "type": "object"
    },
    "namedRanges": {
      "type": "array",
      "items": {
        "properties": {
          "range": {
            "properties": {
              "startColumnIndex": {
                "format": "int32",
                "type": "integer"
              },
              "sheetId": {
                "format": "int32",
                "type": "integer"
              },
              "endRowIndex": {
                "type": "integer",
                "format": "int32"
              },
              "endColumnIndex": {
                "format": "int32",
                "type": "integer"
              },
              "startRowIndex": {
                "format": "int32",
                "type": "integer"
              }
            },
            "id": "GridRange",
            "type": "object"
          },
          "name": {
            "type": "string"
          },
          "namedRangeId": {
            "type": "string"
          }
        },
        "id": "NamedRange",
        "type": "object"
      }
    },
    "spreadsheetId": {
      "type": "string"
    },
    "developerMetadata": {
      "type": "array",
      "items": {
        "properties": {
          "metadataValue": {
            "type": "string"
          },
          "metadataKey": {
            "type": "string"
          },
          "metadataId": {
            "format": "int32",
            "type": "integer"
          },
          "location": {
            "properties": {
              "dimensionRange": {
                "properties": {
                  "sheetId": {
                    "format": "int32",
                    "type": "integer"
                  },
                  "dimension": {
                    "enum": [
                      "DIMENSION_UNSPECIFIED",
                      "ROWS",
                      "COLUMNS"
                    ],
                    "type": "string"
                  },
                  "startIndex": {
                    "format": "int32",
                    "type": "integer"
                  },
                  "endIndex": {
                    "format": "int32",
                    "type": "integer"
                  }
                },
                "id": "DimensionRange",
                "type": "object"
              },
              "spreadsheet": {
                "type": "boolean"
              },
              "sheetId": {
                "format": "int32",
                "type": "integer"
              },
              "locationType": {
                "enum": [
                  "DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED",
                  "ROW",
                  "COLUMN",
                  "SHEET",
                  "SPREADSHEET"
                ],
                "type": "string"
              }
            },
            "id": "DeveloperMetadataLocation",
            "type": "object"
          },
          "visibility": {
            "enum": [
              "DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED",
              "DOCUMENT",
              "PROJECT"
            ],
            "type": "string"
          }
        },
        "id": "DeveloperMetadata",
        "type": "object"
      }
    },
    "sheets": {
      "type": "array",
      "items": {
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "properties": {
                "columnMetadata": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "pixelSize": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "hiddenByFilter": {
                        "type": "boolean"
                      },
                      "hiddenByUser": {
                        "type": "boolean"
                      },
                      "developerMetadata": {
                        "type": "array",
                        "items": {
                          "properties": {
                            "metadataValue": {
                              "type": "string"
                            },
                            "metadataKey": {
                              "type": "string"
                            },
                            "metadataId": {
                              "format": "int32",
                              "type": "integer"
                            },
                            "location": {
                              "properties": {
                                "dimensionRange": {
                                  "properties": {
                                    "sheetId": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "dimension": {
                                      "enum": [
                                        "DIMENSION_UNSPECIFIED",
                                        "ROWS",
                                        "COLUMNS"
                                      ],
                                      "type": "string"
                                    },
                                    "startIndex": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "endIndex": {
                                      "format": "int32",
                                      "type": "integer"
                                    }
                                  },
                                  "id": "DimensionRange",
                                  "type": "object"
                                },
                                "spreadsheet": {
                                  "type": "boolean"
                                },
                                "sheetId": {
                                  "format": "int32",
                                  "type": "integer"
                                },
                                "locationType": {
                                  "enum": [
                                    "DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED",
                                    "ROW",
                                    "COLUMN",
                                    "SHEET",
                                    "SPREADSHEET"
                                  ],
                                  "type": "string"
                                }
                              },
                              "id": "DeveloperMetadataLocation",
                              "type": "object"
                            },
                            "visibility": {
                              "enum": [
                                "DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED",
                                "DOCUMENT",
                                "PROJECT"
                              ],
                              "type": "string"
                            }
                          },
                          "id": "DeveloperMetadata",
                          "type": "object"
                        }
                      }
                    },
                    "id": "DimensionProperties",
                    "type": "object"
                  }
                },
                "startColumn": {
                  "format": "int32",
                  "type": "integer"
                },
                "rowMetadata": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "pixelSize": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "hiddenByFilter": {
                        "type": "boolean"
                      },
                      "hiddenByUser": {
                        "type": "boolean"
                      },
                      "developerMetadata": {
                        "type": "array",
                        "items": {
                          "properties": {
                            "metadataValue": {
                              "type": "string"
                            },
                            "metadataKey": {
                              "type": "string"
                            },
                            "metadataId": {
                              "format": "int32",
                              "type": "integer"
                            },
                            "location": {
                              "properties": {
                                "dimensionRange": {
                                  "properties": {
                                    "sheetId": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "dimension": {
                                      "enum": [
                                        "DIMENSION_UNSPECIFIED",
                                        "ROWS",
                                        "COLUMNS"
                                      ],
                                      "type": "string"
                                    },
                                    "startIndex": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "endIndex": {
                                      "format": "int32",
                                      "type": "integer"
                                    }
                                  },
                                  "id": "DimensionRange",
                                  "type": "object"
                                },
                                "spreadsheet": {
                                  "type": "boolean"
                                },
                                "sheetId": {
                                  "format": "int32",
                                  "type": "integer"
                                },
                                "locationType": {
                                  "enum": [
                                    "DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED",
                                    "ROW",
                                    "COLUMN",
                                    "SHEET",
                                    "SPREADSHEET"
                                  ],
                                  "type": "string"
                                }
                              },
                              "id": "DeveloperMetadataLocation",
                              "type": "object"
                            },
                            "visibility": {
                              "enum": [
                                "DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED",
                                "DOCUMENT",
                                "PROJECT"
                              ],
                              "type": "string"
                            }
                          },
                          "id": "DeveloperMetadata",
                          "type": "object"
                        }
                      }
                    },
                    "id": "DimensionProperties",
                    "type": "object"
                  }
                },
                "rowData": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "values": {
                        "type": "array",
                        "items": {
                          "properties": {
                            "textFormatRuns": {
                              "type": "array",
                              "items": {
                                "properties": {
                                  "format": {
                                    "properties": {
                                      "underline": {
                                        "type": "boolean"
                                      },
                                      "foregroundColor": {
                                        "properties": {
                                          "red": {
                                            "format": "float",
                                            "type": "number"
                                          },
                                          "green": {
                                            "format": "float",
                                            "type": "number"
                                          },
                                          "blue": {
                                            "format": "float",
                                            "type": "number"
                                          },
                                          "alpha": {
                                            "format": "float",
                                            "type": "number"
                                          }
                                        },
                                        "id": "Color",
                                        "type": "object"
                                      },
                                      "bold": {
                                        "type": "boolean"
                                      },
                                      "fontFamily": {
                                        "type": "string"
                                      },
                                      "italic": {
                                        "type": "boolean"
                                      },
                                      "strikethrough": {
                                        "type": "boolean"
                                      },
                                      "fontSize": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "TextFormat",
                                    "type": "object"
                                  },
                                  "startIndex": {
                                    "format": "int32",
                                    "type": "integer"
                                  }
                                },
                                "id": "TextFormatRun",
                                "type": "object"
                              }
                            },
                            "formattedValue": {
                              "type": "string"
                            },
                            "hyperlink": {
                              "type": "string"
                            },
                            "pivotTable": {
                              "properties": {
                                "criteria": {
                                  "additionalProperties": {
                                    "properties": {
                                      "visibleValues": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        }
                                      }
                                    },
                                    "id": "PivotFilterCriteria",
                                    "type": "object"
                                  },
                                  "type": "object"
                                },
                                "rows": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "repeatHeadings": {
                                        "type": "boolean"
                                      },
                                      "sourceColumnOffset": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sortOrder": {
                                        "enum": [
                                          "SORT_ORDER_UNSPECIFIED",
                                          "ASCENDING",
                                          "DESCENDING"
                                        ],
                                        "type": "string"
                                      },
                                      "valueBucket": {
                                        "properties": {
                                          "valuesIndex": {
                                            "format": "int32",
                                            "type": "integer"
                                          },
                                          "buckets": {
                                            "type": "array",
                                            "items": {
                                              "properties": {
                                                "numberValue": {
                                                  "format": "double",
                                                  "type": "number"
                                                },
                                                "errorValue": {
                                                  "properties": {
                                                    "type": {
                                                      "enum": [
                                                        "ERROR_TYPE_UNSPECIFIED",
                                                        "ERROR",
                                                        "NULL_VALUE",
                                                        "DIVIDE_BY_ZERO",
                                                        "VALUE",
                                                        "REF",
                                                        "NAME",
                                                        "NUM",
                                                        "N_A",
                                                        "LOADING"
                                                      ],
                                                      "type": "string"
                                                    },
                                                    "message": {
                                                      "type": "string"
                                                    }
                                                  },
                                                  "id": "ErrorValue",
                                                  "type": "object"
                                                },
                                                "stringValue": {
                                                  "type": "string"
                                                },
                                                "boolValue": {
                                                  "type": "boolean"
                                                },
                                                "formulaValue": {
                                                  "type": "string"
                                                }
                                              },
                                              "id": "ExtendedValue",
                                              "type": "object"
                                            }
                                          }
                                        },
                                        "id": "PivotGroupSortValueBucket",
                                        "type": "object"
                                      },
                                      "showTotals": {
                                        "type": "boolean"
                                      },
                                      "valueMetadata": {
                                        "type": "array",
                                        "items": {
                                          "properties": {
                                            "value": {
                                              "properties": {
                                                "numberValue": {
                                                  "format": "double",
                                                  "type": "number"
                                                },
                                                "errorValue": {
                                                  "properties": {
                                                    "type": {
                                                      "enum": [
                                                        "ERROR_TYPE_UNSPECIFIED",
                                                        "ERROR",
                                                        "NULL_VALUE",
                                                        "DIVIDE_BY_ZERO",
                                                        "VALUE",
                                                        "REF",
                                                        "NAME",
                                                        "NUM",
                                                        "N_A",
                                                        "LOADING"
                                                      ],
                                                      "type": "string"
                                                    },
                                                    "message": {
                                                      "type": "string"
                                                    }
                                                  },
                                                  "id": "ErrorValue",
                                                  "type": "object"
                                                },
                                                "stringValue": {
                                                  "type": "string"
                                                },
                                                "boolValue": {
                                                  "type": "boolean"
                                                },
                                                "formulaValue": {
                                                  "type": "string"
                                                }
                                              },
                                              "id": "ExtendedValue",
                                              "type": "object"
                                            },
                                            "collapsed": {
                                              "type": "boolean"
                                            }
                                          },
                                          "id": "PivotGroupValueMetadata",
                                          "type": "object"
                                        }
                                      },
                                      "groupRule": {
                                        "properties": {
                                          "histogramRule": {
                                            "properties": {
                                              "end": {
                                                "format": "double",
                                                "type": "number"
                                              },
                                              "interval": {
                                                "format": "double",
                                                "type": "number"
                                              },
                                              "start": {
                                                "format": "double",
                                                "type": "number"
                                              }
                                            },
                                            "id": "HistogramRule",
                                            "type": "object"
                                          },
                                          "dateTimeRule": {
                                            "properties": {
                                              "type": {
                                                "type": "string",
                                                "enum": [
                                                  "DATE_TIME_RULE_TYPE_UNSPECIFIED",
                                                  "SECOND",
                                                  "MINUTE",
                                                  "HOUR",
                                                  "HOUR_MINUTE",
                                                  "HOUR_MINUTE_AMPM",
                                                  "DAY_OF_WEEK",
                                                  "DAY_OF_YEAR",
                                                  "DAY_OF_MONTH",
                                                  "DAY_MONTH",
                                                  "MONTH",
                                                  "QUARTER",
                                                  "YEAR",
                                                  "YEAR_MONTH",
                                                  "YEAR_QUARTER",
                                                  "YEAR_MONTH_DAY"
                                                ]
                                              }
                                            },
                                            "id": "DateTimeRule",
                                            "type": "object"
                                          },
                                          "manualRule": {
                                            "properties": {
                                              "groups": {
                                                "type": "array",
                                                "items": {
                                                  "properties": {
                                                    "groupName": {
                                                      "properties": {
                                                        "numberValue": {
                                                          "format": "double",
                                                          "type": "number"
                                                        },
                                                        "errorValue": {
                                                          "properties": {
                                                            "type": {
                                                              "enum": [
                                                                "ERROR_TYPE_UNSPECIFIED",
                                                                "ERROR",
                                                                "NULL_VALUE",
                                                                "DIVIDE_BY_ZERO",
                                                                "VALUE",
                                                                "REF",
                                                                "NAME",
                                                                "NUM",
                                                                "N_A",
                                                                "LOADING"
                                                              ],
                                                              "type": "string"
                                                            },
                                                            "message": {
                                                              "type": "string"
                                                            }
                                                          },
                                                          "id": "ErrorValue",
                                                          "type": "object"
                                                        },
                                                        "stringValue": {
                                                          "type": "string"
                                                        },
                                                        "boolValue": {
                                                          "type": "boolean"
                                                        },
                                                        "formulaValue": {
                                                          "type": "string"
                                                        }
                                                      },
                                                      "id": "ExtendedValue",
                                                      "type": "object"
                                                    },
                                                    "items": {
                                                      "type": "array",
                                                      "items": {
                                                        "properties": {
                                                          "numberValue": {
                                                            "format": "double",
                                                            "type": "number"
                                                          },
                                                          "errorValue": {
                                                            "properties": {
                                                              "type": {
                                                                "enum": [
                                                                  "ERROR_TYPE_UNSPECIFIED",
                                                                  "ERROR",
                                                                  "NULL_VALUE",
                                                                  "DIVIDE_BY_ZERO",
                                                                  "VALUE",
                                                                  "REF",
                                                                  "NAME",
                                                                  "NUM",
                                                                  "N_A",
                                                                  "LOADING"
                                                                ],
                                                                "type": "string"
                                                              },
                                                              "message": {
                                                                "type": "string"
                                                              }
                                                            },
                                                            "id": "ErrorValue",
                                                            "type": "object"
                                                          },
                                                          "stringValue": {
                                                            "type": "string"
                                                          },
                                                          "boolValue": {
                                                            "type": "boolean"
                                                          },
                                                          "formulaValue": {
                                                            "type": "string"
                                                          }
                                                        },
                                                        "id": "ExtendedValue",
                                                        "type": "object"
                                                      }
                                                    }
                                                  },
                                                  "id": "ManualRuleGroup",
                                                  "type": "object"
                                                }
                                              }
                                            },
                                            "id": "ManualRule",
                                            "type": "object"
                                          }
                                        },
                                        "id": "PivotGroupRule",
                                        "type": "object"
                                      },
                                      "label": {
                                        "type": "string"
                                      }
                                    },
                                    "id": "PivotGroup",
                                    "type": "object"
                                  }
                                },
                                "valueLayout": {
                                  "type": "string",
                                  "enum": [
                                    "HORIZONTAL",
                                    "VERTICAL"
                                  ]
                                },
                                "source": {
                                  "properties": {
                                    "startColumnIndex": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "sheetId": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "endRowIndex": {
                                      "type": "integer",
                                      "format": "int32"
                                    },
                                    "endColumnIndex": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "startRowIndex": {
                                      "format": "int32",
                                      "type": "integer"
                                    }
                                  },
                                  "id": "GridRange",
                                  "type": "object"
                                },
                                "columns": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "repeatHeadings": {
                                        "type": "boolean"
                                      },
                                      "sourceColumnOffset": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sortOrder": {
                                        "enum": [
                                          "SORT_ORDER_UNSPECIFIED",
                                          "ASCENDING",
                                          "DESCENDING"
                                        ],
                                        "type": "string"
                                      },
                                      "valueBucket": {
                                        "properties": {
                                          "valuesIndex": {
                                            "format": "int32",
                                            "type": "integer"
                                          },
                                          "buckets": {
                                            "type": "array",
                                            "items": {
                                              "properties": {
                                                "numberValue": {
                                                  "format": "double",
                                                  "type": "number"
                                                },
                                                "errorValue": {
                                                  "properties": {
                                                    "type": {
                                                      "enum": [
                                                        "ERROR_TYPE_UNSPECIFIED",
                                                        "ERROR",
                                                        "NULL_VALUE",
                                                        "DIVIDE_BY_ZERO",
                                                        "VALUE",
                                                        "REF",
                                                        "NAME",
                                                        "NUM",
                                                        "N_A",
                                                        "LOADING"
                                                      ],
                                                      "type": "string"
                                                    },
                                                    "message": {
                                                      "type": "string"
                                                    }
                                                  },
                                                  "id": "ErrorValue",
                                                  "type": "object"
                                                },
                                                "stringValue": {
                                                  "type": "string"
                                                },
                                                "boolValue": {
                                                  "type": "boolean"
                                                },
                                                "formulaValue": {
                                                  "type": "string"
                                                }
                                              },
                                              "id": "ExtendedValue",
                                              "type": "object"
                                            }
                                          }
                                        },
                                        "id": "PivotGroupSortValueBucket",
                                        "type": "object"
                                      },
                                      "showTotals": {
                                        "type": "boolean"
                                      },
                                      "valueMetadata": {
                                        "type": "array",
                                        "items": {
                                          "properties": {
                                            "value": {
                                              "properties": {
                                                "numberValue": {
                                                  "format": "double",
                                                  "type": "number"
                                                },
                                                "errorValue": {
                                                  "properties": {
                                                    "type": {
                                                      "enum": [
                                                        "ERROR_TYPE_UNSPECIFIED",
                                                        "ERROR",
                                                        "NULL_VALUE",
                                                        "DIVIDE_BY_ZERO",
                                                        "VALUE",
                                                        "REF",
                                                        "NAME",
                                                        "NUM",
                                                        "N_A",
                                                        "LOADING"
                                                      ],
                                                      "type": "string"
                                                    },
                                                    "message": {
                                                      "type": "string"
                                                    }
                                                  },
                                                  "id": "ErrorValue",
                                                  "type": "object"
                                                },
                                                "stringValue": {
                                                  "type": "string"
                                                },
                                                "boolValue": {
                                                  "type": "boolean"
                                                },
                                                "formulaValue": {
                                                  "type": "string"
                                                }
                                              },
                                              "id": "ExtendedValue",
                                              "type": "object"
                                            },
                                            "collapsed": {
                                              "type": "boolean"
                                            }
                                          },
                                          "id": "PivotGroupValueMetadata",
                                          "type": "object"
                                        }
                                      },
                                      "groupRule": {
                                        "properties": {
                                          "histogramRule": {
                                            "properties": {
                                              "end": {
                                                "format": "double",
                                                "type": "number"
                                              },
                                              "interval": {
                                                "format": "double",
                                                "type": "number"
                                              },
                                              "start": {
                                                "format": "double",
                                                "type": "number"
                                              }
                                            },
                                            "id": "HistogramRule",
                                            "type": "object"
                                          },
                                          "dateTimeRule": {
                                            "properties": {
                                              "type": {
                                                "type": "string",
                                                "enum": [
                                                  "DATE_TIME_RULE_TYPE_UNSPECIFIED",
                                                  "SECOND",
                                                  "MINUTE",
                                                  "HOUR",
                                                  "HOUR_MINUTE",
                                                  "HOUR_MINUTE_AMPM",
                                                  "DAY_OF_WEEK",
                                                  "DAY_OF_YEAR",
                                                  "DAY_OF_MONTH",
                                                  "DAY_MONTH",
                                                  "MONTH",
                                                  "QUARTER",
                                                  "YEAR",
                                                  "YEAR_MONTH",
                                                  "YEAR_QUARTER",
                                                  "YEAR_MONTH_DAY"
                                                ]
                                              }
                                            },
                                            "id": "DateTimeRule",
                                            "type": "object"
                                          },
                                          "manualRule": {
                                            "properties": {
                                              "groups": {
                                                "type": "array",
                                                "items": {
                                                  "properties": {
                                                    "groupName": {
                                                      "properties": {
                                                        "numberValue": {
                                                          "format": "double",
                                                          "type": "number"
                                                        },
                                                        "errorValue": {
                                                          "properties": {
                                                            "type": {
                                                              "enum": [
                                                                "ERROR_TYPE_UNSPECIFIED",
                                                                "ERROR",
                                                                "NULL_VALUE",
                                                                "DIVIDE_BY_ZERO",
                                                                "VALUE",
                                                                "REF",
                                                                "NAME",
                                                                "NUM",
                                                                "N_A",
                                                                "LOADING"
                                                              ],
                                                              "type": "string"
                                                            },
                                                            "message": {
                                                              "type": "string"
                                                            }
                                                          },
                                                          "id": "ErrorValue",
                                                          "type": "object"
                                                        },
                                                        "stringValue": {
                                                          "type": "string"
                                                        },
                                                        "boolValue": {
                                                          "type": "boolean"
                                                        },
                                                        "formulaValue": {
                                                          "type": "string"
                                                        }
                                                      },
                                                      "id": "ExtendedValue",
                                                      "type": "object"
                                                    },
                                                    "items": {
                                                      "type": "array",
                                                      "items": {
                                                        "properties": {
                                                          "numberValue": {
                                                            "format": "double",
                                                            "type": "number"
                                                          },
                                                          "errorValue": {
                                                            "properties": {
                                                              "type": {
                                                                "enum": [
                                                                  "ERROR_TYPE_UNSPECIFIED",
                                                                  "ERROR",
                                                                  "NULL_VALUE",
                                                                  "DIVIDE_BY_ZERO",
                                                                  "VALUE",
                                                                  "REF",
                                                                  "NAME",
                                                                  "NUM",
                                                                  "N_A",
                                                                  "LOADING"
                                                                ],
                                                                "type": "string"
                                                              },
                                                              "message": {
                                                                "type": "string"
                                                              }
                                                            },
                                                            "id": "ErrorValue",
                                                            "type": "object"
                                                          },
                                                          "stringValue": {
                                                            "type": "string"
                                                          },
                                                          "boolValue": {
                                                            "type": "boolean"
                                                          },
                                                          "formulaValue": {
                                                            "type": "string"
                                                          }
                                                        },
                                                        "id": "ExtendedValue",
                                                        "type": "object"
                                                      }
                                                    }
                                                  },
                                                  "id": "ManualRuleGroup",
                                                  "type": "object"
                                                }
                                              }
                                            },
                                            "id": "ManualRule",
                                            "type": "object"
                                          }
                                        },
                                        "id": "PivotGroupRule",
                                        "type": "object"
                                      },
                                      "label": {
                                        "type": "string"
                                      }
                                    },
                                    "id": "PivotGroup",
                                    "type": "object"
                                  }
                                },
                                "values": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "formula": {
                                        "type": "string"
                                      },
                                      "calculatedDisplayType": {
                                        "enum": [
                                          "PIVOT_VALUE_CALCULATED_DISPLAY_TYPE_UNSPECIFIED",
                                          "PERCENT_OF_ROW_TOTAL",
                                          "PERCENT_OF_COLUMN_TOTAL",
                                          "PERCENT_OF_GRAND_TOTAL"
                                        ],
                                        "type": "string"
                                      },
                                      "summarizeFunction": {
                                        "type": "string",
                                        "enum": [
                                          "PIVOT_STANDARD_VALUE_FUNCTION_UNSPECIFIED",
                                          "SUM",
                                          "COUNTA",
                                          "COUNT",
                                          "COUNTUNIQUE",
                                          "AVERAGE",
                                          "MAX",
                                          "MIN",
                                          "MEDIAN",
                                          "PRODUCT",
                                          "STDEV",
                                          "STDEVP",
                                          "VAR",
                                          "VARP",
                                          "CUSTOM"
                                        ]
                                      },
                                      "sourceColumnOffset": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "name": {
                                        "type": "string"
                                      }
                                    },
                                    "id": "PivotValue",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "PivotTable",
                              "type": "object"
                            },
                            "userEnteredFormat": {
                              "properties": {
                                "hyperlinkDisplayType": {
                                  "type": "string",
                                  "enum": [
                                    "HYPERLINK_DISPLAY_TYPE_UNSPECIFIED",
                                    "LINKED",
                                    "PLAIN_TEXT"
                                  ]
                                },
                                "horizontalAlignment": {
                                  "type": "string",
                                  "enum": [
                                    "HORIZONTAL_ALIGN_UNSPECIFIED",
                                    "LEFT",
                                    "CENTER",
                                    "RIGHT"
                                  ]
                                },
                                "textFormat": {
                                  "properties": {
                                    "underline": {
                                      "type": "boolean"
                                    },
                                    "foregroundColor": {
                                      "properties": {
                                        "red": {
                                          "format": "float",
                                          "type": "number"
                                        },
                                        "green": {
                                          "format": "float",
                                          "type": "number"
                                        },
                                        "blue": {
                                          "format": "float",
                                          "type": "number"
                                        },
                                        "alpha": {
                                          "format": "float",
                                          "type": "number"
                                        }
                                      },
                                      "id": "Color",
                                      "type": "object"
                                    },
                                    "bold": {
                                      "type": "boolean"
                                    },
                                    "fontFamily": {
                                      "type": "string"
                                    },
                                    "italic": {
                                      "type": "boolean"
                                    },
                                    "strikethrough": {
                                      "type": "boolean"
                                    },
                                    "fontSize": {
                                      "format": "int32",
                                      "type": "integer"
                                    }
                                  },
                                  "id": "TextFormat",
                                  "type": "object"
                                },
                                "backgroundColor": {
                                  "properties": {
                                    "red": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "green": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "blue": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "alpha": {
                                      "format": "float",
                                      "type": "number"
                                    }
                                  },
                                  "id": "Color",
                                  "type": "object"
                                },
                                "padding": {
                                  "properties": {
                                    "right": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "bottom": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "top": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "left": {
                                      "format": "int32",
                                      "type": "integer"
                                    }
                                  },
                                  "id": "Padding",
                                  "type": "object"
                                },
                                "verticalAlignment": {
                                  "enum": [
                                    "VERTICAL_ALIGN_UNSPECIFIED",
                                    "TOP",
                                    "MIDDLE",
                                    "BOTTOM"
                                  ],
                                  "type": "string"
                                },
                                "borders": {
                                  "properties": {
                                    "bottom": {
                                      "properties": {
                                        "color": {
                                          "properties": {
                                            "red": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "green": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "blue": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "alpha": {
                                              "format": "float",
                                              "type": "number"
                                            }
                                          },
                                          "id": "Color",
                                          "type": "object"
                                        },
                                        "width": {
                                          "format": "int32",
                                          "type": "integer"
                                        },
                                        "style": {
                                          "enum": [
                                            "STYLE_UNSPECIFIED",
                                            "DOTTED",
                                            "DASHED",
                                            "SOLID",
                                            "SOLID_MEDIUM",
                                            "SOLID_THICK",
                                            "NONE",
                                            "DOUBLE"
                                          ],
                                          "type": "string"
                                        }
                                      },
                                      "id": "Border",
                                      "type": "object"
                                    },
                                    "top": {
                                      "properties": {
                                        "color": {
                                          "properties": {
                                            "red": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "green": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "blue": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "alpha": {
                                              "format": "float",
                                              "type": "number"
                                            }
                                          },
                                          "id": "Color",
                                          "type": "object"
                                        },
                                        "width": {
                                          "format": "int32",
                                          "type": "integer"
                                        },
                                        "style": {
                                          "enum": [
                                            "STYLE_UNSPECIFIED",
                                            "DOTTED",
                                            "DASHED",
                                            "SOLID",
                                            "SOLID_MEDIUM",
                                            "SOLID_THICK",
                                            "NONE",
                                            "DOUBLE"
                                          ],
                                          "type": "string"
                                        }
                                      },
                                      "id": "Border",
                                      "type": "object"
                                    },
                                    "left": {
                                      "properties": {
                                        "color": {
                                          "properties": {
                                            "red": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "green": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "blue": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "alpha": {
                                              "format": "float",
                                              "type": "number"
                                            }
                                          },
                                          "id": "Color",
                                          "type": "object"
                                        },
                                        "width": {
                                          "format": "int32",
                                          "type": "integer"
                                        },
                                        "style": {
                                          "enum": [
                                            "STYLE_UNSPECIFIED",
                                            "DOTTED",
                                            "DASHED",
                                            "SOLID",
                                            "SOLID_MEDIUM",
                                            "SOLID_THICK",
                                            "NONE",
                                            "DOUBLE"
                                          ],
                                          "type": "string"
                                        }
                                      },
                                      "id": "Border",
                                      "type": "object"
                                    },
                                    "right": {
                                      "properties": {
                                        "color": {
                                          "properties": {
                                            "red": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "green": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "blue": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "alpha": {
                                              "format": "float",
                                              "type": "number"
                                            }
                                          },
                                          "id": "Color",
                                          "type": "object"
                                        },
                                        "width": {
                                          "format": "int32",
                                          "type": "integer"
                                        },
                                        "style": {
                                          "enum": [
                                            "STYLE_UNSPECIFIED",
                                            "DOTTED",
                                            "DASHED",
                                            "SOLID",
                                            "SOLID_MEDIUM",
                                            "SOLID_THICK",
                                            "NONE",
                                            "DOUBLE"
                                          ],
                                          "type": "string"
                                        }
                                      },
                                      "id": "Border",
                                      "type": "object"
                                    }
                                  },
                                  "id": "Borders",
                                  "type": "object"
                                },
                                "textDirection": {
                                  "enum": [
                                    "TEXT_DIRECTION_UNSPECIFIED",
                                    "LEFT_TO_RIGHT",
                                    "RIGHT_TO_LEFT"
                                  ],
                                  "type": "string"
                                },
                                "textRotation": {
                                  "properties": {
                                    "angle": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "vertical": {
                                      "type": "boolean"
                                    }
                                  },
                                  "id": "TextRotation",
                                  "type": "object"
                                },
                                "wrapStrategy": {
                                  "enum": [
                                    "WRAP_STRATEGY_UNSPECIFIED",
                                    "OVERFLOW_CELL",
                                    "LEGACY_WRAP",
                                    "CLIP",
                                    "WRAP"
                                  ],
                                  "type": "string"
                                },
                                "numberFormat": {
                                  "properties": {
                                    "type": {
                                      "enum": [
                                        "NUMBER_FORMAT_TYPE_UNSPECIFIED",
                                        "TEXT",
                                        "NUMBER",
                                        "PERCENT",
                                        "CURRENCY",
                                        "DATE",
                                        "TIME",
                                        "DATE_TIME",
                                        "SCIENTIFIC"
                                      ],
                                      "type": "string"
                                    },
                                    "pattern": {
                                      "type": "string"
                                    }
                                  },
                                  "id": "NumberFormat",
                                  "type": "object"
                                }
                              },
                              "id": "CellFormat",
                              "type": "object"
                            },
                            "effectiveFormat": {
                              "properties": {
                                "hyperlinkDisplayType": {
                                  "type": "string",
                                  "enum": [
                                    "HYPERLINK_DISPLAY_TYPE_UNSPECIFIED",
                                    "LINKED",
                                    "PLAIN_TEXT"
                                  ]
                                },
                                "horizontalAlignment": {
                                  "type": "string",
                                  "enum": [
                                    "HORIZONTAL_ALIGN_UNSPECIFIED",
                                    "LEFT",
                                    "CENTER",
                                    "RIGHT"
                                  ]
                                },
                                "textFormat": {
                                  "properties": {
                                    "underline": {
                                      "type": "boolean"
                                    },
                                    "foregroundColor": {
                                      "properties": {
                                        "red": {
                                          "format": "float",
                                          "type": "number"
                                        },
                                        "green": {
                                          "format": "float",
                                          "type": "number"
                                        },
                                        "blue": {
                                          "format": "float",
                                          "type": "number"
                                        },
                                        "alpha": {
                                          "format": "float",
                                          "type": "number"
                                        }
                                      },
                                      "id": "Color",
                                      "type": "object"
                                    },
                                    "bold": {
                                      "type": "boolean"
                                    },
                                    "fontFamily": {
                                      "type": "string"
                                    },
                                    "italic": {
                                      "type": "boolean"
                                    },
                                    "strikethrough": {
                                      "type": "boolean"
                                    },
                                    "fontSize": {
                                      "format": "int32",
                                      "type": "integer"
                                    }
                                  },
                                  "id": "TextFormat",
                                  "type": "object"
                                },
                                "backgroundColor": {
                                  "properties": {
                                    "red": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "green": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "blue": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "alpha": {
                                      "format": "float",
                                      "type": "number"
                                    }
                                  },
                                  "id": "Color",
                                  "type": "object"
                                },
                                "padding": {
                                  "properties": {
                                    "right": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "bottom": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "top": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "left": {
                                      "format": "int32",
                                      "type": "integer"
                                    }
                                  },
                                  "id": "Padding",
                                  "type": "object"
                                },
                                "verticalAlignment": {
                                  "enum": [
                                    "VERTICAL_ALIGN_UNSPECIFIED",
                                    "TOP",
                                    "MIDDLE",
                                    "BOTTOM"
                                  ],
                                  "type": "string"
                                },
                                "borders": {
                                  "properties": {
                                    "bottom": {
                                      "properties": {
                                        "color": {
                                          "properties": {
                                            "red": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "green": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "blue": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "alpha": {
                                              "format": "float",
                                              "type": "number"
                                            }
                                          },
                                          "id": "Color",
                                          "type": "object"
                                        },
                                        "width": {
                                          "format": "int32",
                                          "type": "integer"
                                        },
                                        "style": {
                                          "enum": [
                                            "STYLE_UNSPECIFIED",
                                            "DOTTED",
                                            "DASHED",
                                            "SOLID",
                                            "SOLID_MEDIUM",
                                            "SOLID_THICK",
                                            "NONE",
                                            "DOUBLE"
                                          ],
                                          "type": "string"
                                        }
                                      },
                                      "id": "Border",
                                      "type": "object"
                                    },
                                    "top": {
                                      "properties": {
                                        "color": {
                                          "properties": {
                                            "red": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "green": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "blue": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "alpha": {
                                              "format": "float",
                                              "type": "number"
                                            }
                                          },
                                          "id": "Color",
                                          "type": "object"
                                        },
                                        "width": {
                                          "format": "int32",
                                          "type": "integer"
                                        },
                                        "style": {
                                          "enum": [
                                            "STYLE_UNSPECIFIED",
                                            "DOTTED",
                                            "DASHED",
                                            "SOLID",
                                            "SOLID_MEDIUM",
                                            "SOLID_THICK",
                                            "NONE",
                                            "DOUBLE"
                                          ],
                                          "type": "string"
                                        }
                                      },
                                      "id": "Border",
                                      "type": "object"
                                    },
                                    "left": {
                                      "properties": {
                                        "color": {
                                          "properties": {
                                            "red": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "green": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "blue": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "alpha": {
                                              "format": "float",
                                              "type": "number"
                                            }
                                          },
                                          "id": "Color",
                                          "type": "object"
                                        },
                                        "width": {
                                          "format": "int32",
                                          "type": "integer"
                                        },
                                        "style": {
                                          "enum": [
                                            "STYLE_UNSPECIFIED",
                                            "DOTTED",
                                            "DASHED",
                                            "SOLID",
                                            "SOLID_MEDIUM",
                                            "SOLID_THICK",
                                            "NONE",
                                            "DOUBLE"
                                          ],
                                          "type": "string"
                                        }
                                      },
                                      "id": "Border",
                                      "type": "object"
                                    },
                                    "right": {
                                      "properties": {
                                        "color": {
                                          "properties": {
                                            "red": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "green": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "blue": {
                                              "format": "float",
                                              "type": "number"
                                            },
                                            "alpha": {
                                              "format": "float",
                                              "type": "number"
                                            }
                                          },
                                          "id": "Color",
                                          "type": "object"
                                        },
                                        "width": {
                                          "format": "int32",
                                          "type": "integer"
                                        },
                                        "style": {
                                          "enum": [
                                            "STYLE_UNSPECIFIED",
                                            "DOTTED",
                                            "DASHED",
                                            "SOLID",
                                            "SOLID_MEDIUM",
                                            "SOLID_THICK",
                                            "NONE",
                                            "DOUBLE"
                                          ],
                                          "type": "string"
                                        }
                                      },
                                      "id": "Border",
                                      "type": "object"
                                    }
                                  },
                                  "id": "Borders",
                                  "type": "object"
                                },
                                "textDirection": {
                                  "enum": [
                                    "TEXT_DIRECTION_UNSPECIFIED",
                                    "LEFT_TO_RIGHT",
                                    "RIGHT_TO_LEFT"
                                  ],
                                  "type": "string"
                                },
                                "textRotation": {
                                  "properties": {
                                    "angle": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "vertical": {
                                      "type": "boolean"
                                    }
                                  },
                                  "id": "TextRotation",
                                  "type": "object"
                                },
                                "wrapStrategy": {
                                  "enum": [
                                    "WRAP_STRATEGY_UNSPECIFIED",
                                    "OVERFLOW_CELL",
                                    "LEGACY_WRAP",
                                    "CLIP",
                                    "WRAP"
                                  ],
                                  "type": "string"
                                },
                                "numberFormat": {
                                  "properties": {
                                    "type": {
                                      "enum": [
                                        "NUMBER_FORMAT_TYPE_UNSPECIFIED",
                                        "TEXT",
                                        "NUMBER",
                                        "PERCENT",
                                        "CURRENCY",
                                        "DATE",
                                        "TIME",
                                        "DATE_TIME",
                                        "SCIENTIFIC"
                                      ],
                                      "type": "string"
                                    },
                                    "pattern": {
                                      "type": "string"
                                    }
                                  },
                                  "id": "NumberFormat",
                                  "type": "object"
                                }
                              },
                              "id": "CellFormat",
                              "type": "object"
                            },
                            "note": {
                              "type": "string"
                            },
                            "userEnteredValue": {
                              "properties": {
                                "numberValue": {
                                  "format": "double",
                                  "type": "number"
                                },
                                "errorValue": {
                                  "properties": {
                                    "type": {
                                      "enum": [
                                        "ERROR_TYPE_UNSPECIFIED",
                                        "ERROR",
                                        "NULL_VALUE",
                                        "DIVIDE_BY_ZERO",
                                        "VALUE",
                                        "REF",
                                        "NAME",
                                        "NUM",
                                        "N_A",
                                        "LOADING"
                                      ],
                                      "type": "string"
                                    },
                                    "message": {
                                      "type": "string"
                                    }
                                  },
                                  "id": "ErrorValue",
                                  "type": "object"
                                },
                                "stringValue": {
                                  "type": "string"
                                },
                                "boolValue": {
                                  "type": "boolean"
                                },
                                "formulaValue": {
                                  "type": "string"
                                }
                              },
                              "id": "ExtendedValue",
                              "type": "object"
                            },
                            "dataValidation": {
                              "properties": {
                                "showCustomUi": {
                                  "type": "boolean"
                                },
                                "strict": {
                                  "type": "boolean"
                                },
                                "inputMessage": {
                                  "type": "string"
                                },
                                "condition": {
                                  "properties": {
                                    "type": {
                                      "type": "string",
                                      "enum": [
                                        "CONDITION_TYPE_UNSPECIFIED",
                                        "NUMBER_GREATER",
                                        "NUMBER_GREATER_THAN_EQ",
                                        "NUMBER_LESS",
                                        "NUMBER_LESS_THAN_EQ",
                                        "NUMBER_EQ",
                                        "NUMBER_NOT_EQ",
                                        "NUMBER_BETWEEN",
                                        "NUMBER_NOT_BETWEEN",
                                        "TEXT_CONTAINS",
                                        "TEXT_NOT_CONTAINS",
                                        "TEXT_STARTS_WITH",
                                        "TEXT_ENDS_WITH",
                                        "TEXT_EQ",
                                        "TEXT_IS_EMAIL",
                                        "TEXT_IS_URL",
                                        "DATE_EQ",
                                        "DATE_BEFORE",
                                        "DATE_AFTER",
                                        "DATE_ON_OR_BEFORE",
                                        "DATE_ON_OR_AFTER",
                                        "DATE_BETWEEN",
                                        "DATE_NOT_BETWEEN",
                                        "DATE_IS_VALID",
                                        "ONE_OF_RANGE",
                                        "ONE_OF_LIST",
                                        "BLANK",
                                        "NOT_BLANK",
                                        "CUSTOM_FORMULA",
                                        "BOOLEAN"
                                      ]
                                    },
                                    "values": {
                                      "type": "array",
                                      "items": {
                                        "properties": {
                                          "relativeDate": {
                                            "enum": [
                                              "RELATIVE_DATE_UNSPECIFIED",
                                              "PAST_YEAR",
                                              "PAST_MONTH",
                                              "PAST_WEEK",
                                              "YESTERDAY",
                                              "TODAY",
                                              "TOMORROW"
                                            ],
                                            "type": "string"
                                          },
                                          "userEnteredValue": {
                                            "type": "string"
                                          }
                                        },
                                        "id": "ConditionValue",
                                        "type": "object"
                                      }
                                    }
                                  },
                                  "id": "BooleanCondition",
                                  "type": "object"
                                }
                              },
                              "id": "DataValidationRule",
                              "type": "object"
                            },
                            "effectiveValue": {
                              "properties": {
                                "numberValue": {
                                  "format": "double",
                                  "type": "number"
                                },
                                "errorValue": {
                                  "properties": {
                                    "type": {
                                      "enum": [
                                        "ERROR_TYPE_UNSPECIFIED",
                                        "ERROR",
                                        "NULL_VALUE",
                                        "DIVIDE_BY_ZERO",
                                        "VALUE",
                                        "REF",
                                        "NAME",
                                        "NUM",
                                        "N_A",
                                        "LOADING"
                                      ],
                                      "type": "string"
                                    },
                                    "message": {
                                      "type": "string"
                                    }
                                  },
                                  "id": "ErrorValue",
                                  "type": "object"
                                },
                                "stringValue": {
                                  "type": "string"
                                },
                                "boolValue": {
                                  "type": "boolean"
                                },
                                "formulaValue": {
                                  "type": "string"
                                }
                              },
                              "id": "ExtendedValue",
                              "type": "object"
                            }
                          },
                          "id": "CellData",
                          "type": "object"
                        }
                      }
                    },
                    "id": "RowData",
                    "type": "object"
                  }
                },
                "startRow": {
                  "format": "int32",
                  "type": "integer"
                }
              },
              "id": "GridData",
              "type": "object"
            }
          },
          "properties": {
            "properties": {
              "title": {
                "type": "string"
              },
              "tabColor": {
                "properties": {
                  "red": {
                    "format": "float",
                    "type": "number"
                  },
                  "green": {
                    "format": "float",
                    "type": "number"
                  },
                  "blue": {
                    "format": "float",
                    "type": "number"
                  },
                  "alpha": {
                    "format": "float",
                    "type": "number"
                  }
                },
                "id": "Color",
                "type": "object"
              },
              "index": {
                "format": "int32",
                "type": "integer"
              },
              "sheetId": {
                "format": "int32",
                "type": "integer"
              },
              "rightToLeft": {
                "type": "boolean"
              },
              "hidden": {
                "type": "boolean"
              },
              "gridProperties": {
                "properties": {
                  "hideGridlines": {
                    "type": "boolean"
                  },
                  "frozenRowCount": {
                    "format": "int32",
                    "type": "integer"
                  },
                  "frozenColumnCount": {
                    "format": "int32",
                    "type": "integer"
                  },
                  "columnCount": {
                    "format": "int32",
                    "type": "integer"
                  },
                  "columnGroupControlAfter": {
                    "type": "boolean"
                  },
                  "rowGroupControlAfter": {
                    "type": "boolean"
                  },
                  "rowCount": {
                    "format": "int32",
                    "type": "integer"
                  }
                },
                "id": "GridProperties",
                "type": "object"
              },
              "sheetType": {
                "enum": [
                  "SHEET_TYPE_UNSPECIFIED",
                  "GRID",
                  "OBJECT"
                ],
                "type": "string"
              }
            },
            "id": "SheetProperties",
            "type": "object"
          },
          "developerMetadata": {
            "type": "array",
            "items": {
              "properties": {
                "metadataValue": {
                  "type": "string"
                },
                "metadataKey": {
                  "type": "string"
                },
                "metadataId": {
                  "format": "int32",
                  "type": "integer"
                },
                "location": {
                  "properties": {
                    "dimensionRange": {
                      "properties": {
                        "sheetId": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "dimension": {
                          "enum": [
                            "DIMENSION_UNSPECIFIED",
                            "ROWS",
                            "COLUMNS"
                          ],
                          "type": "string"
                        },
                        "startIndex": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "endIndex": {
                          "format": "int32",
                          "type": "integer"
                        }
                      },
                      "id": "DimensionRange",
                      "type": "object"
                    },
                    "spreadsheet": {
                      "type": "boolean"
                    },
                    "sheetId": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "locationType": {
                      "enum": [
                        "DEVELOPER_METADATA_LOCATION_TYPE_UNSPECIFIED",
                        "ROW",
                        "COLUMN",
                        "SHEET",
                        "SPREADSHEET"
                      ],
                      "type": "string"
                    }
                  },
                  "id": "DeveloperMetadataLocation",
                  "type": "object"
                },
                "visibility": {
                  "enum": [
                    "DEVELOPER_METADATA_VISIBILITY_UNSPECIFIED",
                    "DOCUMENT",
                    "PROJECT"
                  ],
                  "type": "string"
                }
              },
              "id": "DeveloperMetadata",
              "type": "object"
            }
          },
          "protectedRanges": {
            "type": "array",
            "items": {
              "properties": {
                "requestingUserCanEdit": {
                  "type": "boolean"
                },
                "range": {
                  "properties": {
                    "startColumnIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "sheetId": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "endRowIndex": {
                      "type": "integer",
                      "format": "int32"
                    },
                    "endColumnIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "startRowIndex": {
                      "format": "int32",
                      "type": "integer"
                    }
                  },
                  "id": "GridRange",
                  "type": "object"
                },
                "editors": {
                  "properties": {
                    "users": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "groups": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "domainUsersCanEdit": {
                      "type": "boolean"
                    }
                  },
                  "id": "Editors",
                  "type": "object"
                },
                "unprotectedRanges": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "startColumnIndex": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "sheetId": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "endRowIndex": {
                        "type": "integer",
                        "format": "int32"
                      },
                      "endColumnIndex": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "startRowIndex": {
                        "format": "int32",
                        "type": "integer"
                      }
                    },
                    "id": "GridRange",
                    "type": "object"
                  }
                },
                "namedRangeId": {
                  "type": "string"
                },
                "protectedRangeId": {
                  "format": "int32",
                  "type": "integer"
                },
                "warningOnly": {
                  "type": "boolean"
                }
              },
              "id": "ProtectedRange",
              "type": "object"
            }
          },
          "conditionalFormats": {
            "type": "array",
            "items": {
              "properties": {
                "ranges": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "startColumnIndex": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "sheetId": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "endRowIndex": {
                        "type": "integer",
                        "format": "int32"
                      },
                      "endColumnIndex": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "startRowIndex": {
                        "format": "int32",
                        "type": "integer"
                      }
                    },
                    "id": "GridRange",
                    "type": "object"
                  }
                },
                "gradientRule": {
                  "properties": {
                    "minpoint": {
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "INTERPOLATION_POINT_TYPE_UNSPECIFIED",
                            "MIN",
                            "MAX",
                            "NUMBER",
                            "PERCENT",
                            "PERCENTILE"
                          ]
                        },
                        "value": {
                          "type": "string"
                        },
                        "color": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        }
                      },
                      "id": "InterpolationPoint",
                      "type": "object"
                    },
                    "maxpoint": {
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "INTERPOLATION_POINT_TYPE_UNSPECIFIED",
                            "MIN",
                            "MAX",
                            "NUMBER",
                            "PERCENT",
                            "PERCENTILE"
                          ]
                        },
                        "value": {
                          "type": "string"
                        },
                        "color": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        }
                      },
                      "id": "InterpolationPoint",
                      "type": "object"
                    },
                    "midpoint": {
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "INTERPOLATION_POINT_TYPE_UNSPECIFIED",
                            "MIN",
                            "MAX",
                            "NUMBER",
                            "PERCENT",
                            "PERCENTILE"
                          ]
                        },
                        "value": {
                          "type": "string"
                        },
                        "color": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        }
                      },
                      "id": "InterpolationPoint",
                      "type": "object"
                    }
                  },
                  "id": "GradientRule",
                  "type": "object"
                },
                "booleanRule": {
                  "properties": {
                    "format": {
                      "properties": {
                        "hyperlinkDisplayType": {
                          "type": "string",
                          "enum": [
                            "HYPERLINK_DISPLAY_TYPE_UNSPECIFIED",
                            "LINKED",
                            "PLAIN_TEXT"
                          ]
                        },
                        "horizontalAlignment": {
                          "type": "string",
                          "enum": [
                            "HORIZONTAL_ALIGN_UNSPECIFIED",
                            "LEFT",
                            "CENTER",
                            "RIGHT"
                          ]
                        },
                        "textFormat": {
                          "properties": {
                            "underline": {
                              "type": "boolean"
                            },
                            "foregroundColor": {
                              "properties": {
                                "red": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "green": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "blue": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "alpha": {
                                  "format": "float",
                                  "type": "number"
                                }
                              },
                              "id": "Color",
                              "type": "object"
                            },
                            "bold": {
                              "type": "boolean"
                            },
                            "fontFamily": {
                              "type": "string"
                            },
                            "italic": {
                              "type": "boolean"
                            },
                            "strikethrough": {
                              "type": "boolean"
                            },
                            "fontSize": {
                              "format": "int32",
                              "type": "integer"
                            }
                          },
                          "id": "TextFormat",
                          "type": "object"
                        },
                        "backgroundColor": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        },
                        "padding": {
                          "properties": {
                            "right": {
                              "format": "int32",
                              "type": "integer"
                            },
                            "bottom": {
                              "format": "int32",
                              "type": "integer"
                            },
                            "top": {
                              "format": "int32",
                              "type": "integer"
                            },
                            "left": {
                              "format": "int32",
                              "type": "integer"
                            }
                          },
                          "id": "Padding",
                          "type": "object"
                        },
                        "verticalAlignment": {
                          "enum": [
                            "VERTICAL_ALIGN_UNSPECIFIED",
                            "TOP",
                            "MIDDLE",
                            "BOTTOM"
                          ],
                          "type": "string"
                        },
                        "borders": {
                          "properties": {
                            "bottom": {
                              "properties": {
                                "color": {
                                  "properties": {
                                    "red": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "green": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "blue": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "alpha": {
                                      "format": "float",
                                      "type": "number"
                                    }
                                  },
                                  "id": "Color",
                                  "type": "object"
                                },
                                "width": {
                                  "format": "int32",
                                  "type": "integer"
                                },
                                "style": {
                                  "enum": [
                                    "STYLE_UNSPECIFIED",
                                    "DOTTED",
                                    "DASHED",
                                    "SOLID",
                                    "SOLID_MEDIUM",
                                    "SOLID_THICK",
                                    "NONE",
                                    "DOUBLE"
                                  ],
                                  "type": "string"
                                }
                              },
                              "id": "Border",
                              "type": "object"
                            },
                            "top": {
                              "properties": {
                                "color": {
                                  "properties": {
                                    "red": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "green": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "blue": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "alpha": {
                                      "format": "float",
                                      "type": "number"
                                    }
                                  },
                                  "id": "Color",
                                  "type": "object"
                                },
                                "width": {
                                  "format": "int32",
                                  "type": "integer"
                                },
                                "style": {
                                  "enum": [
                                    "STYLE_UNSPECIFIED",
                                    "DOTTED",
                                    "DASHED",
                                    "SOLID",
                                    "SOLID_MEDIUM",
                                    "SOLID_THICK",
                                    "NONE",
                                    "DOUBLE"
                                  ],
                                  "type": "string"
                                }
                              },
                              "id": "Border",
                              "type": "object"
                            },
                            "left": {
                              "properties": {
                                "color": {
                                  "properties": {
                                    "red": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "green": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "blue": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "alpha": {
                                      "format": "float",
                                      "type": "number"
                                    }
                                  },
                                  "id": "Color",
                                  "type": "object"
                                },
                                "width": {
                                  "format": "int32",
                                  "type": "integer"
                                },
                                "style": {
                                  "enum": [
                                    "STYLE_UNSPECIFIED",
                                    "DOTTED",
                                    "DASHED",
                                    "SOLID",
                                    "SOLID_MEDIUM",
                                    "SOLID_THICK",
                                    "NONE",
                                    "DOUBLE"
                                  ],
                                  "type": "string"
                                }
                              },
                              "id": "Border",
                              "type": "object"
                            },
                            "right": {
                              "properties": {
                                "color": {
                                  "properties": {
                                    "red": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "green": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "blue": {
                                      "format": "float",
                                      "type": "number"
                                    },
                                    "alpha": {
                                      "format": "float",
                                      "type": "number"
                                    }
                                  },
                                  "id": "Color",
                                  "type": "object"
                                },
                                "width": {
                                  "format": "int32",
                                  "type": "integer"
                                },
                                "style": {
                                  "enum": [
                                    "STYLE_UNSPECIFIED",
                                    "DOTTED",
                                    "DASHED",
                                    "SOLID",
                                    "SOLID_MEDIUM",
                                    "SOLID_THICK",
                                    "NONE",
                                    "DOUBLE"
                                  ],
                                  "type": "string"
                                }
                              },
                              "id": "Border",
                              "type": "object"
                            }
                          },
                          "id": "Borders",
                          "type": "object"
                        },
                        "textDirection": {
                          "enum": [
                            "TEXT_DIRECTION_UNSPECIFIED",
                            "LEFT_TO_RIGHT",
                            "RIGHT_TO_LEFT"
                          ],
                          "type": "string"
                        },
                        "textRotation": {
                          "properties": {
                            "angle": {
                              "format": "int32",
                              "type": "integer"
                            },
                            "vertical": {
                              "type": "boolean"
                            }
                          },
                          "id": "TextRotation",
                          "type": "object"
                        },
                        "wrapStrategy": {
                          "enum": [
                            "WRAP_STRATEGY_UNSPECIFIED",
                            "OVERFLOW_CELL",
                            "LEGACY_WRAP",
                            "CLIP",
                            "WRAP"
                          ],
                          "type": "string"
                        },
                        "numberFormat": {
                          "properties": {
                            "type": {
                              "enum": [
                                "NUMBER_FORMAT_TYPE_UNSPECIFIED",
                                "TEXT",
                                "NUMBER",
                                "PERCENT",
                                "CURRENCY",
                                "DATE",
                                "TIME",
                                "DATE_TIME",
                                "SCIENTIFIC"
                              ],
                              "type": "string"
                            },
                            "pattern": {
                              "type": "string"
                            }
                          },
                          "id": "NumberFormat",
                          "type": "object"
                        }
                      },
                      "id": "CellFormat",
                      "type": "object"
                    },
                    "condition": {
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "CONDITION_TYPE_UNSPECIFIED",
                            "NUMBER_GREATER",
                            "NUMBER_GREATER_THAN_EQ",
                            "NUMBER_LESS",
                            "NUMBER_LESS_THAN_EQ",
                            "NUMBER_EQ",
                            "NUMBER_NOT_EQ",
                            "NUMBER_BETWEEN",
                            "NUMBER_NOT_BETWEEN",
                            "TEXT_CONTAINS",
                            "TEXT_NOT_CONTAINS",
                            "TEXT_STARTS_WITH",
                            "TEXT_ENDS_WITH",
                            "TEXT_EQ",
                            "TEXT_IS_EMAIL",
                            "TEXT_IS_URL",
                            "DATE_EQ",
                            "DATE_BEFORE",
                            "DATE_AFTER",
                            "DATE_ON_OR_BEFORE",
                            "DATE_ON_OR_AFTER",
                            "DATE_BETWEEN",
                            "DATE_NOT_BETWEEN",
                            "DATE_IS_VALID",
                            "ONE_OF_RANGE",
                            "ONE_OF_LIST",
                            "BLANK",
                            "NOT_BLANK",
                            "CUSTOM_FORMULA",
                            "BOOLEAN"
                          ]
                        },
                        "values": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "relativeDate": {
                                "enum": [
                                  "RELATIVE_DATE_UNSPECIFIED",
                                  "PAST_YEAR",
                                  "PAST_MONTH",
                                  "PAST_WEEK",
                                  "YESTERDAY",
                                  "TODAY",
                                  "TOMORROW"
                                ],
                                "type": "string"
                              },
                              "userEnteredValue": {
                                "type": "string"
                              }
                            },
                            "id": "ConditionValue",
                            "type": "object"
                          }
                        }
                      },
                      "id": "BooleanCondition",
                      "type": "object"
                    }
                  },
                  "id": "BooleanRule",
                  "type": "object"
                }
              },
              "id": "ConditionalFormatRule",
              "type": "object"
            }
          },
          "columnGroups": {
            "type": "array",
            "items": {
              "properties": {
                "collapsed": {
                  "type": "boolean"
                },
                "range": {
                  "properties": {
                    "sheetId": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "dimension": {
                      "enum": [
                        "DIMENSION_UNSPECIFIED",
                        "ROWS",
                        "COLUMNS"
                      ],
                      "type": "string"
                    },
                    "startIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "endIndex": {
                      "format": "int32",
                      "type": "integer"
                    }
                  },
                  "id": "DimensionRange",
                  "type": "object"
                },
                "depth": {
                  "format": "int32",
                  "type": "integer"
                }
              },
              "id": "DimensionGroup",
              "type": "object"
            }
          },
          "basicFilter": {
            "properties": {
              "range": {
                "properties": {
                  "startColumnIndex": {
                    "format": "int32",
                    "type": "integer"
                  },
                  "sheetId": {
                    "format": "int32",
                    "type": "integer"
                  },
                  "endRowIndex": {
                    "type": "integer",
                    "format": "int32"
                  },
                  "endColumnIndex": {
                    "format": "int32",
                    "type": "integer"
                  },
                  "startRowIndex": {
                    "format": "int32",
                    "type": "integer"
                  }
                },
                "id": "GridRange",
                "type": "object"
              },
              "criteria": {
                "additionalProperties": {
                  "properties": {
                    "hiddenValues": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "condition": {
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "CONDITION_TYPE_UNSPECIFIED",
                            "NUMBER_GREATER",
                            "NUMBER_GREATER_THAN_EQ",
                            "NUMBER_LESS",
                            "NUMBER_LESS_THAN_EQ",
                            "NUMBER_EQ",
                            "NUMBER_NOT_EQ",
                            "NUMBER_BETWEEN",
                            "NUMBER_NOT_BETWEEN",
                            "TEXT_CONTAINS",
                            "TEXT_NOT_CONTAINS",
                            "TEXT_STARTS_WITH",
                            "TEXT_ENDS_WITH",
                            "TEXT_EQ",
                            "TEXT_IS_EMAIL",
                            "TEXT_IS_URL",
                            "DATE_EQ",
                            "DATE_BEFORE",
                            "DATE_AFTER",
                            "DATE_ON_OR_BEFORE",
                            "DATE_ON_OR_AFTER",
                            "DATE_BETWEEN",
                            "DATE_NOT_BETWEEN",
                            "DATE_IS_VALID",
                            "ONE_OF_RANGE",
                            "ONE_OF_LIST",
                            "BLANK",
                            "NOT_BLANK",
                            "CUSTOM_FORMULA",
                            "BOOLEAN"
                          ]
                        },
                        "values": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "relativeDate": {
                                "enum": [
                                  "RELATIVE_DATE_UNSPECIFIED",
                                  "PAST_YEAR",
                                  "PAST_MONTH",
                                  "PAST_WEEK",
                                  "YESTERDAY",
                                  "TODAY",
                                  "TOMORROW"
                                ],
                                "type": "string"
                              },
                              "userEnteredValue": {
                                "type": "string"
                              }
                            },
                            "id": "ConditionValue",
                            "type": "object"
                          }
                        }
                      },
                      "id": "BooleanCondition",
                      "type": "object"
                    }
                  },
                  "id": "FilterCriteria",
                  "type": "object"
                },
                "type": "object"
              },
              "sortSpecs": {
                "type": "array",
                "items": {
                  "properties": {
                    "dimensionIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "sortOrder": {
                      "enum": [
                        "SORT_ORDER_UNSPECIFIED",
                        "ASCENDING",
                        "DESCENDING"
                      ],
                      "type": "string"
                    }
                  },
                  "id": "SortSpec",
                  "type": "object"
                }
              }
            },
            "id": "BasicFilter",
            "type": "object"
          },
          "merges": {
            "type": "array",
            "items": {
              "properties": {
                "startColumnIndex": {
                  "format": "int32",
                  "type": "integer"
                },
                "sheetId": {
                  "format": "int32",
                  "type": "integer"
                },
                "endRowIndex": {
                  "type": "integer",
                  "format": "int32"
                },
                "endColumnIndex": {
                  "format": "int32",
                  "type": "integer"
                },
                "startRowIndex": {
                  "format": "int32",
                  "type": "integer"
                }
              },
              "id": "GridRange",
              "type": "object"
            }
          },
          "bandedRanges": {
            "type": "array",
            "items": {
              "properties": {
                "range": {
                  "properties": {
                    "startColumnIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "sheetId": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "endRowIndex": {
                      "type": "integer",
                      "format": "int32"
                    },
                    "endColumnIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "startRowIndex": {
                      "format": "int32",
                      "type": "integer"
                    }
                  },
                  "id": "GridRange",
                  "type": "object"
                },
                "bandedRangeId": {
                  "format": "int32",
                  "type": "integer"
                },
                "rowProperties": {
                  "properties": {
                    "firstBandColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "secondBandColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "footerColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "headerColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    }
                  },
                  "id": "BandingProperties",
                  "type": "object"
                },
                "columnProperties": {
                  "properties": {
                    "firstBandColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "secondBandColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "footerColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    },
                    "headerColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    }
                  },
                  "id": "BandingProperties",
                  "type": "object"
                }
              },
              "id": "BandedRange",
              "type": "object"
            }
          },
          "charts": {
            "type": "array",
            "items": {
              "properties": {
                "chartId": {
                  "format": "int32",
                  "type": "integer"
                },
                "position": {
                  "properties": {
                    "newSheet": {
                      "type": "boolean"
                    },
                    "sheetId": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "overlayPosition": {
                      "properties": {
                        "offsetXPixels": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "anchorCell": {
                          "properties": {
                            "rowIndex": {
                              "format": "int32",
                              "type": "integer"
                            },
                            "columnIndex": {
                              "format": "int32",
                              "type": "integer"
                            },
                            "sheetId": {
                              "format": "int32",
                              "type": "integer"
                            }
                          },
                          "id": "GridCoordinate",
                          "type": "object"
                        },
                        "offsetYPixels": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "heightPixels": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "widthPixels": {
                          "format": "int32",
                          "type": "integer"
                        }
                      },
                      "id": "OverlayPosition",
                      "type": "object"
                    }
                  },
                  "id": "EmbeddedObjectPosition",
                  "type": "object"
                },
                "spec": {
                  "properties": {
                    "basicChart": {
                      "properties": {
                        "series": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "color": {
                                "properties": {
                                  "red": {
                                    "format": "float",
                                    "type": "number"
                                  },
                                  "green": {
                                    "format": "float",
                                    "type": "number"
                                  },
                                  "blue": {
                                    "format": "float",
                                    "type": "number"
                                  },
                                  "alpha": {
                                    "format": "float",
                                    "type": "number"
                                  }
                                },
                                "id": "Color",
                                "type": "object"
                              },
                              "lineStyle": {
                                "properties": {
                                  "type": {
                                    "type": "string",
                                    "enum": [
                                      "LINE_DASH_TYPE_UNSPECIFIED",
                                      "INVISIBLE",
                                      "CUSTOM",
                                      "SOLID",
                                      "DOTTED",
                                      "MEDIUM_DASHED",
                                      "MEDIUM_DASHED_DOTTED",
                                      "LONG_DASHED",
                                      "LONG_DASHED_DOTTED"
                                    ]
                                  },
                                  "width": {
                                    "format": "int32",
                                    "type": "integer"
                                  }
                                },
                                "id": "LineStyle",
                                "type": "object"
                              },
                              "series": {
                                "properties": {
                                  "sourceRange": {
                                    "properties": {
                                      "sources": {
                                        "type": "array",
                                        "items": {
                                          "properties": {
                                            "startColumnIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "sheetId": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "endRowIndex": {
                                              "type": "integer",
                                              "format": "int32"
                                            },
                                            "endColumnIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "startRowIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            }
                                          },
                                          "id": "GridRange",
                                          "type": "object"
                                        }
                                      }
                                    },
                                    "id": "ChartSourceRange",
                                    "type": "object"
                                  }
                                },
                                "id": "ChartData",
                                "type": "object"
                              },
                              "type": {
                                "enum": [
                                  "BASIC_CHART_TYPE_UNSPECIFIED",
                                  "BAR",
                                  "LINE",
                                  "AREA",
                                  "COLUMN",
                                  "SCATTER",
                                  "COMBO",
                                  "STEPPED_AREA"
                                ],
                                "type": "string"
                              },
                              "targetAxis": {
                                "enum": [
                                  "BASIC_CHART_AXIS_POSITION_UNSPECIFIED",
                                  "BOTTOM_AXIS",
                                  "LEFT_AXIS",
                                  "RIGHT_AXIS"
                                ],
                                "type": "string"
                              }
                            },
                            "id": "BasicChartSeries",
                            "type": "object"
                          }
                        },
                        "legendPosition": {
                          "enum": [
                            "BASIC_CHART_LEGEND_POSITION_UNSPECIFIED",
                            "BOTTOM_LEGEND",
                            "LEFT_LEGEND",
                            "RIGHT_LEGEND",
                            "TOP_LEGEND",
                            "NO_LEGEND"
                          ],
                          "type": "string"
                        },
                        "compareMode": {
                          "enum": [
                            "BASIC_CHART_COMPARE_MODE_UNSPECIFIED",
                            "DATUM",
                            "CATEGORY"
                          ],
                          "type": "string"
                        },
                        "domains": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "domain": {
                                "properties": {
                                  "sourceRange": {
                                    "properties": {
                                      "sources": {
                                        "type": "array",
                                        "items": {
                                          "properties": {
                                            "startColumnIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "sheetId": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "endRowIndex": {
                                              "type": "integer",
                                              "format": "int32"
                                            },
                                            "endColumnIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "startRowIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            }
                                          },
                                          "id": "GridRange",
                                          "type": "object"
                                        }
                                      }
                                    },
                                    "id": "ChartSourceRange",
                                    "type": "object"
                                  }
                                },
                                "id": "ChartData",
                                "type": "object"
                              },
                              "reversed": {
                                "type": "boolean"
                              }
                            },
                            "id": "BasicChartDomain",
                            "type": "object"
                          }
                        },
                        "lineSmoothing": {
                          "type": "boolean"
                        },
                        "headerCount": {
                          "type": "integer",
                          "format": "int32"
                        },
                        "stackedType": {
                          "type": "string",
                          "enum": [
                            "BASIC_CHART_STACKED_TYPE_UNSPECIFIED",
                            "NOT_STACKED",
                            "STACKED",
                            "PERCENT_STACKED"
                          ]
                        },
                        "threeDimensional": {
                          "type": "boolean"
                        },
                        "axis": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "position": {
                                "enum": [
                                  "BASIC_CHART_AXIS_POSITION_UNSPECIFIED",
                                  "BOTTOM_AXIS",
                                  "LEFT_AXIS",
                                  "RIGHT_AXIS"
                                ],
                                "type": "string"
                              },
                              "title": {
                                "type": "string"
                              },
                              "titleTextPosition": {
                                "properties": {
                                  "horizontalAlignment": {
                                    "enum": [
                                      "HORIZONTAL_ALIGN_UNSPECIFIED",
                                      "LEFT",
                                      "CENTER",
                                      "RIGHT"
                                    ],
                                    "type": "string"
                                  }
                                },
                                "id": "TextPosition",
                                "type": "object"
                              },
                              "format": {
                                "properties": {
                                  "underline": {
                                    "type": "boolean"
                                  },
                                  "foregroundColor": {
                                    "properties": {
                                      "red": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "green": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "blue": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "alpha": {
                                        "format": "float",
                                        "type": "number"
                                      }
                                    },
                                    "id": "Color",
                                    "type": "object"
                                  },
                                  "bold": {
                                    "type": "boolean"
                                  },
                                  "fontFamily": {
                                    "type": "string"
                                  },
                                  "italic": {
                                    "type": "boolean"
                                  },
                                  "strikethrough": {
                                    "type": "boolean"
                                  },
                                  "fontSize": {
                                    "format": "int32",
                                    "type": "integer"
                                  }
                                },
                                "id": "TextFormat",
                                "type": "object"
                              }
                            },
                            "id": "BasicChartAxis",
                            "type": "object"
                          }
                        },
                        "chartType": {
                          "enum": [
                            "BASIC_CHART_TYPE_UNSPECIFIED",
                            "BAR",
                            "LINE",
                            "AREA",
                            "COLUMN",
                            "SCATTER",
                            "COMBO",
                            "STEPPED_AREA"
                          ],
                          "type": "string"
                        },
                        "interpolateNulls": {
                          "type": "boolean"
                        }
                      },
                      "id": "BasicChartSpec",
                      "type": "object"
                    },
                    "orgChart": {
                      "properties": {
                        "selectedNodeColor": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        },
                        "parentLabels": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "labels": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "nodeSize": {
                          "type": "string",
                          "enum": [
                            "ORG_CHART_LABEL_SIZE_UNSPECIFIED",
                            "SMALL",
                            "MEDIUM",
                            "LARGE"
                          ]
                        },
                        "nodeColor": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        },
                        "tooltips": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        }
                      },
                      "id": "OrgChartSpec",
                      "type": "object"
                    },
                    "pieChart": {
                      "properties": {
                        "series": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "legendPosition": {
                          "enum": [
                            "PIE_CHART_LEGEND_POSITION_UNSPECIFIED",
                            "BOTTOM_LEGEND",
                            "LEFT_LEGEND",
                            "RIGHT_LEGEND",
                            "TOP_LEGEND",
                            "NO_LEGEND",
                            "LABELED_LEGEND"
                          ],
                          "type": "string"
                        },
                        "pieHole": {
                          "format": "double",
                          "type": "number"
                        },
                        "domain": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "threeDimensional": {
                          "type": "boolean"
                        }
                      },
                      "id": "PieChartSpec",
                      "type": "object"
                    },
                    "titleTextFormat": {
                      "properties": {
                        "underline": {
                          "type": "boolean"
                        },
                        "foregroundColor": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        },
                        "bold": {
                          "type": "boolean"
                        },
                        "fontFamily": {
                          "type": "string"
                        },
                        "italic": {
                          "type": "boolean"
                        },
                        "strikethrough": {
                          "type": "boolean"
                        },
                        "fontSize": {
                          "format": "int32",
                          "type": "integer"
                        }
                      },
                      "id": "TextFormat",
                      "type": "object"
                    },
                    "title": {
                      "type": "string"
                    },
                    "altText": {
                      "type": "string"
                    },
                    "titleTextPosition": {
                      "properties": {
                        "horizontalAlignment": {
                          "enum": [
                            "HORIZONTAL_ALIGN_UNSPECIFIED",
                            "LEFT",
                            "CENTER",
                            "RIGHT"
                          ],
                          "type": "string"
                        }
                      },
                      "id": "TextPosition",
                      "type": "object"
                    },
                    "histogramChart": {
                      "properties": {
                        "outlierPercentile": {
                          "format": "double",
                          "type": "number"
                        },
                        "showItemDividers": {
                          "type": "boolean"
                        },
                        "series": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "barColor": {
                                "properties": {
                                  "red": {
                                    "format": "float",
                                    "type": "number"
                                  },
                                  "green": {
                                    "format": "float",
                                    "type": "number"
                                  },
                                  "blue": {
                                    "format": "float",
                                    "type": "number"
                                  },
                                  "alpha": {
                                    "format": "float",
                                    "type": "number"
                                  }
                                },
                                "id": "Color",
                                "type": "object"
                              },
                              "data": {
                                "properties": {
                                  "sourceRange": {
                                    "properties": {
                                      "sources": {
                                        "type": "array",
                                        "items": {
                                          "properties": {
                                            "startColumnIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "sheetId": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "endRowIndex": {
                                              "type": "integer",
                                              "format": "int32"
                                            },
                                            "endColumnIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "startRowIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            }
                                          },
                                          "id": "GridRange",
                                          "type": "object"
                                        }
                                      }
                                    },
                                    "id": "ChartSourceRange",
                                    "type": "object"
                                  }
                                },
                                "id": "ChartData",
                                "type": "object"
                              }
                            },
                            "id": "HistogramSeries",
                            "type": "object"
                          }
                        },
                        "legendPosition": {
                          "enum": [
                            "HISTOGRAM_CHART_LEGEND_POSITION_UNSPECIFIED",
                            "BOTTOM_LEGEND",
                            "LEFT_LEGEND",
                            "RIGHT_LEGEND",
                            "TOP_LEGEND",
                            "NO_LEGEND",
                            "INSIDE_LEGEND"
                          ],
                          "type": "string"
                        },
                        "bucketSize": {
                          "format": "double",
                          "type": "number"
                        }
                      },
                      "id": "HistogramChartSpec",
                      "type": "object"
                    },
                    "candlestickChart": {
                      "properties": {
                        "domain": {
                          "properties": {
                            "reversed": {
                              "type": "boolean"
                            },
                            "data": {
                              "properties": {
                                "sourceRange": {
                                  "properties": {
                                    "sources": {
                                      "type": "array",
                                      "items": {
                                        "properties": {
                                          "startColumnIndex": {
                                            "format": "int32",
                                            "type": "integer"
                                          },
                                          "sheetId": {
                                            "format": "int32",
                                            "type": "integer"
                                          },
                                          "endRowIndex": {
                                            "type": "integer",
                                            "format": "int32"
                                          },
                                          "endColumnIndex": {
                                            "format": "int32",
                                            "type": "integer"
                                          },
                                          "startRowIndex": {
                                            "format": "int32",
                                            "type": "integer"
                                          }
                                        },
                                        "id": "GridRange",
                                        "type": "object"
                                      }
                                    }
                                  },
                                  "id": "ChartSourceRange",
                                  "type": "object"
                                }
                              },
                              "id": "ChartData",
                              "type": "object"
                            }
                          },
                          "id": "CandlestickDomain",
                          "type": "object"
                        },
                        "data": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "lowSeries": {
                                "properties": {
                                  "data": {
                                    "properties": {
                                      "sourceRange": {
                                        "properties": {
                                          "sources": {
                                            "type": "array",
                                            "items": {
                                              "properties": {
                                                "startColumnIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "sheetId": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "endRowIndex": {
                                                  "type": "integer",
                                                  "format": "int32"
                                                },
                                                "endColumnIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "startRowIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                }
                                              },
                                              "id": "GridRange",
                                              "type": "object"
                                            }
                                          }
                                        },
                                        "id": "ChartSourceRange",
                                        "type": "object"
                                      }
                                    },
                                    "id": "ChartData",
                                    "type": "object"
                                  }
                                },
                                "id": "CandlestickSeries",
                                "type": "object"
                              },
                              "closeSeries": {
                                "properties": {
                                  "data": {
                                    "properties": {
                                      "sourceRange": {
                                        "properties": {
                                          "sources": {
                                            "type": "array",
                                            "items": {
                                              "properties": {
                                                "startColumnIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "sheetId": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "endRowIndex": {
                                                  "type": "integer",
                                                  "format": "int32"
                                                },
                                                "endColumnIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "startRowIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                }
                                              },
                                              "id": "GridRange",
                                              "type": "object"
                                            }
                                          }
                                        },
                                        "id": "ChartSourceRange",
                                        "type": "object"
                                      }
                                    },
                                    "id": "ChartData",
                                    "type": "object"
                                  }
                                },
                                "id": "CandlestickSeries",
                                "type": "object"
                              },
                              "openSeries": {
                                "properties": {
                                  "data": {
                                    "properties": {
                                      "sourceRange": {
                                        "properties": {
                                          "sources": {
                                            "type": "array",
                                            "items": {
                                              "properties": {
                                                "startColumnIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "sheetId": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "endRowIndex": {
                                                  "type": "integer",
                                                  "format": "int32"
                                                },
                                                "endColumnIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "startRowIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                }
                                              },
                                              "id": "GridRange",
                                              "type": "object"
                                            }
                                          }
                                        },
                                        "id": "ChartSourceRange",
                                        "type": "object"
                                      }
                                    },
                                    "id": "ChartData",
                                    "type": "object"
                                  }
                                },
                                "id": "CandlestickSeries",
                                "type": "object"
                              },
                              "highSeries": {
                                "properties": {
                                  "data": {
                                    "properties": {
                                      "sourceRange": {
                                        "properties": {
                                          "sources": {
                                            "type": "array",
                                            "items": {
                                              "properties": {
                                                "startColumnIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "sheetId": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "endRowIndex": {
                                                  "type": "integer",
                                                  "format": "int32"
                                                },
                                                "endColumnIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                },
                                                "startRowIndex": {
                                                  "format": "int32",
                                                  "type": "integer"
                                                }
                                              },
                                              "id": "GridRange",
                                              "type": "object"
                                            }
                                          }
                                        },
                                        "id": "ChartSourceRange",
                                        "type": "object"
                                      }
                                    },
                                    "id": "ChartData",
                                    "type": "object"
                                  }
                                },
                                "id": "CandlestickSeries",
                                "type": "object"
                              }
                            },
                            "id": "CandlestickData",
                            "type": "object"
                          }
                        }
                      },
                      "id": "CandlestickChartSpec",
                      "type": "object"
                    },
                    "bubbleChart": {
                      "properties": {
                        "groupIds": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "bubbleLabels": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "bubbleMinRadiusSize": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "bubbleMaxRadiusSize": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "series": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "legendPosition": {
                          "type": "string",
                          "enum": [
                            "BUBBLE_CHART_LEGEND_POSITION_UNSPECIFIED",
                            "BOTTOM_LEGEND",
                            "LEFT_LEGEND",
                            "RIGHT_LEGEND",
                            "TOP_LEGEND",
                            "NO_LEGEND",
                            "INSIDE_LEGEND"
                          ]
                        },
                        "bubbleOpacity": {
                          "type": "number",
                          "format": "float"
                        },
                        "bubbleSizes": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "domain": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "bubbleBorderColor": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        },
                        "bubbleTextStyle": {
                          "properties": {
                            "underline": {
                              "type": "boolean"
                            },
                            "foregroundColor": {
                              "properties": {
                                "red": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "green": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "blue": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "alpha": {
                                  "format": "float",
                                  "type": "number"
                                }
                              },
                              "id": "Color",
                              "type": "object"
                            },
                            "bold": {
                              "type": "boolean"
                            },
                            "fontFamily": {
                              "type": "string"
                            },
                            "italic": {
                              "type": "boolean"
                            },
                            "strikethrough": {
                              "type": "boolean"
                            },
                            "fontSize": {
                              "format": "int32",
                              "type": "integer"
                            }
                          },
                          "id": "TextFormat",
                          "type": "object"
                        }
                      },
                      "id": "BubbleChartSpec",
                      "type": "object"
                    },
                    "waterfallChart": {
                      "properties": {
                        "connectorLineStyle": {
                          "properties": {
                            "type": {
                              "type": "string",
                              "enum": [
                                "LINE_DASH_TYPE_UNSPECIFIED",
                                "INVISIBLE",
                                "CUSTOM",
                                "SOLID",
                                "DOTTED",
                                "MEDIUM_DASHED",
                                "MEDIUM_DASHED_DOTTED",
                                "LONG_DASHED",
                                "LONG_DASHED_DOTTED"
                              ]
                            },
                            "width": {
                              "format": "int32",
                              "type": "integer"
                            }
                          },
                          "id": "LineStyle",
                          "type": "object"
                        },
                        "domain": {
                          "properties": {
                            "data": {
                              "properties": {
                                "sourceRange": {
                                  "properties": {
                                    "sources": {
                                      "type": "array",
                                      "items": {
                                        "properties": {
                                          "startColumnIndex": {
                                            "format": "int32",
                                            "type": "integer"
                                          },
                                          "sheetId": {
                                            "format": "int32",
                                            "type": "integer"
                                          },
                                          "endRowIndex": {
                                            "type": "integer",
                                            "format": "int32"
                                          },
                                          "endColumnIndex": {
                                            "format": "int32",
                                            "type": "integer"
                                          },
                                          "startRowIndex": {
                                            "format": "int32",
                                            "type": "integer"
                                          }
                                        },
                                        "id": "GridRange",
                                        "type": "object"
                                      }
                                    }
                                  },
                                  "id": "ChartSourceRange",
                                  "type": "object"
                                }
                              },
                              "id": "ChartData",
                              "type": "object"
                            },
                            "reversed": {
                              "type": "boolean"
                            }
                          },
                          "id": "WaterfallChartDomain",
                          "type": "object"
                        },
                        "firstValueIsTotal": {
                          "type": "boolean"
                        },
                        "hideConnectorLines": {
                          "type": "boolean"
                        },
                        "stackedType": {
                          "type": "string",
                          "enum": [
                            "WATERFALL_STACKED_TYPE_UNSPECIFIED",
                            "STACKED",
                            "SEQUENTIAL"
                          ]
                        },
                        "series": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "positiveColumnsStyle": {
                                "properties": {
                                  "label": {
                                    "type": "string"
                                  },
                                  "color": {
                                    "properties": {
                                      "red": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "green": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "blue": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "alpha": {
                                        "format": "float",
                                        "type": "number"
                                      }
                                    },
                                    "id": "Color",
                                    "type": "object"
                                  }
                                },
                                "id": "WaterfallChartColumnStyle",
                                "type": "object"
                              },
                              "data": {
                                "properties": {
                                  "sourceRange": {
                                    "properties": {
                                      "sources": {
                                        "type": "array",
                                        "items": {
                                          "properties": {
                                            "startColumnIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "sheetId": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "endRowIndex": {
                                              "type": "integer",
                                              "format": "int32"
                                            },
                                            "endColumnIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            },
                                            "startRowIndex": {
                                              "format": "int32",
                                              "type": "integer"
                                            }
                                          },
                                          "id": "GridRange",
                                          "type": "object"
                                        }
                                      }
                                    },
                                    "id": "ChartSourceRange",
                                    "type": "object"
                                  }
                                },
                                "id": "ChartData",
                                "type": "object"
                              },
                              "negativeColumnsStyle": {
                                "properties": {
                                  "label": {
                                    "type": "string"
                                  },
                                  "color": {
                                    "properties": {
                                      "red": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "green": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "blue": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "alpha": {
                                        "format": "float",
                                        "type": "number"
                                      }
                                    },
                                    "id": "Color",
                                    "type": "object"
                                  }
                                },
                                "id": "WaterfallChartColumnStyle",
                                "type": "object"
                              },
                              "hideTrailingSubtotal": {
                                "type": "boolean"
                              },
                              "customSubtotals": {
                                "type": "array",
                                "items": {
                                  "properties": {
                                    "label": {
                                      "type": "string"
                                    },
                                    "subtotalIndex": {
                                      "format": "int32",
                                      "type": "integer"
                                    },
                                    "dataIsSubtotal": {
                                      "type": "boolean"
                                    }
                                  },
                                  "id": "WaterfallChartCustomSubtotal",
                                  "type": "object"
                                }
                              },
                              "subtotalColumnsStyle": {
                                "properties": {
                                  "label": {
                                    "type": "string"
                                  },
                                  "color": {
                                    "properties": {
                                      "red": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "green": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "blue": {
                                        "format": "float",
                                        "type": "number"
                                      },
                                      "alpha": {
                                        "format": "float",
                                        "type": "number"
                                      }
                                    },
                                    "id": "Color",
                                    "type": "object"
                                  }
                                },
                                "id": "WaterfallChartColumnStyle",
                                "type": "object"
                              }
                            },
                            "id": "WaterfallChartSeries",
                            "type": "object"
                          }
                        }
                      },
                      "id": "WaterfallChartSpec",
                      "type": "object"
                    },
                    "fontName": {
                      "type": "string"
                    },
                    "maximized": {
                      "type": "boolean"
                    },
                    "treemapChart": {
                      "properties": {
                        "maxValue": {
                          "format": "double",
                          "type": "number"
                        },
                        "colorScale": {
                          "properties": {
                            "minValueColor": {
                              "properties": {
                                "red": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "green": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "blue": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "alpha": {
                                  "format": "float",
                                  "type": "number"
                                }
                              },
                              "id": "Color",
                              "type": "object"
                            },
                            "noDataColor": {
                              "properties": {
                                "red": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "green": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "blue": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "alpha": {
                                  "format": "float",
                                  "type": "number"
                                }
                              },
                              "id": "Color",
                              "type": "object"
                            },
                            "midValueColor": {
                              "properties": {
                                "red": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "green": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "blue": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "alpha": {
                                  "format": "float",
                                  "type": "number"
                                }
                              },
                              "id": "Color",
                              "type": "object"
                            },
                            "maxValueColor": {
                              "properties": {
                                "red": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "green": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "blue": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "alpha": {
                                  "format": "float",
                                  "type": "number"
                                }
                              },
                              "id": "Color",
                              "type": "object"
                            }
                          },
                          "id": "TreemapChartColorScale",
                          "type": "object"
                        },
                        "hideTooltips": {
                          "type": "boolean"
                        },
                        "hintedLevels": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "levels": {
                          "format": "int32",
                          "type": "integer"
                        },
                        "minValue": {
                          "format": "double",
                          "type": "number"
                        },
                        "sizeData": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "textFormat": {
                          "properties": {
                            "underline": {
                              "type": "boolean"
                            },
                            "foregroundColor": {
                              "properties": {
                                "red": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "green": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "blue": {
                                  "format": "float",
                                  "type": "number"
                                },
                                "alpha": {
                                  "format": "float",
                                  "type": "number"
                                }
                              },
                              "id": "Color",
                              "type": "object"
                            },
                            "bold": {
                              "type": "boolean"
                            },
                            "fontFamily": {
                              "type": "string"
                            },
                            "italic": {
                              "type": "boolean"
                            },
                            "strikethrough": {
                              "type": "boolean"
                            },
                            "fontSize": {
                              "format": "int32",
                              "type": "integer"
                            }
                          },
                          "id": "TextFormat",
                          "type": "object"
                        },
                        "headerColor": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        },
                        "parentLabels": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "labels": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        },
                        "colorData": {
                          "properties": {
                            "sourceRange": {
                              "properties": {
                                "sources": {
                                  "type": "array",
                                  "items": {
                                    "properties": {
                                      "startColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "sheetId": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "endRowIndex": {
                                        "type": "integer",
                                        "format": "int32"
                                      },
                                      "endColumnIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      },
                                      "startRowIndex": {
                                        "format": "int32",
                                        "type": "integer"
                                      }
                                    },
                                    "id": "GridRange",
                                    "type": "object"
                                  }
                                }
                              },
                              "id": "ChartSourceRange",
                              "type": "object"
                            }
                          },
                          "id": "ChartData",
                          "type": "object"
                        }
                      },
                      "id": "TreemapChartSpec",
                      "type": "object"
                    },
                    "hiddenDimensionStrategy": {
                      "enum": [
                        "CHART_HIDDEN_DIMENSION_STRATEGY_UNSPECIFIED",
                        "SKIP_HIDDEN_ROWS_AND_COLUMNS",
                        "SKIP_HIDDEN_ROWS",
                        "SKIP_HIDDEN_COLUMNS",
                        "SHOW_ALL"
                      ],
                      "type": "string"
                    },
                    "subtitleTextFormat": {
                      "properties": {
                        "underline": {
                          "type": "boolean"
                        },
                        "foregroundColor": {
                          "properties": {
                            "red": {
                              "format": "float",
                              "type": "number"
                            },
                            "green": {
                              "format": "float",
                              "type": "number"
                            },
                            "blue": {
                              "format": "float",
                              "type": "number"
                            },
                            "alpha": {
                              "format": "float",
                              "type": "number"
                            }
                          },
                          "id": "Color",
                          "type": "object"
                        },
                        "bold": {
                          "type": "boolean"
                        },
                        "fontFamily": {
                          "type": "string"
                        },
                        "italic": {
                          "type": "boolean"
                        },
                        "strikethrough": {
                          "type": "boolean"
                        },
                        "fontSize": {
                          "format": "int32",
                          "type": "integer"
                        }
                      },
                      "id": "TextFormat",
                      "type": "object"
                    },
                    "subtitle": {
                      "type": "string"
                    },
                    "subtitleTextPosition": {
                      "properties": {
                        "horizontalAlignment": {
                          "enum": [
                            "HORIZONTAL_ALIGN_UNSPECIFIED",
                            "LEFT",
                            "CENTER",
                            "RIGHT"
                          ],
                          "type": "string"
                        }
                      },
                      "id": "TextPosition",
                      "type": "object"
                    },
                    "backgroundColor": {
                      "properties": {
                        "red": {
                          "format": "float",
                          "type": "number"
                        },
                        "green": {
                          "format": "float",
                          "type": "number"
                        },
                        "blue": {
                          "format": "float",
                          "type": "number"
                        },
                        "alpha": {
                          "format": "float",
                          "type": "number"
                        }
                      },
                      "id": "Color",
                      "type": "object"
                    }
                  },
                  "id": "ChartSpec",
                  "type": "object"
                }
              },
              "id": "EmbeddedChart",
              "type": "object"
            }
          },
          "filterViews": {
            "type": "array",
            "items": {
              "properties": {
                "sortSpecs": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "dimensionIndex": {
                        "format": "int32",
                        "type": "integer"
                      },
                      "sortOrder": {
                        "enum": [
                          "SORT_ORDER_UNSPECIFIED",
                          "ASCENDING",
                          "DESCENDING"
                        ],
                        "type": "string"
                      }
                    },
                    "id": "SortSpec",
                    "type": "object"
                  }
                },
                "namedRangeId": {
                  "type": "string"
                },
                "filterViewId": {
                  "format": "int32",
                  "type": "integer"
                },
                "criteria": {
                  "additionalProperties": {
                    "properties": {
                      "hiddenValues": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "condition": {
                        "properties": {
                          "type": {
                            "type": "string",
                            "enum": [
                              "CONDITION_TYPE_UNSPECIFIED",
                              "NUMBER_GREATER",
                              "NUMBER_GREATER_THAN_EQ",
                              "NUMBER_LESS",
                              "NUMBER_LESS_THAN_EQ",
                              "NUMBER_EQ",
                              "NUMBER_NOT_EQ",
                              "NUMBER_BETWEEN",
                              "NUMBER_NOT_BETWEEN",
                              "TEXT_CONTAINS",
                              "TEXT_NOT_CONTAINS",
                              "TEXT_STARTS_WITH",
                              "TEXT_ENDS_WITH",
                              "TEXT_EQ",
                              "TEXT_IS_EMAIL",
                              "TEXT_IS_URL",
                              "DATE_EQ",
                              "DATE_BEFORE",
                              "DATE_AFTER",
                              "DATE_ON_OR_BEFORE",
                              "DATE_ON_OR_AFTER",
                              "DATE_BETWEEN",
                              "DATE_NOT_BETWEEN",
                              "DATE_IS_VALID",
                              "ONE_OF_RANGE",
                              "ONE_OF_LIST",
                              "BLANK",
                              "NOT_BLANK",
                              "CUSTOM_FORMULA",
                              "BOOLEAN"
                            ]
                          },
                          "values": {
                            "type": "array",
                            "items": {
                              "properties": {
                                "relativeDate": {
                                  "enum": [
                                    "RELATIVE_DATE_UNSPECIFIED",
                                    "PAST_YEAR",
                                    "PAST_MONTH",
                                    "PAST_WEEK",
                                    "YESTERDAY",
                                    "TODAY",
                                    "TOMORROW"
                                  ],
                                  "type": "string"
                                },
                                "userEnteredValue": {
                                  "type": "string"
                                }
                              },
                              "id": "ConditionValue",
                              "type": "object"
                            }
                          }
                        },
                        "id": "BooleanCondition",
                        "type": "object"
                      }
                    },
                    "id": "FilterCriteria",
                    "type": "object"
                  },
                  "type": "object"
                },
                "title": {
                  "type": "string"
                },
                "range": {
                  "properties": {
                    "startColumnIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "sheetId": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "endRowIndex": {
                      "type": "integer",
                      "format": "int32"
                    },
                    "endColumnIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "startRowIndex": {
                      "format": "int32",
                      "type": "integer"
                    }
                  },
                  "id": "GridRange",
                  "type": "object"
                }
              },
              "id": "FilterView",
              "type": "object"
            }
          },
          "rowGroups": {
            "type": "array",
            "items": {
              "properties": {
                "collapsed": {
                  "type": "boolean"
                },
                "range": {
                  "properties": {
                    "sheetId": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "dimension": {
                      "enum": [
                        "DIMENSION_UNSPECIFIED",
                        "ROWS",
                        "COLUMNS"
                      ],
                      "type": "string"
                    },
                    "startIndex": {
                      "format": "int32",
                      "type": "integer"
                    },
                    "endIndex": {
                      "format": "int32",
                      "type": "integer"
                    }
                  },
                  "id": "DimensionRange",
                  "type": "object"
                },
                "depth": {
                  "format": "int32",
                  "type": "integer"
                }
              },
              "id": "DimensionGroup",
              "type": "object"
            }
          }
        },
        "id": "Sheet",
        "type": "object"
      }
    }
  },
  "id": "Spreadsheet",
  "type": "object"
}    
```
</details>


### Add Spreadsheet Row

Action to create a new Google spreadsheet row. This action based on [Google Spreadsheets API v4](https://developers.google.com/sheets/api/reference/rest/).
Adds an array of given values to a spreadsheet as a new row. Data would be inserted in the same order as provided in the input array.
Data will be inserted into the last empty line, starting from the first table column.
A datatype of inserted values will be the same as for JSON type (string, numeric or boolean). Use "" value to make cell empty.

#### Input fields:
    
 1. **Spreadsheet** - Spreadsheet name to make changes. 
 2. **Worksheet** - Worksheet name of selected Spreadsheet to make changes. 
 3. **Input Mode** - Options: First Row As Headers, Array Based. Default is First Row As Headers
    * First Row As Headers (Default): generates input metadata based on values in first row cells. 
    This method has few limitations:
        * There should be at least one value in first row;
        * Values in first row cells must be distinct; 
        * There should be no empty cells in first row;
    * Array Based: generates input for array of `values`. Array mapped to `values` is going to be inserted as first row.
    <details close markdown="block"><summary><strong>Click to expand schema: </strong></summary>
    ```json
    {
      "type": "object",
      "title": "Input Row",
      "properties": {
        "values": {
          "type": "array"
        }
      }
    }           
    ```
    </details>
#### Common Errors
1. Input Mode: "First Row As Headers" requires first row to have at least one cell with value. - check there are at least one non-empty cell in first row.
2. Input Mode: "First Row As Headers" requires cells in first row to be not empty. - check there are no empty cells in between in first row. 
3. Input Mode: "First Row As Headers" requires cells in first row to be unique. - check values in first row are distinct. 
#### Json schema type
      <details close markdown="block"><summary><strong>Click to expand Output schema: </strong></summary>
      ```json
      {
        "type": "object",
        "properties": {
          "spreadsheetId": {
            "type": "string",
            "required": true
          },
          "tableRange": {
            "type": "string",
            "required": true
          },
          "updates": {
            "type": "object",
            "required": true,
            "properties": {
              "spreadsheetId": {
                "type": "string",
                "required": true
              },
              "updatedRange": {
                "type": "string",
                "required": true
              },
              "updatedRows": {
                "type": "numeric",
                "required": true
              },
              "updatedColumns": {
                "type": "numeric",
                "required": true
              },
              "updatedCells": {
                "type": "numeric",
                "required": true
              }
            }
          }
        }
      }
      ```
      </details>

### Create/Upsert/Update Spreadsheet Row

Action search the row/column identified by Upsert Criteria and find rows/columns where the value in the sheet matches the value in the incoming message:
 * If more than one match is found, throw an error.
 * If no matches are found, add a new row to the bottom of the sheet.
 * If exactly one match is found, re-write this row/column with the values provided in the incoming message:
    * If a value is provided in the message, replace the existing cell
    * If the null value is provided in the message, clear the contents of the existing cell
    * If the value provided in the message is undefined or the empty string, leave the contents of the cell as is.

#### Configuration Fields

* **Spreadsheet** - (dropdown, required): Spreadsheet name to make changes
* **Worksheet** - (dropdown, required): Worksheet name of selected Spreadsheet to make changes
* **Dimension** - (dropdown, required): The major dimension of the values, allowed values: `ROWS`, `COLUMNS`
* **Input Mode** - (dropdown, non required): Options: `First Row As Headers`, `Array Based`. Default is `First Row As Headers`
    * First Row As Headers (Default): generates input metadata based on values in first row or column cells (depend on dimension field)
      This method has few limitations:
        * There should be at least one value in first row/column;
        * Values in first row cells must be distinct;
        * There can be at most one empty cell in first row/column;
    * Array Based: generates input as the sheet rows/column identifiers (A, B, C, 1, 2, 3, etc);
* **Upsert Criteria** - (dropdown, required): List of available row/column headers (based on selected dimension)

#### Input Metadata

One input field for each row/column, all inputs optional except for the field identified by Upsert Criteria which is required.

#### Output Metadata

| Field          | Type   | Required | Description                          |
|----------------|--------|----------|--------------------------------------|
| spreadsheetId  | string | true     | Unique identifier of the spreadsheet |
| tableRange     | string | true     | Range of Table                       |
| updateRange    | string | true     | Updated Range                        |
| updatedRows    | number | true     | Count of updated rows                |
| updatedColumns | number | true     | Count of updated columns             |
| updatedCells   | number | true     | Count of updated cells               |

### Get Spreadsheet Row (action)
This action is very similar to [Get Spreadsheet Row (trigger)](#get-spreadsheet-row). It works the same as the trigger does. To initiate it, a message of any structure should be sent to the step with this action

## Recommendations

Here are some general recommendations to help you avoid potentially confusing
cases where you might get unexpected results while using Google Spreadsheets connector.

### Spreadsheet Country Format

Depending on your Google Account settings your Google Drive and especially
Google Spreadsheets would have some specific default formatting applicable to
the Account Language/Country Setup in use. By default, Google will assume US
formatting which would mean not only the default currency is US Dollar (`$`) but
also, the date format will be of `MM/DD/YYYY` format, not `DD/MM/YYYY`
which is widely used in European and other countries.

### Google Spreadsheet default Language Settings

Please note if the data you are planning to write has values in different
language/country formatting than your Google Spreadsheets then ***you are most likely***
to encounter unexpected results.

Make sure to **change it to the desired one in the Google Spreadsheets in advance**
by selecting `File > Spreadsheet Settings ...` menu of your Spreadsheet.

### Changing the Spreadsheet structure

**Do NOT change the Spreadsheet structure while your flow is active**

If you make structural changes to the Google Spreadsheet while it is being used
it will cause a number of Errors and the flow will stop functioning properly.

Decide the structure of your spreadsheet file in advance and avoid making any
structural changes during the integration. In particular, avoid adding or removing additional columns since you would need to repeat the flow design process
to properly map or link your changes.

If you still wish to change the structure of your Google Spreadsheet then follow
these steps:

1.  **Stop the integration flow** if it is running;
2.  Make your changes in the Google Spreadsheet;
3.  **Go through the integration design stage again** to ensure that all columns in the modified spreadsheet are properly linked with required fields or values necessary to run your integration flow.
4.  Activate the flow again.

### Inserting a row 

**Do NOT insert a row between the records while your flow is active**

If you insert a new row between existing structure the system would fail to
recognize it as an update. Instead, this will cause the system to lose the
connection between the **unique IDs** and the records **since our unique ID is the row number**.

If you wish to insert a row between existing records then you
**must first stop the integration flow** in your Dashboard and then proceed to
make the changes in your Google Spreadsheets file. You can activate your flow
after you made the necessary changes. However, we recommend not to insert a row
between the records even if you have deactivated it.

**New inserted row will cause an additional data transfer**

Avoid inserting a row in between the records during the integration since it
would look different for the system. This **would trigger an additional data transfer**
since not only the newly inserted row will be regarded as a new record but
**everything after the inserted row would be considered a new data**.

## Limitations

1. Trigger can emit maximum 1000 messages per one execution.
2. Currently `Enter number of retries` and `Max number of calls per second` credential fields use default values only. Those are 5 and 5 respectively.
3. Trigger uses version 4 of [Google Sheet API](https://developers.google.com/sheets/api/).
You can find more information in the [Google Sheets API Documentation](https://developers.google.com/sheets/api/samples/reading).