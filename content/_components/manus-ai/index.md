---
layout: component
title: Manus AI component
section: Service components
description: The Manus AI component lets you orchestrate Manus Tasks and Files directly from your flows, wrapping the Manus v1 REST API endpoints.
icon: manus-ai.png
icontext: Manus AI component
category: manus-ai
ComponentVersion: 1.0.0
updatedDate: 2025-12-18
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Delete Object By ID](#delete-object-by-id)
  * [Lookup Object By ID](#lookup-object-by-id)
  * [Lookup Objects (plural)](#lookup-objects-plural)
  * [Make Raw Request](#make-raw-request)
  * [Upsert Object](#upsert-object)

## Description

{{page.description}}

**Supported Models:** The component supports the following Manus agent profiles: `manus-1.6`, `manus-1.6-lite`, `manus-1.6-max`, `manus-1.5`, `manus-1.5-lite`, and `speed`. These can be selected when creating tasks via the Upsert Object action.

## Credentials

The component uses a single Manus API key.

To create one:

1. Sign in to the Manus web app.
2. Navigate to **Settings → Intagration → Build with Manus API**.
3. Click **Create New**, give it a descriptive name, and confirm.
4. Copy the generated key, store it somewhere secure

* **API Key** - (string, required): The Manus API key obtained in the steps above.

## Actions

### Delete Object By ID

Remove a Manus task or file by ID.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to delete.

#### Input Metadata

* **Task ID** - (string, required) when `Object Type` is `Task`.
* **File ID** - (string, required) when `Object Type` is `File`.

#### Output Metadata

* `id` (string) – Manus object ID.
* `object` (string) – Either `task` or `file`.
* `deleted` (boolean) – `true` when the delete succeeded.

### Lookup Object By ID

Fetch a single Manus task or file.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to lookup.

#### Input Metadata

* **Task ID** - (string, required) when `Object Type` is `Task`.
* **File ID** - (string, required) when `Object Type` is `File`.

#### Output Metadata

* **Task** bodies include `id`, `status`, `created_at`, and keep all other Manus properties.
* **File** bodies include `id`, `filename`, `status`, `created_at`, plus any extra fields returned by the API.

### Lookup Objects (plural)

Paginate Manus tasks or files and emit either pages or single records.

#### Configuration Fields

* **Object Type** - (dropdown, required): The type of object to lookup.
* **Emit Behavior** (dropdown, required): Specifies how the resulting objects will be emitted, either as `Emit page` or `Emit individually`.

#### Input Metadata

* **Tasks**
  * `Limit` - (number, 1-100, default 100, optional): Maximum records per call.
  * `Query`- (string, optional): Free-text search forwarded to Manus.
  * `Status` - (enum: `pending`, `running`, `completed`, `failed`; optional): Status of the tasks.
  * `Order` - (enum: `asc`, `desc`; optional): Sort order used for pagination.
* **Files**
  * No request-body fields; the component only needs the configuration-level object type.

#### Output Metadata

For `Emit page` mode: An object with the key `results`, which contains an array as its value.

For `Emit individually` mode: Each object fills the entire message.

### Make Raw Request

Send a custom Manus API call when the prepared actions do not cover your use case.

#### Configuration Fields

* **Don't throw error on 404 Response** (optional, boolean): When checked, treat 404 responses as successful messages rather than flow errors.

#### Input Metadata

* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `DELETE`.
* **Url** - (string, required): Path of the resource relative to the base URL. Here comes a part of the path that goes after `https://api.manus.ai/v1`.
* **Request Body** - (object, optional): Body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.

### Upsert Object

Create or update a Manus task or create a Manus file. Updates rely on Manus identifiers you provide.

#### Configuration Fields

* **Operation** (dropdown, required): `Create` or `Update`.
* **Object Type** (dropdown, required): `Task` or `File`. Combined with `Operation`, this decides which schema the action serves.

#### Input Metadata

Fields are dynamically generated based on the selected `Object Type` and `Operation`. For the full metadata schema, please, check **Upsert Object Schema**.

<details close markdown="block"><summary><strong>Upsert Object Schema</strong></summary>
```json
{
    "task": {
        "create": {
            "type": "object",
            "properties": {
                "prompt": {
                    "type": "string",
                    "title": "Prompt",
                    "required": true,
                    "help": {
                        "description": "The task prompt or instruction for the Manus agent."
                    }
                },
                "agentProfile": {
                    "type": "string",
                    "title": "Agent Profile",
                    "required": true,
                    "enum": ["manus-1.6", "manus-1.6-lite", "manus-1.6-max", "manus-1.5", "manus-1.5-lite", "speed"]
                },
                "attachments": {
                    "type": "array",
                    "title": "Attachments",
                    "items": {
                        "type": "object",
                        "properties": {
                            "url": {
                                "type": "string",
                                "title": "File URL",
                                "help": {
                                    "description": "The public URL of the attachment to be uploaded to Manus. Specify 'File URL' or 'File ID', but not both."
                                }
                            },
                            "file_id": {
                                "type": "string",
                                "title": "File ID",
                                "help": {
                                    "description": "The ID of the file attachment already uploaded to Manus. Specify 'File ID' or 'File URL', but not both."
                                }
                            },
                            "filename": {
                                "type": "string",
                                "title": "Filename",
                                "help": {
                                    "description": "Name of the file attachment (required)"
                                }
                            },
                            "mimeType": {
                                "type": "string",
                                "title": "MIME Type",
                                "help": {
                                    "description": "MIME type of the file attachment (optional)"
                                }
                            }
                        }
                    }
                },
                "taskMode": {
                    "type": "string",
                    "title": "Task Mode",
                    "enum": ["chat", "adaptive", "agent"]
                },
                "connectors": {
                    "type": "array",
                    "title": "Connectors",
                    "help": {
                        "description": "List of connector IDs to enable for this task. Only connectors already configured in the user's account can be used."
                    },
                    "items": {
                        "type": "string"
                    }
                },
                "createShareableLink": {
                    "type": "boolean",
                    "help": {
                        "description": "Whether to make the chat publicly accessible to others on the Manus website. Only available for chat mode tasks."
                    }
                },
                "taskId": {
                    "type": "string",
                    "title": "Task ID",
                    "help": {
                        "description": "For continuing existing tasks (multi-turn)"
                    }
                }
            }
        },
        "update": {
            "type": "object",
            "properties": {
                "taskId": {
                    "type": "string",
                    "title": "Task ID",
                    "required": true
                },
                "title": {
                    "type": "string",
                    "title": "Title",
                    "help": {
                        "description": "The title of the task"
                    }
                },
                "enableShared": {
                    "type": "boolean",
                    "help": {
                        "description": "Whether to enable public sharing of the task"
                    }
                },
                "enableVisibleInTaskList": {
                    "type": "boolean",
                    "help": {
                        "description": "Control whether the task appears in the Manus webapp task list"
                    }
                }
            }
        }
    },
    "file": {
        "create": {
            "type": "object",
            "properties": {
                "filename": {
                    "type": "string",
                    "title": "Filename",
                    "required": true,
                    "help": {
                        "description": "Name of the file attachment. Must contain the file extension (e.g., 'example.jpg')."
                    }
                },
                "fileUrl": {
                    "type": "string",
                    "title": "File URL",
                    "required": true,
                    "help": {
                        "description": "The URL of the file to be uploaded to Manus. Can be a public URL or an internal Maester URL."
                    }
                }
            }
        }
    }
}
```
</details>

#### Output Metadata

* **Task results** – `task_id`, `task_title`, `task_url`.
* **File results** – `id`, `object`, `filename`, `status`, `upload_expires_at`, `created_at`.

#### Limitations

* Creating a file requires a reachable `File URL`; the `Upsert Object` action downloads it (supporting Maester URLs) and then uploads it to the Manus-supplied signed URL.