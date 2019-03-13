# appdirect-component [![Circle CI Build Status][circle-image]][circle-url]
Integration component for AppDirect API for the [elastic.io platform](http://www.elastic.io;).

## Table of Contents
* [General information](#general-information)
   * [Description](#description)
   * [API version](#api-version)
   * [Authentication](#authentication)
* [Configuring your environment](#configuring-your-environment)
* [Credentials](#credentials)
   * [Environment URL](#environment-url)
   * [Consumer Key](#consumer-key)
   * [Consumer Secret](#consumer-secret)
   * [Creating credentials](#creating-credentials)
* [Actions](#actions)
   * [Create Entity](#create-entity)
      * [Create Entity. Input fields](#create-entity-input-fields)
      * [Create Entity. Input json schema locations](#create-entity-input-json-schema-locations)
      * [Create Entity. Output json schema locations](#create-entity-output-json-schema-locations)
   * [Update Entity](#update-entity)
      * [Update Entity. Input fields](#update-entity-input-fields)
      * [Update Entity. Input json schema locations](#update-entity-input-json-schema-locations)
      * [Update Entity. Output json schema locations](#update-entity-output-json-schema-locations)
   * [Lookup Object By ID](#lookup-object-by-id)
      * [Lookup Object By ID. Input fields](#lookup-object-by-id-input-fields)
      * [Lookup Object By ID. Input json schema locations](#lookup-object-by-id-input-json-schema-locations)
      * [Lookup Object By ID. Output json schema locations](#lookup-object-by-id-output-json-schema-locations)
   * [Lookup Objects](#lookup-objects)
      * [Lookup Objects. Input fields](#lookup-objects-input-fields)
      * [Lookup Objects. Input Metadata description](#lookup-objects-input-metadata-description)
      * [Lookup Objects. Input metadata imitations](#lookup-objects-input-metadata-limitations)
      * [Lookup Objects. Input json schema locations](#lookup-objects-input-json-schema-locations)
      * [Lookup Objects. Output json schema locations](#lookup-objects-output-json-schema-locations)
   * [Delete Object By ID](#delete-object-by-id)
      * [Delete Object By ID. Input fields](#delete-object-by-id-input-fields)
      * [Delete Object By ID. Input json schema locations](#delete-object-by-id-input-json-schema-locations)
      * [Delete Object By ID. Output json schema locations](#delete-object-by-id-output-json-schema-locations)
   * [Enable/Disable company membership](#enabledisable-company-membership)
      * [Enable/Disable company membership. Json schema locations](#enabledisable-company-membership-json-schema-locations)
   * [Invite company membership](#invite-company-membership)
      * [Invite company membership. Json schema locations](#invite-company-membership-json-schema-locations)
* [Triggers](#triggers)
   * [Webhook subscription](#webhook-subscription)
      * [Webhook subscription. Input fields](#webhook-subscription-input-fields)
* [AppDirect API and Documentation links](#appdirect-api-and-documentation-links)
* [License](#license)
   
## General Information
### Description
AppDirect component is designed for AppMarket API integration.

### API version
The component uses v2 version of API which described at [AppMarket API Reference](https://help.appdirect.com/api/appmarket.html)

### Authentication
Authentication occurs via OAuth 2.0. In order to make OAuth work, you need a new App in your Environment. 

## Configuring your environment 
1) Login to your environment.
2) Follow to **Manage --> Marketplace -->  Setting -->  API Clients --> Create API Client**
3) Create a new API Client:
 - Specify **Name** of client
 - Enable **oauth2** authorization
 - Select "**Authorization Code**" grant type checkbox
 - Specify the **callback URL**

Your callback URL should be 

```
https://your-tenant.elastic.io/callback/oauth2
```

If you are testing it on default public tenant just use 
```
https://app.elastic.io/callback/oauth2
```

![API Client Configuration](https://user-images.githubusercontent.com/13310949/45288071-83231580-b4f2-11e8-9c1f-52ce07bbdade.png)

 - Click **Save Settings**. The new API client is created, along with a Consumer Secret and Consumer Key. A message appears that includes the Consumer Secret and a warning that you should copy and store the secret in a safe location because it cannot be retrieved after the message is dismissed.

You can use [Create API clients](https://help.appdirect.com/appmarket/Default.htm#MarketplaceManager/api-client-create.html) manual for additional information.

## Credentials
### Environment URL
```Url of your AppDirect environment. For example demo.example.com```
### Consumer Key
```Consumer Key which you received during API client configuration step```
### Consumer Secret
```Consumer Secret which you received during API client configuration step```

### Creating credentials 
- Specify Environment URL (without **http:// https://** prefixes)
- Specify Consumer Key
- Specify Consumer Secret
- Click "Authenticate"

![AppDirect component credentials example](https://user-images.githubusercontent.com/36419533/47077540-d717cd00-d209-11e8-9e89-af1358eba3d9.png)

- Specify your **Email** and **Password** and click **"Log In"**

![AppDirect Auth](https://user-images.githubusercontent.com/13310949/45291624-5c1d1180-b4fb-11e8-93d7-4d0ceb9a14f7.png)

 - You will get **"Success"** notification below:
 
![screenshot from 2018-09-10 13-12-47](https://user-images.githubusercontent.com/13310949/45291614-59222100-b4fb-11e8-96cb-783c492774d4.png)

- Save your credentials.
 
## Actions
### Create Entity
Create Entity in AppDirect Environment

#### Create Entity. Input fields
 - **Entity type** - type of entity which you want to create.
    You can use only next list of types for this action:
     - **[Company](https://help.appdirect.com/api/appmarket.html#create-new-company)**
     
#### Create Entity. Input json schema locations
Entity type|Json schema location
-----------| -------------
|Company   |[schemas/CreateCompanyV2Request.json](schemas/CreateCompanyV2Request.json)

#### Create Entity. Output json schema locations
Entity type|Json schema location
-----------| -------------
|Company   |[schemas/CreateCompanyV2Response.json](schemas/CreateCompanyV2Response.json)
     
### Update Entity
Update Entity in AppDirect Environment

#### Update Entity. Input fields
 - **Entity type** - type of entity which you want to update.
    You can use only next list of types for this action:
     - **[Company Memberships](https://help.appdirect.com/api/appmarket.html#read-user-memberships)** 
     - **[Order Parameters](https://help.appdirect.com/api/appmarket.html#update-purchase-order-configuration-details)** 
     - **[Subscription](https://help.appdirect.com/api/appmarket.html#change-subscription-details)** 
     
#### Update Entity. Input json schema locations
Entity type|Json schema location
-----------| -------------
|Company Memberships   |[schemas/UpdateUserCompanyMembershipAccountV2.json](schemas/UpdateUserCompanyMembershipAccountV2.json)
|Order Parameters   |[schemas/UpdateOrderParametersV1Request.json](schemas/UpdateOrderParametersV1Request.json)
|Subscription   |[schemas/UpdateSubscriptionRequest.json](schemas/UpdateSubscriptionRequest.json)
     
#### Update Entity. Output json schema locations
Entity type|Json schema location
-----------| -------------
|Company Memberships   |[schemas/UserCompanyMembershipAccountV2.json](schemas/UserCompanyMembershipAccountV2.json)  
|Order Parameters   |[schemas/UpdateOrderParametersV1Response.json](schemas/UpdateOrderParametersV1Response.json)  
|Subscription   |[schemas/UpdateSubscriptionResponse.json](schemas/UpdateSubscriptionResponse.json)  

### Lookup Object By ID
Get an object by its type and id from AppDirect Environment

#### Lookup Object By ID. Input fields:
 - **Entity type** - type of entity which you want to lookup.
    You can use only next list of types for this action:
     - **[Company Memberships](https://help.appdirect.com/api/appmarket.html#read-company-membership)**
     - **[Order](https://help.appdirect.com/api/appmarket.html#retrieve-a-purchase-order)**
     - **[Payment Instruments (Default)](https://help.appdirect.com/api/appmarket.html#retrieve-the-default-payment-instrument)**
     - **[Product](https://help.appdirect.com/api/appmarket.html#retrieve-a-product)**
     - **[Subscription](https://help.appdirect.com/api/appmarket.html#read-a-user)** 
     - **[Subscription Assignment](https://help.appdirect.com/api/appmarket.html#read-application-assignment-for-user-and-subscription)** 
     - **[User](https://help.appdirect.com/api/appmarket.html#read-a-user)** 
     - **[User Memberships](https://help.appdirect.com/api/appmarket.html#read-user-memberships)**
     
#### Lookup Object By ID. Input json schema locations
Entity type|Json schema location
-----------| -------------
|Company Memberships   |[schemas/DeleteUserCompanyMembershipAccountV2.json](schemas/DeleteUserCompanyMembershipAccountV2.json)
|Order   |[schemas/ReadOrderV1Request.json](schemas/ReadOrderV1Request.json)
|Payment Instruments   |[schemas/ReadDefaultPaymentInstrumentRequest.json](schemas/ReadDefaultPaymentInstrumentRequest.json)
|Product   |[schemas/ReadProductV1Request.json](schemas/ReadProductV1Request.json)
|Subscription   |[schemas/ReadSubscriptionV1Request.json](schemas/ReadSubscriptionV1Request.json)
|SubscriptionAssignment   |[schemas/ReadSubscriptionAssignmentRequest.json](schemas/ReadSubscriptionAssignmentRequest.json)
|User   |[schemas/ReadUserV2Request.json](schemas/ReadUserV2Request.json)
|User Memberships   |[schemas/ReadUserMembershipsV2Request.json](schemas/ReadUserMembershipsV2Request.json)
          
#### Lookup Object By ID. Output json schema locations
Entity type|Json schema location
-----------| -------------
|Company Memberships   |[schemas/UserCompanyMembershipAccountV2.json](schemas/UserCompanyMembershipAccountV2.json)
|Order   |[schemas/ReadOrderV1Response.json](schemas/ReadOrderV1Response.json)
|Payment Instruments   |[schemas/ReadDefaultPaymentInstrumentResponse.json](schemas/ReadDefaultPaymentInstrumentResponse.json)
|Product   |[schemas/ReadProductV1Response.json](schemas/ReadProductV1Response.json)
|Subscription   |[schemas/ReadSubscriptionV1Response.json](schemas/ReadSubscriptionV1Response.json)
|SubscriptionAssignment   |[schemas/ReadSubscriptionAssignmentResponse.json](schemas/ReadSubscriptionAssignmentResponse.json)
|User   |[schemas/ReadUserV2Response.json](schemas/ReadUserV2Response.json)
|User Memberships   |[schemas/ReadUserMembershipsV2Response.json](schemas/ReadUserMembershipsV2Response.json)

### Lookup Objects
Get objects by criteria

#### Lookup Objects. Input fields
 - **Entity type** - type of entity which you want to lookup.
    You can use only next list of types for this action:
     - **[Buyable product](https://help.appdirect.com/api/appmarket.html#retrieve-buyable-products)**
     - **[Company](https://help.appdirect.com/api/appmarket.html#list-all-companies)**
     - **[Company Memberships](https://help.appdirect.com/api/appmarket.html#list-company-memberships)**
     - **[Staging product](https://help.appdirect.com/api/appmarket.html#read-staging-catalog)**
     - **[Subscription](https://help.appdirect.com/api/appmarket.html?shell#list-all-subscriptions)**
     - **[Subscription Assignment](https://help.appdirect.com/api/appmarket.html#list-application-assignments-for-subscription)**
 - **Behaviour** - Behaviour of emitting data. 
      - **Fetch all**
      - **Fetch Page**
      - **Emit Individually**
   
#### Lookup Objects. Input Metadata description
   - **pageSize**: positive integer that defaults to 100 (only if Fetch Page mode)
   - **pageNumber**: required non-negative integer that is 0 based (only if Fetch Page mode)
   - **order**: optional array of fieldname + sort direction pairs (only if Fetch Page mode)
   ```json
      [{
          "fieldName": "createdOn",
          "sortDirection": "ASC"
      },
      {
          "fieldName": "NAME",
          "sortDirection": "DESC"
      }]
   ```
   - **max result size**: optional positive integer that defaults to 1000 (only if fetch all mode)
   
#### Lookup Objects. Input metadata limitations
   - **max result size** value doesn't support value more than **100000000** in  **Fetch all**  mode
   - **Emit Individually** mode can't emit more then **100000000** messages
   
#### Lookup Objects. Input json schema locations
Entity type|Behavior|Json schema location
-----------|-----|-------------
|Buyable product| FetchAll   |[schemas/lookupBuyableProduct/lookupBuyableProductsFetchAllRequest.json](schemas/lookupBuyableProduct/lookupBuyableProductsFetchAllRequest.json)
|Buyable product| FetchPage   |[schemas/lookupBuyableProduct/lookupBuyableProductsFetchPageRequest.json](schemas/lookupBuyableProduct/lookupBuyableProductsFetchPageRequest.json)
|Buyable product| EmitIndividually  |[schemas/lookupBuyableProduct/lookupBuyableProductsEmitIndividuallyRequest.json](schemas/lookupBuyableProduct/lookupBuyableProductsEmitIndividuallyRequest.json)
|Company | FetchAll   | [schemas/lookupCompany/lookupCompanyFetchAllRequest.json](schemas/lookupCompany/lookupCompanyFetchAllRequest.json)
|Company | FetchPage  | [schemas/lookupCompany/lookupCompanyFetchPageRequest.json](schemas/lookupCompany/lookupCompanyFetchPageRequest.json)
|Company | EmitIndividually  | [schemas/lookupCompanyMembership/lookupCompanyEmitIndividuallyRequest.json](schemas/lookupCompany/lookupCompanyEmitIndividuallyRequest.json)
|Company Memberships| FetchAll   | [schemas/lookupCompanyMembership/lookupCompanyMembershipFetchAllRequest.json](schemas/lookupCompanyMembership/lookupCompanyMembershipFetchAllRequest.json)
|Company Memberships | FetchPage  | [schemas/lookupCompanyMembership/lookupCompanyMembershipFetchPageRequest.json](schemas/lookupCompanyMembership/lookupCompanyMembershipFetchPageRequest.json)
|Company Memberships | EmitIndividually  | [schemas/lookupCompanyMembership/lookupCompanyMembershipEmitIndividuallyRequest.json](schemas/lookupCompanyMembership/lookupCompanyMembershipEmitIndividuallyRequest.json)
|Staging product| FetchAll   |[schemas/lookupStagingProduct/lookupStagingProductsFetchAllRequest.json](schemas/lookupStagingProduct/lookupStagingProductsFetchAllRequest.json)
|Staging product| FetchPage  |[schemas/lookupStagingProduct/lookupStagingProductsFetchPageRequest.json](schemas/lookupStagingProduct/lookupStagingProductsFetchPageRequest.json)
|Staging product| EmitIndividually  |[schemas/lookupStagingProduct/lookupStagingProductsEmitIndividuallyRequest.json](schemas/lookupStagingProduct/lookupStagingProductsEmitIndividuallyRequest.json)
|Subscription| FetchAll   |[schemas/lookupSubscription/lookupSubscriptionFetchAllRequest.json](schemas/lookupSubscription/lookupSubscriptionFetchAllRequest.json)
|Subscription| FetchPage  |[schemas/lookupSubscription/lookupSubscriptionFetchPageRequest.json](schemas/lookupSubscription/lookupSubscriptionFetchPageRequest.json)
|Subscription| EmitIndividually  |[schemas/lookupSubscription/lookupSubscriptionEmitIndividuallyRequest.json](schemas/lookupSubscription/lookupSubscriptionEmitIndividuallyRequest.json)
|SubscriptionAssignment| FetchAll   |[schemas/lookupSubscriptionAssignment/lookupSubscriptionAssignmentFetchAllRequest.json](schemas/lookupSubscriptionAssignment/lookupSubscriptionAssignmentFetchAllRequest.json)
|SubscriptionAssignment| FetchPage  |[schemas/lookupSubscriptionAssignment/lookupSubscriptionAssignmentFetchPageRequest.json](schemas/lookupSubscriptionAssignment/lookupSubscriptionAssignmentFetchPageRequest.json)
|SubscriptionAssignment| EmitIndividually  |[schemas/lookupSubscriptionAssignment/lookupSubscriptionAssignmentEmitIndividuallyRequest.json](schemas/lookupSubscriptionAssignment/lookupSubscriptionAssignmentEmitIndividuallyRequest.json)
   
#### Lookup Objects. Output json schema locations
Entity type|Behavior|Json schema location
-------------|----------|-------------
|Buyable product | FetchAll          | [schemas/lookupBuyableProduct/lookupBuyableProductResponse.json](schemas/lookupBuyableProduct/lookupBuyableProductResponse.json)
|Buyable product | FetchPage         | [schemas/lookupBuyableProduct/lookupBuyableProductResponse.json](schemas/lookupBuyableProduct/lookupBuyableProductResponse.json)
|Buyable product | EmitIndividually  | [schemas/lookupBuyableProduct/lookupObjectsBuyableProductEmitIndividuallyResponse.json](schemas/lookupBuyableProduct/lookupBuyableProductsEmitIndividuallyResponse.json)
|Company | FetchAll   | [schemas/lookupCompany/lookupCompanyResponse.json](schemas/lookupCompany/lookupCompanyResponse.json)
|Company | FetchPage  | [schemas/lookupCompany/lookupCompanyResponse.json](schemas/lookupCompany/lookupCompanyResponse.json)
|Company | EmitIndividually  | [schemas/lookupCompany/lookupCompanyEmitIndividuallyResponse.json](schemas/lookupCompany/lookupCompanyEmitIndividuallyResponse.json)
|Company Memberships | FetchAll   | [schemas/lookupCompanyMembership/lookupCompanyMembershipResponse.json](schemas/lookupCompanyMembership/lookupCompanyMembershipResponse.json)
|Company Memberships | FetchPage  | [schemas/lookupCompanyMembership/lookupCompanyMembershipResponse.json](schemas/lookupCompanyMembership/lookupCompanyMembershipResponse.json)
|Company Memberships | EmitIndividually  | [schemas/lookupCompanyMembership/lookupCompanyMembershipEmitIndividuallyResponse.json](schemas/lookupCompanyMembership/lookupCompanyMembershipEmitIndividuallyResponse.json)
|Staging product | FetchAll   | [schemas/lookupStagingProduct/lookupStagingProductsResponse.json](schemas/lookupStagingProduct/lookupStagingProductsResponse.json)
|Staging product | FetchPage  | [schemas/lookupStagingProduct/lookupStagingProductsResponse.json](schemas/lookupStagingProduct/lookupStagingProductsResponse.json)
|Staging product | EmitIndividually  | [schemas/lookupStagingProduct/lookupObjectsStagingProductEmitIndividuallyResponse.json](schemas/lookupStagingProduct/lookupStagingProductsEmitIndividuallyResponse.json)
|Subscription | FetchAll   | [schemas/lookupSubscription/lookupSubscriptionResponse.json](schemas/lookupSubscription/lookupSubscriptionResponse.json)
|Subscription | FetchPage  | [schemas/lookupSubscription/lookupSubscriptionResponse.json](schemas/lookupSubscription/lookupSubscriptionResponse.json)
|Subscription | EmitIndividually  | [schemas/lookupSubscription/lookupSubscriptionEmitIndividuallyResponse.json](schemas/lookupSubscription/lookupSubscriptionEmitIndividuallyResponse.json)
|SubscriptionAssignment | FetchAll   | [schemas/lookupSubscriptionAssignment/lookupSubscriptionAssignmentResponse.json](schemas/lookupSubscriptionAssignment/lookupSubscriptionAssignmentResponse.json)
|SubscriptionAssignment | FetchPage  | [schemas/lookupSubscriptionAssignment/lookupSubscriptionAssignmentResponse.json](schemas/lookupSubscriptionAssignment/lookupSubscriptionAssignmentResponse.json)
|SubscriptionAssignment | EmitIndividually  | [schemas/lookupSubscriptionAssignment/lookupSubscriptionAssignmentEmitIndividuallyResponse.json](schemas/lookupSubscriptionAssignment/lookupSubscriptionAssignmentEmitIndividuallyResponse.json)

### Delete Object By ID
Delete object by its type and id from AppDirect Environment

#### Delete Object By ID. Input fields
 - **Entity type** - type of entity which you want to lookup.
    You can use only next list of types for this action:
     - **[Company Memberships](https://help.appdirect.com/api/appmarket.html#delete-company-membership)** 
     
#### Delete Object By ID. Input json schema locations
Entity type|Json schema location
-----------| -------------
|Company Memberships   |[schemas/DeleteUserCompanyMembershipAccountV2.json](schemas/DeleteUserCompanyMembershipAccountV2.json)
|Subscription Assignment   |[schemas/DeleteSubscriptionAssignment.json](schemas/DeleteSubscriptionAssignmentRequest.json)
          
#### Delete Object By ID. Output json schema locations
Entity type|Json schema location
-----------| -------------
|Company Memberships   |[schemas/DeleteUserCompanyMembershipAccountV2.json](schemas/DeleteUserCompanyMembershipAccountV2.json)
|Subscription Assignment   |[schemas/DeleteSubscriptionAssignment.json](schemas/DeleteSubscriptionAssignmentRequest.json)

### Enable/Disable company membership
See the link: [Enable/Disable company membership](https://help.appdirect.com/api/appmarket.html#enable-disable-company-membership)
Enable or disable marketplace user's company membership.

This only changes the user company membership's enabled status; all other attributes are ignored.
#### Enable/Disable company membership. Json schema locations
Schema type|Json schema location
-----------| -------------
|Input   |[schemas/PatchUserCompanyMembershipAccountV2.json](schemas/PatchUserCompanyMembershipAccountV2.json)
|Output  |[schemas/UserCompanyMembershipAccountV2.json](schemas/UserCompanyMembershipAccountV2.json)    

### Invite company membership
See the link: [Invite company membership](https://help.appdirect.com/api/appmarket.html#create-company-membership-invite-user)
Add a user as a member of a marketplace company.
Depending on channel configuration, the membership is either created immediately or when an invited user accepts the invitation.
If no user exists with the given email address (and also depending on channel configuration), a user may be created.
This causes an invitation to be sent to the user.
     
#### Invite company membership. Json schema locations
Schema type|Json schema location
-----------| -------------
|Input   |[schemas/CreateUserCompanyMembershipAccountV2.json](schemas/CreateUserCompanyMembershipAccountV2.json)
|Output  |[schemas/UserCompanyMembershipAccountV2.json](schemas/UserCompanyMembershipAccountV2.json)    
## Triggers 
### Webhook subscription
Webhooks are notifications that the AppDirect platform can send to Integration Flow when certain events occur in the system.
For example, you can receive notifications when users are created, when products are modified, when subscriptions are canceled, and so on. 
The AppDirect platform sends notifications to the component in real time.

When flow starts, the component tries to create a new subscription using trigger configuration. The component can not create a new subscription if the same subscription already exists in AppDirect platform.
Before flow stop, component tries to remove a subscription to Webhook URI with specified in configuration **entity type** value.

You can use [documentation](https://help.appdirect.com/appmarket/Default.htm#MarketplaceManager/mm-set-integ-webhook.htm) for more detail information.

#### Webhook subscription. Input fields
 - **Entity group** - group of entity types   
 - **Entity type** - type of entity which you want to create.
 - **Event type** - type of event which you want to subscribe
  
 You can see a table of available configuration cases below:
  
 Entity group|Entity type|Event type
 ------------|-----------|----------
 Billing     |User       |All, Added, Removed, Changed
 Billing     |Company    |All, Added, Removed, Changed
 Billing     |Membership |All, Added, Removed, Changed
 Billing     |Sales lead |All, Added,  Changed
 Billing     |Sales opportunity|All, Added, Changed
 Product     |App assignment|All, Added, Removed, Changed
 Product     |Catalog product|All, Added, Removed, Changed
 Product     |Staging product|All, Added, Changed
 Account     |Subscription|All, Added, Removed, Changed
 Account     |Invoice|All, Added, Removed, Changed
 Account     |Order|All, Added, Removed, Changed
 Account     |Payment instrument|All, Added, Changed
 
## AppDirect API and Documentation links
 - [API Reference](https://help.appdirect.com/api/appmarket.html)
 - [Creating API client](https://help.appdirect.com/appmarket/Default.htm#MarketplaceManager/api-client-create.html)
 - [Webhook integration documentation](https://help.appdirect.com/appmarket/Default.htm#MarketplaceManager/mm-set-integ-webhook.htm)

## License
Apache-2.0 © [elastic.io GmbH](http://elastic.io)

[npm-image]: https://badge.fury.io/js/appdirect.svg
[npm-url]: https://npmjs.org/package/appdirect
[travis-image]: https://travis-ci.org/elasticio/appdirect.svg?branch=master
[travis-url]: https://travis-ci.org/elasticio/appdirect
[daviddm-image]: https://david-dm.org/elasticio/appdirect.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/elasticio/appdirect-component
[circle-image]: https://circleci.com/gh/elasticio/appdirect-component.svg?style=svg&circle-token=d2e9efa7e18e5a3f2d3a08b5fbf30f4d0c5f4679
[circle-url]: https://circleci.com/gh/elasticio/appdirect-component
