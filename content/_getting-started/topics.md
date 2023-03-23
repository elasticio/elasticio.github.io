---
title: Topics
layout: article
section: Introduction
order: 6
description: This document provides basic information on Topics.
---

## Description

A Topic is a named JSON schema you can use to communicate in a [publish–subscribe](https://en.wikipedia.org/wiki/Publish-subscribe_pattern) messaging pattern. In a topic-based system, messages are published to "topics" or named logical channels. Subscribers in a topic-based system will receive all messages published to the topics to which they subscribe. The publisher is responsible for defining the topics to which subscribers can subscribe. Topic contains following information:

* a unique name within the Workspace
* JSON schema describing the objects to be exchanged

## Creating Topics

Topic can be created via UI or API-call:

  * [API-call]({{site.data.tenant.apiDocsUri}}/v2#/topics/post_workspaces__workspace_id__topics).

  * Via UI:

  To create Topic via UI first choose "Topics" on navigational menu left. In the topics section you can select existing topics or create a new one:

  ![Topics section](/assets/img/getting-started/topics/topics-section.png)

  Then you need to select a unique name for the topic and create the desired JSON schema. In the window on the right we can see the object tree that demonstrates how the data type of the topic will be presented:

  ![New topic](/assets/img/getting-started/topics/new-topic.png)

## Editing Topics

To make changes to an existing topic, select the topic you need and then click "Edit". You can also delete this topic by clicking "Delete":

  ![Edit topic](/assets/img/getting-started/topics/edit-topic.png)

Here you can change the Topic name and JSON-schema and then save your changes:

  ![Editing topic](/assets/img/getting-started/topics/editing-topic.png)

> Please note that you can also perform all the actions described above with the corresponding [API calls]({{site.data.tenant.apiDocsUri}}/v2#/topics).

## Generating schema for JSON sample

You can also generate a JSON schema from an existing JSON sample by clicking the corresponding button:

  ![Generate Schema](/assets/img/getting-started/topics/generate-schema.png)

Then you can insert a JSON sample and generate a new schema:

  ![Insert JSON sample](/assets/img/getting-started/topics/insert-sample.png)

After that you can edit the new generated schema with all the necessary information:

  ![Editing schema](/assets/img/getting-started/topics/editing-schema.png)

## Usage Example

In this example, we will create a flow using the [Pub-Sub component](/components/pub-sub/index). First you must choose a Topic on which your flow will be listening for messages:

  ![Choose topic](/assets/img/getting-started/topics/choose-topic.png)

Your Subscriber flow can automatically generate incoming data sample or you can do it yourself:

  ![Trigger sample](/assets/img/getting-started/topics/trigger-sample.png)

Using [Pub-Sub](/components/pub-sub/index) action you must choose a topic created earlier, by which your Publisher Flow will communicate with it’s Subscribers, and then you can enter new data:

  ![Enter Data](/assets/img/getting-started/topics/enter-data.png)
