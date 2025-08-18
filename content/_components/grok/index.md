---
title: Grok component
layout: component
section: Service components
description: The Grok component integrates with xAI Grok, a conversational AI model designed for real-time and reasoning-based responses.
icon: grok.png
icontext: Grok component
category: grok
ComponentVersion: 1.0.0
updatedDate: 2025-07-28
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Send Request](#send-request)
* [Known Limitations](#known-limitations)

## Description

This component integrates with xAI Grok, a conversational AI model designed for real-time and reasoning-based responses. It allows sending prompts to Grok and receiving completions.

## Credentials

To use this component, follow these steps:

1. Create an [xAI account](https://accounts.x.ai/sign-up) or [sign in](https://accounts.x.ai/sign-in) if you already have one.
2. Go to the `API Keys` page in the [xAI API Console](https://console.x.ai/team/default/api-keys).
3. Click `Create API Key`, give it a name, and copy the generated key securely.
4. Do not share this key publicly or expose it in client-side code.

Fields:

* **API Key** (string, required) - Your xAI API key generated as described above.
* **Request Timeout** (string, optional, 60 by default) - The request timeout in seconds.

## Actions
  
### Send Request

This action sends a request to the Grok model for chat completion. Stream mode is not supported currently.

#### Configuration Fields

* **Mode** (dropdown, required) - Select the operation mode. Use 'Chat Completions' to generate text-based responses or 'Image Generations' to create images from prompts.
* **Model** (dropdown, required) - A dynamic list of the models available in your account.

#### Input Metadata

Please refer to the [Chat Completions Input Schema](#chat-completions-schema) and [Image Generations Input Schema](#image-generations-schema) for the full list of metadata fields. The metadata is rather general for different use-cases. To build a correct request please consult the [official documentation](https://docs.x.ai/docs/api-reference#chat-completions).

> **Please Note:** We recommend to use `Developer mode` in the mapping.

Here are some examples of valid mappings:

🔹 1. Chat Completions with Basic Text Messages

```json
{
  "messages": [
    {
      "role": "user",
      "content": "What is the capital of Japan?"
    },
    {
      "role": "assistant",
      "content": "The capital of Japan is Tokyo."
    },
    {
      "role": "user",
      "content": "And what about South Korea?"
    }
  ]
}
```

🔹 2. Chat Completions with Text and Image Content

```json
{
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",x
          "text": "What do you see in this image?"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "https://example.com/image.jpg"
          }
        }
      ]
    }
  ]
}
```

🔹 3. Image Generation with Prompt Only

```json
{
  "prompt": "A futuristic city skyline at night with flying cars"
}
```

🔹 4. Image Generation with Prompt and Internal File Storage

```json
{
  "prompt": "A realistic portrait of an astronaut on Mars",
  "response_format": "url",
  "saveToMaester": true
}
```

##### **Chat Completions Schema**
<details close markdown="block"><summary><strong>Click to expand: </strong></summary>
```json
{
  "type": "object",
  "properties": {
    "deferred": {
      "type": "boolean",
      "default": false,
      "enum": [
        "true",
        "false"
      ],
      "help": {
        "description": "If true, returns a request_id to retrieve the response later via /v1/chat/deferred-completion/{request_id}."
      }
    },
    "frequency_penalty": {
      "type": "number",
      "minimum": -2,
      "maximum": 2,
      "default": 0,
      "help": {
        "description": "(Not supported by reasoning models) Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim."
      }
    },
    "logprobs": {
      "type": "boolean",
      "default": false,
      "enum": [
        "true",
        "false"
      ],
      "help": {
        "description": "If true, returns log probabilities of output tokens."
      }
    },
    "max_completion_tokens": {
      "type": "number",
      "help": {
        "description": "An upper bound for the number of tokens that can be generated for a completion, including both visible output tokens and reasoning tokens. Defaults to None, meaning the model will generate as many tokens as needed up until the model's maximum context length."
      }
    },
    "messages": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "role": {
            "type": "string",
            "required": true,
            "enum": [
              "system",
              "user",
              "assistant",
              "tool",
              "function"
            ],
            "help": {
              "description": "The role of the message: system, user, assistant, tool, or function."
            }
          },
          "name": {
            "type": "string",
            "help": {
              "description": "A unique identifier representing your end-user, which can help xAI to monitor and detect abuse."
            }
          },
          "content": {
            "type": "array",
            "required": true,
            "items": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "required": true,
                  "enum": [
                    "text",
                    "image_url"
                  ],
                  "help": {
                    "description": "Type of the content part (text, image_url)."
                  }
                },
                "text": {
                  "type": "string",
                  "help": {
                    "description": "Text content (if type is text)."
                  }
                },
                "image_url": {
                  "type": "object",
                  "help": {
                    "description": "Image url (if type is image_url)."
                  },
                  "properties": {
                    "url": {
                      "type": "string",
                      "format": "uri",
                      "help": {
                        "description": "Public URL to an image."
                      }
                    },
                    "detail": {
                      "type": "string",
                      "help": {
                        "description": "Detail level of the image (if applicable)."
                      }
                    }
                  }
                }
              }
            },
            "help": {
              "description": "The content of the message. Can be plain text or an array of structured parts."
            }
          },
          "tool_calls": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                },
                "index": {
                  "type": "number"
                },
                "type": {
                  "type": "string",
                  "enum": [
                    "function"
                  ]
                },
                "function": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "arguments": {
                      "type": "string"
                    }
                  }
                }
              }
            },
            "help": {
              "description": "Used by assistant to request a function/tool call."
            }
          },
          "tool_call_id": {
            "type": "string",
            "help": {
              "description": "The ID of the tool call this message is responding to (used with role: tool)."
            }
          },
          "reasoning_content": {
            "type": "string",
            "help": {
              "description": "Assistant reasoning content."
            }
          }
        }
      },
      "help": {
        "description": "Messages comprising the conversation history."
      }
    },
    "n": {
      "type": "number",
      "minimum": 1,
      "default": 1,
      "help": {
        "description": "How many chat completion choices to generate for each input message. Note that you will be charged based on the number of generated tokens across all of the choices. Keep n as 1 to minimize costs."
      }
    },
    "parallel_tool_calls": {
      "type": "boolean",
      "enum": [
        "true",
        "false"
      ],
      "default": true,
      "help": {
        "description": "Whether the model can call multiple tools in a single response. Defaults to true"
      }
    },
    "presence_penalty": {
      "type": "number",
      "minimum": -2,
      "maximum": 2,
      "default": 0,
      "help": {
        "description": "(Not supported by grok-3 and reasoning models) Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics. Defaults to 0."
      }
    },
    "reasoning_effort": {
      "type": "string",
      "enum": [
        "low",
        "high",
        "medium"
      ],
      "default": "low",
      "help": {
        "description": "Controls how hard a reasoning model thinks before responding. Defaults to low"
      }
    },
    "response_format": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "text",
            "json_object",
            "json_schema"
          ],
          "help": {
            "description": "An object specifying the format that the model must output. Specify { 'type': 'json_object' } for JSON output, or { 'type': 'json_schema', 'json_schema': {...} } for structured outputs. If { \"type\": \"text\" }, the model will return a text response."
          }
        },
        "json_schema": {
          "type": "object",
          "help": {
            "description": "JSON schema definition (required if type is 'json_schema')."
          }
        }
      },
      "help": {
        "description": "Specifies the output format."
      }
    },
    "search_parameters": {
      "type": "object",
      "properties": {
        "from_date": {
          "type": "string",
          "format": "date",
          "help": {
            "description": "Date from which to consider the results in ISO-8601 YYYY-MM-DD. See https://en.wikipedia.org/wiki/ISO_8601."
          }
        },
        "to_date": {
          "type": "string",
          "format": "date",
          "help": {
            "description": "Date up to which to consider the results in ISO-8601 YYYY-MM-DD. See https://en.wikipedia.org/wiki/ISO_8601."
          }
        },
        "max_search_results": {
          "type": "number",
          "minimum": 1,
          "maximum": 30,
          "default": 15,
          "help": {
            "description": "Maximum number of search results to use. Min 1, max 30."
          }
        },
        "mode": {
          "type": "string",
          "enum": [
            "off",
            "on",
            "auto"
          ],
          "default": "auto",
          "help": {
            "description": "Choose the mode to query realtime data: 'off' means no search; 'on' searches all sources; 'auto' lets the model decide."
          }
        },
        "return_citations": {
          "type": "boolean",
          "enum": [
            "true",
            "false"
          ],
          "default": true,
          "help": {
            "description": "Whether to return citations in the response or not."
          }
        },
        "sources": {
          "type": "array",
          "items": {
            "type": "object"
          },
          "help": {
            "description": "List of sources to search in."
          }
        }
      }
    },
    "seed": {
      "type": "number",
      "help": {
        "description": "If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed, and you should refer to the system_fingerprint response parameter to monitor changes in the backend."
      }
    },
    "stop": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "help": {
        "description": "(Not supported by reasoning models) Up to 4 sequences where the API will stop generating further tokens."
      }
    },
    "temperature": {
      "type": "number",
      "minimum": 0,
      "maximum": 2,
      "default": 1,
      "help": {
        "description": "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. Defaults to 1"
      }
    },
    "tool_choice": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "function": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            }
          }
        }
      },
      "help": {
        "description": "Controls which (if any) tool is called by the model. none means the model will not call any tool and instead generates a message. auto means the model can pick between generating a message or calling one or more tools. required means the model must call one or more tools. Specifying a particular tool via {'type': 'function', 'function': {'name': 'my_function'}}forces the model to call that tool. none is the default when no tools are present. auto is the default if tools are present."
      }
    },
    "tools": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "function"
            ]
          },
          "function": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "parameters": {
                "type": "object"
              }
            }
          }
        }
      },
      "help": {
        "description": "A list of tools the model may call in JSON-schema. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported."
      }
    },
    "top_logprobs": {
      "type": "number",
      "maximum": 8,
      "minimum": 0,
      "help": {
        "description": "An number between 0 and 8 specifying the number of most likely tokens to return at each token position, each with an associated log probability. logprobs must be set to true if this parameter is used."
      }
    },
    "top_p": {
      "type": "number",
      "exclusiveMaximum": 1,
      "minimum": 0,
      "default": 1,
      "help": {
        "description": "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. It is generally recommended to alter this or temperature but not both. Defaults to 1."
      }
    },
    "user": {
      "type": "string",
      "help": {
        "description": "A unique identifier representing your end-user, which can help xAI to monitor and detect abuse."
      }
    },
    "web_search_options": {
      "type": "object",
      "help": {
        "description": "Options to control the web search. This is only included for compatibility reason. Prefer the usage of realtime_data_parameters instead."
      },
      "properties": {
        "search_context_size": {
          "type": "string",
          "default": "medium",
          "help": {
            "description": "This field included for compatibility reason with OpenAI's API. It is mapped to max_search. Defaults to 'medium'"
          }
        },
        "user_location": {
          "type": "string",
          "help": {
            "description": "Only included for compatibility."
          }
        }
      }
    }
  }
}
```
</details>

##### **Image Generations Schema**

<details close markdown="block"><summary><strong>Click to expand: </strong></summary>
```json
{
    "type": "object",
    "properties": {
        "saveToMaester": {
            "type": "boolean",
            "required": false,
            "title": "Download To Maester",
            "enum": [
                "true",
                "false"
            ],
            "help": {
                "description": "If checked, the specified image will be downloaded to the internal storage."
            }
        },
        "n": {
            "type": "number",
            "minimum": 1,
            "maximum": 10,
            "default": 1,
            "help": {
                "description": "Number of images to be generated (min 1, max 10, defaults to 1)"
            }
        },
        "prompt": {
            "type": "string",
            "help": {
                "description": "Prompt for image generation."
            }
        },
        "response_format": {
            "type": "string",
            "enum": [
                "url",
                "b64_json"
            ],
            "default": "url",
            "help": {
                "description": "Response format to return the image in. Can be url or b64_json."
            }
        },
        "user": {
            "type": "string",
            "help": {
                "description": "A unique identifier representing your end-user."
            }
        }
    }
}
```
</details>

#### Output Metadata

Please refer to the [Output Chat Completions Schema](#chat-completions-schema) and [Output Image Generations Schema](#image-generations-schema) for the full list of metadata fields.

#### Known Limitations

  1. Images must meet xAI's input requirements. See [Image Understanding Limitations](https://docs.x.ai/docs/guides/image-understanding#reminder-on-image-understanding-model-general-limitations).
  2. Not all models support image generations. Before sending a request, please verify model compatibility in the [xAI Models documentation](https://docs.x.ai/docs/models).