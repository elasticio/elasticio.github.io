---
layout: component
title: Odoo component
section: ERP components
description: The Odoo Component is designed to interact seamlessly with the Odoo API.
icon: odoo.png
icontext: Odoo component
category: odoo
ComponentVersion: 1.1.0
updatedDate: 2024-09-04
---

# Odoo Component

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Execute Method](#execute-method)
* [Triggers](#triggers)
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)

## Description

The Odoo Component is designed to interact seamlessly with the Odoo API, following the guidelines provided in the [External API documentation](https://www.odoo.com/documentation/17.0/developer/reference/external_api.html).

This component has been tested with API version `17`.

## Credentials

The configuration fields for component credentials are as follows:
* **Odoo Base URI** (string, required) - The URL of your Odoo installation (cloud or on-premise).
* **Database name** (string, required) - You can find the database name by activating [Developer mode](https://www.odoo.com/documentation/17.0/applications/general/developer_mode.html), where it will appear in the top right corner next to your name.
* **Username** (string, required) - Your username (usually your email address).
* **Password or API Key** (string, required) - You can enter your password here or generate an [API Key](https://www.odoo.com/documentation/17.0/developer/reference/external_api.html#api-keys) to use instead.

## Actions

### Execute Method

This action can perform most operations needed to interact with the Odoo API.

#### Configuration Fields

* **Model** (dropdown, required): Select the model (object) with which you will perform the operation.
* **Operation** (dropdown, required): Select one of the available operations:
  * `Read` - Read models using the provided ID(s).
  * `Search` - Search models based on the provided criteria and return a list of ID(s).
  * `Search and read` - Search models based on the provided criteria and return the models.
  * `Update` - Update an existing model using the provided ID.
  * `Create` - Create a new model.
  * `Delete` - Delete models using the provided ID(s).
  * `Execute keyword (execute_kw)` - A universal operation that can perform any action, including all the above, for advanced users. [More info](https://www.odoo.com/documentation/17.0/developer/reference/external_api.html#calling-methods).

#### Input Metadata

Dynamically generated fields based on the selected `Operation`:

* `Read`:
  * **Objects ids** - (array of numbers, required): An array of IDs that need to be read.
  * **Fields** - (array of strings, optional): An array of fields that will appear in the resulting object. List of the available fields will appear in tooltip (`i` icon near this field). If leave blank than all fields will be present.

* `Search`:
  * **Domain filters** - (array of objects, optional): You can specify multiple filters to apply for the Search operation.
    * **Field name** - (string, required): The field name of the current model, or a relationship traversal through a "Many2one" using dot notation, e.g., <b>street</b> or <b>partner_id.country</b>.
    * **Operator** - (string, required): An operator used to compare the "Field name" with the Value. List of the available operators will appear in tooltip (`i` icon near this field)
    * **Value** - (string or array of strings, required): An array of values or a single string that must be comparable (through the operator) to the specified field.

* `Search and read`:
  * **Domain filters** - (array of objects, optional): Similar to the Search operation, you can specify multiple filters.
    * **Field name** - (string, required): The field name of the current model, or a relationship traversal through a "Many2one" using dot notation, e.g., <b>street</b> or <b>partner_id.country</b>.
    * **Operator** - (string, required): An operator used to compare the "Field name" with the Value. List of the available operators will appear in tooltip (`i` icon near this field)
    * **Value** - (string or array of strings, required): An array of values or a single string that must be comparable (through the operator) to the specified field.
  * **Fields** - (array of strings, optional): An array of fields that will appear in the resulting object. List of the available fields will appear in tooltip (`i` icon near this field). If leave blank than all fields will be present.
  * **Options** - (objects, optional): Additional options.
    * **Limit** - (number, optional): The number of records to retrieve in the result.
    * **Offset** - (number, optional): How many records should be skipped (used for pagination).
    * **Order** - (string, optional): You can apply ordering to the results, for example: `category, birthday desc`.

* `Update`:
  * **Id of the Object to update** - (string, required).
  * ...other fields will be generated according to the selected `Model`.

* `Create`:
  * All fields will be generated according to the selected `Model`.

* `Delete`:
  * **Objects ids** - (array of numbers, required): An array of IDs that need to be deleted.

* `Execute keyword (execute_kw)`:
  * **Method name** - (string, required): The name of the operation.
  * **An array/list of parameters passed by position** - (array, optional).
  * **A mapping/dict of parameters to pass by keyword** - (object, optional).

#### Output Metadata

The output will be an object with the key `result`, containing the response from the Odoo API.

## Triggers

### Get New and Updated Objects Polling

Retrieve all the updated or created objects within a given time range.

#### Configuration Fields

* **Model** - (dropdown, required): Select the model (object) with which you will perform the operation.
* **Timestamp field to poll on** - (dropdown, required): Select the date field to track changes.
* **Emit behavior** - (dropdown, optional): Indicates emit objects behavior - `Emit individually` (by default) or `Emit page`
* **Size of Polling Page** - (optional, positive integer, defaults to 100, max 100): Indicates the size of pages to be fetched
* **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (inclusive). The default value is the beginning of time (January 1, 1970 at 00:00.000).

#### Input Metadata

None.

#### Output Metadata
- For `Fetch page`: An object with key ***results*** that has an array as its value
- For `Emit Individually`:  Each object fills the entire message
