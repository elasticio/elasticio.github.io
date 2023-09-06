---
title: Pipedrive component
layout: component
section: CRM components
description: An integration component for Pipedrive.
icon: pipedrive.png
icontext: Pipedrive component
category: pipedrive
updatedDate: 2023-04-07
ComponentVersion: 1.0.0
---

Pipedrive Component component for the [{{site.data.tenant.name}} platform](http://www.{{site.data.tenant.name}}).

## Getting started

### Authentication

You need to configure your company domain and access token to authenticate the
pipedrive component for pipedrive.

### Create Deals

You can create deals with the help of the `createDeal` action. It will
automatically create an organisation, a contact, a deal and a notice for the deal for you.

### Technical Notes

The [technical notes](technical-notes) page gives some technical details about Pipedrive component like [changelog](/components/pipedrive/technical-notes#changelog).

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Create Activity

Create a new activity in pipedrive:

{% include img.html max-width="100%" url="img/create-a-new-activity.png" title="Create Activity" %}

### Create Deals

Create a new deal in pipedrive:

{% include img.html max-width="100%" url="img/create-a-new-deal.png" title="Create Deals" %}

### Create Note

Create a new note in pipedrive:

{% include img.html max-width="100%" url="img/create-a-new-note.png" title="Create Note" %}

### Create Organisation

Create a new organisation in pipedrive:

{% include img.html max-width="100%" url="img/create-a-new-organisation.png" title="Create Organisation" %}

### Create Person

Create a new person in pipedrive:

{% include img.html max-width="100%" url="img/create-a-new-person.png" title="Create Person" %}
