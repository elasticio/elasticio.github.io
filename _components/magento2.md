---
title: Magento2 component
layout: article
section: E-Commerce Components
---


### Description
Magento v2 component for the elastic.io platform.

Every form of actions is generated from appropriate Magento2 API endpoint JSONschema.

`sku` is product identifier

### Credentials
auth with:
- username
- password

### Actions
 - Upsert Product
    - request JSON schema: /lib/schemas/upsertProduct.in.json
    - It makes `partial` update of product, so this action can be used to update any thing related to product without the need to insert all the data of product.
    - to `create` product (using `upsertProduct` action) you need to send not only `sku` parameter, but also `name`, `attribute_set_id` and `price`.
 - Create Link
    - request JSON schema: /lib/schemas/createLink.in.json
 - Update Link
    - request JSON schema: /lib/schemas/updateLink.in.json
    - `partial` update can be used
 - Update Inventory
    - request JSON schema: /lib/schemas/updateInventory.in.json
    - `partial` update can be used
 - Delete Product
    - request JSON schema: /lib/schemas/deleteProduct.in.json

### Magento2 API links
 - http://devdocs.magento.com/guides/v2.0/rest/bk-rest.html
 - http://devdocs.magento.com/swagger/

### Known limitations
Current component version was tested with Magento2 v2.1.14.
Сorrect component behavior is not guaranteed for other Magento2 versions.
