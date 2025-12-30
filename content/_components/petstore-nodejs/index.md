---
title: Petstore-nodejs component
layout: component
section: Utility components
description: A first step component to deploy into our platform.
category: petstore-nodejs
icon: petstore.png
icontext: Petstore-nodejs componentt
updatedDate: 2025-11-14
ComponentVersion: 1.0.6
---

## Description

A fully working and operational component template to use for starting development of your
own component on the platform. This component comes with a basic architecture which you can use on the platform.

Our documentation on [building components in nodejs](/guides/building-nodejs-component)
has more about each including file and their function.

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Petstore-nodejs component like [changelog](/components/petstore-nodejs/technical-notes#changelog).

## Requirements

To use this component you must be registered platform user. Please see our home
page at [{{site.data.tenant.name}}](http://www.{{site.data.tenant.name}}) to learn how to register.

### Authentication

To authenticate use `secret` as an API key.

## Triggers

### Get Pets By Status

Retrieves pets from the Petstore API by given pet status using Dynamic or Static
Data Sample. The difference is how these functions are made. However, both can have
the following statuses defined by the Petstore API.

![Get Pets By Status](img/petstore-trigger.png)

The input fields are:

*   `Available` - select to get all pets with status `Available`.
*   `Pending` - select for `Pending`.
*   `Sold` - select for `Sold`.

## Actions

### Creates a new pet

Creates a new Pet by making a `POST` to `/pet` endpoint of the API.

![Creates a new pet](img/create-a-new-pet.png)

The input fields are:

*   `name` - the name of the pet.
*   `status` - the status which can have one `Available`, `Pending` and `Sold` values.

## File Structure

The structure of **petstore-component-nodejs** component is quite flexible.
Our platform expects only two files to be present in the main directory. These are the ``component.json`` and ``package.json``. Our documentation on [how to build a component in node.js](/guides/building-nodejs-component) has more detail about each file and its function.
