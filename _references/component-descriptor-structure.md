---
title: Component Descriptor Structure
layout: article
section: Component Descriptor
since: 20180315
---

Each integration component developed for {{site.data.tenant.name}} platform must
have a **component descriptor** file called `component.json` in its root folder.
It describes and links component's functions and the credentials necessary to run
your component on the {{site.data.tenant.name}} platform.

To see the component descriptor structure implementation you are welcome to read
our introductory guides about building [java](/developer-guide/building-java-component) or [node.js](/developer-guide/building-nodejs-component) components for the
{{site.data.tenant.name}} platform environment.

Here we will concentrate on providing an in-depth reference about the structure
and the objects which you can use to describe different parts of any component.

Each `component.json` can have the following hierarchic structure:

```
Root Object
├── envVar Object
|
├── Credentials Object
|   ├── fields Object
|   ├── OAuth1 Object
|   └── OAuth2 Object
|
├── Trigger Object
|   ├── fields Object
|   └── metadata Object
|
└── Action Object
    ├── fields Object
    └── metadata Object
```

| Object Type | Implementation |
| :--- | :--- |
| Root Object | used to declare the component |
| envVar Object | used to declare the environment variables |
| Credentials Object | used to grant component the access |
| Trigger Object | used to expose component's triggers |
| Action Object | used to expose component's actions |
