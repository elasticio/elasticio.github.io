---
title: NetSuite Authentication
layout: component
description: Information on NetSuite component authentication on the platform
icon: netsuite.png
icontext: NetSuite component
category: netsuite
updatedDate: 2021-08-12
ComponentVersion: 2.3.1
---

## API version

**2019.1** NetSuite version is used and supported. The component will work with other NS versions in most cases. But 100% compatibility could not be guaranteed.

## Credentials

Netsuite component supports both user credentials- and token based authentication mechanisms.

There are 2 fields which are mandatory for both auth types:

1. Domain
2. Account

Other fields made optional, but depending on which auth type you will use, you have to provide all the correct values for all the fields of a given auth type.

To use a user credentials type you must fill the following fields (they are marked with `[USER CREDENTIALS]` for convenience):

1. Email
2. Password
3. Application Id
4. Make sure the 'Use Token-Based Authentication' checkbox is not checked

To use a token-based auth type you must fill the following fields (marked with `[TBA CREDENTIALS]`):

1. Check the 'Use Token-Based Authentication' checkbox
2. Consumer Key
3. Consumer Secret
4. Token Id
5. Token Secret

### Global credentials

**Domain** - Required field. To find your domain endpoint go to Setup > Company > Setup Tasks > Company Information (Administrator) in the NetSuite UI. Your domains are listed on the Company URLs subtab. Should be something like `https://{accountId}.suitetalk.api.netsuite.com`

**Email**  - Email as a login for NetSuite account.

**Password** - Password for NetSuite account.

**Account** - Account Number to access NetSuite API. This number is required for the component t
o connect to NetSuite via native SuiteTalk API Can be found here:

1.  Go to Setup -> Integration -> Web Services Preferences
2.  Find ACCOUNT ID field there.

![Get Account Number](https://user-images.githubusercontent.com/8449044/44263739-c3abae00-a228-11e8-8de6-8e6b33c23be3.png)

>**Important!** Make sure you have copied an account name exactly how it is specified in Netsuite UI.

### User credentials authentication

**Email -** Email as a login for NetSuite account.

**Password -** Password for NetSuite account.

**Application ID:**

Application ID to access NetSuite API. This number is required for the component
to connect to NetSuite via native SuiteTalk API Can be found here:

1.  Go to Setup -> Integration -> Manage Integrations -> New
2.  Find APPLICATION ID field there.

![Get Application ID](https://user-images.githubusercontent.com/8449044/44274840-e4392f80-a24b-11e8-9d1d-00676e0b9217.png)

### Token-Based authentication (TBA)

To use Token-Based authentication you must at first setup a Netsuite account:

Enable Integration:

1. Go to Setup > Company > Enable Features > Suite Cloud > Manage Authentication
2. Enable Token-Based Authentication
3. Go to menu Setup > Integrations > Manage Integrations
4. Click New button
5. Set the name to whatever you want. Please make sure to tick the Token-Based Authentication option, uncheck the "TBA: AUTHORIZATION FLOW" and "AUTHORIZATION CODE GRANT" option, and check the "TBA: ISSUETOKEN ENDPOINT"  option.
6. Copy Consumer Key and Consumer secret values to be used in credentials. As they will be not available later.

Create a Role and assign to a User:

1. Go to Setup > Users/Roles > Manage Roles > New
2. Create a role and assign necessary permissions for a connector (Access to any Netsuite object types, transactions, etc.).
3. The role must have "User Access Tokens" and "SOAP Web Services" permissions for integration using TBA
4. Assign the Role to the desired user that will be used for integration. Go to Lists > Employees > edit user > Access tab > Roles subtab.

Create an Access Token for the Integration record, User, and Role:

1. Go to Setup > Users/Roles > Access Tokens > New.
2. Select the Integration record, User, and Role created or referenced in the previous steps.
3. Token Id and Token Secret will be displayed after tapping the save button. Copy the Consumer Key and Consumer secret values as they as will not be available after you leave the page.

After you have received all the necessary credentials, you can proceed to the authentication process.
