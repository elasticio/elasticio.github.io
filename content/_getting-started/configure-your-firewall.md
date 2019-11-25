---
title: Configure your firewall
layout: article
section: Basic Concepts
order: 1
---

Sometimes you would like to access resources behind the firewall from [{{site.data.tenant.name}}]({{site.data.tenant.name}}) tasks, and most of the times your firewall configured to whitelist IP addresses that may have access to resources behind it, for example on AWS you may enter a specific IP address so that only connections from this IP address would be allowed to let in (see more [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/authorizing-access-to-an-instance.html)). This frequently used for limiting access to the database, or any other systems.

To make this configuration you would need to know from which IP address the communication will be done when elastic.io tasks will try to establish a connection.

## IP Address elastic.io public cluster

All communication from elastic.io public cluster will happen from these IP addresses:

```
34.89.239.141
35.198.112.50
35.198.130.69
35.198.76.84
35.234.109.139
35.234.127.60
35.234.66.114
35.234.86.19
35.234.88.7
35.235.38.94
35.242.203.179
35.242.252.95
35.242.254.113
35.246.192.34
35.246.206.29
```

> **Note:** Please add these IPs to the list of whitelisted IP addresses.

## IP Address elastic.io private cluster

If you have a dedicated or private cluster running elastic.io instance please consult our support for the list of IP Addresses.

## VPN connection

You also have an option to establish a VPN tunnel to elastic.io environment, please consult the support for more details.
