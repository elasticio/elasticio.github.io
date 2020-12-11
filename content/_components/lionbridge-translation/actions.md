---
title: Lionbridge-translation actions
layout: component
description: Lionbridge translation component actions.
icon: lionbridge.png
icontext: Lionbridge-translation component
category: lionbridge
updatedDate: 2018-03-28
ComponentVersion: 0.0.2
---

## Actions

To translate some text from one language to another, Lionbridge uses delayed jobs. That means that you will not be able to receive a translated text immediately in response to a request for translation. Therefore, you need to make a request to create a translation job, then get the code of your request and periodically poll Lionbridge to find out the status of your request. Once you get the status `REVIEW_TRANSLATION`, you can make a request to receive translation.

To create translation job you can use these 4 actions:

 - `Request translation job (Simple)`
 - `Request translation job (Batch)`
 - `Request translation job (Object properties)`
 - `Request translation job (Array of objects)`

`Batch` means that you can specify multiple source phrases and multiple target languages

`Simple` means that you can specify only one source phrase and one target language.

To poll about job status use `Retrieve job status` action.

To retrieve translated phrase(s) use `Retrieve translation` action.

Actions's `in/out` schemas can be found at `/lib/schemas`

## Examples of actions data flows

### Request translation job (Simple)

input message:

```
{
   "phrase": "hello world",
   "sourceLang": "en",
   "targetLang": "de"
}
```

output message:

```
{
    "jobCode": "1749264e-88a6-44d9-8c71-8a77394f9160:::["29425287-7689-45a2-9f87-29a8b2e1c598"]"
}
```

### Request translation job (Batch)

input message:

```
{
	"fieldNames": [
		"color",
		"size"
	],
	"fieldValues": [
		"red",
		"three pounds"
	],
	"sourceLang": "en",
	"targetLangs": [
		"de",
        "ru"
	]
}
```

output message:

```
{
    "jobCode": "1749264e-88a6-44d9-8c71-8a77394f9160:::["29425287-7689-45a2-9f87-29a8b2e1c598"]"
}
```

### Request translation job (Object properties)

input message:

```
{
    "sourceObject": {
        "hello": "hello world",
        "capital": "London is the capital of Great Britain"
    },
    "sourceLang": "en",
    "targetLang": "de"
}
```

output message:

```
{
    "jobCode": "1749264e-88a6-44d9-8c71-8a77394f9160:::["29425287-7689-45a2-9f87-29a8b2e1c598"]:::1"
}
```

### Request translation job (Array of objects)

input message:

```
{
	"sourceArray": [
		{
            "hello": "hello world",
            "capital": "London is the capital of Great Britain"
		},
		{
			"color": "red",
			"mood": "great mood"
		}
	],
	"sourceLang": "en",
	"targetLang": "de"
}
```

output message:

```
{
    "jobCode": "1749264e-88a6-44d9-8c71-8a77394f9160:::["29425287-7689-45a2-9f87-29a8b2e1c598"]:::2"
}
```

### Retrieve job status

input message:

```
{
    "jobCode": "1749264e-88a6-44d9-8c71-8a77394f9160:::["29425287-7689-45a2-9f87-29a8b2e1c598"]:::2"
}
```

output message:

```
{
	"updateTime": "2018-03-28T12:36:33.656Z",
	"jobCode": "1749264e-88a6-44d9-8c71-8a77394f9160:::[\"29425287-7689-45a2-9f87-29a8b2e1c598\"]:::2",
	"statusCode": "REVIEW_TRANSLATION"
}
```

### Retrieve translation

input message:

```
{
    "jobCode": "1749264e-88a6-44d9-8c71-8a77394f9160:::["29425287-7689-45a2-9f87-29a8b2e1c598"]"
}
```

#### For `Request translation job (Simple)` and `Request translation job (Batch)` actions:

output message (Simple):

```
{
   "translations": [
       {
           "key": "color",
           "values": [
               {
                   "lang": "de",
                   "value": "rot"
               }
           ]
       }
   ]
}
```

output message (Batch):

```
{
   "translations": [
       {
           "key": "color",
           "values": [
               {
                   "lang": "de",
                   "value": "rot"
               },
               {
                   "lang": "ru",
                   "value": "красный"
               }
           ]
       },
       {
           "key": "size",
           "values": {
               {
                   "lang": "de",
                   "value": "drei Pfund"
               },
               {
                   "lang": "ru",
                   "value": "три фунта"
               }
           }
       }
   ]
}
```

#### For `Request translation job (Object properties)` action:

output message:

```
{
    "color": "rot",
    "size": "drei Pfund"
}
```

#### For `Request translation job (Array of objects)` action:

output message:

```
{
    "translatedArray": [
        {
            "color": "rot",
            "size": "drei Pfund"
        },
    	{
    		"mood": "großartige Stimmung"
    	}
    ]
}
```
