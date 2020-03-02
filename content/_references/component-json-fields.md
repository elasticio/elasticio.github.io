---
title: Fields in Component.json
description: This technical reference describes the structure of the various fields sections of the component.json manifest file/component descriptor file
layout: article
section: Component.json Technical Reference
order: 5
category: component descriptor
---

Each key-value pair in the object represents a field that is exposed. The string key acts as the identifier for the field.  The structure of the field object is described below.

## Fields Object

The **Fields Object** specifies how to render an input field used to collect the
input from a user that is required for a component to work properly.

For example, fields object is used for providing credentials to authenticate with
the given API or to configure a trigger/action with some parameters:

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| label	      | `string` |  Yes	    | Label for the input field |
| viewClass	  | `string` |  Yes	    | Specifies how to render an input field |
| required	  | `boolean`|          | Specifies whether a value for this input is required or not. If not present then the value is false by default |
| model	      | `object` or `string` |      | Used only with `SelectView` to define the available options for selection. If the value is of type object, the property name of this JSON object are used as option keys and the values as option labels. Instead of defining a JSON object it is possible to use a name of a function exposed by a component that returns such a JSON object.|
| prompt      |	`string` |           | Used only with `SelectView` or `SelectPropertyView` when no option is selected |
| prefix      | `string` |           | Used with `TextFieldView` or `TextFieldWithNoteView` to display a prefix for an input field. |
| suffix      | `string` |           | Used with `TextFieldView` or `TextFieldWithNoteView` to display a suffix for an input field. |
| require	    | `string` |           | Specifies an arrays of field names that this field depends on and requires to valid.|
| placeholder	| `string` |           | Used to pre-fill descriptive text on an HTML form.|

Any object implementation is directly connected with one or several `View Class`
definitions, therefore it is [advisable to check them as well](view-classes).
