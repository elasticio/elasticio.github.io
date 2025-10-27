---
layout: component
title: AI Hacker Buster component
section: Utility components
description: The AI Hacker Buster component allows you to analyze AI-generated or user-provided content for adherence, guardrails, harmful content, and malicious intent.
icon: ai-hacker-buster.png
icontext: AI Hacker Buster component
category: ai-hacker-buster
ComponentVersion: 1.0.0
updatedDate: 2025-10-23
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Analyze Input](#analyze-input)
  * [Analyze Output](#analyze-output)

## Description

The AI Hacker Buster component allows you to analyze AI-generated or user-provided content for adherence, guardrails, harmful content, and malicious intent. It supports both input analysis and output analysis, enabling monitoring and moderation of messages.  

## Credentials

Component credentials configuration fields:

* **API Key** (string, required): Your API key for authenticating requests to the AI Hacker Buster API.

## Actions

### Analyze Input

Analyzes user or system messages before they are processed by AI models. This helps to detect harmful, unsafe, or non-compliant content early.

#### Configuration Fields

None.

#### Input Metadata

* `messages` (array of objects, required): Messages to be analyzed, can include roles: `user`, `assistant`, `system`, `tool`.  
* `model` (string, required): The model to use for analysis, e.g., `"gpt-4.1"`.  
* `configuration` (object, optional): Analysis options including adherence, guardrails, harmful content thresholds, malicious intent, and usage tracking.

An input metadata example:

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hey, can you recommend a good espresso machine under $300?",
      "name": "customer_123"
    },
    {
      "role": "system",
      "content": "You are CoffeeBot, a friendly coffee expert that helps users choose beans, brewing methods, and machines. Always stay polite and on-topic about coffee."
    }
  ],
  "model": "gpt-4.1",
  "configuration": {
    "adherence": {
      "mode": "monitoring",
      "pre_check_threshold": 0.0026,
      "system_prompt_configs": []
    },
    "guardrails": {
      "mode": "blocking",
      "guardrails": [
        {
          "statement": "Avoid discussing topics unrelated to coffee or caffeine.",
          "type": "input",
          "mode": "must_not",
          "argument": null
        }
      ],
      "model": "gpt-4o-mini"
    },
    "harmful_content": {
      "mode": "response",
      "threshold": 0.5
    },
    "malicious_intent": {
      "mode": "response"
    },
    "usage": {
      "mode": "monitoring",
      "save_message_content": true
    }
  }
}
```

#### Output Metadata

* `results` (object): Contains detailed analysis results per category:
  * `adherence`: Instruction adherence results.
  * `guardrails`: Guardrails compliance and violations.
  * `harmful_content`: Scores and flags for harmful content categories.
  * `malicious_intent`: Scores and labels for malicious intent.
  * `usage`: Tokens and message tracking information.

### Analyze Output

Analyzes AI-generated content after the response is produced. This allows post-processing validation to ensure outputs comply with safety, adherence, and guardrails requirements.

#### Configuration Fields

None.

#### Input Metadata

* `messages` (array of objects, required): AI-generated messages to be analyzed.  
* `model` (string, required): The model that produced the output.  
* `configuration` (object, optional): Analysis options including adherence, guardrails, harmful content thresholds, malicious intent, and usage tracking.

An input metadata example:

```json
{
  "messages": [
    {
      "role": "assistant",
      "content": "Sure! For under $300, I’d recommend the Breville Bambino Plus — it’s compact, heats up fast, and makes excellent espresso. If you prefer something manual, the Flair Pro 2 is also a great pick!",
      "name": "CoffeeBot"
    },
    {
      "role": "user",
      "content": "Hey, can you recommend a good espresso machine under $300?",
      "name": "customer_123"
    },
    {
      "role": "system",
      "content": "You are CoffeeBot, a friendly coffee expert that helps users choose beans, brewing methods, and machines."
    }
  ],
  "model": "gpt-4.1",
  "configuration": {
    "adherence": {
      "mode": "monitoring",
      "pre_check_threshold": 0.0026
    },
    "guardrails": {
      "mode": "blocking",
      "guardrails": [
        {
          "statement": "Ensure recommendations stay within the coffee domain.",
          "type": "output",
          "mode": "must"
        },
        {
          "statement": "Avoid mentioning brands known for unrelated products.",
          "type": "output",
          "mode": "must_not"
        }
      ]
    },
    "harmful_content": {
      "mode": "response",
      "threshold": 0.5
    },
    "malicious_intent": {
      "mode": "response"
    },
    "usage": {
      "mode": "monitoring",
      "save_message_content": true
    }
  }
}
```

#### Output Metadata

* `results` (object): Contains detailed analysis results per category:
  * `adherence`: Instruction adherence results.
  * `guardrails`: Guardrails compliance and violations.
  * `harmful_content`: Scores and flags for harmful content categories.
  * `malicious_intent`: Scores and labels for malicious intent.
  * `usage`: Tokens and message tracking information.