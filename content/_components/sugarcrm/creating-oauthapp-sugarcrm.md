---
title: Creating an app on a SugarCRM instance
layout: component
description: These are the instructions to how to create an OAuth APP on a SugarCRM instance.
icon:  sugarcrm.png
icontext: Creating an app on a SugarCRM instance
category: SugarCRM component
createdDate: 2016-12-03
updatedDate: 2019-09-25
---

This step is necessary to platform to your SugarCRM instance. This is one of the steps in
the [authentication process of SugarCRM component](index#authentication).

## Purpose

To connect the platform to your SugarCRM instance, an app needs to be created on
that instance. Below are the steps to do so. Once that is done, you will provide
a valid username and password to the {{site.data.tenant.name}} platform. The
platform will exchange that `username` and `password` for a token. In a production
system, the best practice is to create a dedicated user for the {{site.data.tenant.name}}
platform. This user should have the minimum required permissions.

## Steps to follow

1.  As an admin on your SugarCRM instance, go to the Administration panel
   ![screenshot from 2017-09-21 10-16-21](https://user-images.githubusercontent.com/5710732/30685820-76e92b22-9eb6-11e7-8efc-2715b9102f26.png)
2.  Select **OAuth Keys**
   ![screenshot from 2017-09-21 10-17-08](https://user-images.githubusercontent.com/5710732/30685819-76e71f8a-9eb6-11e7-8f79-505111d2c0df.png)
3.  In the top bar, select the drop-down for the now visible **OAuth Keys** option
   ![screenshot from 2017-09-21 10-17-45](https://user-images.githubusercontent.com/5710732/30685818-76dea1ca-9eb6-11e7-85ae-0dc7fc15e987.png)
4.  Select **Create OAuth Key**
5.  Fill in the following values:
  *   **Consumer Key Name**: Pick a name that is convenient to remember
  *   **Consumer Key**: Pick a strongly random string. You will need to provide this information as part of the SugarCRM component account information
  *   **Consumer Secret**: Pick a strongly random string. You will need to provide this information as part of the SugarCRM component account information
  *   **OAuth Version**: OAuth 2.0
  *   **Client Type**: Sugar User
  *   **Description**: Optional value for your convenience
   ![screenshot from 2017-09-21 10-18-21](https://user-images.githubusercontent.com/5710732/30685817-76c6c1d6-9eb6-11e7-991f-37830f1c35ac.png)
6.  Click **Save**

## Next

In case of Sugar 8 Next is to [register a New SugarCRM Platform Value through the UI](register-sugarcrm-value)
