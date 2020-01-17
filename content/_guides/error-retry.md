---
title: Error Retry
description: Error retry is a feature which gives a possibility to try to process the failed messages in the integration flows.
layout: article
section: Building integration flows
order: 1
since: 20191202
---

## Description

Error retry is a feature which gives a possibility to try to process the failed messages
in the integration flows.

## Use case of Retry

Any complex integration flow can fail due to unpredictable problems like network
disruption between the platform and the third party source such as your CRM or ERP.
If this disruption occurs during the API request there is a high chance the platform
would not process the data and report an error like timeout or remote host is unreachable.

In another example with reading the data from an external database every day. Now if
the database is under maintenance or offline your flow step responsible for
connecting and downloading the data would fail. This would disrupt your integration flow.

To recover from this situation might seem tricky at first, but, the platform
features are here to help.

As a good sign we suggest using the [snapshots](using-snapshots) to save the state of
the step. Configure the [rebound](/getting-started/rebound) to enable automatic retry
of messages in case of failures. And the last not least, use the retry.


## Reprocess and Retry

When the platform fails to connect with a third party resource the request or the
intended data would still be in the processing queue. If you have configured the
[rebound](/getting-started/rebound) the system would retry it until it goes through.
Otherwise, if the connectivity is not back in couple of hours the system would
report `Rebound limit exceeded` and would stop trying. The platform would stop
trying after 10 times.

When the automatic retry fails to deliver due to the time constrains you can
use the manual retry of the errors. Here is how it works.

Let's start a generic integration Flow and cause an error. It will
be seen here in the logs. Then we run it, see errors, and go to check the runlog
to click *Retry* and see what happens:

![Retry feature in action](/assets/img/integrator-guide/instant-error-management/retry.gif)

When you press Retry the platform will then try to run the erroneous process again.
The error will be removed from the execution page.

> **Note**: the integration flow must be active for Retry feature. When the flow is
> inactive the Retry button would not be visible.

Before you proceed to press Retry button try to assess the situation:

*   Have you done the troubleshooting as to why the error appeared in the first place?
*   Have you checked with the third party resource if it is up and running?
*   Are you sure a simple retry would solve the problem?

If answer to any of these questions is no then it is highly possible you would get
an error again after the Retry.

## Related links

- [Using Snapshots](using-snapshots)
- [Rebound](/getting-started/rebound)
