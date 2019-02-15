---
title: Gspreadsheets component
layout: article
section: Utility Components
---


> This is Google Spreadsheets component for the [elastic.io platform](http://www.elastic.io "elastic.io platform").

This is an open source component template for Google Spreadsheets or [Google Sheets](https://www.google.com/sheets/about/) which is developed specifically to run on [elastic.io platform](http://www.elastic.io "elastic.io platform"). You can clone it and change it as you wish. However, **if you plan to deploy it into [elastic.io platform](http://www.elastic.io "elastic.io platform") you must follow sets of instructions to succeed**.

> **PLEASE NOTE:** This is a working component for **Google Spreadsheets**, however, it may not be suitable for every use case. Not all functionalities are included in this component template. **It is your responsibility to add and modify this component to suit your integration needs.**

## Before you Begin

Before you can deploy any code into our system **you must be a registered elastic.io platform user**. Please see our home page at [http://www.elastic.io](http://www.elastic.io) to learn how.

> Any attempt to deploy a code into our platform without a registration would fail.

After the registration and opening of the account you must **[upload your SSH Key](http://docs.elastic.io/docs/ssh-key)** into our platform.

> If you fail to upload you SSH Key you will get **permission denied** error during the deployment.

## Getting Started

After registration and uploading of your SSH Key you can proceed to deploy it into our system. At this stage we suggest you to:
* [Create a team](http://docs.elastic.io/page/team-management) to work on your new component. This is not required but will be automatically created using random naming by our system so we suggest you name your team accordingly.
* [Create a repository](http://docs.elastic.io/page/repository-management) where your new component is going to *reside* inside the team that you have just created. For a simplicity you can name your repository **gspreadsheets**.

```bash
$ git clone https://github.com/elasticio/gspreadsheets.git gspreadsheets

$ cd gspreadsheets
```
Now you can edit your version of **gspreadsheets** component and change according to your needs - that is if you know what you are doing. Or you can just ``PUSH``it into our system to see the process in action:

```bash
$ git remote add elasticio your-created-team-name@git.elastic.io:gspreadsheets.git

$ git push elasticio master
```
Obviously the naming of your team and repository is entirely up-to you and if you do not put any corresponding naming our system will auto generate it for you but the naming might not entirely correspond to your project requirements.

# After your install

After the installation don't forget to specify the Application Key and Secret for OAuth authentication in component's environment variables.

Following environment are required:
 - ``GOOGLE_APP_ID`` oauth App ID
 - ``GOOGLE_APP_SECRET`` oauth App Secret

To get these please use the Google Developers Console is available from https://console.developers.google.com. As a callback please use ``https://your-tenant.elastic.io/callback/oauth2``

# How to use Google Spreadsheets Component

To install Google Spreadsheets component please follow instructions in [README.md](https://github.com/elasticio/gspreadsheets/blob/master/README.md).

Within the elastic.io environment Google Spreadsheets **can be used both as a trigger and an action component**.

> The description below is based on the initial state of the Google Spreadsheet component presented here. Any third party modification should also be documented for the consistency.

## Triggers

### Rows

The  **Rows** *trigger* reads the data in each row of a given Google Spreadsheet and passes it to the next stage of your integration flow. For example one of the often used integration flows, **Google Spreadsheets &#8594; Debitoor**, uses this very trigger. If you have the list of your products or customers you could use this integration flow to transfer them into the Debitoor to do the accounting.

#### The process

In the beginning the system will read all the rows from a given Google Spreadsheet and process it further along your designed integration flow. It will also create an initial state of your spreadsheet, we call it a ***snapshot***, in order to have something to compare after your data is updated.

After the initial read, any further requests for update will be compared to this snapshot and if any changes are detected they will be passed along the integration flow as well. It is, therefore, imperative to provide a **readable spreadsheet** for a smooth integration.

#### What is a readable spreadsheet?

The nature of API that Elastic.IO uses to read the rows in Google Spreadsheets dictates the use of certain rules that it is useful to follow for a smooth integration of your data. In addition to the **Minimum Requirements** your spreadsheet must have:

1. **No empty spaces** - This means no empty columns, no empty rows and no spaces or newlines after each record. The **reading process stops if it encounters empty columns or rows** since there is no way to know if there are new or more records afterwards.

2. **Only `STRING` values** - Your data will be processed as a `STRING` data type.

3. **No formula** - If you calculate the value of any field using a formula the system will only read the `VALUE` of that field and convert it into a `STRING` data type.

4. **One sheet only** - Your Google Spreadsheet must contain **only one sheet**. Even if you insert a second one, it will be ignored by the system.

#### External and internal ID for each row

When any given row is processed by the system it receives a *unique name* or a unique ID so that it can be recognised by the system afterwards if you wish to make any changes to the values in that specific row.

> In our system the row number in the Google Spreadsheet is taken as a unique ID to process through the integration flow.

## Actions

### Add Row

Your integration flow can also *write* or **add a row** to the given Google Spreadsheet as an **action**. In this case your spreadsheet will be the ***target spreadsheet***.

To use **add row** action the Google Spreadsheet file which will be receiving new data must already be mapped using the Data Mapper. This means the target spreadsheet columns need to be assigned to the specific ```values``` which are expected from the components within the same integration flow that are sending the information.

> Please note that the system will write a new record using only a ``STRING`` data type.

## Recommendations

Here are some general recommendations to help you avoid potentially confusing cases where you might get unexpected results while using Google Spreadsheets connector.

### Spreadsheet Country Format

Depending on your Google Account settings your Google Drive and especially Google Spreadsheets would have some specific default formatting applicable to the Account Language/Country Setup in use. By default Google will assume US formatting which would mean not only the default currency is US Dollar ($) but also the date format will be of ```MM/DD/YYYY``` format not ```DD/MM/YYYY``` which is widely used in European and other countries.

### Google Spreadsheet default Language Settings

Please note if the data you are planning to write has values in different language/country formatting than your Google Spreadsheets then ***you are most likely*** to encounter unexpected results.

Make sure to **change it to the desired one in the Google Spreadsheets in advance** by selecting ```File > Spreadsheet Settings ...``` menu of your Spreadsheet.

### Changing the Spreadsheet structure

> Do NOT change the Spreadsheet structure while your flow is active

If you make structural changes to the Google Spreadsheet while it is being used it will cause number of Errors and the flow will stop functioning properly.

Decide the structure of your spreadsheet file in advance and avoid making any structural changes during the integration. In particular avoid adding or removing additional columns since you would need to repeat the flow design process to properly map or link your changes.

If you still wish to change the structure of your Google Spreadsheet then follow these steps:

1. **Stop the integration flow** if it is running;

2. Make your changes in the Google Spreadsheet;

3. **Go through the integration design stage again** to ensure that all columns in the modified spreadsheet are properly linked with required fields or values necessary to run your integration flow.

4. Activate the flow again.

### Inserting a row

> Do NOT insert a row between the records while your flow is active

If you insert a new row between existing structure the system would fail to recognise it as an update. Instead this will cause the system to loose the connection between the **unique IDs** and the records **since our unique ID is the row number**.

If you wish to insert a row between existing records then you **must first stop the integration flow** in your Dashboard and then proceed to make the changes in your Google Spreadsheets file. You can activate your flow after you made the necessary changes. However, we recommend not to insert a row between the records even if you have deactivated it.

> New inserted row will cause an additional data transfer

Avoid inserting a row in between the records during the integration since it would look different for the system. This **would trigger an additional data transfer** since not only the new inserted row will be regarded as a new record but **everything after the inserted row would be considered a new data**.
