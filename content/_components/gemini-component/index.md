---
title: Gemini component
layout: component
section: Service components
description: Google Gemini component is designed to connect with Gemini.
icon: gemini.png
icontext: Gemini component
category: gemini
updatedDate: 2025-07-02
ComponentVersion: 1.1.0
---

## Description

Google Gemini Component is designed to connect with Gemini using [REST API v1 (or v1beta)](https://ai.google.dev/tutorials/rest_quickstart).

## Credentials

To use the Gemini API, you’ll need an API key. If you don’t already have one, create a key in Google AI Studio.
[Click here to create API Key](https://makersuite.google.com/app/apikey).

> **Please Note:** - for the moment not all the regions over the world are supported. You might want to use VPN connection to create a key.

[A list of regions that are supported](https://ai.google.dev/available_regions)

### Component credentials configuration fields:
* **API Version** (string, optional) - Either `v1` or `v1beta` for now. Refer [the documentation](https://ai.google.dev/docs/api_versions) to find out the difference.
* **API Key** (string, required) - API Token generated as described above
* **Timeout** (string, optional, 60 by default): The request timeout in seconds (the duration to wait for a reply from the server).

## Triggers

This component has no trigger functions. This means it will not be accessible to select as a first component during the integration flow design.

## Actions

### Generate Content

Simply send a request to the Gemini API. The following input modes are supported:

1. **Text-only input**.
2. **Text-and-image input**.
3. **Multi-turn conversations (chat)**.

#### Configuration fields

- **Model** (dropdown, required) - Use the `gemini-pro` model for text-only prompts and `gemini-pro-vision` for image processing. You can't send a text-only prompt to the `gemini-pro-vision` model. It is a dynamically-fetched list of models that support `generateContent` method.
- **Safety categories to setup** (multi-select dropdown, optional) - A list of [Safety categories](https://ai.google.dev/docs/safety_setting_gemini?hl=en). If you wish, you can configure an allowed threshold for each or some of them. Also, refer to [List of available levels](https://ai.google.dev/api/rest/v1beta/SafetySetting?hl=en#HarmBlockThreshold).
- **Temperature** (dropdown, optional) - Controls the randomness of the output. Values are in the range: (`0.0`, `1.0`). Higher values produce a more random and varied response. A temperature of zero will be deterministic.
- **Max Output Tokens** (string, optional) - Specifies the maximum number of tokens that can be generated in the response. A token is approximately four characters. 100 tokens correspond to roughly 60-80 words.
- **topK** (string, optional) - The `topK` parameter changes how the model selects tokens for output. A `topK` of 1 means the selected token is the most probable among all the tokens in the model's vocabulary (also called greedy decoding), while a `topK` of 3 means that the next token is selected from among the 3 most probable using the temperature. For each token selection step, the `topK` tokens with the highest probabilities are sampled. Tokens are then further filtered based on topP with the final token selected using temperature sampling.
- **topP** (string, optional) - The `topP` parameter changes how the model selects tokens for output. Tokens are selected from the most to least probable until the sum of their probabilities equals the `topP` value. For example, if tokens A, B, and C have a probability of 0.3, 0.2, and 0.1 and the `topP` value is 0.5, then the model will select either A or B as the next token by using the temperature and exclude C as a candidate. The default `topP` value is 0.95.
- **stop_sequences** (string, optional) - Set a stop sequence to tell the model to stop generating content. A stop sequence can be any sequence of characters. Try to avoid using a sequence of characters that may appear in the generated content. Comma-separated list. E.g. `weapon,drugs,antivaxxer`.

> **Important Note**: Please be aware that any configuration options labeled as `optional` will automatically utilize default values if left unspecified by the user. If you wish to customize these defaults, kindly consult the Gemini API documentation for precise information on the default values.

[Here is the description of the available parameters](https://ai.google.dev/docs/concepts?hl=en#model-parameters).
    
#### Input Metadata

Please refer to the Input Schema below for the full list of metadata fields:

<details close markdown="block"><summary><strong>Input Schema</strong></summary>
```json
{
  "type": "object",
  "properties": {
    "contents": {
      "type": "array",
      "required": true,
      "items": {
        "type": "object",
        "properties": {
          "role": {
            "type": "string",
            "required": false,
            "help": {
              "description": "'user' or 'model'"
            },
            "enum": [
              "user",
              "model"
            ]
          },
          "parts": {
            "type": "array",
            "help": {
              "description": "A list of parts"
            },
            "required": true,
            "items": {
              "type": "object",
              "properties": {
                "text": {
                  "type": "string",
                  "help": {
                    "description": "Text string to send to the Gemini API to generate content"
                  }
                },
                "inline_data": {
                  "type": "object",
                  "help": {
                    "description": "The content of the image if there is one"
                  },
                  "properties": {
                    "mime_type": {
                      "type": "string",
                      "help": {
                        "description": "MIME type of the image. E.g. 'image/png', 'image/jpeg'"
                      },
                      "required": false,
                      "enum": [
                        "image/png",
                        "image/jpeg",
                        "image/heic",
                        "image/heif",
                        "image/webp"
                      ]
                    },
                    "data": {
                      "type": "string",
                      "help": {
                        "description": "Base64 image"
                      },
                      "required": false
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```
</details>

#### There are three modes available:

1. **Text-only input**:
Use it for simple text-based chatting.\
*Input body example*:
```json
{
  "contents": [{
    "parts": [{
      "text": "Hello. How can you help me today?"
    }]
  }]
}
```

2. **Text-and-image input**:
Use it for text-based chatting with a possibility of sending an image for the Gemini API to analyze.
An image must be converted to a in `Base64` format string without any preceding prefix like `data:image/png;base64,`\
*Input body example*:
```json
{
  "contents": [{
    "parts": [
      {
        "text": "Describe what is in the photo"
      },
      {
        "inline_data": {
          "mime_type": "image/png",
          "data": "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC"
        }
      }
    ]
  }]
}
```
*The following MIME types are supported*:
- **PNG** - `image/png`
- **JPEG** - `image/jpeg`
- **WEBP** - `image/webp`
- **HEIC** - `image/heic`
- **HEIF** - `image/heif`

3. **Multi-turn conversations (chat)**:
Using Gemini, you can build free-form conversations across multiple turns.\
*Input body example*:
```json
{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "Write the first line of a story about a magic backpack."
        }
      ]
    },
    {
      "role": "model",
      "parts": [
        {
          "text": "In the bustling city of Meadow brook, lived a young girl named Sophie. She was a bright and curious soul with an imaginative mind."
        }
      ]
    },
    {
      "role": "user",
      "parts": [
        {
          "text": "Can you set it in a quiet village in 1600s France?"
        }
      ]
    }
  ]
}
```

    
#### Output Metadata

Please refer to the Output Schema below for the full list of metadata fields:


<details close markdown="block"><summary><strong>Output Schema</strong></summary>
```json
{
  "type": "object",
  "properties": {
    "candidates": {
      "type": "array",
      "required": true,
      "items": {
        "type": "object",
        "properties": {
          "content": {
            "type": "object",
            "required": true,
            "properties": {
              "parts": {
                "type": "array",
                "help": {
                  "description": "A list of parts"
                },
                "required": true,
                "items": {
                  "type": "object",
                  "properties": {
                    "text": {
                      "type": "string",
                      "required": true
                    }
                  }
                }
              },
              "role": {
                "type": "string",
                "required": false
              }
            }
          },
          "finishReason": {
            "type": "string",
            "required": false
          },
          "index": {
            "type": "number",
            "required": false
          },
          "safetyRatings": {
            "type": "array",
            "help": {
              "description": "A list of safety ratings"
            },
            "required": false,
            "items": {
              "type": "object",
              "properties": {
                "category": {
                  "type": "string",
                  "required": false
                },
                "probability": {
                  "type": "string",
                  "required": false
                }
              }
            }
          }
        }
      }
    },
    "promptFeedback": {
      "type": "object",
      "required": true,
      "properties": {
        "safetyRatings": {
          "type": "array",
          "help": {
            "description": "A list of safety ratings"
          },
          "required": true,
          "items": {
            "type": "object",
            "properties": {
              "category": {
                "type": "string",
                "required": true
              },
              "probability": {
                "type": "string",
                "required": true
              }
            }
          }
        }
      }
    }
  }
}
```
</details>
