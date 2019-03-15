---
title: Sftp component
layout: article
section: Utility Components
---


SFTP component for the {{site.data.tenant.name}} platform

## How to use it

Essentially this component has only one trigger that will regularly pull SFTP
location of your choice.

### Authentication

Credentials of SFTP component looks like this:

![image](https://cloud.githubusercontent.com/assets/56208/22926055/58c8d924-f2ab-11e6-8c79-434ba8db9a36.png)


fields above are self-explaining

### Configuration

After configuring (and verifying) the credentials you should configure incoming
folder (mandatory). Optionally

### How it works

After file is found on SFTP it does following:

 * It moves the file to the (hidden) `.platform_processed` directory
 * It pulls it and upload (stream) the file to the attachment storage (aka. steward)
 * After upload is completed, READ-URL of the file will be used to generate one message with the content like below:

```json
{
  "id": "5e00ca80-f2a3-11e6-9fdd-e7b75b43e28b",
  "attachments": {
    "large.xml": {
      "url": "https://steward.address"
    }
  },
  "body": {
    "filename": "large.xml",
    "size": 2508908
  }
}
```

next component may just read from the URL in attachment in order to get the memory efficient way to read/parse data.
Please note that if multiple files are found, SFTP component will generate one message per file.

> NOTE: you may need to consider cleaning up the ``.platform_processed`` directory manually

### Limitations

Currently the maximum file size that is accepted by SFTP component is limited to
100 MB.
