---
title: XML Use Case
layout: component
description: An example for a better understanding of how the XML component works.
icon: xml.png
icontext: XML component
category: xml
ComponentVersion: 1.4.0
updatedDate: 2023-06-09
---

## Client use case

Many organizations use XML files because they are extendable, readable and understandable but it is difficult to code. Imagine a restaurant that uses XML files containing breakfast menus. The integration flow must calculate business statistics that can be used in accounting and data analytics. XML component could transform format to JSON which can be modified and transformed back again. JSON is simple and easy to use with its hierarchical structure. JSON functions can do all necessary calculations. As an output, there will be a string with results which will be converted to XML. Let's start with our flow.

<details close markdown="block"><summary><strong>Flow view</strong></summary>

{% include img.html max-width="50%" url="img/flow-view.png" title="Flow view" %}

</details>

### Step 1 - Webhook

In the first step we will use the [Webhook](/components/webhook) component which receives **XML**.

{% include img.html max-width="100%" url="img/post-webhook.png" title="Post webhook" %}

**XML** body sent to Webhook which contains the restaurant menu:

<details close markdown="block"><summary><strong>XML body</strong></summary>

```xml
<breakfast_menu_july>
<food>
<name>Belgian Waffles</name>
<price>5.95</price>
<description>Two of our famous Belgian Waffles with plenty of real maple syrup</description>
<orders>65</orders>
</food>
<food>
<name>Strawberry Belgian Waffles</name>
<price>7.95</price>
<description>Light Belgian waffles covered with strawberries and whipped cream</description>
<orders>32</orders>
</food>
<food>
<name>Berry-Berry Belgian Waffles</name>
<price>8.95</price>
<description>Light Belgian waffles covered with an assortment of fresh berries and whipped cream</description>
<orders>43</orders>
</food>
<food>
<name>French Toast</name>
<price>4.50</price>
<description>Thick slices made from our homemade sourdough bread</description>
<orders>60</orders>
</food>
<food>
<name>Homestyle Breakfast</name>
<price>6.95</price>
<description>Two eggs, bacon or sausage, toast, and our ever-popular hash browns</description>
<orders>95</orders>
</food>
</breakfast_menu_july>
```

</details>

### Step 2 - XML

The second step is XML component with **XML to JSON** action and sample retrieved from the [Webhook](/components/webhook/) from the first step.

{% include img.html max-width="100%" url="img/xml-to-json-step-2.png" title="XML to JSON" %}

### Step 3 - XML

In the third step we are using XML component again, this time **JSON to XML** action. There is no need to use [Jsonata component](/components/jsonata/) because JSON can be put into the **JSON to convert*** field in the Mapping. Upload XML as file to attachments is enabled.

{% include img.html max-width="100%" url="img/json-to-xml-step-3.png" title="JSON to XML" %}

Now let's take a closer look at XML configuration with **JSON to XML** action. To calculate the sales statistics we need to convert string-numbers to numbers and then use JSONata functions:

<details close markdown="block"><summary><strong>JSON to convert field</strong></summary>

    ```
    {
    "breakfast_menu_july": {
    "sales": {
    "orders": $sum([$getPassthrough()."step_2".body."breakfast_menu_july".food[].orders].$number()),
    "profit": $sum([$getPassthrough()."step_2".body."breakfast_menu_july".food[]].($number($.price)*$number($.orders)))
    }
    }
    }
    ```

</details>

### Step 4 - E-Mail

Our last step will be the [E-Mail](/components/email/) component with an XML file as an **attachment** to see the output file with the results.

{% include img.html max-width="100%" url="img/email-config.png" title="Email Configuration" %}

You can see the E-Mail message with the **attachment** we need:

{% include img.html max-width="50%" url="img/email-attach.png" title="Email with attachment" %}

The XML output will consist of the profit and order numbers for the breakfast menu for the month of July.

<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<breakfast_menu_july>
  <sales>
    <orders>295</orders>
    <profit>1956.25</profit>
  </sales>
</breakfast_menu_july>
```

</details>
