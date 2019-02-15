---
title: Filter component
layout: article
section: Utility Components
---


> elastic.io filter component to filter incoming data based on arbitrary expression

# filter-component
Filter component for the [elastic.io platform](http://www.elastic.io &#34;elastic.io platform&#34;)

If you plan to **deploy it into [elastic.io platform](http://www.elastic.io &#34;elastic.io platform&#34;) you must follow sets of instructions to succseed**.

![image](https://cloud.githubusercontent.com/assets/56208/22467841/7b19fa48-e7c6-11e6-934d-7ad224d5cd54.png)

## How it works

Filter will pass though incoming message if it match the condition specified in configruation. Expression is actually any JavaScript expression, so you can be creative. For example following expressions are possible:
 * ``true``
 * ``false``
 * ``!false``
 * ``body.foo`` - will be true if ``body.foo`` is defined and not ``false``
 * ``body.foo > 5``
 * ``parseFloat(body.flString) > 2``
 * ``body.flString > 20``
 * ``moment(body.iso8601).day() == 1``
 * ``moment(body.start_at).isAfter(moment("1995-12-24"))``
 * more examples [here](https://github.com/elasticio/filter-component/blob/master/test/filter.spec.js#L42)

The expression that you use in fitler will be evaluated in the
[fresh JS context](https://nodejs.org/api/vm.html#vm_script_runinnewcontext_sandbox_options)
but you can expect following in the context:
 * ``body`` this is the body of incoming message
 * ``attachments`` attachments from incoming message
 * ``headers`` headers for incoming message
 * ``moment`` useful library for date and time transformation, documentation can be found [here](https://momentjs.com/).

Rejected messages could be **optionally** sent to the other integration flow, but please note that only integration flows
that start with **Webhook** and may potentially accept the incoming data could be selected as reject flow.


## Known limitations

* Reject task should be:
 * Start with elastic.io standard WebHook
* Only body of the rejected message got propagated to reject flow, not the attachments or headers

## Deploying your fork of this component

After registration and uploading of your SSH Key you can proceed to deploy it into our system. At this stage we suggest you to:
* [Create a team](http://docs.elastic.io/docs/teams) to work on your new component. This is not required but will be automatically created using random naming by our system so we suggest you name your team accordingly.
* [Create a repository](http://docs.elastic.io/docs/component-repositories) where your new component is going to *reside* inside the team that you have just created.

Now as you have a team name and component repository name you can add a new git remote where code shall be pushed to. It is usually displayed on the empty repository page:

```bash
$ git remote add elasticio your-team@git.elastic.io:your-repository.git
```

Obviously the naming of your team and repository is entirely upto you and if you do not put any corresponding naming our system will auto generate it for you but the naming might not entirely correspond to your project requirements.
Now we are ready to push it:

```bash
$ git push elasticio master
```

## Configure environment variables

Current version of the component requires a Webhook URL basis for your environment
 * ```HOOKS_URL``` - basis url for your webhooks, like ``https://in.elastic.io/hook/`` (note the slash at the end)

## License

Apache-2.0 © [elastic.io GmbH](https://www.elastic.io)


[npm-image]: https://badge.fury.io/js/filter-component.svg
[npm-url]: https://npmjs.org/package/filter-component
[travis-image]: https://travis-ci.org/elasticio/filter-component.svg?branch=master
[travis-url]: https://travis-ci.org/elasticio/filter-component
[daviddm-image]: https://david-dm.org/elasticio/filter-component.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/elasticio/filter-component
