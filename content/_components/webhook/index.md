---
title: Webhook component
layout: article
section: Utility components
---
## Description


### Purpose
An open source component for sending and receiving [WebHooks](https://en.wikipedia.org/wiki/Webhook) on [elastic.io platform](https://www.elastic.io "elastic.io platform").


## Credentials

Webhook component supports the following authorisation types:
* **No Auth** - use this method to work with any open REST API
* **Basic Auth** - use it to provide login credentials like username/password
* **API Key Auth** - use it to provide API Key to access the resource
* **HMAC verification shared secret** - use it to verify via a shared secret

![imae0](/img/credentials.png)


### Triggers

  ### Receive

  Simple webhook trigger which receives data as an input and starts the flow execution after this.

   #### Expected output metadata

   Example:

   ```
{
    "recievedBody": "recievedBody",
    "_query": {},
    "_headers": {
      "content-type": "application/json",
      "accept": "*/*",
      "accept-encoding": "gzip, deflate"
    },
    "_method": "POST",
    "_url": "/hook/5d691738cb5a286adc1e68e2"
  }
```

## Actions

### Send data

Simply sends data it receives as an input to a URL provided.

WebHook action can also be used to troubleshoot many processes to see the outcome.
For example one could create Invoices (in Salesforce) to Webhook flow and configure the Webhook with a url created in https://webhook.site or with any similar services.

#### List of Expected Config fields

  * **[required]** **HTTP Verb**
    * **POST**. The WebHook component can POST information to preconfigured WebHook address. This action could be used for different purposes. For example WebHook can be used to inform your custom connector about an event which it waits to work.
    * **PUT**. The WebHook component can also PUT a specific preconfigured JSON into specific address where the process will not be handled by the server. For this reason the "Output JSON Sample" field can be used.

  * **[required]** **URI**. This is the address to send WebHook.
  * **[not required]** **Secret**. This is an optional field to authenticate WebHook POST. There maybe cases when a special password or a secret might be required. For example the WebHook address was generated explicitly with a password so that to prevent any third parties to use it. This could be your specific WebHook address that you use to send your Wordpress posts into your server.

![Webhook credentials](https://user-images.githubusercontent.com/8449044/61962330-ec5c2c00-afd1-11e9-8e5f-6a1c89126034.png)

  Example:

     ```metadata json
    {
        "recievedBody": "recievedBody",
        "_query": {},
        "_headers": {
          "content-type": "application/json",
          "accept": "*/*",
          "accept-encoding": "gzip, deflate"
        },
        "_method": "POST",
        "_url": "/hook/5d691738cb5a286adc1e68e2"
      }
    ```

## Known limitations

1. Maximal possible size for an attachment is 10 MB.

2. Attachments mechanism does not work with [Local Agent Installation](https://support.elastic.io/support/solutions/articles/14000076461-announcing-the-local-agent-)
