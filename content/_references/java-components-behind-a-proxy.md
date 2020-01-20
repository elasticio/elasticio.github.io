---
title: Java components behind a proxy
description: Deails on how to push the code in cases you are sitting behind the proxy.
layout: article
section: Working with Java
order: 3
category: component descriptor
---

## Description

When the {{site.data.tenant.name}} platform is installed on a premise with a HTTP or HTTPS proxy server, all the communication with external services goes via that proxy. Using the proxy has two implications on how you deploy and develop your Java components. In this article you will learn how to use proxy in your component for deployment and runtime execution.

## Deployment of components behind a proxy

By default, all Java components for the {{site.data.tenant.name}} platform are built with the [Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html). The Gradle Wrapper is downloaded during the component deployment from a URL such as [https://services.gradle.org/distributions/gradle-2.8-all.zip](https://services.gradle.org/distributions/gradle-2.8-all.zip). Furthermore during the build Gradle will download all the required dependencies from the [Maven Central](https://search.maven.org/).

In order to successfully download the Gradle Wrapper and the dependencies you need to configure Gradle to use your proxy. This is accomplished by configuring the proxy system properties in the Gradle configuration file **gradle.properties**, as shown in the following example:

```
systemProp.http.proxyHost=www.somehost.org
systemProp.http.proxyPort=8080
systemProp.https.proxyHost=www.somehost.org
systemProp.https.proxyPort=8080
```

 If you don't have **gradle.properties** file in your project yet, create it and commit it to Git. Please note that **gradle.properties** is expected to be located in the root folder of your Java component, next to build.gradle file. More details on configuring HTTP or HTTPS proxy in Gradle can be found in [accesing the web via a proxy](https://docs.gradle.org/current/userguide/build_environment.html#sec:accessing_the_web_via_a_proxy) document ar Gradle site.

## Sending requests to external APIs via proxy

Typically a component sends requests to an external API over HTTPs. If you are using a [HttpClient](http://hc.apache.org/httpcomponents-client-ga/), you need to configure it to use your HTTP or HTTPS proxy so that you can communicated with external resources. This is accomplished as shown in the following example:

```js
final HttpGet request = new HttpGet("https://acme.org/api/v2/users");
request.addHeader("Accept", "application/json");
final String httpProxy = System.getenv("HTTP_PROXY");
if (httpProxy != null) {
    final URI uri = URI.create(httpProxy);
    final HttpHost proxy = new HttpHost(uri.getHost(), uri.getPort(), uri.getScheme());
    final RequestConfig config = RequestConfig.custom().setProxy(proxy).build();
    request.setConfig(config);
}
```

A live working example can be seen in the Java component for Salesforce API.

Please note that the proxy configuration is done by your administrator of the {{site.data.tenant.name}} platform. If configured, the proxy is exposed to your Java component during runtime as one of the environmental variables:

  * `HTTP_PROXY`
  * `HTTPS_PROXY`

In the example above the proxy configuration is retrieved from the environmental variable `HTTP_PROXY`. If set, the value of the variable is used to create an instance of `HttpHost` class which is passed to `RequestConfig.setProxy()`. The resulting configuration is set into the request object of type `HttpGet`.

For further details on how to configure the **HttpClient** to use your proxy, please check out [this example](https://hc.apache.org/httpcomponents-client-ga/httpclient/examples/org/apache/http/examples/client/ClientExecuteProxy.java).

## Related links

- [Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html)
- [Maven Central](https://search.maven.org/)
- [Accessing the web through a HTTP proxy](https://docs.gradle.org/current/userguide/build_environment.html#sec:accessing_the_web_via_a_proxy)
- [Apace Http Components](http://hc.apache.org/httpcomponents-client-ga/)
- [Example on how to configurethe HttpClient](https://hc.apache.org/httpcomponents-client-ga/httpclient/examples/org/apache/http/examples/client/ClientExecuteProxy.java)
