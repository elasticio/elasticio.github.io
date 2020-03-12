---
title: OpenID
layout: article
section: Introduction
description: This document provides basic information on OpenID and how it is used to perform user login to the Platform.
since: 20200206
order: 1
---

This document describes [OpenID Connect](#openid-connect), why [it is great](#why-use-openid), and how we [use it on the Platform](#openid-on-the-platform).

## OpenID Connect
OpenID Connect (OIDC) lets developers authenticate users without taking on the responsibility of storing and managing passwords. OIDC creates a universal user ID, which includes the selected user data, and never shares this data, even for authentication purposes. Basically, it integrates with the site or application, and just safely approves login requests instead of sending usernames and passwords through the Internet.

With OIDC, even the site or application you are trying to log into, does not know your login data. It only requests ID confirmation from the OpenID Provider, and accepts it. OpenID is rapidly gaining adoption on the web, with over one billion OpenID enabled user accounts and over 50,000 websites accepting OpenID for logins. Several large organizations either issue or accept OpenIDs, including Google, Facebook, Yahoo!, Microsoft, and many more.

## Why Use OpenID
OpenID is the fast, easy and secure way to sign in to websites. Here are a few benefits to using OpenID:

1\. OpenID accelerates that process by allowing you to sign in to websites with a single click. Basic profile information (such as your name, birth date and location) can be stored through your OpenID and used to pre-populate registration forms, so you spend more time engaging with a website and less time filling out registration pages.

2\. With OpenID, you can use a single, existing account (from providers like Google, Yahoo, AOL or your own blog) to sign in to thousands of websites without ever needing to create another username and password. OpenID is the safer and easier method to joining new sites.

3\. OpenID is a decentralized standard, meaning it is not controlled by any one website or service provider. You control how much personal information you choose to share with websites that accept OpenIDs, and multiple OpenIDs can be used for different websites or purposes. If your email (Google, Yahoo), photo/video stream or blog serves as your primary online presence, OpenID allows you to use that portable identity across the web.

4\. With OpenID, passwords are never shared with any websites, and if a compromise does occur, you can simply change the password for your OpenID, thus immediately preventing a hacker from gaining access to your accounts at any websites you visit. Because the focus of most OpenID providers (such as Google, Yahoo and AOL) is in identity management, they can be more thorough about protecting your online identity. Most website operators are less likely to be as dedicated to protecting your identity as the OpenID providers, whose focus is on securely hosting user identities.


## OpenID on the Platform
Provided your admin has enabled OIDC for the Platform, a login form should appear in the UI. Depending on the OIDC Provider, it may look differently. Here is our example Platform login form via Google:

![OpenID Google Login](/assets/img/getting-started/openid/googlelogin.png)

It looks like any other "login with Google" form you may have seen on multiple websites that support such a login method. Now, if we select the "acme.co" profile and try to proceed, we get right into our ACME testing Platform:

![Logged via Google](/assets/img/getting-started/openid/logged.png)

Provided that you have an associated Google profile, here is what happens:

1\. When you choose to sign in to the Platform using your Google account, the Platform sends an Authorization Request to Google.

2\. Google authenticates your credentials or asks you to login if you are not already signed in, and asks for your authorization (lists all the permissions that the Platform wants, for example read your email address, and asks you if you are ok with that).

3\. Once you authenticate and authorize the sign in, Google sends an Access Token, and (if requested) an [ID Token](https://openid.net/specs/openid-connect-core-1_0.html#IDToken), back to the Platform.

4\. the Platform can retrieve user information from the ID Token or use the Access Token to invoke a Google API.
