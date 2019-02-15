---
title: Email component
layout: article
section: Utility Components
---

Email component for the elastic.io platform using [Mandrill](http://mandrillapp.com/) REST API. In order to use this API. For each incoming message the component send a new transactional message through Mandrill using the [Send](https://mandrillapp.com/api/docs/messages.JSON.html#method=send) API resource.
### Error handling types

You can choose different scenarios of exception handler using "**Do not throw an error when e-mail send failed**" switch.

 * If switch above has false value, error event will be emitted for each element of Mandrill API response array that has status==(rejected | invalid), error event will be the same as result we've got from Mandrill API.

 * If switch above has true value, error events will not emitted to the flow level. In this case sending result will be in output message.

![alt text](./doc/2.png "Exception handling type")


### Multiple recipients
Email component can send messages to multiple recipients.
You can fill comma separated list of email addresses for input parameters:
* **To**
* **Cc**
* **Bcc**

### Example:

![alt text](./doc/1.png "Example of multiple recipients feature")


### Response structure
As a result of sending you will get object **"results"** which contain result entities of sending messages for each recipient

``` js
{
  "results": [
    {
      "RecipientType": "to",
      "Message": "INVALID",
      "ErrorCode": 0,
      "MessageID": "cae5a6d1233d430fa41cd4317b2ad070",
      "SubmittedAt": "2018-06-07T14:24:13.9150000+00:00",
      "To": "email1elastic.io"
    },
    {
      "RecipientType": "to",
      "Message": "OK",
      "ErrorCode": 0,
      "MessageID": "97d78bc5b37f4b7b8a0517c409d5e43c",
      "SubmittedAt": "2018-06-07T14:24:13.9180000+00:00",
      "To": "email2@elastic.io"
    },
    {
      "RecipientType": "cc",
      "Message": "OK",
      "ErrorCode": 0,
      "MessageID": "c785b33ccfd546668752605d6c19f878",
      "SubmittedAt": "2018-06-07T14:24:13.9180000+00:00",
      "To": "email3@elastic.io"
    },
    {
      "RecipientType": "cc",
      "Message": "OK",
      "ErrorCode": 0,
      "MessageID": "511f60c5da974980b797cbbd2796b129",
      "SubmittedAt": "2018-06-07T14:24:13.9180000+00:00",
      "To": "email4@elastic.io"
    },
    {
      "RecipientType": "bcc",
      "Message": "OK",
      "ErrorCode": 0,
      "MessageID": "ba5d29e8ca2f4322961eac50180a4caf",
      "SubmittedAt": "2018-06-07T14:24:13.9180000+00:00",
      "To": "email5@elastic.io"
    }
  ]
}
```

### Attachments
E-mail component can include attachment to email. More information about attachments functionality on elastic.io platform You can find at [this resource](https://support.elastic.io/support/solutions/articles/14000057806-working-with-binary-data-attachments-)

### Env vars
The component can be configured using the following environmental variables

| Env va        | Required        | Default value  |
| ------------- |:-------------:| :-----:|
| MANDRILL_API_KEY      | yes | - |
| MANDRILL_FROM_EMAIL      | no      | no-reply@elastic.io |
| MANDRILL_FROM_NAME | no      |    elastic.io |


Please note that you must [verify your domain](https://mandrill.zendesk.com/hc/en-us/articles/205582247) before using this component and configuring it with your envorinmetal variables.
