---
title: Google-translate component
layout: component
section: Service components
description: Google translate component for the platform.
icon: google-translate.png
icontext: AWS Lambda component
category: AWS Lambda component
createdDate: 2017-09-19
updatedDate: 2019-03-14
---

## Credentials

In oprder to authenticate, you need to receive `apiKey` from your `Google cloud platform` account

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

  * **Translate phrase**
  * **Detect language**
  * **Retrieve supported languages**
  * **Translate object properties**
  * **Translate array of objects**

When specifying the language in a `Configure input` section, use two or three letter codes for that. For example,

    english -> en
    russian -> ru
    franch -> fr
    -----
    english -> eng
    russian -> rus
    franch -> fra

Such codes can be foud in a result of `Retrieve supported languages` action execution

### Translate phrase

`sourceLang` field is optional. Google will autodetect the source locale if not specified.

in/out metadata can be found at `/lib/schemas/translatePhrase.{in/out}.json`

### Detect language

in/out metadata can be found at `/lib/schemas/detectLanguage.{in/out}.json`

### Retrieve supported languages

out metadata can be found at `/lib/schemas/retrieveSupportedLanguages.out.json`

### Translate object properties

in/out metadata can be found at `/lib/schemas/translateObjectProperties.{in/out}.json`

### usage example
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
    "hello": "Hallo Welt",
    "capital": "London ist die Hauptstadt von Großbritannien"
}
```
### Translate array of objects

in/out metadata can be found at `/lib/schemas/translateObjectProperties.{in/out}.json`

### usage example

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
    "translatedArray": [
    	{
    		"capital": "London ist die Hauptstadt von Großbritannien",
    		"hello": "Hallo Welt"
    	},
    	{
    		"mood": "großartige Stimmung",
    		"color": "rot"
    	}
    ]
}
```

## Links

You need to create new or use existing `GCP project` and enable `Google Cloud Translation API`

[How to create new project](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
