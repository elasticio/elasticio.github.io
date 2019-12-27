---
title: How to implement the pagination?
layout: article
section: Paging
category: paging
order: 1
---

## Description

Before we can proceed any further one should clearly examine the API provider's documentation to get familiarised with the accepted method of pagination usage.

In order to avoid producing too many data, a component developer should use paging which is done in a combination with the [snapshot](/getting-started/snapshot-overview) feature.

## Implementing paging with the help of snapshot

First, we would need to setup the snapshot object which would only have 2 properties: `nextPage` and `timestamp`. The property `timestamp` is used to record the most recent update time of an object in the target system and the property `nextPage` is used to remember the index of the next page to retrieve. Here is the algorithm behind:

  1. At the beginning snapshot is empty, so that trigger queries based on timestamp `>= 1970`.

  2. If the API supports paging, trigger checks if the result is paged. If yes then the next page to retrieve is calculated and saved into the `nextPage` property in the snapshot.

  3. On next iteration, trigger checks if `nextPage` is available in the snapshot. If so it queries now the next page and overwrites the `nextPage` with a new value. At the same time, it should preserve the `timestamp`timestamp for the later comparison.

  4. After iterating through all the pages, the `nextPage` parameter is removed from the snapshot. However, the timestamp property must stay in the snapshot.

  5. It is important to define max `timestamp` through all the pages. This is accomplished either by filtering or by comparing all the `timestamp` values in all pages with the `timestamp` in the snapshot.
