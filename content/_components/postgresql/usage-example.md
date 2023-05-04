---
title: PostgreSQL Usage Example
layout: component
description: PostgreSQL Usage Example.
icon: postgresql.png
icontext: PostgreSQL Component
category: postgresql-component
updatedDate: 2021-11-26
ComponentVersion: 1.4.2
---

## Usage

The PostgreSQL component is an open-source component for working with a [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL) object-relational database management system on the platform it also works well with [AWS Redshift](https://aws.amazon.com/redshift/).

## Client Use Case

PostgreSQL databases are a popular choice for many organizations to store their critical data, including customer information in CRM systems. However, when switching to a new CRM system, it's important to ensure that access to customer data is not lost. This is where the PostgreSQL component comes in handy. By copying and updating the data that comes from the CRM system, the component enables the data to be stored in the database, ensuring continued access to customer information. Overall, the PostgreSQL component provides an effective solution for organizations to maintain data continuity when upgrading their CRM systems. Let's start with our use case.

<details close markdown="block"><summary><strong>Flow view</strong></summary>

{% include img.html max-width="50%" url="img/flow-view.png" title="Flow view" %}

</details>

We have the 1st step PostgreSQL component with a [SELECT](triggers#select-trigger-and-action) as a trigger. In our flow, it will emulate the output of the CRM system. Bundle results in batches are enabled to get an array of values.

{% include img.html max-width="100%" url="img/first-step.png" title="First step" %}

<details close markdown="block"><summary><strong>CRM System output</strong></summary>

```json
{
  "values": [
    {
      "code": 1,
      "firstname": "Josh",
      "lastname": "Howe",
      "birthdate": "1975-08-12T00:00:00.000Z",
      "country": "USA"
    },
    {
      "code": 2,
      "firstname": "Melisia",
      "lastname": "Gogiani",
      "birthdate": "1997-01-06T00:00:00.000Z",
      "country": "Italy"
    },
    {
      "code": 3,
      "firstname": "Bob",
      "lastname": "Groll",
      "birthdate": "1991-10-15T00:00:00.000Z",
      "country": "UK"
    },
    {
      "code": 4,
      "firstname": "Fiona",
      "lastname": "Nowak",
      "birthdate": "2000-01-29T00:00:00.000Z",
      "country": "Poland"
    },
    {
      "code": 5,
      "firstname": "Oleg",
      "lastname": "Honko",
      "birthdate": "1984-03-30T00:00:00.000Z",
      "country": "Ukraine"
    },
    {
      "code": 6,
      "firstname": "Casey",
      "lastname": "Short",
      "birthdate": "1987-05-23T00:00:00.000Z",
      "country": "Australia"
    }
  ]
}
```

</details>

The second step involves using the PostgreSQL component again, this time to SELECT the "clients" table previously written to the database. The key idea here is that the table may contain clients that are different from those in the CRM system. To handle this situation, we need to first save the existing data in the table, and then clear it before inserting the combined data from the database and CRM. To accomplish this, we will use an [SQL Query](actions#sql-query-action) action.

{% include img.html max-width="100%" url="img/second-step.png" title="Second step" %}

<details close markdown="block"><summary><strong>Database output</strong></summary>

```json
{
  "result": [
    [
      {
        "firstname": "Bob",
        "lastname": "Groll",
        "birthdate": "1991-10-15T00:00:00.000Z",
        "country": "UK"
      },
      {
        "firstname": "Casey",
        "lastname": "Short",
        "birthdate": "1987-05-23T00:00:00.000Z",
        "country": "Australia"
      },
      {
        "firstname": "Melisia",
        "lastname": "Gogiani",
        "birthdate": "1997-01-06T00:00:00.000Z",
        "country": "Italy"
      },
      {
        "firstname": "Oleg",
        "lastname": "Honko",
        "birthdate": "1984-03-30T00:00:00.000Z",
        "country": "Ukraine"
      }
    ],
    []
  ]
}
```

</details>

The 3rd step involves using the [JSONata](/components/jsonata) component. Since our CRM output includes a column for client code ID, we need to remove it. Additionally, since the CRM and database IDs may not necessarily match, we must use other parameters to compare old and new clients. For our purposes, we will use first name, last name, birth date, and country.

{% include img.html max-width="100%" url="img/third-step.png" title="Third step" %}

<details close markdown="block"><summary><strong>CRM transformation expression</strong></summary>

```
{
  "crm": $crm := $getPassthrough()."step_1".body.values ~> |$|{}, ['code']|
}
```

</details>

<details close markdown="block"><summary><strong>JSONata transformation output with first name, last name, birth date, and country information</strong></summary>

```json
{
  "crm": [
    {
      "firstname": "Josh",
      "lastname": "Howe",
      "birthdate": "1975-08-12T00:00:00.000Z",
      "country": "USA"
    },
    {
      "firstname": "Melisia",
      "lastname": "Gogiani",
      "birthdate": "1997-01-06T00:00:00.000Z",
      "country": "Italy"
    },
    {
      "firstname": "Bob",
      "lastname": "Groll",
      "birthdate": "1991-10-15T00:00:00.000Z",
      "country": "UK"
    },
    {
      "firstname": "Fiona",
      "lastname": "Nowak",
      "birthdate": "2000-01-29T00:00:00.000Z",
      "country": "Poland"
    },
    {
      "firstname": "Oleg",
      "lastname": "Honko",
      "birthdate": "1984-03-30T00:00:00.000Z",
      "country": "Ukraine"
    },
    {
      "firstname": "Casey",
      "lastname": "Short",
      "birthdate": "1987-05-23T00:00:00.000Z",
      "country": "Australia"
    }
  ]
}
```

</details>

The 4th step involves using the [JSONata](/components/jsonata) component again, which will combine the transformed CRM output with the database output and then distinguish between the two.

{% include img.html max-width="100%" url="img/fourth-step.png" title="Fourth step" %}

<details close markdown="block"><summary><strong>Clients transformation expression</strong></summary>

```
{
 "result":  $distinct($append($getPassthrough()."step_2".body.clients[], crm[]))
}
```

</details>

<details close markdown="block"><summary><strong>JSONata transformation output with clients from CRM and database</strong></summary>

```json
{
  "result": [
    {
      "firstname": "Josh",
      "lastname": "Howe",
      "birthdate": "1975-08-12T00:00:00.000Z",
      "country": "USA"
    },
    {
      "firstname": "Melisia",
      "lastname": "Gogiani",
      "birthdate": "1997-01-06T00:00:00.000Z",
      "country": "Italy"
    },
    {
      "firstname": "Bob",
      "lastname": "Groll",
      "birthdate": "1991-10-15T00:00:00.000Z",
      "country": "UK"
    },
    {
      "firstname": "Fiona",
      "lastname": "Nowak",
      "birthdate": "2000-01-29T00:00:00.000Z",
      "country": "Poland"
    },
    {
      "firstname": "Oleg",
      "lastname": "Honko",
      "birthdate": "1984-03-30T00:00:00.000Z",
      "country": "Ukraine"
    },
    {
      "firstname": "Casey",
      "lastname": "Short",
      "birthdate": "1987-05-23T00:00:00.000Z",
      "country": "Australia"
    }
  ]
}
```

</details>

The fifth and final step involves using the PostgreSQL component with the [INSERT Bulk](actions#insert-bulk-action) action, which will write a new table with the combined and distinguished clients from the previous step's output.

{% include img.html max-width="100%" url="img/fifth-step.png" title="Fifth and final step" %}

The output will be written in the “clients” table stored in the database:

{% include img.html max-width="100%" url="img/clients-table.png" title="Clients table" %}
