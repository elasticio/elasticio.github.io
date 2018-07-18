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
| [SelectView](#selectview)        | Renders a drop-down menu to select from available values |
| [CheckBoxView](#checkboxview)      | Renders a checkbox |
| [PasswordFieldView](#passwordfieldview) | Renders a standard password entry text field where the input values are replaced by symbols such as the asterisk (`*`) or a dot (`•`) |
| [OAuthFieldView](#oauthfieldview)    | Renders button for initiating the OAuth process |



## TextFieldView

`TextFieldView` has many purposes. Use it to draw a one-liner text
field form to input the information. For example, you can use it in case of
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
The above example is rendered on the {{site.data.tenant.name}} UI the following way:

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

Which would render the following way:

![Rendering of TextAreaView view class](/assets/img/references/view-classes/view-class-text-area-view.png "Rendering of TextAreaView view class")


## SelectView


## CheckBoxView


## PasswordFieldView


## OAuthFieldView
