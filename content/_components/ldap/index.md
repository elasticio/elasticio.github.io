---
title: Ldap component
layout: component
section: Protocol components
description: A protocol for accessing and maintaining distributed directory information services over an IP network.
icon: ldap.png
icontext: Ldap component
category: Ldap component
createdDate: 2017-12-06
updatedDate: 2017-12-06
---

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Search

Performs an [LDAP search operation](https://www.ldap.com/the-ldap-search-operation) on the instance.
* *Base* refers to the base object in the directory from which to start the search.
* *Filter* allows you to specify one or more [LDAP filters](https://www.ldap.com/ldap-filters) to restrict the results of the search.
* *Scope* refers to the [search scope](https://www.ldap.com/the-ldap-search-operation).  Options are `base`,
 `one` or `sub` (sometimes called `baseObject`, `singleLevel` or `wholeSubtree`
 respectively). The `subordinates` (a.k.a. `subordinateSubtree`) scope is not
 yet supported.

Each matched result is returned individually.

## Development

This component has some integration tests.  In order to run the integration
tests, one needs to create a `.env` file which contains the following
environment variables:

```
LDAP_URL=<URL To Test Instance>
LDAPUSER=<User For Test Instance>
PASSWORD=<Password For Test Instance>
BASE=<Search Criteria which should match exactly 4 results>
```

## Configuration Info

### Required environment variables

No environment variables need to be configured.

### Version and compatibility information

This component interacts with LDAP v3.
