---
title: Content-Based Routing
layout: article
section: Integration patterns
order: 1
since: 20180228
---

The **Content-Based Routing** (CBR) is *a message processing pattern* described in
the [Enterprise Integration Patterns](http://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentBasedRouter.html)
book (G. Hohpe and B. Woolf, 2003). The pattern is used to send each message to
the correct recipient based on message content.

For example, a message with customer data or order is received but not all
recipients need to receive the same data, only one or several of them. Data needs
to be routed to the correct recipients based on the content. The illustration
below explains the principle:

![Content-Based Routing principle](/assets/img/integrator-guide/cbr/cbr-principle.png "Content-Based Routing principle")

Image above shows a simple scenario where the Content-Based Routing solves
a logistical problem. A new delivery of sports shoes get routed to the correct
store or section for the sports shoes.

In this article we will discuss how this pattern can be implemented on the
{{site.data.tenant.name}} platform in integration flows.
