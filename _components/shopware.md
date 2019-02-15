---
title: Shopware component
layout: article
section: E-Commerce Components
---


> Shopware _component_ for the [elastic.io platform](http://www.elastic.io
"elastic.io platform")

This is component for [Shopware](https://shopware.com/) eCommerce software which
is developed specifically to run on [elastic.io platform](http://www.elastic.io
"elastic.io platform"). You can clone it and change it as you wish. However,
**if you plan to deploy it into [elastic.io platform](http://www.elastic.io
"elastic.io platform") you must follow sets of instructions to succeed**.

## Before you Begin

> **PLEASE NOTE:** This component depends on [Shopware REST API
extenstions](https://github.com/elasticio/elasticio-shopware-api-extension),
please install it first before proceeding further.

Before you can deploy any code into our system **you must be a registered
elastic.io platform user**. Please see our home page at
[http://www.elastic.io](http://www.elastic.io) to learn how.

> Any attempt to deploy a code into our platform without a registration would
fail.

After the registration and opening of the account you must **[upload your SSH
Key](http://docs.elastic.io/docs/ssh-key)** into our platform.

> If you fail to upload you SSH Key you will get **permission denied** error
during the deployment.

## Getting Started

After registration and uploading of your SSH Key you can proceed to deploy it
into our system. At this stage we suggest you to:
* [Create a team](http://docs.elastic.io/page/team-management) to work on your
* new component. This is not required but will be automatically created using
* random naming by our system so we suggest you name your team accordingly.
* [Create a repository](http://docs.elastic.io/page/repository-management) where
* your new component is going to *reside* inside the team that you have just
* created.

```bash
$ git clone https://github.com/elasticio/shopware.git shopware

$ cd shopware
```
Now you can edit your version of **shopware** component and change according to
your needs - that is if you know what you are doing. Or you can just ``PUSH``it
into our system to see the process in action:

```bash
$ git remote add elasticio your-created-team-name@git.elastic.io:shopware.git

$ git push elasticio master
```
Obviously the naming of your team and repository is entirely up-to you and if
you do not put any corresponding naming our system will auto generate it for you
but the naming might not entirely correspond to your project requirements.

To learn on how to use this component please check our [Shopware component
documentation](http://docs.elastic.io/docs/shopware).

## Query Articles/Products
Shopware has a concept of ``Artikel`` in German which their UI translates to
``Products`` in English which is available through their API at the ``/article``
endpoint.  There is a trigger ``Query Articles`` which queries for new & updated
products.  The results are returned in batches of the form

    {
        data:
        [
            //items
        ]
    }

The batch size is configurable as a parameter.  The batches can be broken up by
the [JSONata
mapper](https://support.elastic.io/support/solutions/articles/14000069448-jsonata-powered-mapper)
as they proceed to the next step.

The output of this method includes only information about the product.  It does
not include information about the variants of the article.  This information can
be obtained by having the ``Query Articles`` trigger followed by the ``Get
Article Details By Id`` action.  This action will return all the details for an
article including information about the articles variants.


## Shopware API Limitations/Improvements
The Shopware API has many shortcomings which limit the ability to use Shopware
out of the box.  [Shopware allows for features to be requested in their issue
tracker](http://en.community.shopware.com/_detail_1282.html#Ticket_overview).
Here are some of the feature requests which would allow additional functionality
to be built into the component for out of the box functionality.

* [Allow elastic.io to detect changes to product
 variants](https://issues.shopware.com/issues/SW-19617)
* [Allow elastic.io to differentiate between new and updated
 objects](https://issues.shopware.com/issues/SW-19619)
* [Allow elastic.io to detect changes to
 customers](https://issues.shopware.com/issues/SW-19618)
* [Allow elastic.io to detect changes to
 orders](https://issues.shopware.com/issues/SW-17467)
