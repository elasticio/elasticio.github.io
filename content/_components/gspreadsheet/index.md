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

Google Spreadsheets component includes the following triggers:

1. [Get Spreadsheet Row trigger](/components/gspreadsheet/triggers#get-spreadsheet-row)                                                                            
The New Spreadsheet Row trigger reads the data in each row of a given Google Spreadsheet and passes it to the next stage of your integration flow.        


The following Google Spreadsheets triggers are deprecated:

  1. [Rows(deprecated)](/components/gspreadsheet/triggers#rowsdeprecated)   
  Trigger is `deprecated` - please use [Get Spreadsheet Row](/components/gspreadsheet/triggers#get-spreadsheet-row) trigger.
  The  **Rows** *trigger* reads the data in each row of a given Google Spreadsheet
  and passes it to the next stage of your integration flow.

## Actions

Google Spreadsheets component includes the following actions:

  1. [Create New Spreadsheet action](/components/gspreadsheet/actions#create-new-spreadsheet)                                                               
  Action to create a new Google spreadsheet.     

  2. [Add Spreadsheet Row action](/components/gspreadsheet/actions#add-spreadsheet-row)                                                                       
  Action to create a new Google spreadsheet row.

  3. [Add Row(deprecated) action](/components/gspreadsheet/actions#add-rowdeprecated)   
  This action is `deprecated` - please use [Add Spreadsheet Row](/components/gspreadsheet/actions#add-spreadsheet-row) action.        

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
