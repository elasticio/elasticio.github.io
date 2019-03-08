---
title: Mailchimp component
layout: article
section: Utility Components
---

Mailchimp connector for {{site.data.tenant.name}} platform

## Actions

### Subscribe

Upserts information about the subscriber in the list,
if subscriber with given e-mail already exists
 then information will be updated.

 This method uses:

````PUT /lists/{list_id}/members/{subscriber_hash}````

see [here](http://developer.mailchimp.com/documentation/mailchimp/reference/lists/members/#edit-put_lists_list_id_members_subscriber_hash)
for more information

### Unsubscribe

This action unsubscribes user from the given list, it uses following HTTP method:

```DELETE /lists/${listId}/members/${hash}```

see [here](http://developer.mailchimp.com/documentation/mailchimp/reference/lists/members/#delete-delete_lists_list_id_members_subscriber_hash)
for more information
