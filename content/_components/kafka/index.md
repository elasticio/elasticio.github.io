---
title: Kafka component
layout: component
section: Service components
description: Kafka Component is designed to consume (read) and produce (send) messages to/from Kafka servers
icon: kafka.png
icontext: Kafka component
category: kafka
ComponentVersion: 1.0.0
updatedDate: 2023-01-13
---

## Credentials

Currently component support authentication with plain user-password only

Component credentials configuration fields:

* **Username** (string, required) - for SASL
* **Password**  (string, required) - for SASL
* **Mechanism**  (dropdown, optional, `scram-sha-512` by default) - Select authentication mechanism
* **Client Id**  (string, required) - An id string to pass to the server when making requests. The purpose of this is to be able to track the source of requests beyond just ip/port by allowing a logical application name to be included in server-side request logging.
* **Brokers**  (string, required) - Provide at least one broker, or coma/space separated list of brokers (hosts), example - `serv1.mykafkaserver.com:9094 serv2.mykafkaserver.com:9094`

## Triggers

### Consume

This trigger is used to read messages from Kafka

>**Please note:** The flow must be set as real-time. Otherwise, errors will appear.

We recommend you set the lowest flow schedule (cron expression) frequency possible. E.g. once a day (0 0 * * *). Even though it does not affect the logic directly, each scheduled flow execution will create a record in the Executions list with no messages and no logs inside. All the logs and emitted messages will be appearing in the first execution.

#### Configuration Fields

* **Topic** - (string, required): topic name where you want to read messages from
* **Group Id** - (string, required): consumer groups allow a group of machines or processes to coordinate access to a list of topics, distributing the load among the consumers. When a consumer fails the load is automatically distributed to other members of the group. Consumer groups must have unique group ids within the cluster, from a kafka broker perspective.

#### Input Metadata

There is no Input Metadata in this Trigger.

#### Output Metadata

* **value** - (string, required): message content
* **key** - (string, optional): message key, if it exists
* **partition** - (string, optional): the smallest storage unit that holds a subset of records owned by a topic
* **offset** - (number, optional): the consumer offset is a way of tracking the sequential order in which messages are received by Kafka topics

## Actions

### Produce

This action is used to publish messages to Kafka

#### Configuration Fields

* **Topic** - (string, required): topic name where you want to send message to

#### Input Metadata

* **messages** - (array, required): An array of objects with the following properties:
  * **key** - (string, optional): By default, Kafka uses the key of the message to select the partition of the topic it writes to, if there is no key provided, then Kafka will partition the data in a round-robin fashion.
  * **value** - (string, required): Your message content

```json
{
  "messages": [{
    "key": "Car status",
    "value": "arrived"
  }]
}
```

#### Output Metadata

* **topicName** - (string, required): should be same as in config
* **partition** - (string, required): the smallest storage unit that holds a subset of records owned by a topic
* **errorCode** - (string, required): error code in case of fail
* **baseOffset** - (string, required): offset of the first message
* **logAppendTime** - (string, required): timestamp is assigned when record is appended to the log on the broker
* **logStartOffset** - (string, required): the first offset in a topic-partition

## Known limitations

* Currently component support authentication with plain user-password only
