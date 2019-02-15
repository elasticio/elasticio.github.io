---
title: Allmysms component
layout: article
section: Utility Components
---


# Description
## Purpose
Main goal of this component is to provide simple possibility to send SMS to one or multiple receivers.
## How works
Under the hood used AllMySMS API https://www.allmysms.com.

### Environment variables
No.
### Others
# Credentials
**ApiKey -**
API key to access AllMySMS service API.

**login -**
Login of user account for AllMySMS API.

If one of credential fields will be blank then component will work in Trial mode:
* "TRIAL USE: " will be added before text
* Number of receivers will be limitetd to two

# Actions
## Send
Sends SMS to one or multiple receivers.

### Input fields:

**nums -** List of receivers mobile numbers separated with comma. E.g. `"3xxxxxxxx,3xxxxxxxxx"`. Recommended to limit number of receivers to 2000.

**sender -** Sender name that will be displayed on receiver side.
Requirements: 3 to 11 characters, only alpha-numeric (A-Z/0-9) and must start with a letter.

**message -** Text that will be sent.
Requirements: Maximal length is 160. Everything above will be truncated.

## Links
https://doc.allmysms.com/api/allmysms_api_https_v9.0_1.18_EN.pdf - API doc.


# Requirements

AllMySMS Connector Overview:

To create a component to allow the sending of SMS from elastic.io platform. The component includes a demo API key and "Trial" sending ability, when the trial is used the message that is sent has a prefix of "TRIAL USE: " added to the message, the number of senders is limited to 2 in trial mode.

Action:

The component will have a single action to send SMS, this will take number and message as inputs.

The action can take a string of numbers or a single number, the string should be comma separated. Clean the input to only allow +0-9 and skip any number that fails this basic check. Specific number validation is not performed by elastic.io. ** check batch sending

Component Credentials:

API key is needed, if no API key is supplied then the component is assumed to be in "trial" mode and the hard coded elastic.io API key is used with the message prefix of "TRIAL USE: " added.

Deployment:

The plugin should be available on ALL elastic.io organisations as standard.
