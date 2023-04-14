---
title: XML Use Case
layout: component
description: An example for a better understanding of how the XML component works.
icon: xml.png
icontext: XML component
category: xml
ComponentVersion: 1.3.7
updatedDate: 2022-09-12
---


## Client use case

<details close markdown="block"><summary><strong>Flow view</strong></summary>

{% include img.html max-width="50%" url="img/flow-view.png" title="Flow view" %}

</details>

We have the 1st step [Webhook](/components/webhook) component which receives **XML**.

![**XML** body sent to Webhook](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4db4463e-39fa-46cf-9e07-6192a2d6735f/Untitled.png)

**XML** body sent to Webhook:

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

The 2d step is XML component with **XML to JSON** action and sample retrieved from the [Webhook](/components/webhook/).

![XML Configuration with XML to JSON action](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/862fa9d4-782e-4669-b540-8be39a855dc4/Untitled.png)

The 3d step is XML component with **JSON to XML action**. There is no need to use [Jsonata component](/components/jsonata/) because JSON can be put into the **JSON to convert*** field in the Mapping. Upload XML as file to attachments is enabled.

![XML configuration with [JSON to XML](https://github.com/elasticio/xml-component#json-to-xml) **action**](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/513c2e9e-19a5-4e45-be29-50922edd0318/Untitled.png)

XML configuration with [JSON to XML](https://github.com/elasticio/xml-component#json-to-xml) **action**

To calculate the sales statistics we need to convert string-numbers to numbers and then use JSONata functions.

- **JSON to convert*** field:

<details close markdown="block"><summary><strong>Click to expand for more details</strong></summary>

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

- The 4th and last step will be the [E-Mail](https://github.com/elasticio/email-component) component with an XML file as an **attachment** to see the output file with the results.

![E-Mail configuration with an XML file as an **attachment**](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7a739040-c952-4b15-ba75-97f55b174355/Untitled.png)

E-Mail configuration with an XML file as an **attachment**

![E-Mail message with the **attachment**](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/727c4794-cda5-45ae-8fd3-a700829dd6e6/Untitled.png)

E-Mail message with the **attachment**

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
