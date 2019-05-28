---
title: Key-value-component component
layout: article
section: Utility Components
---


## Purpose
Main goal of this component is to provide simple possibility to store and retrieve Key:Value pairs.
## How works
Under the hood used MongoDB.
During Action configuration collection need to be specified.
## Requirements
Instance of MongoDB with possibility to connect from component.
### Environment variables
No.
# Credentials
**hostname -**
Hostname or IP address of MongoDB server.

**port -**
Port which is used by your MongoDB server to accept connection. (Default is 27017)

**db -**
Database name that is used to store collections with Key:Values

**user -**
MongoDB username with access to read and write from/to corresponding DB and collection.

**pass -**
Password for specified user.
# Actions
## Store
Inserts Key:Value pair.

### Input fields:

**keyName -** Name of a field where key will be stored

**key -** Value of a key that uniquely identifies Key:Value pair

**valueName -** Name of a field where value will be stored

**value -** Value that will be stored and can be accessed with provided keyName and key

If checkbox **"Update if exists?"** checked then value would be updated if already exists.

Resulting document stored in MongoDb will have following structure:

```
{
    keyName: key,
    valueName: value
}
```

If another valueName will be stored with the same keyName:key it will be added to existing document and result will be:

```
{
    keyName: key,
    valueName: value,
    valueName1: value1
}
```

Result will be:

* If there where no such keyName:key yet:
```
{
  "response": "inserted"
}
```
* If keyName:key already exists but doesn't have valueName provided:
```
{
  "response": "updated"
}
```
 * If such keyName:key and valueName combination already exists and checkbox **"Update if exists?"** checked:
 ```
{
  "response": "updated"
}
```
* If such keyName:key and valueName combination already exists and checkbox **"Update if exists?"** not checked:
 ```
{
  "response": "skipped"
}
```

## Store Batch
Inserts Key:Value pair array.

### Input fields:

**keyName -** Name of a field where key will be stored

**valueName -** Name of a field where value will be stored

**keyValArray -** Array with values

Each value in array is object which have following fields:

**keyValue -** Value of a key that uniquely identifies Key:Value pair

**value -** Value that will be stored and can be accessed with provided keyName

Request example:

```
{
    keyName: "someKeyName",
    valueName: "someValueName",
    keyValArray: [
        {
            keyValue : "someKeyValue1",
            value: "someValue1"
        },
        {
            keyValue : "someKeyValue2",
            value: "someValue2"
        }
    ]
}
```

All provided Key:Vale pairs will be inserted, if key already exist it will be replaced.

Response:

```
{
  "response": "done"
}
```

## Retrieve
Returns value by provided key and Value name if found or provided default value.

### Input fields:

**keyName -** Name of a field where key is stored

**key -** Value of a key that uniquely identifies Key:Value pair

In response document from MongoDB collection will be provided, e.g.:

```
{
    keyName: keyValue,
    valueName: value,
    valueName1: value1
}
```

## Retrieve Batch
Returns  array of values by provided key array.

### Input fields:

**keyName -** Name of a field where key stored

**keyArray -** Array of keyValues

Response format is following:

```
{
  "response": [
    {
      keyName1: key1,
      valueName1: value1
    },
    {
        keyName2: key2,
        valueName2: value2
    }
  ]
}
```

## Remove
Removes Value provided in valueName or all values for specified key if **"Delete all values for this key?"** checkbox checked.



### Input fields:

**keyName -** Name of a field where key stored

**key -** Value of a key that uniquely identifies
Key:Value pair

**valueName -** Name of a field that should be deleted

Response format is following:
```
{
  "result": "done"
}
```
