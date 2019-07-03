---
title: Changing Platform Page Metadata
layout: article
section: Tenant Management
order: 1
since: 20190321
---

This document

## Tenant.htmlMeta

You can change the following metadata on the Platform page for SEO or other purposes: description, keywords, author. To change the metadata, add the following attributes to POST /v2/tenants and PATCH /v2/tenants:

```
attributes":{
   "html_meta":{
      "description":"I am a description",
      "keywords":[
         "hotdog",
         "burger",
         "sandwich"
      ],
      "author":"Acme Corporation"
   }
}
```

**EXAMPLE:**

```
curl {{apiBaseUri}}/v2/tenants/{TENANT_ID}\
    -X PATCH \
    -u{
   EMAIL
}:{
   APIKEY
}\
    -H 'Content-Type:application/json' -d '{
   "data":{
      "type":"tenant",
      "attributes":{
         "default_workspace_type":"full",
         "html_meta":{
            "description":"Bla bla bla",
            "keywords":[
               "pizza",
               "skateboard",
               "cowabunga"
            ],
            "author":"TMNT"
         }
      ]
   }
}
}'
```                                 |
