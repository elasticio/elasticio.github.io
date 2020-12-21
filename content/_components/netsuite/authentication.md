---
title: NetSuite Authentication
layout: component
description: Information on NetSuite component authentication on the platform
icon: netsuite.png
icontext: NetSuite component
category: netsuite
updatedDate: 2020-12-11
ComponentVersion: 2.2.0
---

## API version

**2019.1** NetSuite version is used and supported. The component will work with other NS versions in most cases. But 100% compatibility could not be guaranteed.

## Credentials

To complete the authentication process on the platform, you need credentials. Below we will tell you how to get all the data you need.

### Get credentials in NetSuite

**Domain** - Required field. To find your domain endpoint go to Setup > Company > Setup Tasks > Company Information (Administrator) in the NetSuite UI. Your domains are listed on the Company URLs subtab. Should be something like `https://{accountId}.suitetalk.api.netsuite.com`

**Email**  - Email as a login for NetSuite account.

**Password** - Password for NetSuite account.

**Account** - Account Number to access NetSuite API. This number is required for the component t
o connect to NetSuite via native SuiteTalk API Can be found here:

1.  Go to Setup -> Integration -> Web Services Preferences
2.  Find ACCOUNT ID field there.

![Get Account Number](https://user-images.githubusercontent.com/8449044/44263739-c3abae00-a228-11e8-8de6-8e6b33c23be3.png)

**Application ID:**

Application ID to access NetSuite API. This number is required for the component
to connect to NetSuite via native SuiteTalk API Can be found here:

1.  Go to Setup -> Integration -> Manage Integrations -> New
2.  Find APPLICATION ID field there.

![Get Application ID](https://user-images.githubusercontent.com/8449044/44274840-e4392f80-a24b-11e8-9d1d-00676e0b9217.png)

## Authentication on platform

After you have received all the necessary credentials, you can proceed to the authentication process. Please follow these simple steps to successfully authenticate on the platform:

### Step 1

On the platform go to Settings -> Security credentials select NetSuite component and click "Add New Credential"

![Step 1](https://user-images.githubusercontent.com/16806832/44389705-391ec380-a534-11e8-851b-e6d27cf6e1f4.png)

#### Step 2

Fill in the following for your account:

![Step 2](https://user-images.githubusercontent.com/36419533/101912969-16b08880-3bcb-11eb-88f7-5e56a7cd3920.png)

#### Step 3

Click "Verify", if your credentials are correct, the button "Save" will appear, click on it.

This completes the authentication process. You can freely use the [triggers](triggers) and [actions](actions) of the component.
