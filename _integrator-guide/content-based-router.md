---
title: Content-Based Routing
layout: article
section: Integration patterns
order: 1
since: 20180228
---

In this article we will explain how to send the data to a correct recipient
based on the message content using the content-based routing on the
{{site.data.tenant.name}} platform.

> Content-Based Routing (CBR) is **a messaging pattern to route each message to
> the correct recipient based on message content** as described in
> the [Enterprise Integration Patterns](http://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentBasedRouter.html)
> book by (G. Hohpe and B. Woolf, 2003).

The principle of Content-Based Routing is used the following way. A message with
customer data or order is received but not all recipients need to receive the
same data, only one or several of them. Data needs to be routed to the correct
recipients based on the content. The illustration below explains the principle:

![Content-Based Routing principle](/assets/img/integrator-guide/cbr/cbr-principle.png "Content-Based Routing principle")

Image above shows a simple scenario where the Content-Based Routing solves
a logistical problem. A new delivery of sports shoes should be routed to the
correct store or section for the sports shoes.
