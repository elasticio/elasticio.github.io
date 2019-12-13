---
title: Environment variables available during component execution
layout: article
section: Component Descriptor
order: 1
category: environment-variables
---

## Description

We export a number of environment variables during each task step execution. You can use these variables in your component.

## API
  * `ELASTICIO_API_USERNAME`: The name of your user to be used for authentication with {{site.data.tenant.name}} REST API.

  * `ELASTICIO_API_KEY`: The API secret key for for authentication with {{site.data.tenant.name}} REST API.

  * `ELASTICIO_API_URI`: The address of {{site.data.tenant.name}} REST API.

## Step Execution

  * `ELASTICIO_TASK_ID`: Id of the task being executed

  * `ELASTICIO_EXEC_ID`: Id of the execution

  * `ELASTICIO_COMP_ID`: The id of the component being executed

  * `ELASTICIO_FUNCTION`: Name of the action or trigger being executed

  * `ELASTICIO_USER_ID`: Id of the user whose task is being executed
