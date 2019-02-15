---
title: Sftp component
layout: article
section: Utility Components
---


SFTP component for the elastic.io platform

![image](https://cloud.githubusercontent.com/assets/56208/22926023/33899f22-f2ab-11e6-9e2b-3736a2e135ac.png)

## How to use it

Essentialy this component has only one trigger that will regularly pull SFTP location of your choice.

### Authentication

Credentials of SFTP component looks like this:

![image](https://cloud.githubusercontent.com/assets/56208/22926055/58c8d924-f2ab-11e6-8c79-434ba8db9a36.png)


fields above are self-explaining

### Configuration

After configuring (and verifying) the credentials you should configure incoming folder (mandatory). Optionally

### How it works

After file is found on SFTP it does following:
 * It moves the file to the (hidden) ``.elasticio_processed`` directory
 * It pulls it and upload (stream) the file to the attachment storage (aka. steward)
 * After upload is completed, READ-URL of the file will be used to generate one message with the content like below:

```json
{
  "id": "5e00ca80-f2a3-11e6-9fdd-e7b75b43e28b",
  "attachments": {
    "large.xml": {
      "url": "https://steward.eio.cloud/foo&Signature=5%2FsrvmbGGfVoYpKeMH3ugaEL"
    }
  },
  "body": {
    "filename": "large.xml",
    "size": 2508908
  }
}
```

next component may just read from the URL in attachment in oder to get the memory efficient way to read/parse data.
Please note that if multiple files are found, SFTP component will generate one message per file.

> NOTE: you may need to consider cleaning up the ``.elasticio_processed`` directory manually

### Limitations

Currently the maximum file size that is accepted by SFTP component is limited to
100 MiB, see
[here](https://github.com/elasticio/sftp-component/blob/master/lib/triggers/read.js#L8)
for more information
