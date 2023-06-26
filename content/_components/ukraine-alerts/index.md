---
layout: component
title: Ukraine alerts Component
section: Utility components
description: Component to retrieve alerts statuses for Ukraine regions.
icon: ukraine-alerts.png
icontext: Ukraine-alerts Component
category: ukraine-alerts
updatedDate: 2022-06-14
ComponentVersion: 1.0.1
---

{{page.description}}

## Credentials

No credentials needed.

## Triggers

### Get Ukraine Alerts Polling

Polls for alerts statuses for chosen Ukraine regions.

#### Configuration Fields

* **Regions** - (array, required): Array of selected regions to receive statuses.
* **Emit data if no alerts found** - (checkbox, optional): If checked: when no alerts are found empty array will be emitted. Not checked by default.

### Webhook

Subscription for alarms activation and deactivation.

>**Please Note:** To activate subscription you should press `Start Flow` and after flow started - trigger it by pressing on a flow webhook URI:

![Webhook](img/webhook-trigger.png)

#### Configuration Fields

* Regions. A multiselect field where you can specify the regions you want to receive alerts about. The component will only emit alerts in these specific regions.

>**Please Note:** Only parent regions are supported for now. This means that is you want to get alerts in a sub-region `1102` you need to choose a parent region `5`.

```json
{
  "regionId": "5",
  "regionName": "Рівненська область",
  "regionType": "State",
  "regionChildIds": [
    {
      "regionId": "110",
      "regionName": "Вараський район",
      "regionType": "District",
      "regionChildIds": [
        {
          "regionId": "1102",
          "regionName": "Антонівська територіальна громада",
          "regionType": "Community"
        }
      ]
    }
  ]
}

```

All regions of Ukraine with the corresponding IDs are listed here:

<details close markdown="block"><summary><strong>Click to expand</strong></summary>

```
{
  "3": "Хмельницька область (Khmelnytsky region)",
  "4": "Вінницька область (Vinnytsia region)",
  "5": "Рівненська область (Rivne region)",
  "8": "Волинська область (Volyn region)",
  "9": "Дніпропетровська область (Dnipropetrovsk region)",
  "10": "Житомирська область (Zhytomyr region)",
  "11": "Закарпатська область (Zakarpattia region)",
  "12": "Запорізька область (Zaporizhzhya region)",
  "13": "Івано-Франківська область (Ivano-Frankivsk region)",
  "14": "Київська область (Kyiv region)",
  "15": "Кіровоградська область (Kirovohrad region)",
  "16": "Луганська область (Luhansk region)",
  "17": "Миколаївська область (Mykolaiv region)",
  "18": "Одеська область (Odesa region)",
  "19": "Полтавська область (Poltava region)",
  "20": "Сумська область (Sumy region)",
  "21": "Тернопільська область (Ternopil region)",
  "22": "Харківська область (Kharkiv region)",
  "23": "Херсонська область (Kherson region)",
  "24": "Черкаська область (Cherkasy region)",
  "25": "Чернігівська область (Chernihiv region)",
  "26": "Чернівецька область (Chernivtsi region)",
  "27": "Львівська область (Lviv region)",
  "28": "Донецька область (Donetsk region)",
  "31": "м. Київ (Kyiv city)"
}
```

</details>

## Actions

There is no actions in this component.
