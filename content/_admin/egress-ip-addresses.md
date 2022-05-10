---
title: Egress IP Addresses for IP Whitelisting
layout: article
section: elastic.io Specific Settings
description: Document lists public egress IP addresses of our clusters to whitelist if required.
order: 1
category: support
---

## Summary

*   Traffic from the {{site.data.tenant.name}} platform comes from fixed IP addresses
*   The fixed IP addresses are listed on this page
*   {{site.data.tenant.companyName}} commits to supporting the ability to allowing integrators to add  {{site.data.tenant.name}} IP addresses to their whitelists

---

## Egress IP List for app.elastic.io

The EU cluster which hosts `app.elastic.io` among other tenants has the following
outgoing IP addresses:

*   `34.89.196.206`
*   `34.159.187.160`

## Egress IP List for app-us.elastic.io

The US cluster which hosts `app-us.elastic.io` among other tenants has the following
outgoing IP addresses:

*   `35.245.125.178`

## Details

IP connections that originate from a step within a flow within the {{site.data.tenant.name}} platform will be randomly routed through one of the IP addresses listed below. If you have enabled IP whitelisting on your server, all IP addresses listed below should be added to the IP whitelist of that server.

The IP addresses listed below are common to all {{site.data.tenant.name}} users. If you would like to have egress IP traffic routed through an IP address that is exclusive to you, then the [VPN agents](/guides/vpn-agent) feature can be used to achieve this.

In the future, {{site.data.tenant.companyName}} may need to add or remove IP addresses from the lists below. In this case, {{site.data.tenant.companyName}} will proactively inform you of these changes.



## Background Context

IP whitelisting is the practice configuring a server to only accept incoming IP traffic from a set list of whitelisted static IP addresses. This is a defence in depth technique which provides additional security by requiring an attacker to obtain both the credentials to the server and access to an IP address on the whitelist.
