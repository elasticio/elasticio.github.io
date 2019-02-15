---
title: Amqp component
layout: article
section: Utility Components
---

PubSub component for the [elastic.io platform](http://www.elastic.io &#34;elastic.io platform&#34;)

If you plan to **deploy it into [elastic.io platform](http://www.elastic.io &#34;elastic.io platform&#34;) you must follow sets of instructions to succseed**.

## Before you Begin

Before you can deploy any code into elastic.io **you must be a registered elastic.io platform user**. Please see our home page at [http://www.elastic.io](http://www.elastic.io) to learn how.

We will use git and SSH public key authentication to upload your component code, therefore you must **[upload your SSH Key](http://docs.elastic.io/docs/ssh-key)**.

If you fail to upload you SSH Key you will get **permission denied** error during the deployment.

## Getting Started

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

## How consumer works

Consumer will register a non-exclusive non-durable queue with autodelete=true without
  any dead-letter. Name of the queue will be dynamically
  generated based on the user ID, TASK ID prefixed with ``eio_consumer_``.
  This queue will be bound to the exchange with specified bound key or multiple
   bound keys that are specified in one string separated by commas.

## Authentication

This component exects user to provide a AMQP URI, username and password should be embedded
as part of the URI, for example ``amqp://foo:bar@server``. You can also use URI syntax
to parametrize any other options (e.g. vHost or port)

## Encryption

This component will automatically encrypt data that is sent to the queue when following
environment variables are set:

* ``ELASTICIO_MESSAGE_CRYPTO_IV`` vector for symmetric encryption
* ``ELASTICIO_MESSAGE_CRYPTO_PASSWORD`` password for symmetric encryption

These variables are by default available in elastic.io environment.
Data will be encrypted using symetrical AES-256 encryption.


## Known issues

Following limitations of the component are known:
* You can not publish to the default exchange. Not a huge limitation can be easily fixed
but IMHO makes no sense now.
* All exchanges you publish to are by default 'topic' exchanges - not a big limitation
either, but with topic exchanges you can emulate direct and fanout exchanges
so is't a sensible default so far.


## License

Apache-2.0 © [elastic.io GmbH](https://elastic.io)


[npm-image]: https://badge.fury.io/js/amqp-component.svg
[npm-url]: https://npmjs.org/package/amqp-component
[travis-image]: https://travis-ci.org/elasticio/amqp-component.svg?branch=master
[travis-url]: https://travis-ci.org/elasticio/amqp-component
[daviddm-image]: https://david-dm.org/elasticio/amqp-component.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/elasticio/amqp-component
