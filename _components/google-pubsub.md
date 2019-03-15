---
title: Google PubSub component
layout: article
section: Utility Components
---
---
## Description

Interact with Google Pub-Sub API.

## How authentication works

PubSub component authentication works with
[Google IAM Service Accounts](https://developers.google.com/identity/protocols/OAuth2ServiceAccount)
and two-legged OAuth, in order to authenticate your component you would
need to create a new Service Account on [Service Accounts Page](https://console.developers.google.com/permissions/serviceaccounts)
 of your project and download the JSON file with the private key.
 You would need ``client_email`` and ``private_key`` values
 on component authentication page (see [here](https://github.com/google/google-api-nodejs-client#using-jwt-service-tokens)
 for more information).

## Warning

Please take a special care of the indepmotency of your processing flow, here is the extract from [PubSub Subscriber Guide](https://cloud.google.com/pubsub/docs/subscriber)

> For the most part Pub/Sub delivers each message once, and in the order in which it was published. However, once-only and in-order delivery are not guaranteed: it may happen that a message is delivered more than once, and out of order. Therefore, your subscriber should be [idempotent](http://en.wikipedia.org/wiki/Idempotence#Computer_science_meaning) when processing messages, and, if necessary, able to handle messages received out of order. If ordering is important, we recommend that the publisher of the topic to which you subscribe include some kind of sequence information in the message; see [this page](https://cloud.google.com/pubsub/ordering) for a full discussion on message ordering. Messages that are not acknowledged, are retried indefinitely for up to seven days.

## License

Apache-2.0 © [{{site.data.tenant.name}} GmbH](http://{{site.data.tenant.name}})
