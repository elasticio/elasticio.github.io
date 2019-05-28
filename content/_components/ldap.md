---
title: Ldap component
layout: article
section: Utility Components
---

LDAP component for the [{{site.data.tenant.name}} platform](http://www.{{site.data.tenant.name}})

Lightweight Directory Access Protocol is an open, vendor-neutral, industry
standard application protocol for accessing and maintaining distributed
directory information services over an Internet Protocol (IP) network. Directory
services play an important role in developing intranet and Internet applications
by allowing the sharing of information about users, systems, networks, services,
and applications throughout the network.

# Actions
## Search
Performs an [LDAP search operation](https://www.ldap.com/the-ldap-search-operation) on the instance.
* *Base* refers to the base object in the directory from which to start the search.
* *Filter* allows you to specify one or more [LDAP
 filters](https://www.ldap.com/ldap-filters) to restrict the results of the
 search.
* *Scope* refers to the [search
 scope](https://www.ldap.com/the-ldap-search-operation).  Options are `base`,
 `one` or `sub` (sometimes called `baseObject`, `singleLevel` or `wholeSubtree`
 respectively). The `subordinates` (a.k.a. `subordinateSubtree`) scope is not
 yet supported.

Each matched result is returned individually.

# Development
This component has some integration tests.  In order to run the integration
tests, one needs to create a `.env` file which contains the following
environment variables:

```
LDAP_URL=<URL To Test Instance>
LDAPUSER=<User For Test Instance>
PASSWORD=<Password For Test Instance>
BASE=<Search Criteria which should match exactly 4 results>
```

# Configuration Info
## Required environment variables
No environment variables need to be configured.

## Version and compatibility information
This component interacts with LDAP v3.

## License

Apache-2.0 © [{{site.data.tenant.name}} GmbH]({{site.data.tenant.name}})
