---
title: General Principles
description: This documents describes email templating, customisation and their priorities for Raven.
layout: article
category: platform-emails
---

{: .no_toc}

{{page.description}}

- TOC
{: toc}

## Introduction

The platform can send emails to inform about specific events and necessary actions
like the password reset, invitations to join, error notifications and more.
You can customize the look and feel of these emails as well as
[disable them in your Tenant](configuration).

We use the [**Raven**](/on-prem/kubernetes/raven) service by posting a special
request to it's API. These requests trigger email formation on basis of templates
and values passed as arguments in the requests.

## Selecting Templates

Generally template is text with placeholders that system replaces with concrete
values at send moment. It takes the concrete values from the Raven's API arguments call.

Platform chooses the templates by unique identifier passed as a part of Raven's API
call URL (`templateName`).

There are two classes of templates: Default and Custom.
1.  **Default** email templates are defined / hard-coded inside of service.
2.  **Custom** email templates are stored in the [Mongodb](/on-prem/mongodb), created edited and maintained by installation administrator (see details below). **You can define custom templates for each tenant separately.**

Each template consists of set localized versions. Default templates has
English localization (`locale=en`). Custom templates can have any locale.

When Raven sends email it selects template using the following priorities
(the lower is number the higher is priority):

1.  Custom template for tenant and `locale`
2.  Custom template for tenant and `locale=en`
3.  Custom template for tenant but with any `locale`
4.  Default template for `locale`
5.  Default template for `locale=en`

## Customize email templates

### Handlebars

These expressions add a flexibility and re-usability of templates.
For the details see the [handlebars docs](https://handlebarsjs.com/).

### Custom templates

You can set email templates by storing in the MongoDB (collection `templates`). They
should be tenant specific (field `tenantId`). Template record should look like this:

```json
{
    "tenantId": "mongo-object-id",
    "locale": "en",
    "name": "password-recovery",
    "message": {}
}
```

*   `tenantId` - id of tenant in which customized templates will be used
*   `locale` - language locale (default is `en`)
*   `name` - name of the template that should be replaced by custom one
*   `message` - object that contains all about template (see description below). As template engine we're using handlebars.


### Template priorities for raven


First raven will try to find template by given `name`, `tenantId` and `locale`.
If there's no such record it will try to find template by given `name` and `tenantId`
with `locale=en`. If there's no such record again it will just find any template
by given `name` and `tenantId` and use it. In case when raven unable to find any
one of mentioned templates it will use built-in system default templates.

For all the templates and their description continue reading the [Platform emails and templates](templates) article.

### Message field structure


Message field general structure (like in Mandrill):

{% raw %}
```json
{
    "from_name": "{{COMPANY}} team",
    "track_opens": true,
    "track_clicks": false,
    "auto_text": true,
    "url_strip_qs": false,
    "preserve_recipients": true,
    "merge_language": "handlebars",
    "global_merge_vars": [
        {
            "name": "CURRENT_YEAR",
            "content": "2018"
        },
        {
            "name": "APP_DOMAIN",
            "content": "app.elastic.io"
        }
    ]
}
```
{% endraw %}

*   `global_merge_vars` - required variables to be pasted into corresponding handlebars expressions

Here are the Mandrill specific fields (see [here for more description](https://mandrillapp.com/api/docs/messages.JSON.html#method=send)):

*   `track_opens`
*   `track_clicks`
*   `auto_text`
*   `url_strip_qs`
*   `preserve_recipients`
*   `merge_language`

This is how the `password-recovery` template should look like:

{% raw %}
```json
{
    "tenantId": "mongo-object-id",
    "locale": "en",
    "name": "password-recovery",
    "message": {
        "from_name": "{{{COMPANY}}} team",
        "track_opens": true,
        "track_clicks": false,
        "auto_text": true,
        "url_strip_qs": false,
        "preserve_recipients": true,
        "merge_language": "handlebars",
        "html": "Some new custom html string (with css)",
        "subject": "{{{COMPANY}}} password recovery",

        "global_merge_vars": [
            {
                "name": "CURRENT_YEAR",
                "content": "2018"
            },
            {
                "name": "APP_DOMAIN",
                "content": "app.elastic.io"
            },
            {
                "name": "SUBJECT",
                "content": "{{COMPANY}} password recovery"
            },
            {
                "name": "COMPANY",
                "content": "elastic.io GmbH"
            },
            {
                "name": "LIST_ADDRESS_HTML",
                "content": "list_address_html"
            },
            {
                "name": "CODE",
                "content": "12345"
            },
            {
                "name": "FNAME",
                "content": "TEST"
            }
        ]
    }
}
```
{% endraw %}

All other templates differ in `message`, `subject` and `global_merge_vars`
(whole message should be merged with Message field general structure, see above).

For all the templates and their description continue reading the [Platform emails and templates](templates) article.