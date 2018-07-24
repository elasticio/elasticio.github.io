---
title: View Classes
layout: article
section: Component Descriptor
order: 1
category: component descriptor
---

A view class specifies how to render an input field of any integration component
on the {{site.data.tenant.name}} UI. The view class (`viewClass`) is a required
parameter in the [Fields Object](/references/component-descriptor-structure#fields-object)
of every component descriptor file.

Here are the general view classes which are used to render the input fields in
[integration components](/getting-started/integration-components).

| View Class        | Description  |
| :---------------- | :----------- |
| [TextFieldView](#textfieldview)     | Renders a single line text field |
| [TextAreaView](#textareaview)      | Renders a multi-line text area |
| [CheckBoxView](#checkboxview)      | Renders a checkbox |
| [SelectView](#selectview)        | Renders a drop-down menu to select from available values |
| [PasswordFieldView](#passwordfieldview) | Renders a standard password entry text field where the input values are replaced by symbols such as the asterisk (`*`) or a dot (`•`) |
| [OAuthFieldView](#oauthfieldview)    | Renders button for initiating the OAuth process |



## TextFieldView

`TextFieldView` has many purposes. Use it to draw a one-liner text
field form to input the information. For example, you can use it in the case of
[Basic Authorization](component-descriptor-structure#credentials-object) to input
the API key. The possibilities are many but the implementation is similar.


| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| label         | `string` | Yes      | Renders a label with the given text above the input field |
| required      | `boolean`| Yes      | Specifies whether the input value is required for the component to operate properly or not. When `true` is set a red asterisks `(*)` to appear along with input field or the label. If the value is `false` then it is optional to fill the field.|
| placeholder   | `string` | No       | Used to give a short and descriptive text which is rendered in the input field. |
| note          | `string` | No        | Used to provide more information about the input field. When present a question mark `(?)` will appear and the text will be shown in a tool-tip when hovered. It accepts a simple text, URL and HTML `<em>`. The text in tool-tip will be folded for longer texts.|

Here is an example implementation of `TextFieldView` view class:

```
"credentials": {
  "fields": {
    "company_domain": {
      "viewClass": "TextFieldView",
      "label": "Company domain",
      "required": true,
      "placeholder":"yourcompany.pipedrive.com",
      "note":"Enter <em>only</em>&nbsp; the domain name here"
      },
    "token": {
      "viewClass": "TextFieldView",
      "label": "API token",
      "required": true,
      "placeholder": "API token goes here",
      "note":"More information is <a href='https://some/article/url'>here</a>."
    }
  }
}
```
The above example is rendered on the {{site.data.tenant.name}} UI in the following way:

![Rendering of TextFieldView view class](/assets/img/references/view-classes/view-class-text-field-view.png "Rendering of TextFieldView view class")

## TextAreaView

`TextAreaView` can be used to render multi-line text area for the different
purposes.

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| label         | `string` | Yes      | Renders a label with the given text above the input field |
| required      | `boolean`| Yes      | Specifies whether the input value is required for the component to operate properly or not. When `true` is set a red asterisks `(*)` to appear along with input field or the label. If the value is `false` then it is optional to fill the field.|
| placeholder   | `string` | No       | Used to give a short and descriptive text which is rendered in the input field. |
| note          | `string` | No        | Used to provide more information about the input field. When present a question mark `(?)` will appear and the text will be shown in a tool-tip when hovered. It accepts a simple text, URL and HTML `<em>`. The text in tool-tip will be folded for longer texts.|

Here is an example implementation of `TextAreaView` view class:

```
"query": {
  "label": "SQL Query",
  "viewClass": "TextAreaView",
  "required": true,
  "placeholder": "INSERT INTO films (code,title,kind) VALUES (${code},${title},${kind})",
  "note": "You can use properties of message body as <em>${values}</em>&nbsp; in your insert or update or delete"
}
```

Which would render in the following way:

![Rendering of TextAreaView view class](/assets/img/references/view-classes/view-class-text-area-view.png "Rendering of TextAreaView view class")


## CheckBoxView

The `CheckBoxView` view class can be used to render a check-box for enabling an
option during the integration flow design. This view class had only one option:

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| label         | `string` | Yes      | Renders a label with the given text above the input field |

Here is an example implementation of `CheckBoxView` view class:

```
"fields" : {
  "SomeOption" : {
    ......
  },
  "CheckSomething": {
    "label": "CheckBoxView Label",
     "viewClass": "CheckBoxView"
  }
}
```
When the checkbox is selected it will transmit to the next stage `"CheckSomething": on`
(following our example above). Alternatively, if the checkbox is not selected it
will transmit nothing.

If multiple check-boxes are necessary then they have to be implemented one-by-one
in the component descriptor.


## SelectView

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| label         | `string` | Yes      | Renders a label with the given text above the input field |
| required      | `boolean`| Yes      | Specifies whether the selection is required for the component to operate properly or not. When `true` is set a red asterisks `(*)` to appear along with the label. If the value is `false` then it is optional to select.|
| model | `object` or `string` | Yes | Contains the name (`string`) of a function exposed by a component that returns the JSON `object` or the JSON `object` containing the values. |
| prompt   | `string` | No       | Used to give a short and descriptive text which is rendered in the select field. |

Here is an example of `SelectView` view class where the `model` property is an
`object` containing the values:

```
"fields": {
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
```

This is rendered in the following way:

![Rendering of the SelectView view class](/assets/img/references/view-classes/view-class-slect-view.png "Rendering of the SelectView view class")

The true power of this view class is in the ability to pass a `string` containing
the name of a function exposed by a component that returns a JSON `object`. This
is commonly implemented with the dynamic select models. For example the
component descriptor of the [MailChimp component](https://github.com/elasticio/mailchimp-component/blob/master/component.json) has the following structure:

```
"fields": {
  "listId": {
    "viewClass": "SelectView",
    "prompt": "Select your MailChimp List",
    "label": "List",
    "required": true,
    "model": "getLists"
  }
}
```
Here the `model` has a `getLists` which is exposed in the `lib/commons.js` as a
[function `getLists`](https://github.com/elasticio/mailchimp-component/blob/master/lib/common.js#L14):

```
/**
 * Function that returns values for the list selection box
 *
 * @param conf
 * @param cb
 */
function getLists(conf, cb) {
  co(function*() {
    console.log('Fetching lists');

    mailchimp.setApiKey(conf.apiKey);
    const lists = yield mailchimp
      .get('lists');
    let result = {};
    lists.lists.map((list) => {
      result[list.id] = list.name
    });
    console.log('Result ', result);
    cb(null, result);
  }).catch(err => {
    console.log('Error occurred', err.stack || err);
    cb(err);
  });
}
```
This function itself uses the `mailchimp-v3` libraries to query the MailChimp API
for the names of the lists in your connected account, which is not predetermined
anywhere in the component descriptor.

## PasswordFieldView

The `PasswordFieldView` view class is used to provide a sequre input field for
passwords in the credentials of the integration components. It has the following
properties:

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| label         | `string` | Yes      | Renders a label with the given text above the input field |
| required      | `boolean`| Yes      | Specifies whether the input data is required for the component to operate properly or not. When `true` is set a red asterisks `(*)` to appear along with the label. If the value is `false` then it is optional to fill-in.|
| placeholder  | `string` | No  |  Used to give a short and descriptive text which is rendered in the input field. |

Here is an example of `PasswordFieldView` view class usage in the credentials:

```
"credentials" : {
  "fields": {
    "host":{
      "viewClass":"TextFieldView",
      "label":"Host",
      "required":true,
      "placeholder":"Name of the host"
    },
    "username": {
      "viewClass": "TextFieldView",
      "label": "User Name",
      "required": true,
      "placeholder": "Paste your SFTP user name"
    },
    "password": {
      "viewClass": "PasswordFieldView",
      "label": "Password",
      "required": true,
      "placeholder": "Paste your SFTP password"
    }
  }
}
```
This is rendered in the following way:

![Rendering of the PasswordFieldView view class](/assets/img/references/view-classes/view-class-password-field-view.png "Rendering of the PasswordFieldView view class")


## OAuthFieldView

The `OAuthFieldView` view class is used to render a button in the credentials of
the component with *Authenticate* or *Re-Authenticate*. When the button is pressed
the process of OAuth1/Oauth2 authentication is started or repeated. This view classes
has only one parameter:

| Property Name | Type     | Required | Description |
| :------------ | :------: | :------: | :---------- |
| required      | `boolean`| Yes      | Specifies whether it is required to authenticate or not. When `true` is set a red asterisks `(*)` appears along with the label. If the value is `false` then it is optional to authenticate.|

Since the main purpose of the `OAuthFieldView` view class is to facilitate the
OAuth1/Oauth2 authentication then it is worth to present how to use it in
conjunctions with the [OAuth object](/references/component-descriptor-structure#oauth2):

```
"credentials" : {
  "fields":{
    "oauth":{
      "viewClass":"OAuthFieldView",
      "required":true
    }
  },
  "oauth2":{
    "client_id":"{{GOOGLE_APP_ID}}",
    "client_secret":"{{GOOGLE_APP_SECRET}}",
    "auth_uri":"https://accounts.google.com/o/oauth2/v2/auth",
    "token_uri":"https://www.googleapis.com/oauth2/v4/token",
    "scopes": [ "https://spreadsheets.google.com/feeds" ],
    "access_type": "offline",
    "prompt": "consent"
  }
}
```
This will render in the following way:

![Rendering of the OAuthFieldView view class](/assets/img/references/view-classes/view-class-oauth-field-view.png "Rendering of the OAuthFieldView view class")

In the above presented method the OAuth2 authentication will be initiated when the
button *Authenticate* is pressed.
