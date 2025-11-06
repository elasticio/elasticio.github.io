---
title: Splitter component Actions
layout: component
description: The Splitter component provides powerful, fundamental tools for message flow control on the platform.
icon: splitter.png
icontext: Splitter component
category: splitter
updatedDate: 2025-11-05
ComponentVersion: 1.6.0
---

### Split on JSONata Expression

This action splits a single incoming message into several messages by extracting an array from the message body using a JSONata expression. Each element of the resulting array is then emitted as a separate message.

#### Configuration

*   **JSONata Expression** - (string, required): A valid JSONata expression that evaluates to an array within the incoming message body.

<details close markdown="block"><summary><strong>Example</strong></summary>

Given the following incoming message:

```json
{
    "FirstName": "Fred",
    "Surname": "Smith",
    "Phone": [
        { "type": "home", "number": "0203 544 1234" },
        { "type": "office", "number": "01962 001234" },
        { "type": "mobile", "number": "077 7700 1234" }
    ]
}
```
If the JSONata expression is set to `Phone.{type: number}`, the component will emit three separate messages:
```json
{ "home": "0203 544 1234" }
```
```json
{ "office": "01962 001234" }
```
```json
{ "mobile": "077 7700 1234" }
```
</details>
<br>

#### Input Metadata

None

#### Output Metadata

*   **Message Body**: The body of each output message will be one element from the array returned by the JSONata expression.

### Re-assemble Messages

This action collects and aggregates individual messages into a single grouped message based on a defined strategy (group size, timeout, or both).

#### Configuration

*   **Behavior** - (dropdown, required): Defines the strategy for when to emit a group.
    *   `Group on fixed amount of messages`: The component collects messages for a group until the specified size is reached. Once full, the group is emitted. This mode does not emit partial groups; if the flow ends before a group is full, the partial group is stored for up to two days to be completed by a future execution.
    *   `Group on timeout`: The component gathers all incoming messages for a group. When no new messages arrive for that group within the specified `Delay timer`, a single group is emitted.
    *   `Group on amount of messages or timeout`: A hybrid approach. A group is emitted as soon as it is full. However, if the group is not yet full and no new messages arrive within the specified `Delay timer`, the partially completed group is also emitted.
*   **Emit result as array** - (checkbox, optional): If checked, the `messageData` in the output will be an array of message bodies. If unchecked, it will be an object where keys are the message IDs.

<details close markdown="block"><summary><strong>Example (Emit as array: OFF)</strong></summary>

```json
{
  "groupSize": 2,
  "groupId": "test22",
  "messageData": {
    "d899b000-5455-4c7a-9781-f16203426b93": { "dataFromMessage": "Message1" },
    "bdfca2b1-7aa7-444c-916d-3a2c17fc5dd6": { "dataFromMessage": "Message2" }
  }
}
```
</details>
<br>

<details close markdown="block"><summary><strong>Example (Emit as array: ON)</strong></summary>

```json
{
  "groupSize": 2,
  "groupId": "test22",
  "messageData": [
    { "dataFromMessage": "Message1" },
    { "dataFromMessage": "Message2" }
  ]
}
```
</details>
<br>

#### Input Metadata

*   **Unique ID to describe the group** - (string, required): An identifier for the group. All messages with the same `groupId` will be collected together.
*   **Unique ID to describe this message** - (string, optional): A unique identifier for a message within its group. If not provided, a random GUID will be generated. If multiple messages in the same group have the same `messageId`, only the data from the last message will be retained.
*   **Message Data** - (object, optional): The body of the individual message to be added to the group.
*   **Number of messages expected to be reassembled into the group** - (number, optional): The target size for the group. Required when `Behavior` involves a fixed amount.
*   **Delay timer (in ms)** - (number, optional): The time (in milliseconds) to wait for more messages before emitting a group. Maximum is 20,000 ms (20 seconds). Required when `Behavior` involves a timeout.

#### Output Metadata

*   **groupSize** - (number, required): The number of messages in the emitted group.
*   **groupId** - (string, required): The ID of the emitted group.
*   **messageData** - (object or array, required): The aggregated message data. The format depends on the `Emit result as array` setting.

## Known Limitations

*   **Concurrency Issue with Persistent Grouping**: The `Group on fixed amount of messages` behavior relies on an external storage (Maester) to persist partial groups between executions. This process is **not safe for high-concurrency scenarios** where multiple parallel executions of the *same flow step* process messages for the *same `groupId`*. This can lead to a race condition where parallel processes overwrite each other's state, resulting in **data loss**. This mode is only safe if you can guarantee that only one process is handling messages for a specific group at any given time.

*   **Memory and Size Limits**:
    *   The total size of all messages being collected in memory is limited to **5MB**. If this limit is exceeded, all currently held groups will be emitted immediately to prevent data loss, regardless of their configured `Behavior`.
    *   Messages are held in the component's memory during a flow's execution. If the flow is paused, stopped, or encounters a fatal error, any data currently being grouped in memory will be lost.

*   **State Persistence Duration**: When using `Group on fixed amount of messages`, partially completed groups are stored externally for a maximum of **two days**. If the group is not completed within this time, it will be permanently deleted.