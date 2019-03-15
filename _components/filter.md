---
title: Filter component
layout: article
section: Utility Components
---
---
## Description

A component to filter the incoming data based on arbitrary expression.

## How it works

Filter will pass though incoming message if it match the condition specified in
the configuration. Expression is actually any JavaScript expression, so you can
be creative. For example following expressions are possible:

*   `true`
*   `false`
*   `!false`
*   `body.foo` - will be true if `body.foo` is defined and not `false`
*   `body.foo > 5`
*   `parseFloat(body.flString) > 2`
*   `body.flString > 20`
*   `moment(body.iso8601).day() == 1`
*   `moment(body.start_at).isAfter(moment("1995-12-24"))`

The expression that you use in filer will be evaluated in the
[fresh JS context](https://nodejs.org/api/vm.html#vm_script_runinnewcontext_sandbox_options)
but you can expect following in the context:

*   `body` - this is the body of incoming message
*   `attachments` - attachments from incoming message
*   `headers` - headers for incoming message
*   `moment` - useful library for date and time transformation, documentation can be found [here](https://momentjs.com/).

Rejected messages could be **optionally** sent to the other integration flow,
but please note that only integration flows that start with **Webhook** and may
potentially accept the incoming data could be selected as reject flow.

## Requirements

### Environment variables

By default no environment variable is necessary to operate the component. However,
a tenant level environment variables must be added to the component repository.

### Tenant level environment variable

Current version of the component requires a Webhook URL basis for your environment

*  `HOOKS_URL` - basis url for your webhooks, like `https://tenant-address/hook/` (note the slash at the end)

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

### Filter

This triggers has two parameters:

*   `Filter condition` - A JavaScript expression which should be evaluated to a Boolean values of `true` or `false`. If it is evaluated `false` message will be rejected.
*   `Send rejected messages to` - An optional parameter with a possibility to select the flow ID which would receive the message in case the first parameter was evaluated `false`. Only WebHook flow can be selected.

## Known limitations

*   Reject task should be:
*   Start with {{site.data.tenant.name}} standard WebHook
*   Only body of the rejected message got propagated to reject flow, not the attachments or headers


## License

Apache-2.0 © [{{site.data.tenant.name}} GmbH](https://www.{{site.data.tenant.name}})
