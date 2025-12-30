---
title: Bazaarvoice component
layout: component
section: E-Commerce components
description: A SaaS software for retailers that allows them to add product reviews, ratings, and more.
icon: bazaarvoice.png
icontext: Bazaarvoice component
category: bazaarvoice
updatedDate: 2025-11-14
ComponentVersion: 0.0.4
---

## Credentials

Here are the credentials necessary to authenticate with the Bazaarvoice:

*   `apiUri` - for Conversations API
*   `apiKey` - for Conversations API
*   `curationsApiUri` - for Curations API
*   `curationsApiKey` - for Curations API

## Technical Notes

The [technical notes](technical-notes) page gives some technical details about Bazaarvoice component like [changelog](/components/bazaarvoice/technical-notes#changelog).

## Triggers

This component has no trigger functions. This means it will not be accessible to
select as a first component during the integration flow design.

## Actions

  1. [Retrieve reviews](/components/bazaarvoice/actions#retrieve-reviews)                                                     
  Action returns Reviews and Rating and related data.

  2. [Submit review](/components/bazaarvoice/actions#submit-review)                                                           
  Action submit reviews on a product.

  3. [Retrieve products](/components/bazaarvoice/actions#retrieve-products)                                                   
  Action returns Product data.

  4. [Retrieve categories](/components/bazaarvoice/actions#retrieve-categories)                                               
  Action returns Categories and related data.

  5. [Retrieve statistics](/components/bazaarvoice/actions#retrieve-statistics)                                               
  Action returns Product-based Review Statistics.

  6. [Retrieve comments](/components/bazaarvoice/actions#retrieve-comments)                                                   
  Action returns comments posted on reviews.

  7. [Submit question](/components/bazaarvoice/actions#submit-question)                                                       
  Action submit questions on a product.

  8. [Submit answer](/components/bazaarvoice/actions#submit-answer)                                                           
  Action submit answers on questions.

  9. [Submit comment](/components/bazaarvoice/actions#submit-comment)                                                         
  Action submit a comment on a review.

  10. [Submit photo](/components/bazaarvoice/actions#submit-photo)                                                            
  Action upload photos for a review, question or answer.

  11. [Submit feedback](/components/bazaarvoice/actions#submit-feedback)                                                      
  Action submit feedback on a review, comment, question, answer.

  12. [Retrieve curations content](/components/bazaarvoice/actions#retrieve-curations-content)                                
  Action returns social content collected by Bazaarvoice.

## Links

*   Bazaarvoice [Conversations API documentation](https://developer.bazaarvoice.com/conversations-api)
*   How to retrieve [user's device fingerprint](https://developer.bazaarvoice.com/conversations-api/tutorials/authenticity#device-fingerprint)
