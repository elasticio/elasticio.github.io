---
title: SSH session during the component pushing
layout: article
section: Developing Components
category: component
order: 1
---

> How to keep your SSH sessions from disconnecting while pushing a component?

During the component deployment, all the necessary package dependencies are
downloaded from the external resources. This is to ensure that the version of
the package you have in your `package.json` is exactly the one that you indicate.

The process of downloading the dependencies depends on the connectivity with the
external resources and when a particularly big resource is being downloaded can
take more than a minute or so. Since the connection between you and our server is
maintained via SSH then this kind of long period can cause for the server to break
the connection and failure of your deployment process:

```
fatal: The remote end hung up unexpectedly
```

What is happening here is the SSH connection is not receiving any updates and
after some time the connection is dropped. To prevent this from happening the
local SSH configuration can be used to send regular enquiries telling the server
to keep the connection alive.

The configuration file is located in the local SSH setup directory `.ssh/config`.
If the file does not exist it needs to be created and the following lines to be added:

```
host *
    ServerAliveInterval 30
    TCPKeepAlive yes
```

These lines tell the SSH to automatically send a **no-op null packet** every 30
seconds (`ServerAliveInterval`) so that the server won’t disconnect you.
`TCPKeepAlive` is set to **yes** to indicate that the TCP connections should not
be dropped.
