---
title: Configure your firewall
layout: article
section: Basic Concepts
description: Information about the IP addresses to white-list for your firewall.
order: 1
---

Sometimes you would like to access resources behind the firewall from {{site.data.tenant.name}} tasks, and most of the times your firewall configured to whitelist IP addresses that may have access to resources behind it, for example on AWS you may enter a specific IP address so that only connections from this IP address would be allowed to let in (see more [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/authorizing-access-to-an-instance.html)). This frequently used for limiting access to the database, or any other systems.

To make this configuration you would need to know from which IP address the communication will be done when {{site.data.tenant.name}} tasks will try to establish a connection.

## IP Address of public cluster

Please contact the {{site.data.tenant.supportEmail}} to get IP-Address to whitelist.

## IP Address {{site.data.tenant.name}} private cluster

If you have a dedicated or private cluster running {{site.data.tenant.name}} instance please consult our support for the list of IP Addresses.

## VPN connection

You also have an option to establish a VPN tunnel to {{site.data.tenant.name}} environment, please consult the support for more details.
