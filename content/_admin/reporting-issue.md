---
title: Reporting an issue
layout: article
section: Support
description: Information on how to report a problem or ask for help.
order: 1
category: support
---

## Read this first

Every running system is prone to some errors and malfunction. While we would love
to see everything running and functioning seamlessly, we must accept that our system
has some bugs and shortcomings. We are constantly working on providing solution and
fixing the bugs.

We keep track of every bug and limitation in our system. We also know that the
new problems are unavoidable. We strive to discover those problems ourselves but
we also value your contribution and feedback.

Before you submit your report or question please check the following documentation
pages for explanations and suggestions on how to overcome problems.

*   [Platform Behaviour](/guides/platform-behavior/) - a general guideline on imposed limits and safeguards.
*   [Managing Flow Errors](/guides/managing-flow-errors/) - how to understand errors on your flows.
*   [Understanding Sample errors](/guides/understanding-sample-errors/) - troubleshooting data sample errors.
*   [Error Retry and Retention Policy](/guides/error-retry/) - how to retry the flow errors.
*   [Custom Error Handler](/guides/custom-error-handler/) - how to set custom error handling.

## How to contact us

> **If above articles and guidelines did not provide answers you seek please get in touch with us by sending an e-mail to [{{site.data.tenant.supportEmail}}](mailto:{{site.data.tenant.supportEmail}}).**

{% if site.data.tenant.name == "elastic.io" %}

Every email sent to our support opens a support ticket and you get an automated
reply with a ticket number which you can track by registering in our
[support portal](https://support.elastic.io/). The support portal credentials
are not the same as your credentials while logged into the platform. If this is
the first time submitting an issue, our portal will automatically create a new account for you.
If you have submitted an issue before you already have an account -
[login here](https://support.elastic.io/support/login).

> Please note, you must not register in our support portal to communicate
> with us. You will get answers per email every time you submit a ticket to our
> support email. Registration is for convenience to manage all your queries in one
> place from a unified interface.

{% endif %}

## What information to send

To help you address the problems ASAP we ask you to send us as much information
as possible about the encountered problem. If you don't know from where to start
use the following list for guidance:


*   **Your contract ID, workspace ID and the flow ID** - We need this to start our investigation. Check [how to find IDs we need?](#how-to-find-ids-we-need) section for help.
*   **When did it happen?** - We would need this information to locate the events on our back-end.
*   **Description including logs and screenshots** - Describe in as much detail as possible including the [logs and screenshots](#logs-and-screenshots).
*   **Steps to reproduce if you can** - This would greatly help us to replicate the issue and provide the solution or a workaround for a time being.
*   **Is this a blocker for you right now?** - Explain how it blocks your work.
*   **Priority: how soon you need solution?** - What would be the latest acceptable time for you?

If you don't know how to locate the information listed here keep reading. We have
necessary details and guidelines you can follow to start your own troubleshooting.

## How to find IDs we need?

To locate the necessary IDs you don't need to look far. You can find all IDs in
the browser address bar while visiting platform pages. For example:
```
{{site.data.tenant.appURL}}/c/5b62c919fd98ea20112d53ad/w/57977bd3ee64438036020003
```
Here the alphanumeric value after the `/c/` and before `/w/` is the contract ID.
The value after `/w/` is the workspace ID.

When you open any flow page you will get the flow ID appended to the address in
URL like:
```
.../w/57977bd3ee64438036020003/designer/5f7707d709994d0011430214/v/latest
```
Here, the flow ID is the alphanumeric value after `/designer/` and before `/v/`.

For the completion, last part in the URL shows the version (`/v/`) of the flow. In
above example this is the `latest` version. Otherwise, you will see here the flow
version ID. If you are editing the flow here you will see `/draft` instead of `/v/`
and the flow version.

Similarly, you can get IDs of any entity like execution ID, credential ID or
repository ID while visiting the pages and checking the browser address bar.

## Logs and screenshots?

When you encounter error on any integration flow execution you can
[download or copy the logs](/guides/managing-flow-errors.html#downloading-the-logs)
to send us.
**Please do not send screenshots of logs, they are not useful for our investigation.**

When you send screenshots please make sure the browser address bar, workspace name,
flow name or any other identifiable information is visible for confirmation.

You can also send logs of the browser Console and Network tabs if you can identify
the errors there as well. Please send the text and the screenshot of the problems
you see in the browser Console and Network tabs.

## Can you reproduce it?

If you can reproduce the issue over and over again then please share with us the
exact steps you need to do to replicate it again.

If you cannot reproduce the issue and it happens randomly, then tell us what you
were doing when this happens. Have you noticed anything unusual?
