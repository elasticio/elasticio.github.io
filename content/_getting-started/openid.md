---
title: OpenID
layout: article
section: Basic Concepts
description: This document provides basic information on OpenID and how it is used to perform user login to the Platform.
since: 20200130
order: 1
---

This document describes OpenID Connect and how we use it on the Platform, including some real use-cases.

## OpenID Connect
OpenID Connect (OIDC) lets developers authenticate users without taking on the responsibility of storing and managing passwords. OIDC creates a universal user ID, which includes the selected user data, and never shares this data, even for authentication purposes. Basically, it integrates with the site or application, and just safely approves login requests instead of sending usernames and passwords through the Internet.

With OIDC, even the site or application you are trying to log into, does not know your login data. It only requests ID confirmation from the OpenID Provider, and accepts it. OpenID is rapidly gaining adoption on the web, with over one billion OpenID enabled user accounts and over 50,000 websites accepting OpenID for logins.  Several large organizations either issue or accept OpenIDs, including Google, Facebook, Yahoo!, Microsoft, and many more.

## OpenID on the Platform
