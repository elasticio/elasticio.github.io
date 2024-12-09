---
title: Email style
description: This document describes the CSS parameters used to style emails.
layout: article
category: platform-emails
---

{: .no_toc}

{{page.description}}

- TOC
{: toc}

## General styles

```css
body {
  margin:0;
  padding:0;
  width:100% !important;
  -webkit-text-size-adjust:none;
}

table td {
  border-collapse:collapse;
}

img {
  border:0;
  height:auto;
  line-height:100%;
  outline:none;
  text-decoration:none;
}

h1,.h1 {
  color: #202020;
  display: block;
  font-family: Arial;
  font-size: 34px;
  font-weight: bold;
  line-height: 100%;
  margin: 0px 0px 10px 0px;
  text-align:left;
}

h2,.h2 {
  color: #202020;
  display: block;
  font-family: Arial;
  font-size: 30px;
  font-weight: bold;
  line-height: 100%;
  margin: 0px 0px 10px 0px;
  text-align:left;
}

h3,.h3 {
  color: #586474;
  display: block;
  font-family: 'PT Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 28px;
  font-weight: bold;
  line-height: 100%;
  margin: 0px 0px 8px 0px;
  text-align:left;
}

h4,.h4 {
  color: #202020;
  display: block;
  font-family: Arial;
  font-size: 22px;
  font-weight: bold;
  line-height: 100%;
  margin: 0px 0px 10px 0px;
  text-align:left;
}
```

## Header part


```css
#backgroundTable {
  height:100% !important;
  margin:0;
  padding:0;
  width:100% !important;
  background-color:#FAFAFA;
}

#templatePreheader {
  background-color:#f4f5f6;
}

.preheaderContent div {
  color:#505050;
  font-family:Arial;
  font-size:10px;
  line-height:100%;
  text-align:left;
}

.preheaderContent div a:link,
.preheaderContent div a:visited,
.preheaderContent div a .yshortcuts {
  color:#336699;
  font-weight:normal;
  text-decoration:underline;
}

#templateHeader {
  background-color:#f4f5f6;
  border-bottom:0;
}

#headerImage {
    height:auto;
    max-width:600px !important;
}

.headerContent {
  color: #202020;
  font-family: Arial;
  font-size: 34px;
  font-weight:bold;
  line-height:100%;
  padding:0;
  text-align:center;
  vertical-align:middle;
}

.headerContent a {
    color:#333333;
    text-decoration:none;
}

.headerContent a:link,
.headerContent a:visited,
.headerContent a .yshortcuts {
  color:#336699;
  font-weight:normal;
  text-decoration:underline;
}
```
## Body part

```css
#templateContainer,
.bodyContent {
  background-color:#FFFFFF;
}

.bodyContent div {
  color:#505050;
  font-family:Arial;
  font-size:14px;
  line-height:150%;
  text-align:left;
}

.bodyContent div a:link,
.bodyContent div a:visited,
.bodyContent div a .yshortcuts {
  color:#336699;
  font-weight:normal;
  text-decoration:underline;
}
.bodyContent img {
    display:inline;
    height:auto;
}

.ExternalClass {
  width:100%;
}

#templateContainer {
  overflow: hidden;
  border:1px solid #f4f5f6;
  border-radius: 5px;
}
```


## Footer part

```css
#templateFooter {
  background-color:#FFFFFF;
  border-top:0;
}

.footerContent div {
  color:#707070;
  font-family:Arial;
  font-size:12px;
  line-height:125%;
  text-align:left;
}

.footerContent div a:link,
.footerContent div a:visited,
.footerContent div a .yshortcuts {
  color:#336699;
  font-weight:normal;
  text-decoration:underline;
}
.footerContent img {
  display:inline;
}
```
