---
title: Lookup Table component
layout: component
section: Utility components
description: Component to convert or replace incoming values using a Lookup table
icon: lookup.png
icontext: Lookup component
category: lookup
ComponentVersion: 1.2.0
updatedDate: 2023-06-12
---

## Description

The Lookup From Table Component can be used to convert from different tables that
parsed as a CSV.

### Credentials

`CSV Table`: The CSV is entered on the Credentials page as a list of separated
items. Any delimiter is supported. The CSV will be parsed using the first row as
a header for each column below it. The CSV must be able to be interpreted as a
rectangle, i.e. it cannot be missing values.

For example,

```
English,Abbreviated,German
male,M,männlich
female,F,weiblich
other,O,divers
unknown,U,unbekannt
```

Will parse as

| English | Abbreviated | German    |
|---------|-------------|-----------|
| male    | M           | männlich  |
| female  | F           | weiblich  |
| other   | O           | divers    |
| unknown | U           | unbekannt |

and

```
English,Abbreviated,German
male,M,männlich
,F,weiblich
other,,
unknown,U,unbekannt
```

Will parse correctly as

| English | Abbreviated | German    |
|---------|-------------|-----------|
| male    | M           | männlich  |
|         | F           | weiblich  |
| other   |             |           |
| unknown | U           | unbekannt |

(though this may not be useful), but

```
English,Abbreviated,German
male,M,männlich
F,weiblich
other
unknown,U,unbekannt
```

will provide a failed result.

> The CSV can only be a maximum of 5kB, and if it contains any duplicate values
> in a given column, it will fail validation.

### How it works

To utilize the Lookup Table component, you need to provide a valid CSV table in the component's credentials. It's important to note that the CSV file should not exceed 5kB in size, and if it contains any duplicate values within a specific column, it will fail the validation process.

The Lookup Table component supports the **Lookup From Table** action exclusively. It enables you to establish relationships between your configured values based on the columns present in the CSV table. To ensure proper configuration, each column in the CSV table should have a corresponding header name, which you can pass into the Lookup Table component's Configuration.

{% include img.html max-width="100%" url="img/lookup-table-config.png" title="Lookup table configuration" %}

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Lookup Table component like [changelog](/components/lookup-table/technical-notes#changelog).

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Lookup From Table

The Lookup From Table action allows you to establish relationships between the values in different columns of your CSV table. To configure this action, you need to select two columns from your CSV table: **column X** and **column Y**.

Once the columns are chosen, you can specify the input value from **column X**. The Lookup Table component will then search for a corresponding match in **column X** and return the value from **column Y** that is present in the same row.

In summary, the result of the Lookup From Table action will be the value from **column Y**, which corresponds to the selected input value from **column X** in the Mapping process. This enables you to retrieve and utilize specific values from the CSV table based on your configured mappings.

{% include img.html max-width="100%" url="img/lookup-table-mapping.png" title="Lookup table mapping" %}

> To gain a better understanding of how the Lookup Table component functions, we highly recommend reviewing a [brief example](usage-example). This example will provide you with practical insights into the component's operation and usage.

#### Input Configuration

*  `Emit empty object on unsuccessful lookup` - is a checkbox. If selected, an empty object {} will be emitted given an unsuccessful lookup where nothing is found. If not selected, an error will be thrown on an unsuccessful lookup.
* `From this column`: the column to translate from
* `To this column`: the column to translate to
* `Duplicates behavior`: How to handle cases when found several records in selected `From this column` in provided table, options:
    - `Emit all mach individually` - Will emit each record as separate message
    - `Emit all mach as Array` - Will emit all founded records as array of strings
    - `Emit first found` - Will emit first founded record
    - `Throw an error (Default)` - By default error will be thrown

#### Expected input metadata

As input in Mapping, you must choose any value from column X that you put in From this table field.

#### Expected output metadata

-   if lookup is successful, an object of the type `{"result": "value"}` will be emitted
-   if lookup is unsuccessful and emitting empty object, `{}` will be emitted
-   if lookup is unsuccessful and not emitting an empty object, and error will be emitted

## Additional Info

- Any elements of the CSV that contain the delimiter in them should be wrapped in `"double quotes"`. Any elements of the CSV that contain the delimiter and also quotations should have the quotes backspaced.
e.g.

```
Full Name,First,Last
"Bond,James",James,Bond
"Johnson, Dwayne \"The Rock\"",Dwayne,Johnson
```

- If you want to mark an element as a string (e.g. "5" or "Some text inside a single element"), you must use `"`, not `'`, because `'` is considered as an additional character. So in this case:
2 is the same as "2", but '2' would be equal to "'2'".

### Known Limitations

- the CSV has a max size of 5kB.
- the CSV must be able to be parsed as a rectangle.
- the CSV must not contain any duplicates in column values.
- the CSV must not contain text as **number values**.

Example:

{% include img.html max-width="100%" url="img/lookup-table-text-content.png" title="Lookup table text content" %}
