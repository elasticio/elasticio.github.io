---
title: Dun-and-bradstreet component
layout: component
section: E-Commerce components
description: D&B is a corporation that provides information on commercial credit and reports on businesses.
icon: dun-and-bradstreet.png
icontext: Dun-and-bradstreet component
category: dun-and-bradstreet
updatedDate: 2020-08-12
ComponentVersion: 1.0.3
---

## Environment variables

Component requires at least 1GB of RAM to work correct:

Set env variable `EIO_REQUIRED_RAM_MB` to 1024

### How to insert env variable into {{site.data.tenant.name}} platform:

1. Navigate to 'Developers' tab
2. Choose your component Repository. Here you should already have your component pushed to the platform.
3. Click the link `You can configure your environment variables here.`
4. Under 'Create a new environment variable' input 'EIO_REQUIRED_RAM_MB' as Name and '1024' as Value.
5. Click 'Add'.

## Credentials

Access to the D&B Direct web services are secured by a **Username** and **Password** combination. D&B will issue your organization a production username upon completion of the contract establishment process. This username will be sent to the email address designated on the contract, along with instructions for setting up the password. This process will also be followed for production trial requests.

>**Note:** in some cases your developer account must be registered as US located one. As soon as some services are not available in other countries.

### How to insert credentials into {{site.data.tenant.name}} platform:

1. Settings -> Security credentials -> Dun and Bradstreet -> Add New Credential

2. Enter Name of account.

3. Enter your Username and Password.

4. Click on "Verify".

5. Click on "Save".

## Technical Notes

The [technical notes](technical-notes) page gives some technical details about Dun-and-bradstreet component like [changelog](/components/dun-and-bradstreet/technical-notes#changelog).

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

  1. [Business Background Report](/components/dun-and-bradstreet/actions#business-background-report)

  2. [Business Information Report](/components/dun-and-bradstreet/actions#business-information-report)

  3. [Cleanse and Standardize](/components/dun-and-bradstreet/actions#cleanse-and-standardize)

  4. [Compact report](/components/dun-and-bradstreet/actions#compact-report)

  5. [Comprehensive report](/components/dun-and-bradstreet/actions#comprehensive-report)

  6. [Detailed Company Profile](/components/dun-and-bradstreet/actions#detailed-company-profile)

  7. [Find Competitors](/components/dun-and-bradstreet/actions#find-competitors)

  8. [Get Cleanse Match](/components/dun-and-bradstreet/actions#get-cleanse-match)

  9. [Get Company News](/components/dun-and-bradstreet/actions#get-company-news)

  10. [Know Your Vendor - Global Data](/components/dun-and-bradstreet/actions#know-your-vendor---global-data)

  11. [Match](/components/dun-and-bradstreet/actions#match)

  12. [People/Contact Profile](/components/dun-and-bradstreet/actions#peoplecontact-profile)

  13. [Ratings & Trends](/components/dun-and-bradstreet/actions#ratings--trends)

  14. [Search & Build-a-List - Company](/components/dun-and-bradstreet/actions#search--build-a-list---company)

  15. [Small Business Match](/components/dun-and-bradstreet/actions#small-business-match)

  16. [Small Business Company & Owner Risk Profile](/components/dun-and-bradstreet/actions#small-business-company--owner-risk-profile)

  17. [Small Business Risk Insight](/components/dun-and-bradstreet/actions#small-business-risk-insight)

  18. [Supplier Evaluation Risk Rating](/components/dun-and-bradstreet/actions#supplier-evaluation-risk-rating)

  19. [Supplier Risk](/components/dun-and-bradstreet/actions#supplier-risk)

  20. [Viability Rating](/components/dun-and-bradstreet/actions#viability-rating)

## Dun &amp; Bradstreet API links

[Dun &amp; Bradstreet documentation](https://docs.dnb.com/direct/2.0/en-US/quick-soap-API)

[Business Information Report documentation](https://docs.dnb.com/direct/2.0/en-US/report/latest/ordercompanyreport/bir-soap-API)

[Business Background Report documentation](https://docs.dnb.com/direct/2.0/en-US/report/latest/ordercompanyreport/bbr-soap-API)

[Cleanse and Standardize documentation](https://docs.dnb.com/direct/2.0/en-US/company/latest/standardize/soap-API)

[Compact Report documentation](https://docs.dnb.com/direct/2.0/en-US/report/latest/ordercompanyreport/cmpct-soap-API)

[Comprehensive Report documentation](https://docs.dnb.com/direct/2.0/en-US/report/latest/ordercompanyreport/cmprhnsv-soap-API)

[Detailed Company Profile documentation](https://docs.dnb.com/direct/2.0/en-US/firmographic/latest/orderproduct/marketing-soap-API)

[Find Competitors documentation](https://docs.dnb.com/direct/2.0/en-US/entitylist/latest/findcompetitor/soap-API)

[GetCleanseMatch documentation](https://docs.dnb.com/direct/2.0/en-US/company/latest/getcleansematch/soap-API)

[Get Company News documentation](https://docs.dnb.com/direct/2.0/en-US/newsandmedia/latest/orderproduct/news-soap-API)

[Know Your Vendor - Global Data documentation](https://docs.dnb.com/direct/2.0/en-US/custom/latest/orderproduct/supplier-global-soap)

[Match documentation](https://docs.dnb.com/direct/2.0/en-US/company/latest/match/soap-API)

[People/Contact Profiles documentation](https://docs.dnb.com/direct/2.0/en-US/contact/latest/orderproduct/contact-soap-API)

[Search & Build-a-List - Company documentation](https://docs.dnb.com/direct/2.0/en-US/entitylist/latest/findcompany/soap-API)

[Small Business Match documentation](https://docs.dnb.com/direct/2.0/en-US/company/latest/match/SB-soap-API)

[Small Business Company & Owner Risk Profile documentation](https://docs.dnb.com/direct/2.0/en-US/assessment/latest/orderproduct/fico-soap-API)

[Small Business Risk Insight documentation](https://docs.dnb.com/direct/2.0/en-US/sbri/latest/orderproduct/soap-API)

[Supplier Evaluation Risk Rating documentation](https://docs.dnb.com/direct/2.0/en-US/assessment/latest/orderproduct/ser-soap-API)

[Supplier Risk documentation](https://docs.dnb.com/direct/2.0/en-US/custom/latest/orderproduct/supplier-global-soap)

[Viability Rating documentation](https://docs.dnb.com/direct/2.0/en-US/assessment/latest/orderproduct/viability-soap-API)
