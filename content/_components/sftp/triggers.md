---
title: SFTP triggers
layout: component
description: SFTP component triggers.
icon: sftp.png
icontext: SFTP component
category: sftp
updatedDate: 2022-11-04
ComponentVersion: 1.6.0
---

## Poll Files

Triggers to get all new and updated files since last polling.

> **Plesae Note:** To gain a better understanding of the functionality provided by Poll Files trigger, we recommend checking out our [example article](/components/sftp/usage-example#poll-files). It provides a detailed walkthrough of how to use Poll Files trigger effectively, which will assist you in working with it.

### Configuration Fields

* **Directory** - (string, required): The directory of the files to read from
* **Emit Behaviour** - (dropdown, optional): Defines the way result objects will be emitted, defaults to `Emit individually`
    * **Fetch All** - All objects will be emitted as array in one object with key `results`
    * **Emit Individually** - Each object will be emitted separately filling the entire message
* **Start Time** - (string, optional): Start datetime of polling, defaults to`-271821-04-20T00:00:00.000Z`
* **End Time** - (string, optional): End datetime of polling, defaults to `+275760-09-13T00:00:00.000Z`
* **Pattern** - (string, optional): Regex pattern for file names. If no pattern is given, no matching is done

### Output Metadata

* **filename** - (string, required): File Name
* **size** - (number, required): File Size
* **type** - (string, required): File Type
* **modifyTime** - (string, required): Last Modification Time
* **accessTime** - (string, required): Last Access Time
* **directory** - (string, required): Directory
* **path** - (string, required): Full Path

### Known limitations

* Trigger mechanism is based on SFTP file `modifyTime` metadata field. For correct processing the trigger requires correct time configuration on the SFTP server.

## Read files(Deprecated)

>**Please Note:** This trigger is deprecated, please use Poll Files trigger instead

Will continuously poll remote SFTP location for files that match given pattern. Found files will be transferred as attachments to the next component

After a file is found:
 * It is moved to the (hidden) directory `.elasticio_processed` and to name of the file will be added timestamp, ex.: file `test.txt` will be renamed to `test.txt_1657621889133`
 * It is pulled and uploaded (streamed) to the attachment storage

>**Please Note:** you may need to consider cleaning up the `.elasticio_processed` directory manually

### Configuration Fields

* **Directory** - (string, required): The directory of the files to read from
* **Pattern** - (string, optional): Regex pattern for file names. If no pattern is given, no matching is done.

### Input Metadata

There is no Input Metadata

### Output Metadata

* **filename** - (string, required): Name of the file
* **size** - (number, required): File size
