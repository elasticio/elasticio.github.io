---
title: Documentation On Legacy Behavior
layout: article
section: CRM components
category: msdynamics-crm-component
---


## Basic structure

Component is structured in the following parts:

 * Actions can be found in `lib/actions`
 * Triggers can be found in `lib/triggers`
 * This component supports validation of credentials information, code for that you'll find in `/verifyCredentials.js`

## How to start working on it

You would need a node.js and npm. Node.js version > 0.11.

Check it out from github and install dependencies

```sh
git clone git@github.com:elasticio/microsoft-dynamics-crm.git
cd microsoft-dynamics-crm/
npm install
```

After code modification don't forget to run the tests:

```sh
npm test
```

Or you can use Grunt for that, just install the grunt-cli and run it:

```sh
npm install -g grunt-cli
grunt
```


## How to add new trigger / action

Adding new trigger or action is very simple, component is coded in generic and uses OData API of MS Dynamics CRM. You need to do following on the sample of new trigger:

## Update component description

Triggers are described under `triggers` part of the `component.json`, so just add a new triggers like here:

```json
{
  "getLeads": {
    "main": "./lib/triggers/getLeads.js",
    "type": "polling",
    "title": "Query Leads",
    "metadata": {
      "out": "./lib/schemas/triggers/getLeads.out.json"
    }
  }
}
```
As trigger only have an output and no input you don't need an in metadata.

## Create a new schema

Create an output schema mentioned above. It's a JSON Schema files, see sample for other out schemas in ```lib/schemas/```.

## Create a new trigger code

Now you can code a new trigger, you can create it from scratch or extend the existing MS Dynamics component code, e.g. for trigger that fetches leads you need something like this:

```js
var trigger = require('./baseTrigger');

exports.process = processTrigger;

function processTrigger(msg, cfg, snapshot) {
    trigger(this, 'Lead', cfg, snapshot);
}
```

Base trigger will takes care about:
 * Fetching OData objects
 * Paging
 * Fetching only for modified objects


## Additional information

### Actions: update fields

The component is configured to use certain fields for checking if an item already exists in CRM.
If an update field is configured for a particular entity, the CRM component will run an extra query for each message, using the ODATa "filter" parameter.

Based on this, the component will decide if 'Update' or 'Create' will be used.

Currently, update fields are defined in two ways:

 1. "type + Id"

 It applies for all items, no matter if the have an update field or not.

 "type" is the value provided as parameter when creating the action - you can find this in any action .js file.

 Examples: QuoteId, ProductId, etc.
 2. Setting an update field when creating the action:

```js
// Example from 'syncAccounts.js':
 exports.process = require('./baseAction.js').createAction({
     type: 'Account',
     updateField: 'new_ExternalId'
 })
```

If this is set, a query with a filter using this field will run. If the object is found ( = id found), update based on the id will be done.

*Exception*:
Changing this field will not have effect for actions like "%actionname%Details.js", because "baseListAction.js" sets it as "ProductDescription".

#### Update fields currently configured
1. Accounts :  new_ExternalId
2. Contacts :  new_ExternalId
3. Products : ProductNumber
4. Quotes   : Name
5. Orders   : Name
6. Invoices : Name
7. PriceLevels : Name
8. UnitGroups: Name
9. Product Price Levels: not set
10. Units : not set

##### Special Cases

Details (or Lines) of Quotes, Invoices and Orders: the "%actionname%Details.js", which are used automatically when Quotes, Invoices and Orders are created, represent a special case.
The updateField used is 'Description', and it is setup as updateField by baseListAction.js.
The updateField for Details (or Lines) will be used only if the parent document is being updated. This was done for performance reasons, it prevents unnecessary extra requests.

The component will modify the 'Description' field from the message input, it will add:
- parent document name => so the right detail from the right document is found
- product description => frequently this is mapped as the product number
- description


### Actions: Custom fields

Certain fields will not be available by default in CRM.
Generally, what appears in JSON Schema files as "new_..." is custom fields.
You need to configure the CRM instance to have these fields.

1. syncAccounts
 * new_ExternalId
 * new_externalPrimaryContactId
 * new_Source
2. syncContacts
 * new_ExternalId

### Triggers: Paging

Triggers page size is 50.

### Performance

Some performance problems may be observed especially for Quotes, Invoices and Orders - they all have lineas, meaning that processing them required a high number of messages.
In practice, a few out of memory errors were observed.
If this happens, try the following:
1. Reduce number of messages processed per flow iteration
2. Allocate additional memory to CRM containers, using elastic.io Repo Environment Variables

### Actions: Quotes, Invoices, Orders

These are using `baseListAction.js` and `baseDetailsAction.js`.
The component is:
* first, creating the empty Quote/Invoice/Order
* then, adding details/lines, one by one

Adding the details one by one implies a risk: incomplete data in case an error is thrown while iterating through the details.
Adding details in bulk would be a desirable option, however, this does not seem possible in CRM.
[Example for quote details:](https://msdn.microsoft.com/en-us/library/gg328283.aspx) (RetrieveMultiple exists, but there is no CreateMultiple).
