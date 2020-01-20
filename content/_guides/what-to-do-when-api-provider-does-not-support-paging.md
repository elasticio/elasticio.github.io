---
title: What to do when API provider does not support paging?
description: This article describes what to do when API provider does not support paging?
layout: article
section: Paging
category: paging
order: 2
---

Some API providers do not support pagination via their API calls but only through their UI. At those providers, there is a general notion that API calls are used only for downloading the whole dataset only for offline use. However, in the current world of interconnectivity, this model is outdated and prone to many errors like:

  * Datasets are much bigger and **requesting the whole data would be very resource intensive** on the both sides. This can cause **timeouts** and **delays** which could sometimes mean starting the original request one more time and from the beginning again.

  * Processing of big datasets in one go through the integration flows would also be resource intensive and would require additional resources to be allocated. **More resources could be associated with higher prices**.

> If your chosen API is not supporting pagination please contact us to discuss the available options and to learn how to proceed. Since every API is its own characteristic we can not provide general guidelines on it.
