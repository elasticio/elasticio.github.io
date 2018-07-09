---
title: Deploying a component
layout: article
section: Developing Components
category: component
order: 5
---

This document is a step-by-step guide to help you understand how our system works and the steps necessary to get a simple component pushed and ready for a successful integration using {{site.data.tenant.name}} platform.

#### In this guide

1.  [Upload your SSH Key](#upload-your-ssh-key)
2.  [Clone component](#clone-and-prepare-your-component-locally)
3.  [Prepare remote repository](#prepare-the-remote-repository)
4.  [Push into the repository](#push-your-component)
5.  [Use it](#use-the-component)

## Upload your SSH Key

The first step would be to [upload your SSH Key](ssh-keys) to authorise your deployment via git-push process. Please note that **failure to provide (upload) a unique SSH key would result in error "Permission denied" during the code Push phase**.

## Clone and prepare your component locally

If you have you have prepared your component locally by following instructions in how to build a component in Node.js or Java then you can skip this step. Otherwise, you can clone one of our template repositories to go through these steps couple of times to familiarise yourself. At the moment we are supporting only Node.js and Java so here are component templates in each language respectively:

*   [Petstore Component for Node.js]({{site.data.tenant.petStoreSourceNodeJS}} "Petstore components for Node.js")
*   [Petstore Component for Java]({{site.data.tenant.petStoreSourceNodeJS}} "Petstore Component for Java")

For example, in case of Node.js you could start like this:

```sh
$ git clone {{site.data.tenant.petStoreSourceNodeJS}}
Cloning into 'petstore-component-nodejs'...
remote: Counting objects: 130, done.
remote: Compressing objects: 100% (9/9), done.
remote: Total 130 (delta 3), reused 0 (delta 0), pack-reused 121
Receiving objects: 100% (130/130), 43.40 KiB | 0 bytes/s, done.
Resolving deltas: 100% (60/60), done.
```

Checking the directory where you have cloned the component:
```sh
$ cd  petstore-component-nodejs/
$ ls -ga
total 64
drwxr-xr-x  10 staff    340 Mar  9 17:08 .
drwxr-xr-x  12 staff    408 Mar  9 17:08 ..
drwxr-xr-x  13 staff    442 Mar  9 17:08 .git
-rw-r--r--   1 staff    526 Mar  9 17:08 .gitignore
-rw-r--r--   1 staff   2703 Mar  9 17:08 README.md
-rw-r--r--   1 staff   2808 Mar  9 17:08 component.json
drwxr-xr-x   5 staff    170 Mar  9 17:08 lib
-rw-r--r--   1 staff  11543 Mar  9 17:08 logo.png
-rw-r--r--   1 staff    621 Mar  9 17:08 package.json
-rw-r--r--   1 staff   1005 Mar  9 17:08 verifyCredentials.js
```
More information is available in [Building a component in Node.js](building-nodejs-component) help page.

## Prepare the remote repository

At this stage, we want to know which repositories we have access to:
```sh
$ git remote -v
origin {{site.data.tenant.petStoreSourceNodeJS}} (fetch)
origin {{site.data.tenant.petStoreSourceNodeJS}} (push)
```

Now we need to add a new repository in our platform by following instructions in [Managing your Teams/Components](teams-and-repos) page. For a simplicity let us take the same name for the repository creation **petstore-component-nodejs**, and let's say we have created this particular repository in the development team called **dev-build**. The platform would create a specific git repository like this: `dev-build@git.{{site.data.tenant.name}}:petstore-component-nodejs.git`. Then we add this repository to our local git configuration of local repository like this

```sh
$ git remote add ipaas dev-build@{{site.data.tenant.gitDomain}}:petstore-component-nodejs.git
$ git remote -v
ipaas dev-build@{{site.data.tenant.gitDomain}}:petstore-component-nodejs.git (fetch)
ipaas dev-build@{{site.data.tenant.gitDomain}}:petstore-component-nodejs.git (push)
origin {{site.data.tenant.petStoreSourceNodeJS}} (fetch)
origin {{site.data.tenant.petStoreSourceNodeJS}} (push)
```

Our repository is ready to receive the **petstore-component-nodejs** component.

## Push your component

After performing all the task described above we are ready to push our code to the newly created repository. To do that we will type:
```sh
$ git push ipaas master
```

Before your push would go ahead the system will want to authenticate your SSH Key which we have created specifically for this. Please type yes and accept it to proceed.

## Use the component

The newly added component is in the list of components when you start creating your [integration flow](/getting-started/integration-flow).

If your component has **only Action function** then your component would show only when selecting an Action function while building the integration flow.

If your component has **only Trigger function** then your component would show only when selecting a Trigger component.
