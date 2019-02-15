---
title: Aws-Lambda component
layout: article
section: Utility Components
---

> elastic.io integration component that calls out to AWS Lambda API

#
AWS Lambda Component component for the [elastic.io platform](http://www.elastic.io &#34;elastic.io platform&#34;)

If you plan to **deploy it into [elastic.io platform](http://www.elastic.io &#34;elastic.io platform&#34;) you must follow sets of instructions to succeed**.

## Authentication

Authentication is implemented using AWS Security Key and AWS Security Secret. [Here](http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html) you should be able to find
instructions on how to generate them.

## Actions

### Invoke a lambda function

This action will invoke a AWS Lambda function. It has following configuration parameters:

![image](https://user-images.githubusercontent.com/56208/30986933-79239550-a495-11e7-968e-c17b49036385.png)

Please refer to the [AWS Lambda documentation](http://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html) for
more information about the parameters.

Incoming JSON can be adjusted using the *JSONata Expression* field. Please make sure result of evaluation is a valid JSON.

Action supports returning JSON value as result.

If invocation was successful then action will try to parse resulting payload
as JSON and if parsing was successful then action will emit a new elastic.io message
with the resulting JSON as ``body``.

If JSON parsing of the payload after successful invocation will fail then action
will emit the elastic.io message with body equal to ``AWS.Response``, like this:

```json
{
  "StatusCode": 200,
  "Payload": "result from the lambda invocation"
}
```

If ``LogType`` was set to ``Tail`` then returned (last 4 KB of log) that is returned with the
response will be logged out to compoentn log standard output (and visible in the elastic.io log)

## Known issues

* Invocation Type ``DryRun`` is not supported - make no sense in the context

## License

Apache-2.0 © [elasticio](https://elastic.io)


[npm-image]: https://badge.fury.io/js/aws-lambda-component.svg
[npm-url]: https://npmjs.org/package/aws-lambda-component
[travis-image]: https://travis-ci.org/elasticio/aws-lambda-component.svg?branch=master
[travis-url]: https://travis-ci.org/elasticio/aws-lambda-component
[daviddm-image]: https://david-dm.org/elasticio/aws-lambda-component.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/elasticio/aws-lambda-component
