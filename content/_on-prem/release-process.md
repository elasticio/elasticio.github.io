---
layout: article
title: Release Process
order: 1
section: Operation Guides
description: This document describes a common approach for release delivery for OEM customers.
category: operation
---

{: .no_toc}

{{page.description}}

1. TOC
{:toc}

## Roadmap planning

### elastic.io responsibility:

To ensure that platform will evaluate according to the customers and market needs,
elastic.io will gather feedback from OEM customers on a regular basis regarding:

*   General feedback
*   Suggested components improvements
*   Suggested functionality improvements
*   Required functionality
*   Required components

Then the feedback would be help prioritise the roadmap for at least two next releases
(2 months). Roadmap update information will be communicated to the OEM customers.

### OEM customer responsibility:

Provide feedback to EIO:

*   Platform usage experience
*   Future/ongoing projects
*   Future/ongoing use cases

> Frequency and communication methods should be agreed individually with OEM customer and elastic.io Customer Success

## Release acceptance

Before installing release should be approved by OEM customer. elastic.io installs
new releases on the app.elasti.io production every 2nd week. OEM customers will
receive release notes to understand what was done. New functionality can be tested
by OEM customers on the elastic.io production.

Once every four weeks a general release notes will published in our
[documentation portal](/releases). All release changes
will be tested and approved by the OEM customer on the elastic.io production.

> elastic.io will ensure release quality, each release tested by elastic.io QA
> team before deploying to elastic.io production and on the moment of delivery
> to the OEM WL instance will be already tested by elastic.io production users.

## Release delivery

By default, elastic.io will install releases on OEM instances on a monthly
(once in four weeks) basis. If all release changes are tested and approved by the
OEM customer elastic.io will install release to the OEM instance in a week after
release date. Documentation on the White-labeled portal can be updated with two
strategies:

1.   elastic.io handles updates documentation updates
2.   OEM customer handles documentation updates

## Summary

*   Release cycle:  Roadmap planning => Release acceptance => Release delivery
*   Roadmap planning based on customers feedback
*   Release acceptance based on release notes review and testing on the elastic.io production
*   Release delivery consist from platform and documentation portal update
*   Platform update usually performed in a week after release date once in a four weeks
