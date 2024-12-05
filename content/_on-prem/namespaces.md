---
layout: article
title: Namespaces
order: 3
section: Helm3 deployments
version: 22.38
description: Creating platform namespaces.
category: helm3
---

{: .no_toc}
{{page.description}}

Started from platform version 21.31 we removed hard-coding of the Kubernetes
namespaces to integrate the platform into more Enterprise friendly infrastructures.

The platform HELM3 charts expect to find namespaces for:

*   Integration flow steps
*   Platform microservices
*   Monitoring microservices

We define these namespaces in the [`values.glubal.namespaces`](common-values#namespaces)
section of the HELM3 charts.

### Creating Namespaces

If you are installing the platform for the first time or updating the platform
version from the version 21.31, you must create required namespaces explicitly.

Delete existing namespaces or uninstall the helm release if you need to upgrade the platform from 21.31 platform version. **IMPORTANT**: this will delete the active cluster!
{: .note.errors}

Create the required namespaces in kubernetes cluster (the `name` and `labels.name`
must match the values provided in the `values.global.namespaces` of HELM3 charts):
```yaml
apiVersion: v1
kind: Namespace
metadata:
  labels:
name: <monitoring_namespace_name_from_values>
  name: <monitoring_namespace_name_from_values>
---
apiVersion: v1
kind: Namespace
metadata:
  labels:
name: <platform_namespace_name_from_values>
  name: <platform_namespace_name_from_values>
---
apiVersion: v1
kind: Namespace
metadata:
  labels:
name: <tasks_namespace_name_from_values>
  name: <tasks_namespace_name_from_values>
```

After this you can install the helm release.