---
title: Limitations on Attachments
description:  This document provides information on limitations on attachments.
layout: article
section: Behaviour Checks
order: 1
redirect_from:
  - /references/attachments-limitations.html
---

The attachments is one of the platform areas where we enforce the limitations to
ensure proper functionality of all micro-services. Most of these limits are
configurable to some extent. Here are the areas where attachment sizes are limited:

*   **Importing attachments** into the platform, two options:

    -   POST/Push it to the Webhook and

    -   Pull it from a storage (SFTP, S3, File system etc.)

*   **Processing attachments** in the platform by reading in the component (e.g. CSV) and writing it back to attachment storage (e.g. CSV, Amazon Merchant, etc.)

*   **Exporting attachments** to the outside world (e.g. SFTP, S3, e-mail attachment, etc.)

## Importing the attachments

### HTTP Push

You can `POST` **maximum of 10MB data** (`HTTP PUSH`) for further processing via
[WebHook](/components/webhook/).

> **Note**: the maximum allowed size is enforced on the whole HTTP post (body + attachment).

When exceeding the HTTP post size limit, a user trying to send the HTTP Request
will receive the `HTTP 413 - Request Entity Too Large` error response.

### Pulling via SFTP/S3/etc

Importing attachments from outside by polling is limited by individual components:

-   [SFTP component](/components/sftp/) would poll the files below 100 Megabytes in size, if your file is bigger than that SFTP would not poll it and the platform would not report an error message.

-   [AWS S3](/components/aws-s3/) would try to read a file from S3 until its' maximum size is bounded to the available component memory. In case of running into the limit the platform will show an error message `Component run out of memory and terminated`, and if problem persists after a number of restarts the platform will suspend the complete integration flow.

-   [REST API component](/components/rest-api/) would download large binary files via REST/HTTP and serve them as attachments (see content-type limitations in the [REST API component documentation](/components/rest-api/#known-limitations). When reading a file from HTTP its maximum size is bounded to the available component memory. In case of running into the limit the error message `Component run out of memory and terminated` will be shown to the user, and if problem persists after a number of restarts the complete  integration flow will be suspended.

## Processing attachments

Some components parse (read) or write (create) attachments:

-   [ZIP Component](/components/zip/) can write ZIP files with sizes exceeding 100MB, however, any larger files would fail due to platform limitation in attachment size.

-   [CSV Component](/components/csv/) can create a CSV file and it is only limited by the available RAM memory of the component. In case of running into the limit the platform will give an error message `Component run out of memory and terminated`, and if problem persists after a number of restarts the platform will suspend the complete integration flow.

## Exporting attachments

Exporting attachments to 3rd party systems imposed by component as well as
limits of 3rd party systems:

-  [EMail component](/components/email/) has a limit of 25MB in total size of both message and all attachments.

-  [REST API component](/components/rest-api/) can upload (`PUSH`, `PUT`) binary files via REST/HTTP. When uploading a file its maximum size is bounded to the available component memory. In case of running into the limit the platform will give an error message `Component run out of memory and terminated`, and if problem persists after a number of restarts the platform will suspend the complete integration flow.

-  [SFTP component](/components/sftp/) has no limit on the file size to upload into the SFTP server. However, the files creation and transfer through the integration flow has limits and they would apply here as well.
Processing attachments

## Related links

- [WebHook component](/components/webhook/)
- [SFTP component](/components/sftp/)
- [AWS S3](/components/aws-s3/)
- [REST API component](/components/rest-api/)
- [ZIP Component](/components/zip/)
- [CSV Component](/components/csv/)
- [EMail component](/components/email/)
