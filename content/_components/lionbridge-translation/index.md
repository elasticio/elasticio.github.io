---
title: Lionbridge-translation component
layout: component
section: Service components
description: Lionbridge translation component for the platform.
icon: lionbridge.png
icontext: Lionbridge-translation component
category: lionbridge
updatedDate: 2018-03-28
ComponentVersion: 0.0.2
---

## Credentials

 - Username
 - Password
 - ApiURI
 - ProviderId

## Technical Notes

The [technical notes](technical-notes) page gives some technical details about Lionbridge-translation component like [changelog](/components/lionbridge-translation/technical-notes#changelog).

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Usage example in flows:

To conveniently use this component, you should create two flows with such structures:

### First flow:

```
<webhook> (retrieves input message for one of requestTranslationJob*** actions and sends it next)

⇓

<Lionbridge translate> (one of requestTranslationJob*** actions retrieves message from webhook and returns jobCode)

⇓

<Key:Value storage> (saves jobCode from previous step as "pending job")
```

### Second flow:

```
<Timer>

⇓

<Key:Value storage> (read and return an array of jobCodes of "pending job")

⇓

<Node.js Code> (inside forEach loop emits every jobCode separately to the next step)

⇓

<Lionbridge translate> (return status of job by dint of "Retrieve job status" action)

⇓

<Filter> (compares body.statusCode to be equal "REVIEW_TRANSLATION". subsequest step will fire if filter expression returned - true)

⇓

<Key:Value storage> (removes jobCode from storage)

⇓

<Lionbridge translate> (retrieve translation result using jobCode)

⇓

[translated data comes to this step as message and you can use it as you wish]
```

## Links

[Key concepts](http://developers.lionbridge.com/content/docs/key-concepts.html)
