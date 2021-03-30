---
title: Using cookies
layout: component
description: Information on how Cookies works and why to use them.
icon: rest-api.png
icontext: REST API component
category: rest-api
updatedDate: 2021-01-28
ComponentVersion: 2.0.7
---

## Cookies

Sometimes it's required to read and set cookies. To read cookies you should have gain access to the `Set-Cookie` headers of the _HTTP Response_,
in this case you should check the ``Don`t throw Error on Failed Calls`` option. Please note that HTTP Response may have **multiple**
`Set-Cookie` headers therefore you should expect to find an **array** of values in the HTTP Response

![image](https://user-images.githubusercontent.com/56208/85700153-66160180-b6dc-11ea-8885-45f8c888dc8a.png)

To _set_ Cookies you could simply use the HTTP header on your _Response_ called `Cookie` to a cookie value to a
list of name-value pairs in the form of <cookie-name>=<cookie-value>. Pairs in the list are separated by a semicolon and a space ('; ')
like `yummy_cookie=choco; tasty_cookie=strawberry`. More information on setting the cookies can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie).
