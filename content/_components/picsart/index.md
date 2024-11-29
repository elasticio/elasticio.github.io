---
title: Picsart component
layout: component
section: Office components
description: The Picsart Component facilitates seamless interaction with the Picsart API.
icon: picsart.png
icontext: picsart component
category: picsart
ComponentVersion: 1.0.0
updatedDate: 2024-11-29
---

# Picsart Component

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Make Raw Request](#make-raw-request)
  * [Remove background](#remove-background)
  * [Upscale](#upscale)

## Description

The Picsart Component facilitates seamless interaction with the [Picsart API](https://docs.picsart.io/reference/). This component has been tested with API version `1.0`.

## Credentials

To utilize this component, you must first obtain an API key. Visit the [console](https://console.picsart.io/dashboard/apps/) to find it.

The required credential fields for the component are as follows:
* **API key** (string, required): This key will be included as the `X-Picsart-API-Key` header for each request.
* **Image API base URL** (string, optional): By default, the component uses the image API at `https://api.picsart.io/tools/1.0/`, but you can modify it here.

## Actions

### Make Raw Request

This action allows you to execute custom requests directly using the [Picsart REST API](https://docs.picsart.io/reference/).

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): If enabled, 404 HTTP responses will not be treated as errors. The default setting is `false`.

#### Input Metadata

* **Url** - (string, required): The relative path of the resource, which will be appended to the base URL (by default base URL it's image API - `https://api.picsart.io/tools/1.0/`), or a complete URL of the resource, e.g., `https://genai-api.picsart.io/v1/text2image`.
* **Method** - (string, required): The HTTP verb to use in the request; valid options are `GET` or `POST`.
* **Request Body** - (object, optional): The body of the request to send.

#### Output Metadata

* **Status Code** - (number, required): The HTTP status code of the response.
* **HTTP Headers** - (object, required): The HTTP headers of the response.
* **Response Body** - (object, optional): The body of the HTTP response.

### Remove background

Remove or change background of an image using AI technology.

The recommended composition of an Image, in order to be optimally processed:
* Less busy background
* High contrast (background/foreground)
* Background/foreground is distinguishable by naked eye

The foreground should be visually clear, high contrast with relatively sharp edges. The foreground should also be comparably big in the photo. Supported source image formats are JPG, PNG, TIFF, WEBP, and MPO.

#### Configuration Fields

* **Download result** - (checkbox, optional): If selected, this option enables the component to download the resulting file to internal storage.

#### Input Metadata

* **Image** - (string, semi-required): The URL of an image stored either internally or externally. If a link is provided, the component will download the file and send it as binary data to the Picsart API.
* **Image URL** - (string, semi-required): The URL of an image stored externally; this will be sent directly to the Picsart API.
* **Image ID** - (string, semi-required): The source image ID of an image that has been previously uploaded to Picsart or the result image ID from a different API.
* **Output Type** - (string, optional, `cutout` by default): If you submit a photo of a person, `cutout` returns the person as a sticker, while `mask` returns a mask photo of the person.
* **Background Image** - (string, semi-required): The URL of a background image stored either internally or externally. If a link is provided, the component will download the file and send it as binary data to the Picsart API.
* **Background Image URL** - (string, semi-required): The URL of a background image stored externally; this will be sent directly to the Picsart API.
* **Background Image ID** - (string, semi-required): The source image ID of a background image that has been previously uploaded to Picsart or the result image ID from a different API.
* **Background Color** - (string, optional): Can be a hex color code (e.g., #82d5fa, #fff) or a color name (e.g., blue). For semi-transparency, 4-/8-digit hex codes are also supported (e.g., #18d4ff87).
* **Background Blur** - (number, optional, 0 by default): Provide a blur value ranging from 0 to 100.
* **Background Width** - (number, optional): The width in pixels. If left blank, the background retains its original width.
* **Background Height** - (number, optional): The height in pixels. If left blank, the background retains its original height.
* **Scale** - (string, optional, `fit` by default): `fit` ensures the longer side (width/height) fits the background, while `fill` ensures the shorter side fits the background. Supported values include: `fit` and `fill`.
* **Auto Center** - (boolean, optional, `false` by default): Automatically centers the object. This option is only applicable when **Output Type** is `cutout`. It is not recommended to use this flag when the object is only partially visible (e.g., half a cup or half a shoe is in the image).
* **Stroke Size** - (number, optional, 0 by default): Adds a solid stroke (border) around the cutout result. This option works when **Output Type** is `cutout`. Set to 0 to remove the stroke. Acceptable values range from 0 to 100.
* **Stroke Color** - (string, optional): Defines the color of the stroke. It can be a hex color code (e.g., #82d5fa, #fff; with or without #) or a color name (e.g., blue; in English). For semi-transparency, 4-/8-digit hex codes are also supported (e.g., #18d4ff87). This color is applied if the **Stroke Size** is 1 or greater.
* **Stroke Opacity** - (number, optional, 100 by default): Defines the opacity of the stroke added to the cutout result. This option works when **Output Type** is `cutout` and **Stroke Size** is 1 or greater. Acceptable values range from 0 to 100, with the default being 100 (opaque). Set to 0 to make it fully transparent.
* **Shadow** - (string, optional, `disabled` by default): A universal parameter for configuring the shadow. The default value, "disabled," ensures that the shadow is not rendered. The "custom" value allows you to define a custom position for the shadow. When this value is chosen, the `shadow_offset_x` and `shadow_offset_y` will be applied. Other values represent shadow directions with a preset shadow setup (10px). Supported values are: `disabled`, `custom`, `bottom-right`, `bottom-left`, `left`, `right`, `top-left`, `top`, and `top-right`.
* **Shadow Opacity** - (number, optional, 20 by default): Specifies the opacity of the shadow. This option works when the shadow is enabled (any non-disabled value). Acceptable values range from 0 to 100.
* **Shadow Blur** - (number, optional, 50 by default): Specifies the blur of the shadow. This option works when the shadow is enabled. Acceptable values range from 0 to 100.
* **Shadow Offset X** - (number, optional): This parameter is mandatory when **Shadow** is set to `custom`. Acceptable values range from -100 to 100.
* **Shadow Offset Y** - (number, optional): This parameter is mandatory when **Shadow** is set to `custom`. Acceptable values range from -100 to 100.
* **Format** - (string, optional, defaults to `JPG`): The output image format. Supported values include: `JPG`, `PNG`, and `WEBP`.

❗Note: Only one field should be filled at a time:
* For image - **Image**, **Image URL**, or **Image ID**.
* For background - **Background Image**, **Background Image URL**, **Background Image ID** or **Background Color**

#### Output Metadata

* **status** - (string): The result of the operation.
* **data** - (object): File information, containing the following fields:
  * **url** - (string): The URL of the resulting file.
  * **id** - (string): The unique identifier of this file in Picsart.

If the **Download result** checkbox is checked, an additional field will be included:
* **attachmentUrl** - (string): The URL of the resulting file stored internally.

### Upscale

Increases the resolutions of an image by a given upscale factor, without increasing its file size. Upscale increases the quality and resolution of your photos by leveraging predictive and generative AI to add pixels to your image. It works especially well on images without noise.

Images can be upscaled up to 8 times. Images can be upscaled with outputs up to 4800x4800 (16 Mpx). Supported source image formats are JPG, PNG, TIFF and WEBP.

Upscale Factor | Input Image Maximum Recommended Resolution (width x height)
------------------| ----------------------------------------
2 | 2000x2000
4 | 1024x1024
6 | 800x800
8 | 600x600

#### Configuration Fields

* **Download result** - (checkbox, optional): If selected, this option enables the component to download the resulting file to internal storage.

#### Input Metadata

* **Image** - (string, semi-required): The URL of an image stored either internally or externally. If a link is provided, the component will download the file and send it as binary data to the Picsart API.
* **Image URL** - (string, semi-required): The URL of an image stored externally; this will be sent directly to the Picsart API.
* **Image ID** - (string, semi-required): The source image ID of an image that has been previously uploaded to Picsart or the result image ID from a different API.
* **Upscale Factor** - (number, required): Select one of the available upscale factors. The options are: 2, 4, 6, 8.
* **Format** - (string, optional, defaults to `JPG`): The output image format; supported values include: `JPG`, `PNG`, and `WEBP`.

❗Note: Only one field should be filled at a time: **Image**, **Image URL**, or **Image ID**.

#### Output Metadata

* **status** - (string): The result of the operation.
* **data** - (object): File information, containing the following fields:
  * **url** - (string): The URL of the resulting file.
  * **id** - (string): The unique identifier of this file in Picsart.

If the **Download result** checkbox is checked, an additional field will be included:
* **attachmentUrl** - (string): The URL of the resulting file stored internally.
