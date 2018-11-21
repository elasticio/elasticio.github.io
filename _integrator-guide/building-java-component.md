---
title: Building a component in Java
layout: article
section: Developing Components
category: component
order: 3
since: 20171201
---

The {{site.data.tenant.name}} platform supports Java programming language for building integration components.
Please read the [JavaDocs]({{site.data.tenant.javaAPIDocs}} "Java API documentation") of the Java SDK or browse the
source code on [GitHub]({{site.data.tenant.javaAPISource}} "Java API").

To help you create a component in Java we have created a simple
[Petstore component in Java]({{site.data.tenant.petStoreSourceJava}} "Petstore Component in Java")
which connects to the [Petstore API]({{site.data.tenant.petStoreDocs}} "Petstore API") and demonstrates multiple
features of the platform.

## Petstore Component

Let's have a look at the structure of the Petstore component first.

```sh
petstore-component-java
├── build.gradle                                (1)
├── component.json                              (2)
├── gradle
│   └── wrapper                                 (3)
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew                                     (4)
├── gradlew.bat                                 (5)
├── logo.png                                    (6)
├── schemas                                     (7)
│   ├── createPet.in.json
│   ├── createPet.out.json
│   └── getPetsByStatus.out.json
└── src
    └── main
        └── java                                (8)
```

The Java components for the {{site.data.tenant.name}} platform are built by [Gradle](https://gradle.org/) and so have a
typical structure of a Gradle project. Each component has a `build.gradle` (1) file used to configure Gradle project,
dependencies, plugins, etc. Your build file can be a regular Gradle build file. We only require you to define the following
dependency:

````
compile "io.elastic:sailor-jvm:2.0.1"
````

Sailor is the Java SDK for the {{site.data.tenant.name}} platform. It makes your component a citizen of the
{{site.data.tenant.name}} platform by providing you a simple programming model for components and ensuring a smooth
communication with the platform.

Java components are always built with [Gradle Wrapper](https://docs.gradle.org/4.3.1/userguide/gradle_wrapper.html)
in order to make sure that we build your component with the same version of Gradle as you did. That's why you are required
to add Gradle wrapper (3), (4) and (5) to your project and commit it to Git.

If you have a logo for the component, you can place the file called `logo.png` (5) in the root directory of the component.
Typically the logo of the API vendor gets used as component logo. If you did not provide any logo, the component will
show a generic logo for your component.

The directoty `src/main/java` (8) is predefined directory Gradle expects your Java sources to be located in and the
`schemas` (7) directory is the location of JSON schemas defining the component's metatada which we will cover later in
this article.

Last but not least the `component.json` file (2) is the component descriptor interpreted by the platform to gather all
the required information to be presented to the user in the platform UI. For example, you can define simple things like
component's title in the component descriptor but also the component's authentication mechanism. The descriptor is
the only place to list the functionality provided by the component, the so called `triggers` and `actions`.

## Component descriptor

As mentioned above the `component.json` file is the component descriptor interpreted by the platform to gather all the
required information about the component. Let's explore the descriptor of the Petstore component:

```json
{
  "title": "Petstore API (Java)",                                           (1)
  "description": "Component for the Petstore API",                          (2)
  "credentials": {                                                          (3)
    "fields": {
      "apiKey": {
        "label": "API key",
        "required": true,
        "viewClass": "TextFieldWithNoteView",
      }
    },
    "verifier": "io.elastic.petstore.ApiKeyVerifier"                        (4)
  },
  "triggers": {                                                             (5)
    ...
  },
  "actions": {                                                              (6)
    ...
  }
}
```

The component descriptor above defines the component title (1) and description (2). It also defines the fields used to
ask the user to provide input for authentication (3). In this case a single field is define in which the user will input
the API key for the Petstore API so that the component can communicate with the API on user's behalf. The property
`verifier` (4) is used to define an implementation of the `io.elastic.api.CredentialsVerifier` interface which will be
invoked by the platform when a user credential, such as an API key, needs to be verified before storing it in the platform.

The `triggers` (5) and `actions` (6) properties are used to define the component's triggers and actions.

Now let's have a closer look on how to define triggers. The example below demonstrates the `triggers` section from the
`component.json` component descriptor file.

```json
  "triggers": {
    "getPetsByStatus": {                                                (1)
      "main": "io.elastic.petstore.triggers.GetPetsByStatus",           (2)
      "type": "polling",                                                (3)
      "title": "Get Pets By Status (HttpClient)",
      "fields": {                                                       (4)
        "status": {
          "label": "Pet Status",
          "required": true,
          "viewClass": "SelectView",
          "model": {
            "available": "Available",
            "pending": "Pending",
            "sold": "Sold"
          },
          "prompt": "Select Pet Status"
        }
      },
      "metadata": {
        "out": "./schemas/getPetsByStatus.out.json"                     (5)
      }
    }
  }
```

The example above demonstrates that the trigger with id `getPetsByStatus` (1) is implemented by the `GetPetsByStatus`
class (2). The trigger is of `polling` type (3) meaning it will wake up periodically to poll for changes in the Petstore
API. The triggers can be configured with some fields (4) and defines out-metadata in the file `getPetsByStatus.out.json` (5).

## Verifying credentials

As mentioned above you can configure a credentials verifying in the component's descriptor. In the Petstore component
the verifier is implemented in the `io.elastic.petstore.ApiKeyVerifier` class, shown below:

````java
public class ApiKeyVerifier implements CredentialsVerifier {                    (1)

    @Override
    public void verify(final JsonObject configuration)
        throws InvalidCredentialsException {                                    (2)
        try {
            final JsonObject user
                = HttpClientUtils.getSingle("/user/me", configuration);         (3)
        } catch (Exception e) {                                                 (4)
            throw new InvalidCredentialsException("Failed to verify credentials", e);
        }
    }
}
````

The `ApiKeyVerifier` class above is an implementation of the `io.elastic.api.CredentialsVerifier` interface (1) which
defines the method `verify` (2). This method takes a `JsonObject` which represents the component's configuration and may
throw an `InvalidCredentialsException` exception. The component's configuration holds the values user input into the
credentials fields defined in `component.json` (see above). The verification above is implemented by sending a simple
request to the Petstore API (3). If the request succeeds, the `verify` method's execution completes successfully and the
credentials as assumed to be valid. Otherwise an `InvalidCredentialsException` is thrown to signal the platform that the
provided credentials (API key) is invalid. An error will be displayed to the user.

## Implementing a trigger

Any [integration flow](/getting-started/integration-flow) starts with a trigger which is responsible to start the flow's
execution by providing new data to be processed. A trigger might query an API for updates and in case of new changes
start the integration flow.

Now let's have a look at how to implement a trigger defined in the `component.json` descriptor above. The following
listing demonstrates the `GetPetsByStatus` class which is responsible to retrieve pets from the Petstore API by a status.
If new pets can be found, the trigger will start the flow to process the new pets.

````java
public class GetPetsByStatus implements Module {                            (1)

    @Override
    public void execute(ExecutionParameters parameters) {                   (2)
        JsonObject configuration = parameters.getConfiguration();           (3)

        JsonString status = configuration.getJsonString("status");          (4)

        if (status == null) {
            throw new IllegalStateException("status field is required");    (5)
        }

        JsonArray pets = HttpClientUtils.getMany(
                "/pet/findByStatus?status=" + status.getString(),
                configuration);                                             (6)

        JsonObject body = Json.createObjectBuilder()
                .add("pets", pets)
                .build();                                                   (7)

        Message data
                = new Message.Builder().body(body).build();                 (8)

        parameters.getEventEmitter().emitData(data);                        (9)
    }
}
````

The `GetPetsByStatus` class is an implementation of the `Module` interface (1). This interface specifies the `execute`
method (2) to implement the trigger's logic. This method takes an instance of `ExecutionParameters` which provides a
component with data required for execution. For example, the component may retrieve its configuration (3) from these
parameters.

The trigger's author defined a field named `status` in `component.json` to let the integrator enter a status of pets he
is interested in. The value of this field is available to the component from the configuration (4). Because `status` is
required, the trigger throws an exception if the value does not exist (5). The value of the `status` field is encoded
into the request url as a query parameter and the request is sent to the Petstore API (6). The retrieved response is an
array of pets, returned as `JsonArray` instance. Because {{site.data.tenant.name}} platform does not support naked arrays
yet, the response is wrapped into an instance of `JsonObject` (7).

Finally a `Message` is created (8) and emitted to the platform (9). Please note that you can't emit pure JSON objects to
the platform but always must create a platform message from you payload and emit this message. The emitted message will
be passed by the platform to the next step of the integration flow.
