---
title: Wordpress component
layout: component
section: Service components
description: The Wordpress component facilitates interaction with the Wordpress API.
icon: wordpress.png
icontext: Wordpress component
category: wordpress
ComponentVersion: 1.0.0
updatedDate: 2025-07-30
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Triggers](#triggers)
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
* [Actions](#actions)
  * [Delete Object By ID](#delete-object-by-id)
  * [Lookup Object By ID](#lookup-object-by-id)
  * [Lookup Objects (plural)](#lookup-objects-plural)
  * [Make Raw Request](#make-raw-request)
  * [Upsert Object](#upsert-object)

## Description

The Wordpress Component facilitates interaction with the [Wordpress API](https://developer.wordpress.org/rest-api/reference/).

## Credentials

To use this component, you need to authenticate against your WordPress site using Basic Authentication with an [Application Password](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/#basic-authentication-with-application-passwords). Follow these steps to obtain the required credentials:

1. Log in to your WordPress Admin Dashboard.

2. Go to `Users` → `Profile` (or your user account).

3. Scroll down to the `Application Passwords` section.

4. Enter a name and click `Add New Application Password`.

5. Copy the generated password immediately — you won’t see it again.

💡 Note: You must have at least WordPress 5.6 and HTTPS enabled. Application passwords only work for users with the `edit_posts` capability.

Use the following fields to configure your credentials in the component:

* **Base URL** (string, required) - The base URL of your WordPress site, e.g., `https://example.com`.
* **Username** (string, required) - The username of the WordPress account you generated the application password for.
* **Application Password** (string, required) - The application password generated in Step 5.

## Triggers
  
### Get New and Updated Objects Polling

Retrieves all the created or updated objects within a given time range.

#### Configuration Fields

* **Object Type** - (dropdown, required): Type of object to poll on. Currently supported types are:
    - Posts
    - Media
    - Comments

* **Poll Config** - (dropdown, required): Select the date field to track changes.
* **Emit behavior** - (dropdown, optional): Indicates emit objects behavior - `Emit individually` (by default) or `Emit page`.
* **Size of Polling Page** - (optional, positive integer, defaults to 100, min 1, max 100): Indicates the size of pages to be fetched.
* **Start Time** - (string, optional): The timestamp, in ISO8601 format, to start polling from (inclusive). The default value is January 1, 1970 at 00:00:01.

#### Input Metadata

None.

#### Output Metadata

- For `Fetch page`: An object with key ***results*** that has an array as its value.
- For `Emit Individually`:  Each object fills the entire message.

## Actions

### Delete Object By ID

Deletes a single object using its ID.

> **Please Note:** For the `User` object type, the force parameter  is always set to ```true```, as WordPress does not support trashing users — they must be permanently deleted.

#### Configuration Fields

* **Object Type** - (string, required): The type of object to delete. Currently supported types are:
    - Post
    - Media
    - Comment
    - User

#### Input Metadata

A dynamically generated list of required fields based on the selected `Object Type`.

#### Output Metadata

ID of the deleted object.

### Lookup Object By ID

Retrieves a single object using its ID.

#### Configuration Fields

* **Object Type** - (string, required): The type of object to look up. Currently supported types are:
    - Post
    - Media
    - Comment
    - User

#### Input Metadata

A dynamically generated list of required fields based on the selected `Object Type`.

#### Output Metadata

Returns an object with the result of the lookup.

### Lookup Objects (Plural)

Lookups a set of objects based on a defined list of criteria. The results can be emitted in different ways.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to look up. Currently supported types are:
    - Posts
    - Media
    - Comments
    - Users

* **Emit Behavior** - (dropdown, optional): Indicates emit objects behavior - `Emit individually` (by default) or `Emit page`.

#### Input Metadata

A dynamically generated list of available criteria.

#### Output Metadata

For `Emit All` mode: An object with the key `results`, which contains an array as its value.
For `Emit Individually` mode: Each object fills the entire message.

### Make Raw Request

Allows for the execution of custom requests using the Wordpress API directly.

#### Configuration Fields

* **Don't throw an error on 404 Response** - (optional, boolean): Configures the handling of 404 HTTP responses as non-errors. The default is `false`.

#### Input Metadata

* **Url** - (string, required): Path of the resource relative to the base URL (here comes a part of the path that goes after `https://your-site.com/wp-json`).
* **Method** - (string, required): Specifies the HTTP method for the request.
* **Request Body** - (object, optional): The body content for the request.

#### Output Metadata

* **Status Code** - (number, required): The HTTP response status code.
* **HTTP headers** - (object, required): The response's HTTP headers.
* **Response Body** - (object, optional): The body of the HTTP response.

### Upsert Object

This action updates an existing object or creates a new one, depending on the selected operation.

#### Configuration Fields

* **Operation** - (dropdown, required): Choose the operation to perform - either `Update` or `Create`.
* **Object Type** - (dropdown, required): Select the type of object to update or create. Currently supported types are:
    - Posts
    - Media
    - Comments
    - Users

#### Input Metadata

Fields are dynamically generated based on the selected `Object Type`.

#### Output Metadata

The result object from the create or update operation.