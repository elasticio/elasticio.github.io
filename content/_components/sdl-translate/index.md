---
title: Sdl-translate component
layout: component
section: Marketing-related components
description: A intelligent platform designed for teams involved in the localization supply chain.
icon: sdl-translate.png
icontext: Sdl-translate component
category: Sdl-translate component
createdDate: 2018-03-13
updatedDate: 2018-03-30
---

## Credentials

In oprder to authenticate, you need to retrieve an `apiKey` from your `SDL languagecloud` account

Guide of how to retrieve an [apiKey](https://languagecloud.sdl.com/translation-toolkit/api-documentation) (Getting started -> Generate API Key)

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

When specifying the language in a `Configure input` section, use two or three letter codes for that. For example,

    english -> en
    russian -> ru
    franch -> fr
    -----
    english -> eng
    russian -> rus
    franch -> fra

Such codes can be foud in a result of `Retrieve supported language pairs` action execution

### Retrieve supported languages

Action will return a list of supported language pairs with specified three letters codes for every language

### Translate phrase

If source language is not specified, action will use `detect language` feature and choose most probable option as source language

![Translate phrase](img/translate-phrase.png)

### Detect language

![Detect language](img/detect-language.png)

### Translate object properties

![Translate object properties](img/translate-object-properties.png)

#### Usage example

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

![Translate array of objects](img/translate-array-of-objects.png)

#### Usage example

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

[Guide of how to retrieve an apiKey](https://languagecloud.sdl.com/translation-toolkit/api-documentation)
