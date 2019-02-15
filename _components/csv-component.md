---
title: Csv-component component
layout: article
section: Utility Components
---

A CSV component for the [elastic.io platform](http://www.elastic.io "elastic.io platform").


## Write CSV attachment

Multiple incoming events can be combined into one CSV file with the write CSV
action.  Incoming events will be written into the CSV file until there is a gap
of more than 10 seconds between events.  As part of the component setup, one
must specify the columns of the CSV file.  These columns will be published as
the header in the first row.  For each incoming event, the value for each header
will be stringified and written as the value for that cell.  All other
properties will be ignored.  For example, headers ``foo,bar`` along with the
following JSON events

    {"foo":"myfoo", "bar":"mybar"}
    {"foo":"myfoo", "bar":[1,2]}
    {"bar":"mybar", "baz":"mybaz"}

will produce the following ``.csv`` file:

    foo,bar
    myfoo,mybar
    myfoo,"[1,2]"
    ,mybar

When columns are added in the UI, you will be presented with an opportunity to
provide a JSONata expression per column.  If you require number formatting that
is specific to a locale, the JSONata expression should handle that concern.

![screenshot from 2017-10-17 09-28-04](https://user-images.githubusercontent.com/5710732/31651871-926b4530-b31d-11e7-936f-bcf3ff05f8e2.png)

The output of the CSV Write component will be a message with an attachment.  In
order to access this attachment, the component following the CSV Write must be
able to handle file attachments such as the [SFTP
component](https://github.com/elasticio/sftp-component).

This is an open source component to work with
[CSV](http://en.wikipedia.org/wiki/Comma-separated_values) files in your
integration flow and is developed specifically to run on [elastic.io
platform](http://www.elastic.io "elastic.io platform"). You can clone it and
change it as you wish. However, **if you plan to deploy it into [elastic.io
platform](http://www.elastic.io "elastic.io platform") you must follow sets of
instructions to succeed**.

> **PLEASE NOTE:** This is a working component for **CSV** files, however, it
may not be suitable for every use case. Not all functionality is included in
this component template. **It is your responsibility to add and modify this
component to suit your integration needs.**

## Before you Begin

Before you can deploy any code into our system **you must be a registered
elastic.io platform user**. Please see our home page at
[http://www.elastic.io](http://www.elastic.io) to learn how.

> Any attempt to deploy a code into our platform without a registration would fail.

After the registration and opening of the account you must **[upload your SSH
Key](http://docs.elastic.io/docs/ssh-key)** into our platform.

> If you fail to upload you SSH Key you will get **permission denied** error
during the deployment.

## Getting Started

After registration and uploading of your SSH Key you can proceed to deploy it
into our system. At this stage we suggest you to:
* [Create a team](http://docs.elastic.io/page/team-management) to work on your
 new component. This is not required but will be automatically created using
 random naming by our system so we suggest you name your team accordingly.
* [Create a repository](http://docs.elastic.io/page/repository-management) where
* your new component is going to *reside* inside the team that you have just
* created. For a simplicity you can name your repository **csv-component** or
* **csv**.

```bash
$ git clone https://github.com/elasticio/csv-component.git csv-component

$ cd csv-component
```
Now you can edit your version of **csv-component** component and change
according to your needs - that is if you know what you are doing. Or you can
just ``PUSH``it into our system to see the process in action:

```bash
$ git remote add elasticio your-created-team-name@git.elastic.io:csv-component.git

$ git push elasticio master
```
Obviously the naming of your team and repository is entirely up-to you and if
you do not put any corresponding naming our system will auto generate it for you
but the naming might not entirely correspond to your project requirements.
