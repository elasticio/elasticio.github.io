---
layout: article
title: Cert Manager
order: 9
section: Installation Guides
description: Document guides through the installation and configuration of the Cert Manager service.
category: installation
---

{: .no_toc}

{{page.description}}

- TOC
{:toc}

## Introduction

We are using [cert-manager](https://cert-manager.io/) to store Tenant domains HTTPS certificates. We expect cert-manager already installed in your kubernetes cluster, no additional configuration required.

## Installation

Follow [Helm installation guide](https://cert-manager.io/docs/installation/helm/). **!!!IMPORTANT!!! do not install cert-manager to namespaces used by platform.**

## Configuration

No additional configuration required.