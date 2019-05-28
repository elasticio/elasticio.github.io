---
title: AWS SNS component
layout: article
section: Utility Components
---
---
## Description

AWS Simple Notification Service integration component.

## How works

The component publishes a message to the SNS topic in a specific Amazon SNS
service access point.

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

### Publish

This action will publish a message to an SNS Topic. There are two required fields
in input:

*   `TopicArn` - this is the specific topic name. More about the topic format below.
*   `AWS Region` - set this to the specific Amazon SNS service access point in the required region.

**Topic ARN**

Amazon SNS assigns a unique ARN (Amazon Resource Name) to the each topic. It
includes the service name, the region and the AWS ID of the user and the topic
name. For example the ARN for the topic named `mysnsrocks` created by a user with
the AWS account ID `123456789` and hosted in the EU West region would be:
```
arn:aws:sns:eu-west-1:123456789:mysnsrocks
```

**AWS Regions**

Here are the regions the component supports:

*   `us-east-1` - US East (N. Virginia)
*   `us-west-1` - US West (N. California)
*   `us-west-2` - US West (Oregon)
*   `eu-west-1` - EU (Ireland)
*   `eu-central-1` - EU (Frankfurt)
*   `ap-northeast-1` - Asia Pacific (Tokyo)
*   `ap-northeast-2` - Asia Pacific (Seoul)
*   `ap-southeast-1` - Asia Pacific (Singapore)
*   `ap-southeast-2` - Asia Pacific (Sydney)
*   `sa-east-1` - South America (Sao Paulo)

More information about the regions is available at the
[AWS Regions and Endpoints](http://docs.aws.amazon.com/general/latest/gr/rande.html#sns_region) document.

## License

Apache-2.0 © [{{site.data.tenant.name}} GmBH](https://www.{{site.data.tenant.name}})
