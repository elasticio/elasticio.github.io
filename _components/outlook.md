---
title: Outlook component
layout: article
section: Utility Components
---


> elastic.io integration component for the Office 365 Outlook REST API

# MS Office 365 Outlook
Microsoft Outlook component for the [elastic.io platform](http://www.elastic.io &#34;elastic.io platform&#34;)

If you plan to **deploy it into [elastic.io platform](http://www.elastic.io &#34;elastic.io platform&#34;) you must follow sets of instructions to succseed**.

## Before you Begin

Before you can deploy any code into elastic.io **you must be a registered elastic.io platform user**. Please see our home page at [http://www.elastic.io](http://www.elastic.io) to learn how.

We&#39;ll use git and SSH public key authentication to upload your component code, therefore you must **[upload your SSH Key](http://docs.elastic.io/docs/ssh-key)**.

&gt; If you fail to upload you SSH Key you will get **permission denied** error during the deployment.

## Getting Started

After registration and uploading of your SSH Key you can proceed to deploy it into our system. At this stage we suggest you to:
* [Create a team](http://docs.elastic.io/docs/teams) to work on your new component. This is not required but will be automatically created using random naming by our system so we suggest you name your team accordingly.
* [Create a repository](http://docs.elastic.io/docs/component-repositories) where your new component is going to *reside* inside the team that you have just created.

Now as you have a team name and component repository name you can add a new git remote where code shall be pushed to. It is usually displayed on the empty repository page:

```bash
$ git remote add elasticio your-team@git.elastic.io:your-repository.git
```

Obviously the naming of your team and repository is entirely up to you and if you do not put any corresponding naming our system will auto generate it for you but the naming might not entirely correspond to your project requirements.
Now we are ready to push it:

```bash
$ git push elasticio master
```

## Authentication

This component uses OAuth 2.0 authentication, so when deploying it to
your team you need to supply OAuth App Client ID and Client Secret.
You can register your app to obtain a client ID and secret via
https://apps.dev.microsoft.com, for that you would need to sign in with
either your Microsoft account (Outlook.com), or your work or school account (Office 365).

Client ID and Secret need to be configured in the environment variables
```MSAPP_CLIENT_ID``` and ```MSAPP_CLIENT_SECRET```. When specifying
callback URI  please use your callback URL in a form

```
https://your-tenant.elastic.io/callback/oauth2
```

for public cloud default tenant just use ``https://app.elastic.io/callback/oauth2``

Apart from the OAuth 2.0 button you would need to specify the __AD tenant ID__
 if you not sure about that just use ``common``.

## Scope and Consent

Before using this component certain Microsoft Graph scopes need to be defined for your application.
This can be done via https://apps.dev.microsoft.com.

The list of scopes required by the component is: "calendars.read calendars.readwrite contacts.read mail.read mail.send user.read".

## Known issues and limitations

### Current implementation uses AD V2.0 OAuth2

Second version of AD protocol has [some advantages](https://azure.microsoft.com/en-us/documentation/articles/active-directory-v2-compare/), see [here](https://azure.microsoft.com/en-us/documentation/articles/active-directory-v2-limitations/) for more information.

### OData output for lastModifiedDateTime has a precision issue

Apparently the ``lastModifiedDateTime`` returned by MS Graph has no milliseconds in it is obvious that filter query accept and treat millisecond values correctly
there is a workaround for that issue implemented in the code, however you need to keep an eye on it.

## License

Apache-2.0 © [elastic.io GmbH](http://elastic.io)


[npm-image]: https://badge.fury.io/js/outlook.svg
[npm-url]: https://npmjs.org/package/outlook
[travis-image]: https://travis-ci.org/elasticio/outlook.svg?branch=master
[travis-url]: https://travis-ci.org/elasticio/outlook
[daviddm-image]: https://david-dm.org/elasticio/outlook.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/elasticio/outlook
