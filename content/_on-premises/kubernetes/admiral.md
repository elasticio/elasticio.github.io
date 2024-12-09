---
layout: article
title: Admiral
description: Service responsible for starting/stopping the flow pods and communicating with local agents. Admiral interacts directly with Kubernetes to start/stop the pods and get their statuses.
category: kubernetes
---

{: .no_toc}

{{page.description}}

- TOC
{:toc}

## Downtime
{: .d-inline-block }
acceptable
{: .label .label-yellow}

If the Admiral is down the start/stop of pods will be delayed (e.g starts/stops
at UI, sleeps/wake-ups for ordinary flows. Wake-ups initiated by scheduler/webhooks/run now button at UI).
Generally it’s acceptable to stop Admiral for a minute or two.

## Scaling

Can not be scaled more than one (1) pod at the moment.

## Deployment

To deploy Admiral you must stop existing pod then start a new one. You can also delete the pod, kubernetes
will start one again.

## Strong dependencies

Admiral strongly depends on [Kubernetes cluster](/on-premises/kubernetes),
[MongoDB](/on-premises/mongodb) and the [RabbitMQ](/on-premises/rabbitmq). Without them
it will not start.

## Weak dependencies

Admiral will start but would not work as expected without the [Gold-dragon-coin](gold-dragon-coin) service.