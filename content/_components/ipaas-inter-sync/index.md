---
layout: component
title: iPaaS inter sync component
section: Utility components
description: iPaaS inter sync component is designed to interact with iPaaS integration platform.
icon: ipaas-inter-sync.png
icontext: iPaaS inter sync component
category: ipaas-inter-sync
ComponentVersion: 1.0.0
updatedDate: 2026-04-24
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions) 
  * [Copy workspace](#copy-workspace) 
  * [Copy flow](#copy-flow)
* [Known Limitations](#known-limitations) 
* [Triggers](#triggers)

## Description

{{page.description}}

The current release of the component tested on API version `v2`.

## Credentials

Component credentials configuration fields: 
* **Source Email** - (string, optional, current user by default)
* **Source API Key** - (string, optional, current [user API key](/getting-started/user-profile-information.html#manage-your-api-key) by default)
* **Source Instance API URL** - (string, optional, current Instance API URL by default, e.g. `https://api.{{site.data.tenant.name}}/`)
* **Destination Email** - (string, required)
* **Destination API Key** - (string, required)
* **Destination Instance API URL** - (string, required)

## Actions 
  
### Copy workspace 

This action is used to copy all flows or a selected list of flows from one workspace to another.

#### Configuration Fields

* **Source Contract** - (dropdown, optional, current contract by default): Select the Contract from which you want to copy the flows.
* **Source Workspace** - (dropdown, optional, current workspace by default): Select the Workspace from which you want to copy the flows.
* **Copy only selected flows** - (checkbox, optional): If checked you can selects flows to copy, otherwise all flows will be copied
* **Select flows to copy** - (multiselect-dropdown, optional): Select flows that you need to copy.
* **Destination Contract** - (dropdown, required): Select the Contract to which you want to copy the flows.
* **Destination Workspace** - (dropdown, required): Select the Workspace to which you want to copy the flows, or select `Create new Workspace`.
* **Component version match strategy** - (dropdown, optional, `Exact match or latest` by default): Choose one of the component version check strategies:
  * **Use latest** - Use the latest published version of every component.
  * **Exact match** - Use the published version of the component with the exact same semantic version. An error will be thrown if there is no published version of the component with the exact same semantic version.
  * **Exact match or latest** - Will use same version, but if it's not found - latest published version will be used
* **Search components by name** - (checkbox, optional): If selected, this component will attempt to find the corresponding flow component by name if there is no matching team/repo name, otherwise, it will search only by the exact same team/repo name.
* **Replace flow in destination workspace** - (checkbox, optional): If checked, the component will replace the flow in the destination workspace if a flow with the same name exists. If there is more than one flow with that name, or if no flow with that name is found, the component will create a new flow.
* **Don't create credentials** - (checkbox, optional): If checked, and there is no credentials in destination workspace with the same name as in flow, or with name `migration dummy`, an error will be thrown, otherwise new credentials will be created.
* **Stop on error** - (checkbox, optional): If there will be error during flows copy process, component will stop processing records, otherwise it will continue with remaining flows
* **Skip data samples** - (checkbox, optional): Don't copy data samples.
* **Skip dynamic metadata** - (checkbox, optional): Don't copy dynamically generated input and output metadata.
* **Skip select models** - (checkbox, optional): Don't copy dynamically generated select models (in configuration fields).

#### Input Metadata
* **Rebase** (array of objects, optional): If you need to use a different component in the target workspace than the original flow, you can provide the mapping here:
  * **Source team name** - The developer team of the source flow component.
  * **Destination team name** - The developer team of the destination workspace component.
  * **Source repo name** - The repository name of the source flow component.
  * **Destination repo name** - The repository name of the destination workspace.
If `Destination Workspace` set as `Create new Workspace`, there will be additional field:
* **Workspace Name** - (string, required): The name of the Workspace to create.  

#### Output Metadata
Objects `results` with following fields
* **flowName** - (string, required): Name of the created flow
* **flowId** - (string, required): The ID of the flow in destination workspace.
* **warnings** - (array of strings, optional): Any warnings that happened during flow creation
  
### Copy flow 

This action is used to copy the selected flow from one workspace to another.

#### Configuration Fields

* **Source Contract** - (dropdown, optional, current contract by default): Select the Contract from which you want to copy the flow.
* **Source Workspace** - (dropdown, optional, current workspace by default): Select the Workspace from which you want to copy the flow.
* **Destination Contract** - (dropdown, required): Select the Contract to which you want to copy the flow.
* **Destination Workspace** - (dropdown, required): Select the Workspace to which you want to copy the flow
* **Component version match strategy** - (dropdown, optional, `Exact match or latest` by default): Choose one of the component version check strategies:
  * **Use latest** - Use the latest published version of every component.
  * **Exact match** - Use the published version of the component with the exact same semantic version. An error will be thrown if there is no published version of the component with the exact same semantic version.
  * **Exact match or latest** - Will use same version, but if it's not found - latest published version will be used
* **Search by flow name** - (checkbox, optional): If checked, you will need to provide the flow Name instead of the flow Id
* **Search components by name** - (checkbox, optional): If selected, this component will attempt to find the corresponding flow component by name if there is no matching team/repo name, otherwise, it will search only by the exact same team/repo name.
* **Replace flow in destination workspace** - (checkbox, optional): If checked, the component will replace the flow in the destination workspace if a flow with the same name exists. If there is more than one flow with that name, or if no flow with that name is found, the component will create a new flow.
* **Don't create credentials** - (checkbox, optional): If checked, and there is no credentials in destination workspace with the same name as in flow, or with name `migration dummy`, an error will be thrown, otherwise new credentials will be created.
* **Skip data samples** - (checkbox, optional): Don't copy data samples.
* **Skip dynamic metadata** - (checkbox, optional): Don't copy dynamically generated input and output metadata.
* **Skip select models** - (checkbox, optional): Don't copy dynamically generated select models (in configuration fields).

#### Input Metadata

* **Rebase** (array of objects, optional) - If you need to use a different component in the target workspace than the original flow, you can provide the mapping here:
  * **Source team name** - The developer team of the source flow component.
  * **Destination team name** - The developer team of the destination workspace component.
  * **Source repo name** - The repository name of the source flow component.
  * **Destination repo name** - The repository name of the destination workspace.
If `Search by flow name` is checked:
* **Flow Name** - (string, required): The name of the flow to be processed.  
Otherwise:
* **Flow ID** - (string, required): The ID of the flow to be processed.

#### Output Metadata
* **flowName** - (string, required): Name of the created flow
* **flowId** - (string, required): The ID of the flow in destination workspace.
* **warnings** - (array of strings, optional): Any warnings that happened during flow creation

#### Known Limitations
* The destination workspace must contain the same components as the source workspace. You may need to use `Search components by name` in the configuration if they have different team/repo names but the same title or use `Rebase` in mapping if they have different team/repo names.
* If `Search by flow name` is checked and there is more than one flow with the same name, the component will throw an error.
* The component will attempt to find destination credentials with the same name as those in the source flow and use them. If not found, it will create new credentials with `test` or empty data and name `migration dummy`, which you will need to manually replace with actual values.
* If multiple destination credentials share the same name, the component will use the first one available.
* Component will always use existing 
* The component will try to find destination topics (if used in the flow) with the same name as those in the source flow. If not found, it will be created.
* During copying process, component will also copy all data samples, generated metadata and dynamic select models.
* If you use `Replace flow in destination workspace` and in destination workspace:
  * founded flow is running - it will be Stopped before updating
  * founded flow has draft version - draft will be deleted
  * flow not found or founded more than one flow - new flow will be created
* Copied flow will always be in Stopped state.
* Only published source flow version will be copied (ignoring draft version).

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.