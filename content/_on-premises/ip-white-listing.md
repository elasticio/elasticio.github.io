---
layout: article
title: IP White-Listing
order: 4
section: Operation Guides
description: Document lists public IP addresses of our clusters to white-list if required.
category: operation
---

{: .no_toc}

{{page.description}}

- TOC
{:toc}

## Introduction

Sometimes you would like to access resources behind the firewall from elastic.io
tasks, and most of the times your firewall configured to white-list IP addresses
that may have access to resources behind it, for example on AWS you may enter a
specific IP address so that only connections from this IP address would be allowed
to let in (see more [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/authorizing-access-to-an-instance.html)).
This frequently used for limiting access to the database, or any other systems.

To make this configuration you would need to know from which IP address the
communication will be done when elastic.io tasks will try to establish a connection.

## EU cluster

The EU cluster which hosts `app.elastic.io` among other tenants has the following
outgoing IP addresses:

*   `92.5.117.7`
*   `130.162.33.7`

## US cluster

*   `193.122.172.111`
