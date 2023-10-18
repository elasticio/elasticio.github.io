---
title: Shopify deprecated actions
layout: component
description: Shopify component deprecated actions.
icon: shopify-admin.png
icontext: Shopify component
category: shopify-component
updatedDate: 2023-10-18
ComponentVersion: 1.6.7
---

## Table of contents

The following Shopify actions are deprecated:

1.  [List Products(deprecated)](deprecated-actions#list-productsdeprecated) - This actions is deprecated. Use the [Lookup Object](actions#lookup-object) action instead.
2.  [Upsert Product(deprecated)](deprecated-actions#upsert-productdeprecated) - This actions is deprecated. Use the [Upsert Objects](actions#upsert-object) action instead.
3.  [Delete Product(deprecated)](deprecated-actions#delete-productdeprecated) - This actions is deprecated. Use the [Upsert Objects](actions#delete-object) action instead.
4.  [Get Product(deprecated)](deprecated-actions#get-productdeprecated) - This actions is deprecated. Use the [Lookup Object](actions#lookup-object) action instead.
5.  [Count Products(deprecated)](deprecated-actions#count-productsdeprecated) - This actions is deprecated. Use the [Delete Object](actions#delete-object) action instead.
6.  [Create Product Image(deprecated)](deprecated-actions#create-product-imagedeprecated) - This actions is deprecated. Use the [Upsert Object](actions#upsert-object) action instead.
7.  [Update Product Image(deprecated)](deprecated-actions#update-product-imagedeprecated) - This actions is deprecated. Use the [Upsert Object](actions#upsert-object) action instead.
8.  [Delete Product Image(deprecated)](deprecated-actions#delete-product-imagedeprecated) - This actions is deprecated. Use the [Upsert Object](actions#upsert-object) action instead.
9.  [List Inventory Items(deprecated)](deprecated-actions#list-inventory-itemsdeprecated) - This actions is deprecated. Use [Lookup Object](actions#lookup-object) action instead.
10.  [Get Inventory Item(deprecated)](deprecated-actions#get-inventory-itemdeprecated) - This actions is deprecated. Use the [Lookup Object](actions#lookup-object) action instead.
11.  [Update Inventory Item(deprecated)](deprecated-actions#update-inventory-itemdeprecated) - This actions is deprecated. Use [Upsert Object](actions#upsert-object) action instead.
12.  [Create Product Variant(deprecated)](deprecated-actions#create-product-variantdeprecated) - This actions is deprecated. Use [Upsert Object](actions#upsert-object) action instead.
13.  [Update Product Variant(deprecated)](deprecated-actions#update-product-variantdeprecated) - This actions is deprecated. Use [Upsert Object](actions#upsert-object) action instead.
14.  [Delete Product Variant(deprecated)](deprecated-actions#delete-product-variantdeprecated) - This actions is deprecated. Use [Upsert Object](actions#upsert-object) action instead.


## List Products(deprecated)

This actions is deprecated. Use [Lookup Object](/components/shopify-admin/actions#lookup-object) action instead.

### Usage example

input message:

```json
{
	"ids": [
		"814083178540"
	],
	"limit": 3,
	"page": 1,
	"since_id": 0,
	"title": "new product",
	"vendor": null,
	"handle": null,
	"product_type": null,
	"collection_id": null,
	"created_at_min": "2018-04-22T11:04:58-04:00",
	"created_at_max": null,
	"updated_at_min": null,
	"updated_at_max": null,
	"published_at_min": null,
	"published_at_max": null,
	"published_status": "any"
}
```

<details closed markdown="block">
<summary>
Click to expand - Output message
</summary>

```json
{
	"result": [
		{
			"id": 814083178540,
			"title": "my new product 1",
			"body_html": "description of my new product 1",
			"vendor": "fredddy123store",
			"product_type": "",
			"created_at": "2018-04-19T09:36:10-04:00",
			"handle": "my-new-product-1",
			"updated_at": "2018-04-23T11:04:58-04:00",
			"published_at": "2018-04-19T09:34:40-04:00",
			"template_suffix": null,
			"published_scope": "web",
			"tags": "",
			"variants": [
				{
					"id": 8771018031148,
					"product_id": 814083178540,
					"title": "Default Title",
					"price": "10.50",
					"sku": "",
					"position": 1,
					"inventory_policy": "deny",
					"compare_at_price": "11.00",
					"fulfillment_service": "manual",
					"inventory_management": null,
					"option1": "Default Title",
					"option2": null,
					"option3": null,
					"created_at": "2018-04-19T09:36:10-04:00",
					"updated_at": "2018-04-19T09:36:10-04:00",
					"taxable": true,
					"barcode": "",
					"grams": 0,
					"image_id": null,
					"inventory_quantity": 1,
					"weight": 0,
					"weight_unit": "kg",
					"inventory_item_id": 8852818395180,
					"old_inventory_quantity": 1,
					"requires_shipping": false
				}
			],
			"options": [
				{
					"id": 1180400189484,
					"product_id": 814083178540,
					"name": "Title",
					"position": 1,
					"values": [
						"Default Title"
					]
				}
			],
			"images": [
				{
					"id": 2887637663788,
					"product_id": 814083178540,
					"position": 1,
					"created_at": "2018-04-19T09:36:12-04:00",
					"updated_at": "2018-04-19T09:36:12-04:00",
					"alt": null,
					"width": 1919,
					"height": 983,
					"src": "Example.jpg",
					"variant_ids": []
				}
			],
			"image": {
				"id": 2887637663788,
				"product_id": 814083178540,
				"position": 1,
				"created_at": "2018-04-19T09:36:12-04:00",
				"updated_at": "2018-04-19T09:36:12-04:00",
				"alt": null,
				"width": 1919,
				"height": 983,
				"src": "Example.jpg",
				"variant_ids": []
			}
		}
	]
}
```
</details>

## Upsert Product(deprecated)

This actions is deprecated. Use [Upsert Objects](#upsert-object) action instead.

### Usage example

<details closed markdown="block">
<summary>
Click to expand - Input message
</summary>

```json
{
	"id": "814083178540",
	"body_html": "It's the small iPod with a big idea: Video.",
	"handle": "ipod-nano",
	"images": [
		{
			"position": 1,
			"width": 100,
			"height": 100,
			"src": "Example.jpg",
			"variant_ids": [
				"808950810"
			]
		}
	],
	"options": [
		{
			"name": "Color",
			"values": [
				"Blue",
				"Black"
			]
		}
	],
	"product_type": "Cult Products",
	"published_scope": "global",
	"tags": "Emotive, Flash Memory, MP3, Music",
	"template_suffix": "product.liquid",
	"title": "my new product 1 - ASD",
	"metafields_global_title_tag": "IPod Nano - White, 8GB",
	"metafields_global_description_tag": "It's the small iPod with a big idea: Video.",
	"variants": [
		{
			"barcode": "1234_pink",
			"compare_at_price": 250,
			"fulfillment_service": "manual",
			"grams": 567,
			"weight": 0.2,
			"weight_unit": "kg",
			"inventory_management": "shopify",
			"inventory_policy": "continue",
			"inventory_quantity": 10,
			"option1": "Pink",
			"position": 1,
			"price": 239.99,
			"requires_shipping": true,
			"sku": "IPOD2008PINK",
			"taxable": true,
			"title": "Pink"
		}
	],
	"vendor": "Apple"
}
```
</details>

<details closed markdown="block">
<summary>
Click to expand - Output message
</summary>

```json
{
	"result": {
		"id": 814083178540,
		"title": "my new product 1 - ASD",
		"body_html": "It's the small iPod with a big idea: Video.",
		"vendor": "Apple",
		"product_type": "Cult Products",
		"created_at": "2018-04-19T09:36:10-04:00",
		"handle": "ipod-nano-12",
		"updated_at": "2018-04-26T06:12:03-04:00",
		"published_at": "2018-04-19T09:34:40-04:00",
		"template_suffix": "product.liquid",
		"published_scope": "web",
		"tags": "Emotive, Flash Memory, MP3, Music",
		"variants": [
			{
				"id": 8932338991148,
				"product_id": 814083178540,
				"title": "Pink",
				"price": "239.99",
				"sku": "IPOD2008PINK",
				"position": 1,
				"inventory_policy": "continue",
				"compare_at_price": "250.00",
				"fulfillment_service": "manual",
				"inventory_management": "shopify",
				"option1": "Pink",
				"option2": null,
				"option3": null,
				"created_at": "2018-04-26T06:12:03-04:00",
				"updated_at": "2018-04-26T06:12:03-04:00",
				"taxable": true,
				"barcode": "1234_pink",
				"grams": 200,
				"image_id": null,
				"inventory_quantity": 10,
				"weight": 0.2,
				"weight_unit": "kg",
				"inventory_item_id": 9031879360556,
				"old_inventory_quantity": 10,
				"requires_shipping": true
			}
		],
		"options": [
			{
				"id": 1180400189484,
				"product_id": 814083178540,
				"name": "Color",
				"position": 1,
				"values": [
					"Pink"
				]
			}
		],
		"images": [
			{
				"id": 2965072117804,
				"product_id": 814083178540,
				"position": 1,
				"created_at": "2018-04-26T06:12:03-04:00",
				"updated_at": "2018-04-26T06:12:03-04:00",
				"alt": null,
				"width": 626,
				"height": 626,
				"src": "Example.jpg",
				"variant_ids": []
			}
		],
		"image": {
			"id": 2965072117804,
			"product_id": 814083178540,
			"position": 1,
			"created_at": "2018-04-26T06:12:03-04:00",
			"updated_at": "2018-04-26T06:12:03-04:00",
			"alt": null,
			"width": 626,
			"height": 626,
			"src": "Example.jpg",
			"variant_ids": []
		}
	}
}
```
</details>

## Delete Product(deprecated)

This actions is deprecated. Use [Delete Object](#delete-object) action instead.

### Usage example

input message:

```json
{
	"id": "814083178540"
}
```

output message:

```json
{
	"deleted": true,
	"productId": "814083178540"
}
```

## Get Product(deprecated)

This actions is deprecated. Use [Lookup Object](/components/shopify-admin/actions#lookup-object) action instead.

### Usage example

input message:

```json
{
	"id": "833638662188",
	"fields": [
		"id",
		"title",
		"createdAt"
	]
}
```

output message:

```json
{
	"result": {
		"id": 833638662188,
		"title": "123 123 IPod Nano - 8GB",
		"created_at": "2018-04-24T11:46:06-04:00"
	}
}
```

## Count Products(deprecated)

This actions is deprecated. Use [Delete Object](/components/shopify-admin/actions#delete-object) action instead.

### Usage example

input message:

```json
{
	"vendor": null,
	"product_type": null,
	"collection_id": null,
	"created_at_min": null,
	"created_at_max": null,
	"updated_at_min": null,
	"updated_at_max": null,
	"published_at_min": null,
	"published_at_max": null,
	"published_status": null
}
```

output message:

```json
{
	"result": 15
}
```

## Create Product Image(deprecated)

This actions is deprecated. Use [Upsert Object](/components/shopify-admin/actions#upsert-object) action instead.

### Usage example

input message:

```json
{
	"productId": "814083178540",
	"position": 2,
	"variant_ids": [
		"8932338991148"
	],
	"src": "Example.jpg",
	"attachment": "",
	"filename": "",
	"alt": "image alt",
	"metafields": [
		{
			"key": "new",
			"value": "newvalue",
			"value_type": "string",
			"namespace": "global"
		}
	],
	"width": 640,
	"height": 480
}
```

output message:

```json
{
	"result": {
		"id": 3004333031468,
		"product_id": 814083178540,
		"position": 2,
		"created_at": "2018-04-30T06:02:06-04:00",
		"updated_at": "2018-04-30T06:02:07-04:00",
		"alt": "image alt",
		"width": 770,
		"height": 433,
		"src": "Example.jpg",
		"variant_ids": []
	}
}
```

## Update Product Image(deprecated)

This actions is deprecated. Use [Upsert Object](/components/shopify-admin/actions#upsert-object) action instead.

### Usage example

input message:

```json
{
	"productId": "814083178540",
	"imageId": "2978401321004",
	"position": 3,
	"variant_ids": [
		"8932338991148"
	],
	"src": "Example.jpg",
	"attachment": "",
	"filename": "",
	"alt": "image alt 2",
	"metafields": [
		{
			"key": "new",
			"value": "newvalue",
			"value_type": "string",
			"namespace": "global"
		}
	],
	"width": 640,
	"height": 480
}
```

output message:

```json
{
	"result": {
		"id": 2978401321004,
		"product_id": 814083178540,
		"position": 3,
		"created_at": "2018-04-27T10:24:34-04:00",
		"updated_at": "2018-04-30T06:07:51-04:00",
		"alt": "image alt 2",
		"width": 770,
		"height": 433,
		"src": "Example.jpg",
		"variant_ids": [
			8932338991148
		]
	}
}
```

## Delete Product Image(deprecated)

This actions is deprecated. Use [Upsert Object](/components/shopify-admin/actions#upsert-object) action instead.

### Usage example

input message:

```json
{
	"productId": "814083178540",
	"imageId": "3004381331500"
}
```

output message:

```json
{
	"result": {
		"deleted": true,
		"productId": "814083178540",
		"imageId": "3004381331500"
	}
}
```

## List Inventory Items(deprecated)

This actions is deprecated. Use [Lookup Object](/components/shopify-admin/actions#lookup-object) action instead.

### Usage example

input message:

```json
{
	"ids": [
		"8994203271212",
		"8994177056812"
	],
	"page": 1,
	"limit": 10
}
```
output message:

```json
{
	"result": [
		{
			"id": 8994177056812,
			"sku": "",
			"created_at": "2018-04-24T11:44:31-04:00",
			"updated_at": "2018-04-24T11:44:31-04:00",
			"tracked": false
		},
		{
			"id": 8994203271212,
			"sku": "IPOD2008PINK",
			"created_at": "2018-04-24T11:46:06-04:00",
			"updated_at": "2018-04-24T11:46:06-04:00",
			"tracked": true
		}
	]
}
```

## Get Inventory Item(deprecated)

This actions is deprecated. Use [Lookup Object](/components/shopify-admin/actions#lookup-object) action instead.

### Usage example

input message:

```json
{
	"id": "8994203271212"
}
```

output message:

```json
{
	"result": {
		"id": 8994203271212,
		"sku": "IPOD2008PINK",
		"created_at": "2018-04-24T11:46:06-04:00",
		"updated_at": "2018-04-24T11:46:06-04:00",
		"tracked": true
	}
}
```

## Update Inventory Item(deprecated)

This actions is deprecated. Use [Upsert Object](/components/shopify-admin/actions#upsert-object) action instead.

### Usage example

input message:

```json
{
	"id": "8994203271212",
	"sku": "new sku",
	"tracked": false
}
```

output message:

```json
{
	"result": {
		"id": 8994203271212,
		"sku": "new sku",
		"created_at": "2018-04-24T11:46:06-04:00",
		"updated_at": "2018-04-30T09:15:05-04:00",
		"tracked": false
	}
}
```

## Create Product Variant(deprecated)

This actions is deprecated. Use [Upsert Object](/components/shopify-admin/actions#upsert-object) action instead.

### Usage example

<details closed markdown="block">
<summary>
Click to expand - Input message
</summary>

```json
{
	"productId": "814083178540",
	"barcode": "1234_pink",
	"compare_at_price": 599.99,
	"fulfillment_service": "manual",
	"grams": 567,
	"image_id": "",
	"inventory_item_id": "",
	"inventory_management": "shopify",
	"inventory_policy": "continue",
	"inventory_quantity": 10,
	"old_inventory_quantity": 5,
	"inventory_quantity_adjustment": 5,
	"metafields": [
		{
			"key": "new",
			"value": "newvalue",
			"value_type": "string",
			"namespace": "global"
		}
	],
	"option1": "new Pink",
	"position": 1,
	"price": 399,
	"requires_shipping": true,
	"sku": "sku 123",
	"taxable": false,
	"tax_code": "",
	"title": "Pink 11",
	"weight": 100,
	"weight_unit": "oz"
}
```
</details>


<details closed markdown="block">
<summary>
Click to expand - Output message
</summary>

```json
{
	"result": {
		"id": 9010709037100,
		"product_id": 814083178540,
		"title": "new Pink",
		"price": "399.00",
		"sku": "sku 123",
		"position": 1,
		"inventory_policy": "continue",
		"compare_at_price": "599.99",
		"fulfillment_service": "manual",
		"inventory_management": "shopify",
		"option1": "new Pink",
		"option2": "",
		"option3": "",
		"created_at": "2018-04-30T09:36:58-04:00",
		"updated_at": "2018-04-30T09:36:58-04:00",
		"taxable": false,
		"barcode": "1234_pink",
		"grams": 2835,
		"image_id": "",
		"inventory_quantity": 10,
		"weight": 100,
		"weight_unit": "oz",
		"inventory_item_id": 9120577257516,
		"old_inventory_quantity": 10,
		"requires_shipping": true
	}
}
```
</details>

## Update Product Variant(deprecated)

This actions is deprecated. Use [Upsert Object](/components/shopify-admin/actions#upsert-object) action instead.

### Usage example

input message:

```json
{
	"id": "9010709037100",
	"productId": "814083178540",
	"barcode": "1234_pink",
	"compare_at_price": 599.99,
	"fulfillment_service": "manual",
	"grams": 567,
	"image_id": "",
	"inventory_item_id": "",
	"inventory_management": "shopify",
	"inventory_policy": "continue",
	"inventory_quantity": 10,
	"old_inventory_quantity": 5,
	"inventory_quantity_adjustment": 5,
	"metafields": [
		{
			"key": "new1",
			"value": "newvalue1",
			"value_type": "string",
			"namespace": "global"
		}
	],
	"option1": "new Pink",
	"position": 1,
	"price": 399,
	"requires_shipping": true,
	"sku": "sku 123",
	"taxable": false,
	"tax_code": "",
	"title": "Pink 22",
	"weight": 100,
	"weight_unit": "oz"
}
```

output message:

```json
{
	"result": {
		"id": 9010709037100,
		"product_id": 814083178540,
		"title": "new Pink",
		"price": "399.00",
		"sku": "sku 123",
		"position": 1,
		"inventory_policy": "continue",
		"compare_at_price": "599.99",
		"fulfillment_service": "manual",
		"inventory_management": "shopify",
		"option1": "new Pink",
		"option2": "",
		"option3": "",
		"created_at": "2018-04-30T09:36:58-04:00",
		"updated_at": "2018-04-30T09:47:59-04:00",
		"taxable": false,
		"barcode": "1234_pink",
		"grams": 2835,
		"image_id": "",
		"inventory_quantity": 15,
		"weight": 100,
		"weight_unit": "oz",
		"inventory_item_id": 9120577257516,
		"old_inventory_quantity": 15,
		"requires_shipping": true
	}
}
```

## Delete Product Variant(deprecated)

This actions is deprecated. Use [Upsert Object](/components/shopify-admin/actions#upsert-object) action instead.

### Usage example

input message:

```json
{
	"id": "9010709037100",
	"productId": "814083178540"
}
```

output message:

```json
{
	"result": {
		"deleted": true,
		"id": "9010709037100",
		"productId": "814083178540"
	}
}
```
