---
title: Google Spreadsheets component
layout: component
section: Office components
description: A Google Spreadsheets component to read and write to the Google Spreadsheet.
icon: gspreadsheet.png
icontext: Google Spreadsheets component
category: gspreadsheet
updatedDate: 2022-10-07
ComponentVersion: 2.0.4
---

## Requirements

### Google preparations

Before building any integration flow you must at first configure the app from inside the Google Developers Console.
1. In order to do this you, go to the `API & Service` page and enable the following:
- Google Drive API
- Google Sheets API
2. Go to the `Credentials` section and create a new credential of type  `OAuth client ID`.
- Set Application type to `Web application`
- Add Authorized redirect URI as: `https://{your-tenant-address}/callback/oauth2`

In case of new domain you may get message like `This app isn't verified`. Please refer to this doc to check how to proceed:
https://support.google.com/cloud/answer/7454865?hl=en

### Environment variables

Here are the environment variables to configure for the component to connect with
the Google API:

Following environment are required:

 - `OAUTH_CLIENT_ID` - oauth App ID
 - `OAUTH_CLIENT_SECRET` - oauth App Secret

To get these please use the [Google Developers Console](https://console.developers.google.com). As a callback please use `https://your-tenant.address/callback/oauth2`.

 Additional environment variables:

 - `TENANT_DOMAIN` - your Google API tenant domain
 - `REQUEST_TIMEOUT_PERIOD` - If you want to slow down requests to your API you can set delay value (in ms) and the component will delay calling the next request after the previous request.

 Time for the delay is calculated as `REQUEST_TIMEOUT_PERIOD`/ `REQUEST_TIMEOUT_QUOTA` and shouldn't be more than 1140 seconds (19 minutes due to platform limitation).
 The current values of this variables can be found in Google [documentation](https://developers.google.com/sheets/api/limits).
 The `REQUEST_TIMEOUT_PERIOD` value by default is 100000 (100 sec).
 - `REQUEST_TIMEOUT_QUOTA` - the field can be used in pair with `REQUEST_TIMEOUT_PERIOD`, default to 500.

> **Please note:** if result quota restriction will be less than 1 request/min component `Retrieve Sample` task won't be complete

> Please Note: From the platform version [20.51](/releases/20/51) we deprecated the
> component `LOG_LEVEL` environment variable. Now you can control logging level per each step of the flow.

 To get these please use the [Google Developers Console](https://console.developers.google.com). As a callback please use `https://your-tenant.address/callback/oauth2`.

 Recommended environment variable:

 - `EIO_REQUIRED_RAM_MB` - recommended value of allocated memory is `512` MB

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Gspreadsheet component like [changelog](/components/gspreadsheet/technical-notes#changelog) and [completeness matrix](/components/gspreadsheet/technical-notes#completeness-matrix).

## Credentials

Google Spreadsheet works with OAuth2 app configured at your Google Developer Console.
To Authenticate the component you only need to press the button *Authentication*
and the process would take you to Google to log-in and give permissions to the
platform to access your Spreadsheets.

- Enter number of retries (Default: 5)

>**Please Note:** that Google applies quotas and limitations to their services. You can check the actual values here: https://developers.google.com/sheets/api/limits

In case an API call throws a quota limit exceeded exception (or any other exception, e.g. a connectivity problem, etc.), the component will retry the call based on [Exponential backoff algorithm](https://developers.google.com/sheets/api/limits#exponential) (factor = 2) number of times configured in this field. The default value is 5.

E.g. Setting this to 1 means do a normal call once, then if failed - retry it once.

>**Please Note:** that you should carefully calculate and plan a strategy to handle an expected load to the component.
Note also that Google's quota applies to credentials, not to a step in a flow. This means that if there is a default limit to 60 requests per minute per user per project and there is a component that makes exactly 60 requests per minute, adding a second component with the same user credentials would cause a quota exceeding. This is where careful calculating of number of retries and delay between calls is are very important.

- Max number of calls per second (Default: 5)

If you want to slow down requests to your API you can set a number of requests per second and the component will delay calling the next request after the previous request (`1 / number of requests per second * 1000 ms` ).
The calculated delay value can not be more than 1140 seconds (19 minutes due to platform limitations).

>**Please Note:**
* if result quota restriction will be less than 1 request/min the component `Retrieve Sample` task won't succeed
* If you don't set a value to either `Enter number of retries` or `Max number of calls per second` fields, they will remain empty. The component will consider them as the default values (5 in both cases).

## Triggers

Google Spreadsheets component includes the following triggers:

 1. [Get Spreadsheet Row trigger](/components/gspreadsheet/triggers#get-spreadsheet-row)                                                                                                                          The New Spreadsheet Row trigger reads the data in each row of a given Google Spreadsheet and passes it to the next stage of your integration flow.


The following Google Spreadsheets triggers are deprecated:

1. [Rows(deprecated)](/components/gspreadsheet/triggers#rowsdeprecated)                                                    Trigger is `deprecated` - please use [Get Spreadsheet Row](/components/gspreadsheet/triggers#get-spreadsheet-row) trigger.
The  **Rows** *trigger* reads the data in each row of a given Google Spreadsheet and passes it to the next stage of your integration flow.

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
