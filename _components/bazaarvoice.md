---
title: Bazaarvoice component
layout: article
section: Utility Components
---

### Description
Bazaarvoice component for the elastic.io platform.

### Credentials
 - apiUri (for Conversations API)
 - apiKey (for Conversations API)
 - curationsApiUri (for Curations API)
 - curationsApiKey (for Curations API)


### Actions

#### Retrieve reviews
in/out metadata can be found at `/lib/schemas/retrieveReviews.{in/out}.json`

##### usage example
input message:
```
{
    "productId": "data-gen-moppq9ekthfzbc6qff3bqokie"
    "limit": 2
}
```
output message:
```
{
	"Limit": 2,
	"Offset": 0,
	"TotalResults": 46,
	"Locale": "en_US",
	"Results": [
		{
			"Id": "19452186",
			"CID": "06ea82a9-7ee4-5584-9db3-37ecb220dca3",
			"SourceClient": "conciergeapidocumentation",
			"LastModeratedTime": "2017-04-17T08:15:01.000+00:00",
			"LastModificationTime": "2017-04-17T08:15:01.000+00:00",
			"ProductId": "data-gen-moppq9ekthfzbc6qff3bqokie",
			"AuthorId": "58f478911803d",
			"ContentLocale": "en_US",
			...
		},
		{
			"Id": "19452183",
			"CID": "8f1c87b6-e31e-5852-949f-da388bba1807",
			"SourceClient": "conciergeapidocumentation",
			"Badges": [
				null
			],
			"BadgesOrder": [
				null
			],
			"LastModeratedTime": "2017-04-17T08:15:01.000+00:00",
			"LastModificationTime": "2017-04-17T08:15:01.000+00:00",
			"ProductId": "data-gen-moppq9ekthfzbc6qff3bqokie",
			"ContextDataValuesOrder": [
				null
			],
			"AuthorId": "58f478579d967",
			"ContentLocale": "en_US",
			...
		}
	],
	"Includes": {}
}
```


#### Submit review
in/out metadata can be found at `/lib/schemas/submitReview.{in/out}.json`

##### usage example
input message:
```
{
	"authorSecurityInformation": {
		"authorIP": "127.0.0.1",
		"authorDeviceFingerprint": "0cto0jqrnfdsoolitatph0g5reoen1du",
		"externalAuthorId": "asdasd",
		"isAuthorAgreedToTermsAndConditions": true
	},
	"productId": "data-gen-moppq9ekthfzbc6qff3bqokie1234",
	"rating": 5,
	"title": "My title",
	"reviewText": "My review textMy review textMy review textMy review textMy review textMy review textMy review textMy review textMy review textMy review text",
	"authorNickname": "user123"
}
```
output message:
```
{
	"Locale": "en_US",
	"Form": [],
	"SubmissionId": "tu10wxc1lcmgh7kozs49bh0iu",
	"TypicalHoursToPost": 72,
	"Data": {},
	"Review": {
		"SendEmailAlertWhenCommented": false,
		"Rating": 5,
		"SubmissionTime": "2018-04-04T15:28:18.152+00:00",
		"ReviewText": "My review textMy review textMy review textMy review textMy review textMy review textMy review textMy review textMy review textMy review text",
		"SubmissionId": null,
		"Title": "My title",
		"IsRecommended": null,
		"TypicalHoursToPost": null,
		"Id": null,
		"SendEmailAlertWhenPublished": false
	},
	"AuthorSubmissionToken": "90a8ecb07d49e47ee6df9bff4b47a18b7573657269643d61736461736426646174653d3230313830343034266d61786167653d37"
}
```


#### Retrieve products
in/out metadata can be found at `/lib/schemas/retrieveProducts.{in/out}.json`

##### usage example
input message:
```
{
	"productsIds": [
		"data-gen-moppq9ekthfzbc6qff3bqokie"
	],
	"limit": null,
	"offset": null,
	"stats": "Questions",
    "searchString": null
}
```
output message:
```
{
	"Limit": 10,
	"Offset": 0,
	"TotalResults": 1,
	"Locale": "en_US",
	"Results": [
		{
			"Description": "Increase your potential to shine with this beautiful Diamond necklace. A 16\" chain holds a White Gold teardrop studded with beautiful and shiny Diamonds. The smooth, shiny\n                bail adds texture and contrast to this piece. Wear alone or complete this look with the matching ring and earrings.",
			"ImageUrl": "http://myshco.com/productImages/teardrop.jpg",
			"Name": "14K White Gold Diamond Teardrop Necklace",
			"Id": "data-gen-moppq9ekthfzbc6qff3bqokie",
			"CategoryId": "data-gen-ejcf7ia6yt7iw82ewnh3dhmyc",
			"Active": false,
			"Disabled": false,
			"ISBNs": [],
			"BrandExternalId": null,
			"QuestionIds": [],
			"ManufacturerPartNumbers": [],
			"FamilyIds": [],
			"EANs": [],
			"StoryIds": [],
			"AttributesOrder": [],
			"ModelNumbers": [],
			"UPCs": [],
			"Brand": {},
			"Attributes": {},
			"ProductPageUrl": null,
			"ReviewIds": [],
			"QAStatistics": {
				"QuestionHelpfulVoteCount": 0,
				"FirstAnswerTime": null,
				"LastQuestionAnswerTime": null,
				"FirstQuestionTime": null,
				"FeaturedAnswerCount": 0,
				"LastAnswerTime": null,
				"TagDistribution": {},
				"ContextDataDistribution": {},
				"TotalAnswerCount": 11,
				"FeaturedQuestionCount": 0,
				"LastQuestionTime": null,
				"QuestionNotHelpfulVoteCount": 0,
				"BestAnswerCount": 0,
				"TagDistributionOrder": [],
				"AnswerHelpfulVoteCount": 0,
				"HelpfulVoteCount": 0,
				"AnswerNotHelpfulVoteCount": 0,
				"TotalQuestionCount": 20,
				"ContextDataDistributionOrder": []
			},
			"TotalQuestionCount": 20,
			"TotalAnswerCount": 11
		}
	],
	"Includes": {}
}
```


#### Retrieve categories
in/out metadata can be found at `/lib/schemas/retrieveCategories.{in/out}.json`

##### usage example
input message:
```
{
	"categoriesIds": [
		"data-gen-t3jxodbtmy8n9fzn1vm88yjec"
	],
	"limit": 2,
	"offset": null
}
```
output message:
```
{
	"Limit": 2,
	"Offset": 0,
	"TotalResults": 1,
	"Locale": "en_US",
	"Results": [
		{
			"Name": "Financial",
			"Id": "data-gen-t3jxodbtmy8n9fzn1vm88yjec",
			"ParentId": "data-gen-hv0nntimw0bvtn3czb4l0k5tn",
			"Active": false,
			"Disabled": false,
			"ImageUrl": null,
			"CategoryPageUrl": null,
			"StoryIds": [],
			"QuestionIds": [],
			"ProductIds": [],
			"Attributes": {},
			"AttributesOrder": []
		}
	],
	"Includes": {}
}
```


#### Retrieve statistics
in/out metadata can be found at `/lib/schemas/retrieveStatistics.{in/out}.json`

There are 2 supported statistic's content types:
 - Reviews
 - NativeReviews

##### usage example
input message:
```
{
	"productsIds": [
		"data-gen-2s9kaf0ugzn0p2flzl73ahuys"
	],
	"statsContentTypes": [
		"Reviews",
		"NativeReviews"
	],
	"contentLocales": [
		"en_US",
		"es_US"
	]
}
```
output message:
```
{
	"Limit": 1,
	"Offset": 0,
	"TotalResults": 1,
	"Locale": "en_US",
	"Results": [
		{
			"ProductStatistics": {
				"ProductId": "data-gen-2s9kaf0ugzn0p2flzl73ahuys",
				"NativeReviewStatistics": {
					"AverageOverallRating": 4.55,
					"TotalReviewCount": 20,
					"OverallRatingRange": 5
				},
				"ReviewStatistics": {
					"AverageOverallRating": 4.55,
					"TotalReviewCount": 20,
					"OverallRatingRange": 5
				}
			}
		}
	],
	"Includes": {}
}
```


#### Retrieve comments
in/out metadata can be found at `/lib/schemas/retrieveComments.{in/out}.json`

##### usage example
input message:
```
{
	"commentId": "338201",
	"reviewId": null,
	"productId": null,
	"limit": null,
	"offset": null,
	"subjectsToInclude": [
		"authors",
		"products",
		"categories"
	],
	"attributes": [
		"ModeratorCodes"
	],
	"excludeFamily": false,
	"locale": "en_US"
}
```
output message:
```
{
	"Limit": 10,
	"Offset": 0,
	"TotalResults": 1,
	"Locale": "en_US",
	"Results": [
		{
			"Id": "338201",
			"CID": "fb2f0b8c-b364-5f01-b1a2-b4b8b1ace006",
			"SourceClient": "conciergeapidocumentation",
			"LastModeratedTime": "2017-01-05T19:22:16.000+00:00",
			"LastModificationTime": "2017-01-05T19:24:52.000+00:00",
			"ReviewId": "16970457",
			"Badges": {
				"Expert": {
					"ContentType": "COMMENT",
					"Id": "Expert",
					"BadgeType": "Rank"
				},
				"Staff": {
					"ContentType": "COMMENT",
					"Id": "Staff",
					"BadgeType": "Affiliation"
				}
			},
			"BadgesOrder": [
				"Expert",
				"Staff"
			],
			"AuthorId": "data-gen-user-poaouvr127us1ijhpafkfacb9",
			"ModeratorCodes": [
				"IMP"
			],
			"UserLocation": "Berkeley, CA",
			"ContentLocale": "en_US",
			"IsFeatured": false,
			"TotalFeedbackCount": 9,
      ...
		}
	],
	"Includes": {
		"Products": {
			"data-gen-3jxhm78sfqfy8tg5qyinqioal": {
				"Description": "This extra-large capacity dryer lets you choose between 8 dry cycles, so you can use the proper settings for your clothes. The auto dry function uses thermostats to tell when\n                your laundry is dry, reducing wear and tear.",
				"ImageUrl": "http://myshco.com/productImages/profile.png",
				"Name": "GE Profile 7.5 Cu. Ft. Colossal Capacity Electric Dryer",
				"Id": "data-gen-3jxhm78sfqfy8tg5qyinqioal",
				"CategoryId": "data-gen-t3jxodbtmy8n9fzn1vm88yjec",
        ...
			}
		},
		"Categories": {
			"data-gen-t3jxodbtmy8n9fzn1vm88yjec": {
				"Name": "Financial",
				"Id": "data-gen-t3jxodbtmy8n9fzn1vm88yjec",
				"ParentId": "data-gen-hv0nntimw0bvtn3czb4l0k5tn",
        ...
			}
		},
		"Authors": {
			"data-gen-user-poaouvr127us1ijhpafkfacb9": {
				"Id": "data-gen-user-poaouvr127us1ijhpafkfacb9",
				"Badges": {
					"Expert": {
						"ContentType": "REVIEWER",
						"Id": "Expert",
						"BadgeType": "Rank"
					},
					"Staff": {
						"ContentType": "REVIEWER",
						"Id": "Staff",
						"BadgeType": "Affiliation"
					}
				},
				"BadgesOrder": [
					"Expert",
					"Staff"
				],
				"ContributorRank": "NONE",
				"UserNickname": "ferdinand255",
				"LastModeratedTime": "2017-01-05T19:22:28.000+00:00",
				"ModerationStatus": "APPROVED",
				"SubmissionTime": "2016-01-06T11:52:00.000+00:00",
        ...
			}
		},
		"ProductsOrder": [
			"data-gen-3jxhm78sfqfy8tg5qyinqioal"
		],
		"AuthorsOrder": [
			"data-gen-user-poaouvr127us1ijhpafkfacb9"
		],
		"CategoriesOrder": [
			"data-gen-t3jxodbtmy8n9fzn1vm88yjec"
		]
	}
}
```

#### Submit question
in/out metadata can be found at `/lib/schemas/submitQuestion.{in/out}.json`

##### usage example
input message:
```
{
	"authorSecurityInformation": {
		"authorIP": "127.0.0.1",
		"authorDeviceFingerprint": "0cto0jqrnfdsoolitatph0g5reoen1du",
		"externalAuthorId": "asdasd",
		"isAuthorAgreedToTermsAndConditions": true,
		"hostedAuthenticationEmail": null,
		"hostedAuthenticationCallbackUrl": null
	},
	"productId": "data-gen-moppq9ekthfzbc6qff3bqokie123456",
	"questionSummary": "what is the capital of great britain?",
	"questionDetails": "asd qwe what is the capital of great britain?",
	"authorNickname": "fredddy123",
	"isUserAnonymous": false,
	"locale": "en_US",
	"userEmail": "asdasdasd@example.com"
}
```
output message:
```
{
	"Locale": "en_US",
	"Form": [],
	"SubmissionId": "u3uy0dhz5qilrirs8tgogqo1u",
	"Question": {
		"QuestionSummary": "what is the capital of great britain?",
		"SubmissionTime": "2018-04-17T11:29:15.002+00:00",
		"SubmissionId": null,
		"SendEmailAlertWhenAnswered": false,
		"TypicalHoursToPost": null,
		"QuestionDetails": "asd qwe what is the capital of great britain?",
		"Id": null,
		"SendEmailAlertWhenPublished": false
	},
	"TypicalHoursToPost": 72,
	"Data": {},
	"AuthorSubmissionToken": "621e1ca874ebadbb9a7db3ff68652e707573657269643d61736461736426646174653d3230313830343137266d61786167653d37"
}
```

#### Submit answer
in/out metadata can be found at `/lib/schemas/submitAnswer.{in/out}.json`

##### usage example
input message:
```
{
	"authorSecurityInformation": {
		"authorIP": "127.0.0.1",
		"authorDeviceFingerprint": "0cto0jqrnfdsoolitatph0g5reoen1du",
		"externalAuthorId": "asdasd",
		"isAuthorAgreedToTermsAndConditions": true,
		"hostedAuthenticationEmail": null,
		"hostedAuthenticationCallbackUrl": null
	},
	"AnswerText": "answer 123123 asdasdqweqwe",
	"QuestionId": "646785",
	"CampaignId": "post-purchase email",
	"Locale": "en_US",
	"SendEmailAlertWhenPublished": false,
	"UserEmail": "asdasdqwe@example.com",
	"UserLocation": "USA",
	"UserNickname": "user123"
}
```

output message:
```
{
	"Locale": "en_US",
	"Answer": {
		"SubmissionTime": "2018-04-17T12:29:40.599+00:00",
		"SubmissionId": null,
		"AnswerText": "answer 123123 asdasdqweqwe",
		"TypicalHoursToPost": null,
		"Id": null,
		"SendEmailAlertWhenPublished": false
	},
	"Form": [],
	"SubmissionId": "egk3w9b6wtt3mgikb58hlay8q",
	"TypicalHoursToPost": 72,
	"Data": {},
	"AuthorSubmissionToken": "621e1ca874ebadbb9a7db3ff68652e707573657269643d61736461736426646174653d3230313830343137266d61786167653d37"
}
```

#### Submit comment
in/out metadata can be found at `/lib/schemas/submitComment.{in/out}.json`

##### usage example
input message:
```
{
	"authorSecurityInformation": {
		"authorIP": "127.0.0.1",
		"authorDeviceFingerprint": "0cto0jqrnfdsoolitatph0g5reoen1du",
		"externalAuthorId": "asdasd",
		"hostedAuthenticationEmail": null,
		"hostedAuthenticationCallbackUrl": null
	},
	"Title": "comment title",
	"CommentText": "comment 123123 asdasdqweqwe",
	"CampaignId": "post-purchase email",
	"Locale": "en_US",
	"ReviewId": "16970607",
	"SendEmailAlertWhenPublished": false,
	"UserEmail": "asdasdqwe@example.com",
	"UserLocation": "USA",
	"UserNickname": "user123"
}
```

output message:
```
{
	"Locale": "en_US",
	"Comment": {
		"SubmissionTime": "2018-04-17T12:44:36.500+00:00",
		"CommentText": "comment 123123 asdasdqweqwe",
		"SubmissionId": null,
		"Title": "comment title",
		"TypicalHoursToPost": null,
		"Id": null,
		"SendEmailAlertWhenPublished": false
	},
	"Form": [],
	"SubmissionId": "etu86zfzwl8676tf2u30w7xnx",
	"TypicalHoursToPost": 72,
	"Data": {},
	"AuthorSubmissionToken": "621e1ca874ebadbb9a7db3ff68652e707573657269643d61736461736426646174653d3230313830343137266d61786167653d37"
}
```

#### Submit photo
in/out metadata can be found at `/lib/schemas/submitPhoto.{in/out}.json`

##### usage example
input message:
```
{
	"authorSecurityInformation": {
		"externalAuthorId": "craiggil"
	},
	"photoUrl": "https://vignette.wikia.nocookie.net/rio/images/9/91/Rio-2-Official-Trailer-3-40.jpg/revision/latest?cb=20131002062355",
	"Locale": "en_US",
	"ContentType": "review"
}
```

output message:
```
{
	"Locale": "en_US",
	"Form": [
		{
			"Type": "Field",
			"Id": "photo"
		}
	],
	"SubmissionId": null,
	"Data": {
		"Fields": {
			"photo": {
				"Options": [],
				"Type": "FileInput",
				"Required": null,
				"Label": null,
				"Value": null,
				"MinLength": null,
				"Id": "photo",
				"MaxLength": null,
				"Default": null
			}
		},
		"Groups": {},
		"FieldsOrder": [
			"photo"
		],
		"GroupsOrder": []
	},
	"Photo": {
		"Sizes": {
			"normal": {
				"Id": "normal",
				"Url": "https://reviews.apitestcustomer.bazaarvoice.com/bvstaging/submit/5555-en_us/ps_amazon_s3_l0r7l2xvmaytb6fph0ubp5u4j/photo.jpg"
			},
			"thumbnail": {
				"Id": "thumbnail",
				"Url": "https://reviews.apitestcustomer.bazaarvoice.com/bvstaging/submit/5555-en_us/ps_amazon_s3_l0r7l2xvmaytb6fph0ubp5u4j/photoThumb.jpg"
			}
		},
		"Id": "l0r7l2xvmaytb6fph0ubp5u4j",
		"SizesOrder": [
			"thumbnail",
			"normal"
		],
		"Caption": null
	},
	"TypicalHoursToPost": null,
	"AuthorSubmissionToken": null
}
```

#### Submit feedback
in/out metadata can be found at `/lib/schemas/submitFeedback.{in/out}.json`

##### usage example
input message:
```
{
	"authorSecurityInformation": {
		"authorIP": "127.0.0.1"
	},
	"ContentId": "21849200",
	"ContentType": "review",
	"FeedbackType": "helpfulness",
	"Vote": "Positive"
}
```

output message:
```
{
	"Locale": "en_US",
	"Feedback": {
		"Helpfulness": {
			"Vote": "POSITIVE",
			"AuthorId": "ztchk5phl7pj0yifdcx8pqhjnw"
		}
	},
	"Form": [],
	"SubmissionId": null,
	"Data": {},
	"TypicalHoursToPost": null,
	"AuthorSubmissionToken": null
}
```

#### Retrieve curations content
in/out metadata can be found at `/lib/schemas/retrieveCurationsContent.{in/out}.json`

source doc: https://developer.bazaarvoice.com/curations-api/reference/curations-3/requesting-contents

##### usage example
input message:
```
{
	"productId": null,
	"client": "branddemo",
	"display": [
		"livebv",
		"roadtriplandingpage"
	],
	"after": null,
	"before": null,
	"limit": 1
}
```

output message:
```
{
	"status": "ok",
	"code": 200,
	"total": 51,
	"results": 1,
	"updates": [
		{
			"data": {
				"links": [],
				"photos": [
					{
						"role": "photo",
						"origin": "instagram",
						"token": "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/17663258_1494744337232078_4902599108461592576_n.jpg",
						"image_service_url": "https://api.bazaarvoice.com/curations/c3/imagingAPI?passkey=kuuqd395w5u7gv43987gxshh&url=https%3A%2F%2Fscontent.cdninstagram.com%2Ft51.2885-15%2Fs640x640%2Fsh0.08%2Fe35%2F17663258_1494744337232078_4902599108461592576_n.jpg&media_type=photo&permalink_url=https%3A%2F%2Fwww.instagram.com%2Fp%2FBShouI-lXQM%2F&client=branddemo&contentId=58e5a15bbe1f2d0100f8b447",
						"url": "https://api.bazaarvoice.com/curations/c3/imagingAPI?passkey=kuuqd395w5u7gv43987gxshh&url=https%3A%2F%2Fscontent.cdninstagram.com%2Ft51.2885-15%2Fs640x640%2Fsh0.08%2Fe35%2F17663258_1494744337232078_4902599108461592576_n.jpg&media_type=photo&permalink_url=https%3A%2F%2Fwww.instagram.com%2Fp%2FBShouI-lXQM%2F&client=branddemo&contentId=58e5a15bbe1f2d0100f8b447",
						"display_url": "https://api.bazaarvoice.com/curations/c3/imagingAPI?passkey=kuuqd395w5u7gv43987gxshh&url=https%3A%2F%2Fscontent.cdninstagram.com%2Ft51.2885-15%2Fs640x640%2Fsh0.08%2Fe35%2F17663258_1494744337232078_4902599108461592576_n.jpg&media_type=photo&permalink_url=https%3A%2F%2Fwww.instagram.com%2Fp%2FBShouI-lXQM%2F&client=branddemo&contentId=58e5a15bbe1f2d0100f8b447"
					}
				],
				"videos": [],
				"tags": [
					"livebv",
					"thesourcecanada",
					"sourcecanada",
					"SpringCampaign"
				],
				"author": {
					"alias": "Remote BV",
					"channel": "instagram",
					"token": "4006361074",
					"avatar": "https://api.bazaarvoice.com/curations/c3/imagingAPI?passkey=kuuqd395w5u7gv43987gxshh&url=https%3A%2F%2Fscontent.cdninstagram.com%2Ft51.2885-19%2Fs150x150%2F14474510_1192702484102493_4504149254335365120_a.jpg&media_type=avatar&permalink_url=https%3A%2F%2Fwww.instagram.com%2Fp%2FBShouI-lXQM%2F&client=branddemo&contentId=58e5a15bbe1f2d0100f8b447",
					"profile": "https://instagram.com/remote_bv"
				},
				"groups": [
					"__all__"
				],
				"sourceClient": "branddemo",
				"classification": "photo",
				"text": "Just another day in the office! #remotebv #livebv",
				"language": "eng",
				"timestamp": 1491442326,
				"token": "1486648444605264908_4006361074",
				"id": "58e5a15bbe1f2d0100f8b447",
				"permalink": "https://www.instagram.com/p/BShouI-lXQM/",
				"productId": "",
				"channel": "instagram",
				"_platform": "c3"
			}
		}
	],
	"productData": {},
	"options": {
		"sourceParameters": {
			"apiversion": "5.4",
			"productId": "",
			"client": "branddemo",
			"display": "livebv,roadtriplandingpage",
			"after": "",
			"before": "",
			"limit": "1",
			"passkey": "r538c65d7d3rsx2265tvzfje"
		},
		"client": "branddemo",
		"limit": 1,
		"productIds": [],
		"offset": 0,
		"display": [
			"livebv"
		],
		"filters": {},
		"featured": 0,
		"sortField": "authoredAt",
		"sortDirection": "desc"
	}
}
```

### Links

Bazaarvoice Conversations API documentation https://developer.bazaarvoice.com/conversations-api

How to retrieve user's device fingerprint https://developer.bazaarvoice.com/conversations-api/tutorials/authenticity#device-fingerprint
