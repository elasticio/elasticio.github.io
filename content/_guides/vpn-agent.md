---
title: VPN Agent
description: This document provides the basic information on VPN Agents and the way setup one in case you require one.
order: 11
layout: article
section: Building integration flows
category: building integration flows
redirect_from:
  - /references/local-agent.html
  - /references/local-agents-HyperV.html
  - /references/local-agents-requesting.html
  - /references/local-agents-VirtualBox.html
  - /getting-started/local-agent.html
  - /getting-started/vpn-agent.html
  - /references/vpn-agent.html
---

This document provides basic information on [VPN Agent](#vpn-agent), [how to set it up](#how-to-setup)
and [use it in your integration flow](#using-vpn-agent).

## VPN Agent

The VPN Agent or the Agent is а VPN tunnel specifically configured to access any
local resource in your local environment. It could be any local database or CRM
to which you would rather restrict access from outside world but still need
to query for a data.

When the Agent is configured the platform and your local resource communicate data
using the secure VPN tunnel. All the processing is happening on platform side, your
resource serves the role of data source or final destination of data depending on
your use case.

> Please note that you can manage VPN agents using API calls. You can find all the information you need about it [here]({{site.data.tenant.apiDocsUri}}/v2#/vpn%20agents).

## How to setup

To setup the Agent you would need to fulfill the following preconditions:

*   **You have a running local resource which has a local IP address and port.** The IP address should not be `127.0.0.1` or instead be `localhost`. Please consult the documentation of your resource on how to configure it.
*   **Working VPN client which accepts OpenVPN configurations.**
*   Optionally: Administrative rights to configure the local network on your host machine in case you have non-standard setup.

### Connecting to local database

As an example let us connect the locally running Mongo database with the platform.
Let's assume our local database is accessible on `192.168.1.7` address and `27017`
port (standard MongoDB port).

Navigate to left-hand-side menu, Integrate > Agents and press on **Create an Agent** button
if you don't have any Agents or press on **Create New Agent** button to add new one. You can also create a VPN agent using this [API endpoint]({{site.data.tenant.apiDocsUri}}/v2#/vpn%20agents/post_agents_vpn).

You will get a new pop-up form to fill in the details. Note you can extend the form
by selecting **Create New Endpoint**.

{% include img.html max-width="60%" url="/assets/img/getting-started/vpn-agent/vpn-agent-form-empty.png" title="VPN Agent request form" %}

Let us fill in the needed values:

1.  Give a proper name to remember what is it for. We will use `MongoDB_local_com`.
2.  Select from drop-down menu the connection protocol type `TCP` or `UDP`. We use `TCP` because we use MongoDB and it uses TCP protocol.
3.  Enter the IP address and the port. In our case we will add `192.168.1.7` and `27017`.

{% include img.html max-width="60%" url="/assets/img/getting-started/vpn-agent/vpn-agent-form-filled.png" title="VPN Agent request form filled" %}

Click **Save** to save all entry values and submit to the system. After this the
form will disappear and a new record appear in the page. Click on newly created
record to see the details.

{% include img.html max-width="60%" url="/assets/img/getting-started/vpn-agent/vpn-agent-form-final.png" title="VPN Agent configuration details" %}

Before going further save the address in Endpoint configuration to use in the
credential configuration stage. In our case it is `bloody-gate-service.platform:1046`.
In your case you will get the same service with different port number (`bloody-gate-service.platform:XXXX`).

Press **Download Configuration** to get configured OpenVPN configuration file
`*.ovpn` which you must install in your local VPN client and start it.

Congratulations, you have established a secure VPN tunnel between your local
resource and the platform. Now time to use this in your integration flow configuration.

## Using VPN Agent

Since we have used MongoDB for our example we will use the [MongoDB component](/components/mongodb)
in the configuration of our integration flow. We will jump directly to the step
configuration to show how to use the Agent.

{% include img.html max-width="60%" url="/assets/img/getting-started/vpn-agent/vpn-agent-credential.png" title="VPN Agent configuring the credentials" %}

Picture above shows the filled form for MongoDB credentials in the step configuration
where couple of details should be considered:

1.  Use Drop-down menu **Choose Agent** to select the Agent. Our new agent called `MongoDB_local_conn` is online as indicative of the green dot beside the name.
2.  Give an informative name to your credential.
3.  Make sure to enter the correct URL address like we do `mongodb://bloody-gate-service.platform:1046`. **You must not use the connection URL available on your local environment**. The VPN gateway will take care of port forwarding for you.
4.  Use the same `username/password` pair as you would use locally.
5.  Enter the Authentication Database as you would do locally to login.

And lastly **Verify** and **Save** your credential.

Congratulations, you are now ready to query your local database and use the results
to process further.

>You can always update your agent, get all the information you need about it, or just delete it using the appropriate **API endpoints**.
All the necessary information about this you can find in our [API documentation]({{site.data.tenant.apiDocsUri}}/v2#/vpn%20agents).
