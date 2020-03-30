---
title: Google Spreadsheets actions
layout: component
description: Google Spreadsheets component actions.
icon: gspreadsheet.png
icontext: Google Spreadsheets component
category: gspreadsheet
createdDate: 2020-03-20
updatedDate: 2020-03-20
---

## Create new Spreadsheet

Action to create a new Google spreadsheet. This action is based on [Google Spreadsheets API v4](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/create).
The action needs a JSON instance of a [Spreadsheet](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets#Spreadsheet) object in order to create a new spreadsheet.
All data structures and limitations are the same to Google API.

## Add Spreadsheet Row

Action to create a new Google spreadsheet row. This action based on [Google Spreadsheets API v4](https://developers.google.com/sheets/api/reference/rest/).
Adds an array of given values to a spreadsheet as a new row. Data would be inserted in the same order as provided in the input array.
Data will be inserted into the last empty line, starting from the first table column.
A datatype of inserted values will be the same as for JSON type (string, numeric or boolean). Use "" value to make cell empty.

### Input fields:

 - **Spreadsheet** - Spreadsheet name to make changes.
 - **Worksheet** - Worksheet name of selected Spreadsheet to make changes.

## Add Row(deprecated)

This action is `deprecated` - please use [Add Spreadsheet Row](#add-spreadsheet-row) action.

Your integration flow can also *write* or **add a row** to the given Google
Spreadsheet as an **action**. In this case, your spreadsheet will be the ***target spreadsheet***.

To use **add row** action the Google Spreadsheet file which will be receiving
new data must already be mapped using the Data Mapper. This means the target
spreadsheet columns need to be assigned to the specific `values` which are
expected from the components within the same integration flow that is sending the information.

> Please note that the system will write a new record using only a `STRING` data type.
