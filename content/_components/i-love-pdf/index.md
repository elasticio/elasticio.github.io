---
title: iLovePDF component
layout: component
section: Office components
description: The iLovePDF component is designed to connect to the iLovePDF API. 
icon: i-love-pdf.png
icontext: iLovePDF component
category: i-love-pdf
ComponentVersion: 1.0.1
updatedDate: 2025-09-18
---

## Table of Contents

* [Description](#description)
* [Credentials](#credentials)
* [Actions](#actions)
  * [Execute File Action](#execute-file-action)
  * [Make Raw Request](#make-raw-request)

## Description

The iLovePDF component is designed to connect to the [iLovePDF API](https://www.iloveapi.com/docs/api-reference#introduction). It enables users to process PDF files with various operations such as merging, compressing, rotating, and more.

## Credentials

To use this component, follow these steps:

1. Create an [iLoveAPI account](https://www.iloveapi.com/signup) or [sign in](https://www.iloveapi.com/login).
2. Navigate to the [API keys page](https://www.iloveapi.com/user/projects) and copy `Public key` from the default project or create a new one pressing `Add new project`.
3. Save your API key securely and do not share it.

* **Public API Key** (string, required) - The iLovePDF API key generated as described above.

## Actions
  
### Execute File Action

Allows you to process a file using one of ILovePDF's supported tools (e.g., merge, compress, rotate, extract, etc.). It handles file uploads, processing, and downloading the modified file.

#### Configuration Fields

* **Tool** (dropdown, required) - The operation to perform (e.g., merge, compress, rotate, etc.)

#### Input Metadata

* **File URL** - (required, string): URL of the file. The URL can point to either internal or external public storage.
* **Original filename** - (required, string): A full name of the original file you want to convert, including the file extension (e.g., document.pdf).
* **Rotate** - (optional, number): Rotation to apply before process. Accepted values: 0, 90, 180, 270. Defaults to 0.
* **Password** - (optional, string): Password to open the file in case of having one.
* **PDF Metadata** - (optional, array): Optional metadata information for the PDF file.
<details close markdown="block"><summary><strong>The full list of possible metadata fields</strong></summary>
```json
{
    "items": {
      "type": "object",
      "properties": {
        "Title": {
          "type": "string",
          "title": "Title",
          "help": {
            "description": "The title of the document."
          }
        },
        "Author": {
          "type": "string",
          "title": "Author",
          "help": {
            "description": "The name of the person who created the document."
          }
        },
        "Subject": {
          "type": "string",
          "title": "Subject",
          "help": {
            "description": "The subject of the document."
          }
        },
        "Keywords": {
          "type": "string",
          "title": "Keywords",
          "help": {
            "description": "Keywords associated with the document."
          }
        },
        "Creator": {
          "type": "string",
          "title": "Creator",
          "help": {
            "description": "The application that created the original document before conversion to PDF."
          }
        },
        "Producer": {
          "type": "string",
          "title": "Producer",
          "help": {
            "description": "The application that converted the document to PDF."
          }
        },
        "CreationDate": {
          "type": "string",
          "title": "Creation Date",
          "help": {
            "description": "The date and time the document was created, in human-readable form."
          }
        },
        "ModDate": {
          "type": "string",
          "title": "Modification Date",
          "help": {
            "description": "The date and time the document was most recently modified, in human-readable form."
          }
        },
        "Trapped": {
          "type": "string",
          "title": "Trapped",
          "enum": ["true", "false", "unknown"],
          "help": {
            "description": "Indicates whether the document includes trapping information."
          }
        }
      }
    }
  }
```
</details>

Please refer to the Input Schema file for the full list of metadata fields for each operation.

<details close markdown="block"><summary><strong>Input Schema file</strong></summary>
```json
{
    "compress": {
      "type": "object",
      "properties": {
        "compression_level": {
          "type": "string",
          "title": "Compression level",
          "enum": ["extreme", "recommended", "low"],
          "help": {
            "description": "Defaults to recommended"
          }
        }
      }
    },
    "extract": {
      "type": "object",
      "properties": {
        "detailed": {
          "type": "boolean",
          "title": "Detailed?",
          "help": {
            "description": "Includes the following PDF properties separated by a comma: PageNo, XPos, YPos, Width, FontName, FontSize, Length and Text"
          }
        }
    }
    },
    "htmlpdf": {
      "type": "object", 
      "properties": {}
    },
    "imagepdf": {
      "type": "object",
      "properties": {
        "orientation": {
          "type": "string",
          "title": "Orientation",
          "enum": ["portrait", "landscape"],
          "help": {
            "description": "Defaults to portrait"
          }
        },
        "margin": {
          "type": "number",
          "title": "Margin",
          "help": {
            "description": "Define a margin in pixels for the image in the output PDF. Defaults to 0"
          }
        },
        "pagesize": {
          "type": "string",
          "title": "Page size",
          "enum": ["fit", "A4", "letter"],
          "help": {
            "description": "Page size of the output PDF. Defaults to fit (PDF page is the same size of image)"
          }
        },
        "merge_after": {
          "type": "boolean",
          "title": "Merge after?",
          "help": {
            "description": "Serve all converted images in an unique PDF if true. If false, serve every image into a separate PDF. Defaults to true"
          }
        }
      }
    },
    "merge": {
      "type": "object", 
      "properties": {}
    },
    "officepdf": {
      "type": "object", 
      "properties": {}
    },
    "pagenumber": {
      "type": "object",
      "properties": {
        "facing_pages": {
          "type": "boolean",
          "title": "Facing pages?",
          "help": {
            "description": "Define it to true if the PDF is in facing page mode. Defaults to false"
          }
        },
        "first_cover": {
          "type": "boolean",
          "title": "First cover?",
          "help": {
            "description": "If the first page is a cover page, it will not be numbered. Defaults to false"
          }
        },
        "pages": {
          "type": "string",
          "title": "Pages",
          "help": {
            "description": "Pages to be numbered. Accepted formats: 'all', '3-end', '1,3,4-9', '-2-end', '3-234'. Defaults to 'all'"
          }
        },
        "starting_number": {
          "type": "number",
          "title": "Starting number",
          "help": {
            "description": "Start page numbering with this number. Defaults to 1"
          }
        },
        "vertical_position": {
          "type": "string",
          "title": "Vertical position",
          "enum": ["top", "bottom"],
          "help": {
            "description": "Define if page number will be at top or bottom. Accepted values: bottom, top. Defaults to bottom"
          }
        },
        "horizontal_position": {
          "type": "string",
          "title": "Horizontal position",
          "enum": ["left", "center", "right"],
          "help": {
            "description": "Allows you to position the number on the left, in the center or on the right of the page. However, if the parameter facing_pages is set to true, facing pages will have their page numbers positioned symmetrically, on the left and the right.Accepted values: left, center, right. Defaults to center"
          }
        },
        "vertical_position_adjustment": {
          "type": "number",
          "title": "Vertical position adjustment",
          "help": {
            "description": "Adjust the number of pixels displaced from the standard vertical_position. It accepts positive and negative values."
          }
        },
        "horizontal_position_adjustment": {
          "type": "number",
          "title": "Horizontal position adjustment",
          "help": {
            "description": "Adjust the number of pixels displaced from the standard horizontal_position. It accepts positive and negative values."
          }
        },
        "font_family": {
          "type": "string",
          "title": "Font family",
          "enum": ["Arial", "Arial Unicode MS", "Verdana", "Courier", "Times New Roman", "Comic Sans MS", "WenQuanYi Zen Hei", "Lohit Marathi"],
          "help": {
            "description": "Defaults to Arial Unicode MS"
          }
        },
        "font_size": {
          "type": "number",
          "title": "Font size",
          "help": {
            "description": "Defaults to 14"
          }
        },
        "font_color": {
          "type": "string",
          "title": "Font color",
          "help": {
            "description": "Hexadecimal color. Defaults to #000000"
          }
        },
        "text": {
          "type": "string",
          "title": "Text",
          "help": {
            "description": "To define text in addition to the number, use {n} for current page number and {p} for total number of pages for the file. Example Page {n} of {p}. If null only the page number will be placed. Defaults to {n}"
          }
        }
      }
    },
    "pdfa": {
      "type": "object",
      "properties": {
        "conformance": {
          "type": "string",
          "title": "Conformance",
          "enum": ["pdfa-1b", "pdfa-1a", "pdfa-2b", "pdfa-2u", "pdfa-2a", "pdfa-3b", "pdfa-3u", "pdfa-3a"],
          "help": {
            "description": "Set the PDF/A conformance level. Defaults to pdfa-2b"
          }
        },
        "allow_downgrade": {
          "type": "boolean",
          "title": "Allow downgrade?",
          "help": {
            "description": "Allows conformance downgrade in case of conversion error. Defaults to true"
          }
        }
      }
    },
    "pdfjpg": {
      "type": "object",
      "properties": {
        "pdfjpg_mode": {
          "type": "string",
          "title": "pdfjpg mode",
          "enum": ["pages", "extract"],
          "help": {
            "description": "Accepted values: pages=Convert every PDF page to a JPG image, extract=extract all PDF's embedded images to separate JPG images. Defaults to pages"
          }
        }
      }
    },
    "pdfocr": {
      "type": "object",
      "properties": {
        "ocr_languages": {
        "type": "array",
        "items": {
          "type": "string",
          "enum": [
            "eng", "afr", "amh", "ara", "asm", "aze", "aze_cyrl", "bel", "ben", "bod", "bos", "bre", "bul", "cat", "ceb", "ces", "chi_sim", "chi_tra", "chr", "cos", "cym", "dan", "deu", "deu_latf", "dzo", "ell", "enm", "epo", "equ", "est", "eus", "fao", "fas", "fil", "fin", "fra", "frm", "fry", "gla", "gle", "glg", "grc", "guj", "hat", "heb", "hin", "hrv", "hun", "hye", "iku", "ind", "isl", "ita", "ita_old", "jav", "jpn", "kan", "kat", "kat_old", "kaz", "khm", "kir", "kmr", "kor", "kor_vert", "lao", "lat", "lav", "lit", "ltz", "mal", "mar", "mkd", "mlt", "mon", "mri", "msa", "mya", "nep", "nld", "nor", "oci", "ori", "pan", "pol", "por", "pus", "que", "ron", "rus", "san", "sin", "slk", "slv", "snd", "spa", "spa_old", "sqi", "srp", "srp_latn", "sun", "swa", "swe", "syr", "tam", "tat", "tel", "tgk", "tgl", "tha", "tir", "ton", "tur", "uig", "ukr", "urd", "uzb", "uzb_cyrl", "vie", "yid", "yor"
          ]
        }
        }
      }
   },
   "protect": {
    "type": "object",
    "properties": {
      "password": {
        "type": "string",
        "title": "Password",
        "required": true,
        "help": {
          "description": "Password with which the PDF file will be encrypted"
        }
      }
    }
  },
  "repair": {
    "type": "object", 
    "properties": {}
  },
  "rotate": {
    "type": "object", 
    "properties": {}
  },
  "split": {
    "type": "object",
    "properties": {
      "split_mode": {
        "type": "string",
        "title": "Split mode",
        "enum": ["ranges", "fixed_range", "remove_pages"],
        "help": {
          "description": "Accepted values: 'ranges' (define different ranges of pages, {ranges} parameter is required), 'fixed_range' (define a fixed range of pages to split the PDF., {fixed_range} parameter is required), 'remove_pages' (remove pages from a PDF, {remove_pages} parameter is required). Defaults to ranges"
        }
      },
      "ranges": {
        "type": "string",
        "title": "Ranges",
        "help": {
          "description": "Page ranges to split the files. Every range will be saved as a different PDF file. Example format: 1,5,10-14"
        }
      },
      "fixed_range": {
        "type": "number",
        "title": "Fixed range",
        "help": {
          "description": "Page ranges to split the files. Every range will be saved as a different PDF file. Defaults to 1"
        }
      },
      "remove_pages": {
        "type": "string",
        "title": "Remove pages",
        "help": {
          "description": "Pages to remove from a PDF. Accepted format: 1,4,8-12,16."
        }
      },
      "merge_after": {
        "type": "boolean",
        "title": "Merge after?",
        "help": {
          "description": "Merge all ranges after being split. This param takes effect only when {mode} is range. Defaults to false"
        }
      }
    }
  },
  "unlock": {
    "type": "object", 
    "properties": {}
  },
  "validatepdfa": {
    "type": "object",
    "properties": {
      "conformance": {
        "type": "string",
        "title": "Conformance",
        "enum": ["pdfa-1b", "pdfa-1a", "pdfa-2b", "pdfa-2u", "pdfa-2a", "pdfa-3b", "pdfa-3u", "pdfa-3a"],
        "help": {
          "description": "Set the PDF/A conformance level. Defaults to pdfa-2b"
        }
      },
      "allow_downgrade": {
        "type": "boolean",
        "title": "Allow downgrade?",
        "help": {
          "description": "Allows conformance downgrade in case of conversion error. Defaults to true"
        }
      }
    }
  },
  "watermark": {
    "type": "object",
    "properties": {
      "mode": {
        "type": "string",
        "title": "Mode",
        "enum": ["image", "text"],
        "help": {
          "description": "The type for the element. Defaults to text"
        }
      },
      "text": {
        "type": "string",
        "title": "Text",
        "help": {
          "description": "The text to stamp, required if mode is text"
        }
      },
      "image": {
        "type": "string",
        "title": "Image URL",
        "help": {
          "description": "The image URL used to stamp, required if mode is image. Do not forget to specify the image file also in the 'Files to Process' section."
        }
      },
      "pages": {
        "type": "string",
        "title": "Pages",
        "help": {
          "description": "Pages to be stamped. Accepted formats: 'all', '3-end', '1,3,4-9', '-2-end', '3-234'. Defaults to all"
        }
      },
      "vertical_position": {
        "title": "Vertical position",
        "enum": ["bottom", "top", "middle"],
        "type": "string",
        "help": {
          "description": "Defaults to middle"
        }
      },
      "horizontal_position": {
        "title": "Horizontal position",
        "enum": ["left", "center", "right"],
        "type": "string",
        "help": {
          "description": "Defaults to center"
        }
      },
      "vertical_position_adjustment": {
        "title": "Vertical position adjustment",
        "type": "number",
        "help": {
          "description": "Adjust the amount of offset pixels from the position defined in vertical_position. It accepts positive and negative values."
        }
      },
      "horizontal_position_adjustment": {
        "title": "Horizontal position adjustment",
        "type": "number",
        "help": {
          "description": "Adjust the amount of offset pixels from the position defined in horizontal_position. It accepts positive and negative values."
        }
      },
      "mosaic": {
        "type": "boolean",
        "title": "Mosaic?",
        "help": {
          "description": "If true, this value overrides all position parameters and stamps the image or text 9 times per page. Defaults to false"
        }
      },
      "rotation": {
        "type": "number",
        "title": "Rotation",
        "help": {
          "description": "Rotation angle (0-360 degrees). Defaults to 0"
        }
      },
      "font_family": {
        "type": "string",
        "title": "Font family",
        "enum": [
          "Arial", "Arial Unicode MS", "Verdana", "Courier", "Times New Roman", 
          "Comic Sans MS", "WenQuanYi Zen Hei", "Lohit Marathi"
        ]
      },
      "font_style": {
        "type": "string",
        "title": "Font style",
        "help": {
          "description": "Defaults to null (Regular/Normal). Possible values: null, 'Bold', 'Italic'"
        }
      },
      "font_size": {
        "type": "number",
        "title": "Font size"
      },
      "font_color": {
        "type": "string",
        "title": "Font color",
        "help": {
          "description": "Hexadecimal color. Defaults to #000000"
        }
      },
      "transparency": {
        "type": "number",
        "title": "Transparency",
        "help": {
          "description": "Percentage of opacity for stamping text or image. Accepted integer range 1-100. Defaults to 100"
        }
      },
      "layer": {
        "type": "number",
        "title": "Layer",
        "enum": ["above", "below"],
        "help": {
          "description": "above=Place stamp over content, below=Place stamp below content. Defaults to above"
        }
      }
    }
  },
  "compressimage": {
    "type": "object",
    "properties": {
      "compression_level": {
        "type": "string",
        "title": "Compression level",
        "required": true,
        "enum": ["extreme", "recommended", "low"],
        "help": {
          "description": "Defaults to recommended"
        }
      }
    }
  },
  "cropimage": {
    "type": "object",
    "properties": {
      "width": {
        "type": "number",
        "title": "Width",
        "required": true,
        "help": {
          "description": "The width in pixels of the area to crop."
        }
      },
      "height": {
        "type": "number",
        "title": "Height",
        "required": true,
        "help": {
          "description": "The height in pixels of the area to crop."
        }
      },
      "x": {
        "type": "number",
        "title": "X",
        "required": true,
        "help": {
          "description": "The horizontal point where start to crop"
        }
      },
      "y": {
        "type": "number",
        "title": "Y",
        "required": true,
        "help": {
          "description": "The vertical point where start to crop"
        }
      }
    }
  },
  "convertimage": {
    "type": "object",
    "properties": {
      "to": {
        "type": "string",
        "title": "To",
        "enum": ["jpg", "png", "gif", "gif_animation", "heic"],
        "help": {
          "description": "The format to convert to. Accepted values are jpg, png, gif, gif_animation (static or animated) and heic. Convert to jpg can be (almost) from any image format. Convert to png and gif can be only from jpg images. Defaults to jpg"
        }
      },
      "gif_time": {
        "type": "number",
        "title": "GIF time",
        "help": {
          "description": "Required if 'To' is gif_animated. Only for gif_animation, define the seconds per image, in hundredths of a second. Defaults to 50"
        }
      },
      "gif_loop": {
        "type": "number",
        "title": "GIF loop",
        "help": {
          "description": "Required if 'To' is gif_animated. Set if animation stops at the end or loops forever. Defaults to true"
        }
      }
    }
  },
  "removebackgroundimage": {
    "type": "object", 
    "properties": {}
  },
  "resizeimage": {
    "type": "object",
    "properties": {
      "resize_mode": {
        "type": "string",
        "title": "Resize mode",
        "enum": ["pixels", "percentage"],
        "help": {
          "description": "Choose the resize mode. Accepted values: 'pixels' (the resize will be set using pixels), 'percentage' (the resize will be set as a percentage of the original image). Defaults to pixels"
        }
      },
      "pixels_width": {
        "type": "number",
        "title": "Pixels width",
        "help": {
          "description": "Required if Resize mode is pixels. The width in pixels of the resized image."
        }
      },
      "pixels_height": {
        "type": "number",
        "title": "Pixels height",
        "help": {
          "description": "Required if Resize mode is pixels. The height in pixels of the resized image."
        }
      },
      "percentage": {
        "type": "number",
        "title": "Percentage",
        "help": {
          "description": "Required if Resize mode is percentage. The percentage value to resize."
        }
      },
      "maintain_ratio": {
        "type": "boolean",
        "title": "Maintain ratio?",
        "help": {
          "description": "If set as true, resize will keep aspect ratio and images will not be distort. Defaults to true"
        }
      },
      "no_enlarge_if_smaller": {
        "type": "boolean",
        "title": "No enlarge if smaller?",
        "help": {
          "description": "Controls if the image can be gigger than the original on resize. Defaults to true"
        }
      }
    }
  },
  "rotateimage": {
    "type": "object", 
    "properties": {}
  },
  "upscaleimage": {
    "type": "object",
    "properties": {
      "multiplier": {
        "type": "number",
        "title": "Multiplier",
        "required": true,
        "help": {
          "description": "Upscale multiplier. Accepted values: 2, 4."
        }
      }
    }
  },
  "watermarkimage": {
    "type": "object",
    "properties": {
      "elements": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "title": "Type",
              "enum": ["image", "text"],
              "help": {
                "description": "The type for the element. Defaults to text"
              }
            },
            "text": {
              "type": "string",
              "title": "Text",
              "help": {
                "description": "The text to stamp, required if type is text"
              }
            },
            "image": {
              "type": "string",
              "title": "Image",
              "help": {
                "description": "The server_filename of the uploaded stamp image (JPG or PNG), required if type is image"
              }
            },
            "gravity": {
              "type": "string",
              "title": "Gravity",
              "enum": [
                "North", "NorthEast", "NorthWest", "Center", "CenterEast", "CenterWest", 
                "East", "West", "South", "SouthEast", "SouthWest"
              ],
              "help": {
                "description": "Defaults to Center"
              }
            },
            "vertical_adjustment_percent": {
              "title": "Vertical adjustment percent",
              "type": "number",
              "help": {
                "description": "Percentage-based vertical position adjustment. Defaults to 0"
              }
            },
            "horizontal_adjustment_percent": {
              "title": "Horizontal adjustment percent",
              "type": "number",
              "help": {
                "description": "Percentage-based horizontal position adjustment. Defaults to 0"
              }
            },
            "rotation": {
              "type": "number",
              "title": "Rotation",
              "help": {
                "description": "Rotation angle (0-360 degrees). Defaults to 0"
              }
            },
            "font_family": {
              "type": "string",
              "title": "Font family",
              "enum": [
                "Arial", "Arial Unicode MS", "Verdana", "Courier", "Times New Roman", 
                "Comic Sans MS", "WenQuanYi Zen Hei", "Lohit Marathi"
              ]
            },
            "font_style": {
              "type": "string",
              "title": "Font style",
              "enum": [null, "Bold", "Italic"]
            },
            "font_size": {
              "type": "number",
              "title": "Font size"
            },
            "font_color": {
              "type": "string",
              "title": "Font color"
            },
            "transparency": {
              "type": "number",
              "title": "Transparency",
              "help": {
                "description": "Percentage of opacity for stamping text or image. Accepted integer range 1-100. Defaults to 100"
              }
            },
            "mosaic": {
              "type": "boolean",
              "title": "Mosaic?",
              "help": {
                "description": "If true, this value overrides all position parameters and stamps the image or text 9 times per page. Defaults to false"
              }
            }
          }
        }
      }
    }
  }
}
```
</details>

Here are some input mapping examples for different tools:

🧩 `Merge PDF`

```json
{
  "file_urls": [
    {
      "file_url": "https://example.com/file1.pdf",
      "filename": "file1.pdf"
    },
    {
      "file_url": "https://example.com/file2.pdf",
      "filename": "file2.pdf"
    }
  ]
}
```

🖼 `Watermark PDF`

```json
{
  "mode": "image",
  "image": "https://example.com/stamp.jpg",
  "pages": "1",
  "file_urls": [
    {
      "file_url": "https://example.com/file.pdf",
      "filename": "file.pdf"
    },
    {
      "file_url": "https://example.com/stamp.jpg",
      "filename": "stamp.jpg"
    }
  ]
}
```

✂️ `Split PDF`

```json
{
  "split_mode": "fixed_range",
  "fixed_range": 1,
  "file_urls": [{
    "file_url": "https://example.com/test.pdf",
    "filename": "test.pdf"
  }]
}
```

Note: The output for the `Split PDF` tool will be a URL pointing to a zip archive containing the resulting split files.

#### Output Metadata

* **URL** - (required, string): The URL of the processed file stored in internal storage.

### Make Raw Request

Executes custom request.

#### Configuration Fields

* **Don't throw error on 404 Response** - (optional, boolean): Treat 404 HTTP responses not as error, defaults to `false`.

#### Input Metadata

* **Url** - (string, required): Absolute path or a relative path that comes after `https://api.ilovepdf.com/v1`.
* **Method** - (string, required): HTTP verb to use in the request, one of `GET`, `POST`, `PUT`, `DELETE`.
* **Request Body** - (object, optional): Body of the request to send.

Here are some input mapping examples for raw requests:

`Start request using absolute URL`

```json
{
  "url": "https://api.ilovepdf.com/v1/start/pdfjpg",
  "method": "GET"
}
```

`Upload request using absolute URL (including iLovePDF task server)`

```json
{
  "url": "https://api101.ilovepdf.com/v1/upload",
  "method": "POST",
  "data": {
    "task": "1234567890qabcd",
    "cloud_file": "https://example.com/file.pdf"
  }
}
```

`Start request using relative URL`

```json
{
  "url": "/start/pdfjpg",
  "method": "GET"
}
```

#### Output Metadata

* **Status Code** - (number, required): HTTP status code of the response.
* **HTTP headers** - (object, required): HTTP headers of the response.
* **Response Body** - (object, optional): HTTP response body.