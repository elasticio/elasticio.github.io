---
layout: component
title: Claude AI component
section: Service components
description: The Claude AI component integrates with Anthropic’s Claude API to enable advanced text and image-based AI interactions within your integration flows.
icon: claude-ai.png
icontext: Claude AI component
category: claude-ai
ComponentVersion: 1.0.0
updatedDate: 2025-11-28
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Send Request](#send-request)
* [Known Limitations](#known-limitations)

## Description

The Claude AI component integrates with [Anthropic’s Claude API](https://docs.claude.com/en/api/messages) to enable advanced text and image-based AI interactions within your integration flows.

This component allows you to send structured messages — including text, images, or documents — to Claude models and receive natural language responses suitable for chatbots, summarization, analysis, or creative generation.

It supports both external file URLs and internal Maester-hosted attachments.

## Credentials

To use this component, follow these steps:

1. Create an [Anthropic account](https://console.anthropic.com/) or sign in if you already have one.
2. Go to the [API Keys page](https://console.anthropic.com/settings/keys).
3. Click `Create Key`, give it a descriptive name, and copy the generated API key securely.
4. Do not share this key publicly or expose it in client-side code.

Fields:

* **API Key** (string, required) - Your Claude API key generated as described above.
* **API Version** (string, optional) - The [Claude API version](https://docs.claude.com/en/api/versioning) to use, defaults to `2023-06-01`.
* **Request Timeout** (string, optional, 60 by default) - The maximum time (in seconds) to wait for a response before timing out.

## Actions
  
### Send Request

Sends a text or multimodal (text + image/document) message to the Claude API and returns the generated response.

#### Configuration Fields

* **Model** (dropdown, required) - A dynamic list of available [models](https://docs.claude.com/en/docs/about-claude/models/overview).
* **Beta Headers** (multi-select, optional) - Additional beta headers to include in API requests. Beta headers enable access to experimental or beta features in the Claude API. Available options include:
  * `message-batches-2024-09-24` - Enable message batch processing
  * `prompt-caching-2024-07-31` - Enable prompt caching for improved performance
  * `computer-use-2024-10-22` / `computer-use-2025-01-24` - Enable computer use capabilities
  * `pdfs-2024-09-25` - Enhanced PDF processing support
  * `token-counting-2024-11-01` - Enable token counting features
  * `token-efficient-tools-2025-02-19` - Enable token-efficient tools
  * `output-128k-2025-02-19` - Enable 128k output tokens
  * `mcp-client-2025-04-04` / `mcp-client-2025-11-20` - Enable MCP (Model Context Protocol) client features
  * `dev-full-thinking-2025-05-14` - Development mode for full thinking responses
  * `interleaved-thinking-2025-05-14` - Enable interleaved thinking responses
  * `code-execution-2025-05-22` - Enable code execution capabilities
  * `extended-cache-ttl-2025-04-11` - Extended cache time-to-live
  * `context-1m-2025-08-07` - Enable 1M context window
  * `context-management-2025-06-27` - Context management features
  * `model-context-window-exceeded-2025-08-26` - Handle context window exceeded scenarios
  * `skills-2025-10-02` - Enable skills feature

> **Please Note:** For detailed information about beta features and their requirements, refer to the [Claude API beta documentation](https://platform.claude.com/docs/en/api/beta-headers).

#### Input Metadata

Refer to the **Send Request Input Schema** for the full list of metadata fields.
The metadata is rather general for different use-cases. To build a correct request please consult the [official documentation](https://docs.claude.com/en/api/messages).
<details close markdown="block"><summary><strong>Send Request Input Schema</strong></summary>
```json
{
  "type": "object",
  "properties": {
    "messages": {
      "type": "array",
      "help": {
        "description": "A list of messages comprising the conversation so far"
      },
      "required": true,
      "items": {
        "type": "object",
        "properties": {
          "role": {
            "type": "string",
            "help": {
              "description": "The role of the messages author, in this case system"
            },
            "required": true,
            "enum": [
              "user",
              "assistant"
            ]
          },
          "content": {
            "type": "array",
            "help": {
              "description": "An array of message content, which can include text, images, and file attachments"
            },
            "required": true,
            "items": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "enum": [
                    "text",
                    "image",
                    "document",
                    "thinking"
                  ],
                  "help": {
                    "description": "Type of message content"
                  },
                  "required": true
                },
                "text": {
                  "type": "string",
                  "help": {
                    "description": "The text content of the message (required if type is 'text'). Minimum length: 1"
                  }
                },
                "source": {
                  "type": "object",
                  "help": {
                    "description": "Required if type is 'image' or 'document'"
                  },
                  "properties": {
                    "type": {
                      "type": "string",
                      "enum": [
                        "url"
                      ]
                    },
                    "url": {
                      "type": "string",
                      "help": {
                        "description": "URL of the file (image or document) to be uploaded. The URL can point to either internal or external public storage."
                      }
                    }
                  }
                },
                "cache_control": {
                  "type": "object",
                  "help": {
                    "description": "Create a cache control breakpoint at this content block."
                  },
                  "properties": {
                    "type": {
                      "type": "string",
                      "enum": [
                        "ephemeral"
                      ]
                    },
                    "ttl": {
                      "type": "string",
                      "enum": [
                        "5m",
                        "1h"
                      ],
                      "help": {
                        "description": "Defaults to '5m'"
                      }
                    }
                  }
                },
                "citations": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "help": {
                    "description": "Citations supporting the text block."
                  }
                },
                "context": {
                  "type": "string",
                  "help": {
                    "description": "Used when type is 'document'"
                  }
                },
                "title": {
                  "type": "string",
                  "help": {
                    "description": "Used when type is 'document'"
                  }
                },
                "signature": {
                  "type": "string",
                  "help": {
                    "description": "Required if type is 'thinking'"
                  }
                },
                "thinking": {
                  "type": "string",
                  "help": {
                    "description": "Required if type is 'thinking'"
                  }
                }
              }
            }
          }
        }
      }
    },
    "max_tokens": {
      "type": "number",
      "help": {
        "description": "The maximum number of tokens to generate before stopping. Different models have different maximum values for this parameter. See <a href='https://docs.claude.com/en/docs/about-claude/models/overview'>models</a> for details. Required range: x >= 1"
      },
      "required": true
    },
    "container": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "help": {
            "description": "Container identifier for reuse across requests."
          }
        },
        "skills": {
          "type": "object",
          "help": {
            "description": "List of skills to load in the container"
          },
          "properties": {
            "skill_id": {
              "type": "string"
            },
            "type": {
              "type": "string",
              "enum": [
                "anthropic",
                "custom"
              ],
              "help": {
                "description": "Type of skill - either 'anthropic' (built-in) or 'custom' (user-defined)"
              }
            },
            "version": {
              "type": "string",
              "help": {
                "description": "Skill version or 'latest' for most recent version"
              }
            }
          }
        }
      }
    },
    "context_management": {
      "type": "object",
      "help": {
        "description": "Context management configuration. This allows you to control how Claude manages context across multiple requests, such as whether to clear function results or not."
      },
      "properties": {
        "edits": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "clear_tool_uses_20250919"
                ],
                "help": {
                  "description": "Type of context management edit to apply."
                }
              },
              "clear_at_least": {
                "type": "object",
                "help": {
                  "description": "Minimum number of tokens that must be cleared when triggered. Context will only be modified if at least this many tokens can be removed."
                },
                "properties": {
                  "type": {
                    "type": "string",
                    "enum": [
                      "input_tokens"
                    ],
                    "help": {
                      "description": "Type of token count to use when determining minimum clear amount."
                    }
                  },
                  "value": {
                    "type": "number",
                    "minimum": 0,
                    "help": {
                      "description": "Minimum number of tokens to clear. Must be greater than or equal to 0."
                    }
                  }
                }
              },
              "clear_tool_inputs": {
                "type": [
                  "boolean",
                  "array"
                ],
                "items": {
                  "type": "string"
                },
                "help": {
                  "description": "Whether to clear all tool inputs (boolean) or specify particular tool inputs to clear (list of strings)."
                }
              },
              "exclude_tools": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "help": {
                  "description": "List of tool names whose uses are preserved from clearing."
                }
              },
              "keep": {
                "type": "object",
                "help": {
                  "description": "Configuration for how many tool uses to retain in the conversation."
                },
                "properties": {
                  "type": {
                    "type": "string",
                    "enum": [
                      "tool_uses"
                    ]
                  },
                  "value": {
                    "type": "number"
                  }
                }
              },
              "trigger": {
                "type": "object",
                "help": {
                  "description": "Condition that triggers the context management strategy. Can represent InputTokensTrigger or ToolUsesTrigger."
                },
                "properties": {
                  "type": {
                    "type": "string",
                    "enum": [
                      "tool_uses",
                      "input_tokens"
                    ]
                  },
                  "value": {
                    "type": "number"
                  }
                }
              }
            }
          },
          "help": {
            "description": "List of context management edits to apply."
          }
        }
      }
    },
    "mcp_servers": {
      "type": "array",
      "help": {
        "description": "MCP servers to be utilized in this request. Maximum length: 20."
      },
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "help": {
              "description": "Name of the MCP server."
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "url"
            ],
            "help": {
              "description": "Type of the MCP server. Always 'url'."
            }
          },
          "url": {
            "type": "string",
            "help": {
              "description": "URL of the MCP server."
            }
          },
          "authorization_token": {
            "type": "string",
            "help": {
              "description": "Optional authorization token for the MCP server."
            }
          },
          "tool_configuration": {
            "type": "object",
            "help": {
              "description": "Optional configuration object for tools used with this MCP server."
            },
            "properties": {
              "tool_name": {
                "type": "string",
                "help": {
                  "description": "Name of the tool that this configuration applies to."
                }
              },
              "enabled": {
                "type": "boolean",
                "help": {
                  "description": "Whether the tool is enabled on this server."
                }
              }
            }
          }
        }
      },
      "tool_call_id": {
        "type": "string",
        "help": {
          "description": "Tool call that this message is responding to"
        },
        "required": false
      }
    },
    "metadata": {
      "type": "object",
      "help": {
        "description": "An object describing metadata about the request."
      },
      "properties": {
        "user_id": {
          "type": "string",
          "help": {
            "description": "An external identifier for the user who is associated with the request. This should be a uuid, hash value, or other opaque identifier. Anthropic may use this id to help detect abuse. Do not include any identifying information such as name, email address, or phone number."
          }
        }
      }
    },
    "service_tier": {
      "type": "string",
      "enum": [
        "auto",
        "standard_only"
      ],
      "help": {
        "description": "Determines whether to use priority capacity (if available) or standard capacity for this request."
      }
    },
    "stop_sequences": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "help": {
        "description": "Custom text sequences that will cause the model to stop generating."
      }
    },
    "system": {
      "type": "string",
      "help": {
        "description": "A system prompt is a way of providing context and instructions to Claude, such as specifying a particular goal or role."
      }
    },
    "temperature": {
      "type": "number",
      "help": {
        "description": "Amount of randomness injected into the response. Defaults to 1.0. Ranges from 0.0 to 1.0. Use temperature closer to 0.0 for analytical / multiple choice, and closer to 1.0 for creative and generative tasks. Note that even with temperature of 0.0, the results will not be fully deterministic."
      }
    },
    "thinking": {
      "type": "object",
      "properties": {
        "budget_tokens": {
          "type": "number",
          "help": {
            "description": "Determines how many tokens Claude can use for its internal reasoning process. Larger budgets can enable more thorough analysis for complex problems, improving response quality. Must be ≥1024 and less than max_tokens. See <a href='https://docs.claude.com/en/docs/build-with-claude/extended-thinking'>extended thinking</a> for details."
          }
        },
        "type": {
          "type": "string",
          "enum": [
            "enabled",
            "disabled"
          ]
        }
      },
      "help": {
        "description": "Configuration for enabling Claude's extended thinking."
      }
    },
    "top_k": {
      "type": "number",
      "help": {
        "description": "Only sample from the top K options for each subsequent token. Used to remove 'long tail' low probability responses. Recommended for advanced use cases only. You usually only need to use temperature."
      }
    },
    "top_p": {
      "type": "number",
      "help": {
        "description": "Use nucleus sampling. In nucleus sampling, we compute the cumulative distribution over all the options for each subsequent token in decreasing probability order and cut it off once it reaches a particular probability specified by top_p. You should either alter temperature or top_p, but not both. Recommended for advanced use cases only. You usually only need to use temperature."
      }
    },
    "tools": {
      "type": "array",
      "help": {
        "description": "Definitions of tools that the model may use."
      },
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "help": {
              "description": "This is how the tool will be called by the model and in tool_use blocks."
            }
          },
          "input_schema": {
            "type": "object",
            "help": {
              "description": "This defines the shape of the input that your tool accepts and that the model will produce."
            },
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "object"
                ]
              },
              "properties": {
                "type": "object"
              },
              "required": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            }
          },
          "type": {
            "type": "string",
            "help": {
              "description": "The type of the tool."
            }
          },
          "description": {
            "type": "string",
            "help": {
              "description": "Description of what this tool does. Tool descriptions should be as detailed as possible. The more information that the model has about what the tool is and how to use it, the better it will perform. You can use natural language descriptions to reinforce important aspects of the tool input JSON schema."
            }
          },
          "cache_control": {
            "type": "object",
            "help": {
              "description": "Create a cache control breakpoint at this content block."
            },
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "ephemeral"
                ]
              },
              "ttl": {
                "type": "string",
                "enum": [
                  "5m",
                  "1h"
                ],
                "help": {
                  "description": "Defaults to '5m'"
                }
              }
            }
          }
        }
      }
    },
    "tool_choice": {
      "type": "object",
      "help": {
        "description": "How the model should use the provided tools. The model can use a specific tool, any available tool, decide by itself, or not use tools at all. The model will automatically decide whether to use tools."
      },
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "auto",
            "any",
            "tool",
            "none"
          ]
        },
        "disable_parallel_tool_use": {
          "type": "boolean",
          "help": {
            "description": "Whether to disable parallel tool use. Defaults to false. If set to true, the model will output at most one tool use."
          }
        },
        "name": {
          "type": "string",
          "help": {
            "description": "The name of the tool to use."
          }
        }
      }
    }
  }
}
```
</details>

> ⚠️ **Tip:** Use *Developer mode* in the mapper for full flexibility when constructing requests.

**Examples:**

🔹 1. Basic Text Messages

```json
{
  "max_tokens": 1024,
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

🔹 2. Text and Image Content

```json
{
  "max_tokens": 1024,
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "What do you see in this image?"
        },
        {
          "type": "image",
          "source": {
            "type": "url",
            "url": "https://example.com/image.jpg"
          }
        }
      ]
    }
  ]
}
```

🔹 3. Text and Document Content

```json
{
  "max_tokens": 1024,
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "What do you see in this document?"
        },
        {
          "type": "document",
          "source": {
            "type": "url",
            "url": "https://example.com/document.pdf"
          }
        }
      ]
    }
  ]
}
```

#### Output Metadata

Refer to the **Output Send Request Schema** for the full list of metadata fields.
<details close markdown="block"><summary><strong>Output Send Request Schema</strong></summary>
```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "id": {
      "type": "string",
      "description": "Unique identifier for the message.",
      "example": "msg_013Zva2CMHLNnXjNJJKqJ2EF"
    },
    "type": {
      "type": "string",
      "description": "The object type, always 'message'.",
      "enum": ["message"]
    },
    "role": {
      "type": "string",
      "description": "The role associated with the message (e.g., assistant, user).",
      "enum": ["assistant", "user"]
    },
    "model": {
      "type": "string",
      "description": "The model used to generate this message.",
      "example": "claude-sonnet-4-5-20250929"
    },
    "content": {
      "type": "array",
      "description": "List of content blocks that make up the message output.",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": ["type", "text"],
        "properties": {
          "type": {
            "type": "string",
            "description": "Type of the content block.",
            "enum": ["text"]
          },
          "text": {
            "type": "string",
            "description": "Text content of the message block.",
            "example": "Hi! My name is Claude."
          },
          "citations": {
            "type": ["array", "null"],
            "description": "Optional citations associated with the content block.",
            "items": {
              "type": "object",
              "description": "A citation entry (structure may vary depending on response)."
            },
            "nullable": true
          }
        }
      },
      "example": [
        {
          "type": "text",
          "text": "Hi! My name is Claude.",
          "citations": null
        }
      ]
    },
    "stop_reason": {
      "type": ["string", "null"],
      "description": "The reason why generation stopped, e.g., 'end_turn' or 'stop_sequence'.",
      "enum": ["end_turn", "stop_sequence", null],
      "example": "end_turn"
    },
    "stop_sequence": {
      "type": ["string", "null"],
      "description": "The custom stop sequence (if any) that caused generation to stop.",
      "nullable": true,
      "example": null
    },
    "usage": {
      "type": "object",
      "description": "Token usage statistics for this message.",
      "required": ["input_tokens", "output_tokens"],
      "additionalProperties": false,
      "properties": {
        "input_tokens": {
          "type": "integer",
          "description": "Number of input tokens used.",
          "example": 2095
        },
        "output_tokens": {
          "type": "integer",
          "description": "Number of output tokens generated.",
          "example": 503
        }
      }
    }
  }
}
```
</details>

#### Known Limitations

1. Not all models support image or PDF processing — verify model compatibility before sending a request.
2. Currently, only plain text, image, and PDF files are supported.
3. For file uploads, the component automatically includes the beta header required by the Claude Files API.
4. Thinking mode responses require both a `thinking` block and a companion `text` block inside `messages[].content`, for example:
```
{
  "role": "assistant",
  "content": [
    {
      "type": "thinking",
      "thinking": "Analyzing the request to explain the solar eclipse in simple terms.",
      "signature": "signed-payload-hash"
    },
    {
      "type": "text",
      "text": "A solar eclipse happens when the Moon moves between Earth and the Sun, briefly blocking the sunlight we see."
    }
  ]
}
```
5. Streaming responses are not supported. Please, do not set `stream: true` in your requests. Additionally, requests that include `tools` may automatically trigger streaming responses from the API, which are not currently supported by this component.