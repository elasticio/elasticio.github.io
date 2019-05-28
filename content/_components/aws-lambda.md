---
title: AWS Lambda component
layout: article
section: Utility Components
---
---
## Description

An integration component that calls out to Amazon AWS Lambda API.

## Requirements

### Environment variables

None required.

## Credentials

The component requires the following credentials to authenticate with the AWS services:

*   `AWS Access Key` - this is your Access Key ID when you created the AWS account
*   `AWS Access Secret` - this is your Secret access key given to you during the key creation

These keys are displayed only once, just after the creation of the credentials in AWS.
To generate new ones follow the instructions given at [Getting Your Credentials](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html) page.

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Invoke a lambda function

This action will invoke a AWS Lambda function. It has following configuration parameters:

![image](https://user-images.githubusercontent.com/56208/30986933-79239550-a495-11e7-968e-c17b49036385.png)

Please refer to the [AWS Lambda documentation](http://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html) for
more information about the parameters.

Incoming JSON can be adjusted using the *JSONata Expression* field. Please make
sure result of evaluation is a valid JSON.

Action supports returning JSON value as result.

If invocation was successful then action tries to parse resulting payload
as `JSON` and if parsing was successful then action emits a new message
with the resulting JSON as `body`.

If JSON parsing of the payload after successful invocation fails then action emits the
message with body equal to `AWS.Response`, like this:

```json
{
  "StatusCode": 200,
  "Payload": "result from the lambda invocation"
}
```

If `LogType` was set to `Tail` then the last 4 KB of the log will be returned
with the response and will be logged out to component log standard output (and
visible in the platform log)

## Known issues

*   Invocation Type ``DryRun`` is not supported - make no sense in the context

## License

Apache-2.0 © [{{site.data.tenant.name}} GmBH](https://www.{{site.data.tenant.name}})
