---
title: Sdl-translate component
layout: article
section: Utility Components
---


### Description
SDL translate component for the {{site.data.tenant.name}} platform.

### Credentials
In oprder to authenticate, you need to retrieve an `apiKey` from your `SDL languagecloud` account

Guide of how to retrieve an `apiKey`: https://languagecloud.sdl.com/translation-toolkit/api-documentation (Getting started -> Generate API Key)

### Actions information
When specifying the language in a `Configure input` section, use two or three letter codes for that. For example,

    english -> en
    russian -> ru
    franch -> fr
    -----
    english -> eng
    russian -> rus
    franch -> fra

Such codes can be foud in a result of `Retrieve supported language pairs` action execution

#### Retrieve supported languages
> will return a list of supported language pairs with specified three letters codes for every language

out metadata can be found at `/lib/schemas/retrieveSupportedLanguages.out.json`
#### Translate phrase
> if source language is not specified, action will use `detect language` feature and choose most probable option as source language

in/out metadata can be found at `/lib/schemas/translatePhrase.{in/out}.json`
#### Detect language
in/out metadata can be found at `/lib/schemas/detectLanguage.{in/out}.json`

#### Translate object properties
in/out metadata can be found at `/lib/schemas/translateObjectProperties.{in/out}.json`

##### usage example
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
#### Translate array of objects
in/out metadata can be found at `/lib/schemas/translateObjectProperties.{in/out}.json`

##### usage example
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

### Links
https://languagecloud.sdl.com/translation-toolkit/api-documentation
