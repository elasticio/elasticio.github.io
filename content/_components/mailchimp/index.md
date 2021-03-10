---
title: Mailchimp component
layout: component
section: Marketing-related components
description: A open standard application layer protocol for passing business messages between applications or organizations.
icon: mailchimp.png
icontext: Mailchimp component
category: mailchimp
updatedDate: 2020-11-10
ComponentVersion: 1.0.2
---

## Credentials

![Credentials](img/credentials.png)

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Add new Subscriber

Upserts information about the subscriber in the list,
if subscriber with given e-mail already exists then information will be updated. If not will be added.

![Add new Subscriber](img/add-new-subscriber.png)

This method uses:

``PUT /lists/{list_id}/members/{subscriber_hash}``

See [here](http://developer.mailchimp.com/documentation/mailchimp/reference/lists/members/#edit-put_lists_list_id_members_subscriber_hash)
for more information

### Unsubscribe

This action unsubscribes user from the given list:

![Unsubscribe](img/unsubscribe.png)

Actions uses following HTTP method:

``DELETE /lists/${listId}/members/${hash}``

See [here](http://developer.mailchimp.com/documentation/mailchimp/reference/lists/members/#delete-delete_lists_list_id_members_subscriber_hash)
for more information.

### Upsert Customer

Upserts information about the customer in the list,
if cubscriber already exists then information will be updated. If not will be added.

![Upsert Customer](img/upsert-customer.png)

See [here](http://developer.mailchimp.com/documentation/mailchimp/reference/lists/members/#delete-delete_lists_list_id_members_subscriber_hash)
for more information.
