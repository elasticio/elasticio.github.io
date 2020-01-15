---
title: Google Spreadsheets component
layout: component
section: Office components
description: A Google Spreadsheets component to read and write to the Google Spreadsheet.
icon: gspreadsheet.png
icontext: Google Spreadsheets component
category: gspreadsheet
createdDate: 2015-09-24
updatedDate: 2020-01-15
---

## Latest changelog

**1.1.2 (December 30, 2019)**

* Update sailor version to 2.5.4
* Refactor console log to built in sailor logger
* Change build type to `docker`

> To see the full **changelog** please use the following [link](/components/gspreadsheet/changelog).

## Requirements

### Environment variables

Here are the environment variables to configure for the component to connect with
the Google API:

Following environment are required:

 - `GOOGLE_APP_ID` - oauth App ID
 - `GOOGLE_APP_SECRET` - oauth App Secret
 - `LOG_LEVEL` - `trace` | `debug` | `info` | `warning` | `error` controls logger level


 To get these please use the [Google Developers Console](https://console.developers.google.com). As a callback please use `https://your-tenant.address/callback/oauth2`.

 Recommended environment variable:

 - `EIO_REQUIRED_RAM_MB` - recommended value of allocated memory is `512` MB

## Credentials

Google Spreadsheet works with OAuth2 app configured at your Google Developer Console.
To Authenticate the component you only need to press the button *Authentication*
and the process would take you to Google to log-in and give permissions to the
platform to access your Spreadsheets.

## Triggers

### Get Spreadsheet Row

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
|---------------------|--------|---------|---------|
| Spreadsheet                    | true | Spreadsheet which will be used for data reading | `MyTestSpreadsheet` |
| Worksheet                      | true | Worksheet of spreadsheet which will be used for data reading | `Sheet1` |
| Dimension                      | true | The major dimension of the values | `ROWS`, `COLUMNS` |
| Use first row/column as header | true | You should specify Yes if your data has a header in the first row/column and you want to use these values as json key in the output message. If you specify No, json key will be taken from row/column index according to A1 notation. Se example below | `Yes` |
| Select All Data                | true | You should specify Yes if you want to fetch all spreadsheet data whenever step starts. If you specify No, a step will be emitting only delta changes (lines which were added after last step runs) | `No` |

> **IMPORTANT:** Using `Use first row/column as header` feature, you must be sure that header values are unique.

Values from spreadsheets return as `UNFORMATTED_VALUE` [type](https://developers.google.com/sheets/api/reference/rest/v4/ValueRenderOption)

#### Cases with ROWS dimension:

![Table](https://user-images.githubusercontent.com/13310949/59919432-14cf9400-9430-11e9-9522-3d20c3fa2337.png)

After a trigger execution, data will be extracted from the table above and the following message will be emitted:

##### 1) Dimension: `ROWS`, Use first row/column as header: `Yes`
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

##### 2) Dimension: `ROWS`, Use first row/column as header: `No`
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

##### 1) Dimension: `COLUMNS`, Use first row/column as header: `Yes`
```javascript
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

##### 2) Dimension: `COLUMNS`, Use first row/column as header: `No`
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

#### Limitations

Trigger can emit maximum 1000 messages per one execution.

Trigger uses version 4 of [Google Sheet API](https://developers.google.com/sheets/api/).
You can find more information in the [Google Sheets API Documentation](https://developers.google.com/sheets/api/samples/reading).

### Rows
**Deprecated** - please use [New Spreadsheet Row](#new-spreadsheet-row) trigger.

The  **Rows** *trigger* reads the data in each row of a given Google Spreadsheet
and passes it to the next stage of your integration flow.

#### The process

In the beginning, the system will read all the rows from a given Google
Spreadsheet and process it further along with your designed integration flow. It will
also create an initial state of your spreadsheet, we call it a ***snapshot***,
in order to have something to compare after your data is updated.

After the initial read, any further requests for an update will be compared to this
snapshot and if any changes are detected they will be passed along the integration
flow as well. It is, therefore, imperative to provide a **readable spreadsheet**
for smooth integration.

#### What is a readable spreadsheet?

The nature of API that the platform uses to read the rows in Google Spreadsheets
dictates the use of certain rules that it is useful to follow for a smooth
integration of your data. In addition to the **Minimum Requirements** your spreadsheet
must have:

1.  **No empty spaces** - This means no empty columns, no empty rows, and no spaces or newlines after each record. The **reading process stops if it encounters empty columns or rows** since there is no way to know if there are new or more records afterward.
2.  **Only `STRING` values** - Your data will be processed as a `STRING` data type.
3.  **No formula** - If you calculate the value of any field using a formula the system will only read the `VALUE` of that field and convert it into a `STRING` data type.
4.  **One sheet only** - Your Google Spreadsheet must contain **only one sheet**. Even if you insert a second one, it will be ignored by the system.

#### External and internal ID for each row

When any given row is processed by the system it receives a *unique name* or a
unique ID so that it can be recognized by the system afterward if you want to
make any changes to the values in that specific row.

> In our system the row number in the Google Spreadsheet is taken as a unique ID to process through the integration flow.


## Actions

### Create new Spreadsheet

Action to create a new Google spreadsheet. This action is based on [Google Spreadsheets API v4](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/create).
The action needs a JSON instance of a [Spreadsheet](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets#Spreadsheet) object in order to create a new spreadsheet.
All data structures and limitations are the same to Google API.

### Add Spreadsheet Row

Action to create a new Google spreadsheet row. This action based on [Google Spreadsheets API v4](https://developers.google.com/sheets/api/reference/rest/).
Adds an array of given values to a spreadsheet as a new row. Data would be inserted in the same order as provided in the input array.
Data will be inserted into the last empty line, starting from the first table column.
A datatype of inserted values will be the same as for JSON type (string, numeric or boolean). Use "" value to make cell empty.

#### Input fields:

 - **Spreadsheet** - Spreadsheet name to make changes.
 - **Worksheet** - Worksheet name of selected Spreadsheet to make changes.


### Add Row

**Deprecated** - please use [Add Spreadsheet Row](#add-spreadsheet-row) action.

Your integration flow can also *write* or **add a row** to the given Google
Spreadsheet as an **action**. In this case, your spreadsheet will be the ***target spreadsheet***.

To use **add row** action the Google Spreadsheet file which will be receiving
new data must already be mapped using the Data Mapper. This means the target
spreadsheet columns need to be assigned to the specific `values` which are
expected from the components within the same integration flow that is sending the information.

> Please note that the system will write a new record using only a `STRING` data type.

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
