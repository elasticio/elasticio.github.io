---
title: Dun-and-bradstreet component
layout: article
section: Utility Components
---

Dun &amp; Bradstreet component for {{site.data.tenant.name}} platform

## Description
Component exposes Dun &amp; Bradstreet API.

### Environment variables
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

**Note:** in some cases your developer account must be registered as US located one. As soon as some services are not available in other countries.

### How to insert credentials into {{site.data.tenant.name}} platform:
1. Settings -> Security credentials -> Dun and Bradstreet -> Add New Credential
Enter Name of account.

Enter your Username and Password.
Click on "Verify".
Click on "Save".

## Actions
### Business Background Report
D&B's Business Background Report provides details about the operations of a company, its history, and business background of its management.

**`OrderCompanyReportRequest. OrderCompanyReportRequestDetail. ProductSpecification. DNBProductID` must be equal to `BBR`**

Request JSON schema `schemas/json/Report/BusinessBackgroundReport.in.json`

### Business Information Report
D&B’s Business Information Report is our most popular and widely used information product for determining a company's profitability, stability, viability, and payment performance. It is recognized within the credit management community as the standard for evaluating both new and existing credit relationships, particularly medium-to-high risk accounts. Information found in this report also supports general company research and decision-making in a range of other functions, such as marketing, underwriting, legal services, and purchasing.

**`OrderCompanyReportRequest. OrderCompanyReportRequestDetail. ProductSpecification. DNBProductID` must be equal to `BIR`**

Request JSON schema `schemas/json/Report/BusinessInformationReport.in.json`

### Cleanse and Standardize
The D&B Direct API provides address standardization in two features: On-Demand Single Entity Resolution and On-Demand Address Cleanse & Update. The purpose of these features is to produce machine sortable mailing addresses that are optimized for accurate and quick delivery.

The On-Demand Address Cleanse & Update feature only performs the address cleanup service. To locate a D-U-N-S Numbers while cleansing address records, refer to the On-Demand Single Entity Resolution feature.

Request JSON schema `schemas/json/CompanyService/CleanseAndStandardize.in.json`

### Compact report
Concise information for making decisions fast. Three years financial comparisons, D&B Rating and a 'maximum credit recommendation' are included to help you set credit limits.

**`OrderCompanyReportRequest. OrderCompanyReportRequestDetail. ProductSpecification. DNBProductID` must be equal to `CPTR`**

Request JSON schema `schemas/json/Report/CompactReport.in.json`

### Comprehensive report
D&B's Comprehensive Report is our most complete risk management report, designed to help you assess new and existing business relationships where the large-dollar and/or long-term nature of the commitment pose a significant risk or opportunity to your business. This report combines the background, payments and financial information from the Business Information Report with the power of D&B's predictive scores and ratings, helping you determine both the current profile and future outlook for an account.

**`OrderCompanyReportRequest. OrderCompanyReportRequestDetail. ProductSpecification. DNBProductID` must be equal to `COMPR`**

Request JSON schema `schemas/json/Report/ComprehensiveReport.in.json`

### Detailed Company Profile
The most efficient way to gain basic marketing information about a potential prospect such as business name, address, D&B® D-U-N-S® Number, fax, phone and trade style. Includes business intelligence such as executive names and titles, financials, number of employees, import or export code, branch indicator, and more.

Request JSON schema `schemas/json/Firmographics/DetailedCompanyProfile.in.json`

### Find Competitors
Returns all the competitors for a given company.

Request JSON schema `schemas/json/EntityList/FindCompetitor.in.json`

### Get Cleanse Match
Also known as Match and Cleanse

The D&B Direct API provides address standardization in two features: On-Demand Single Entity Resolution and On-Demand Address Cleanse & Update. The purpose of these features is to produce machine sortable mailing addresses that are optimized for accurate and quick delivery.

The On-Demand Single Entity Resolution feature provides the added service of matching the resulting "cleansed" information to the D&B database for the purpose of locating a D-U-N-S Number. To access the address cleansing services without the additional lookup, refer to the On-Demand Address Cleanse & Update feature.

Request JSON schema `schemas/json/CompanyService/GetCleanseMatch.in.json`

### Get Company News
Also known as Company News

Returns news items for a given D-U-N-S Number.

Request JSON schema `schemas/json/NewsAndMediaProductService/GetCompanyNews.in.json`

### Know Your Vendor - Global Data
Also known as Supplier Risk with SLJ indicators.

D&B Direct allows the creation of custom collections of data elements per customer account. Custom collections are configured by D&B Sales Associates, and then made available through API calls.

This product provides Financial Risk scores for supplier entities along with Suits/Liens/Judgements indicators and Principals information to aid in screening suppliers for Know Your Vendor (KYV) scenarios. It can be combined with Company Profile content from D&B (not included) to provide a complete view of the Supplier/Vendor for screening purposes.

Request JSON schema `schemas/json/CustomProduct/KnowYourVendor.in.json`

### Match
On-Demand Entity Identification. Also known as Match.

Request JSON schema `schemas/json/CompanyService/Match.in.json`

### People/Contact Profile
Also known as Contact Profiles.
This D&B Direct product provides information about the principal of an organization including name, job title, current salary information, along with, direct email and telephone information when available. The Enhanced level of the product provides additional details such as job and compensation history.

Request JSON schema `schemas/json/People/ContactPeopleProfiles.in.json`

### Ratings & Trends
This D&B Direct product provides the composite capital and Credit Rating assigned by D&B, along with the former rating, plus indicators of guarantees from parent companies, the historical background of the businesses officers and financing.

Request JSON schema `schemas/json/Ratings/RatingsCommon.in.json`

### Search & Build-a-List - Company
Also known as Locating Companies
Returns a set of companies based on keyword, along with basic identifying data for each company.

Request JSON schema `schemas/json/EntityList/LocateCompany.in.json`

### Small Business Match
Also known as On-Demand Entity Identification for Small Businesses.

Request JSON schema `schemas/json/CompanyService/SmallBusinessMatch.in.json`

### Small Business Company & Owner Risk Profile
This product delivers the D&B data elements that are necessary to generate the FICO Small Business Scoring Service (SBSS) Origination Score, a consumer-commercial blended score. The D&B data elements included in this product are a mix of trade, firmographic, and public record, and the scoring packet is most often utilized within the Financial Services industry.

Request JSON schema `schemas/json/SmallBusiness/OwnerRiskProfile.in.json`

### Small Business Risk Insight
The D&B Small Business Risk Insight™ (SBRI) product is collected and consolidated from contributed financial institutions on small businesses across the loan, credit, card, and leasing industries to give lending institutions a comprehensive view of a small business's total risk and exposure.

The D&B SBRI Enhanced product provides additional information that identifies individuals or entities that have guaranteed the financial obligation - whether it be a business principal, commercial entity, or government guarantor relationship. When available, this information can provide invaluable insight into the background details of the lending.

Request JSON schema `schemas/json/SmallBusiness/SmallBusinessRiskInsight.in.json`

### Supplier Evaluation Risk Rating
The D&B US Supplier Evaluation Risk (SER) Rating predicts the likelihood that a supplier will cease business operations or become inactive over the next 12 month period based on the depth of predictive data attributes available on the business.

Request JSON schema `schemas/json/Ratings/RatingsCommon.in.json`

### Supplier Risk
Also known as Know Your Vendor - Global Data
D&B Direct allows the creation of custom collections of data elements per customer account. Custom collections are configured by D&B Sales Associates, and then made available through API calls.

The Global Supplier Risk packet provides key supplier risk data for vendor management in the enterprise. It combines D&B’s financial and supplier risk scores with public filings information. When used with D&B’s in-depth company profile data (not included), this product provides a comprehensive view into a supplier’s risk propensity.

Request JSON schema `schemas/json/CustomProduct/SupplierRisk.in.json`

### Viability Rating
The D&B Viability Rating uses D&B’s proprietary analytics to compare the most predictive business risk indicators and deliver a highly reliable assessment of the probability that a company will go out of business, become dormant/inactive, or file for bankruptcy/insolvency within the next 12 months.

Request JSON schema `schemas/json/Ratings/RatingsCommon.in.json`

## Triggers
No triggers.
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
