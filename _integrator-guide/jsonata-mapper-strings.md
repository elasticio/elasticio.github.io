---
title: JSONata mapper | Working with strings
layout: article
section: Data transformation
category: data-transformation
order: 1
---

The advanced mode of the [data mapping](mapping-data#using-advanced-mapping-mode)
between integration components on {{site.data.tenant.name}} uses
[JSONata](http://jsonata.org) expressions to transform incoming data into the
necessary outgoing structure for the next component to consume.

**In this article we will dive deeper into the methods of data transformations using
the `string` values.**

Using JSONata expressions we can perform different types of transformations with
`strings` using standard string operators. We can also use more complex string
functions like `$uppercase(str)`, `$lowercase(str)`, `$split(str, separator [, limit])`,
`$joinarray[, separator]` and more.

For the following examples we will assume the following incoming data:

```js
{
  "author":"Mark Twain",
  "fname":"Tom",
  "lname":"Sawyer",
  "email":"tom.sawyer@twaincreations.com",
  "town":"StPetersburg",
  "state":"Missouri"
}
```

To start with a simple example let us combine the parts of the incoming data by
simple concatenation. For example, let us write the title of the book:

```js
"The Adventures of " & fname & " " & lname
```

Here we used the `&` operator to combine the strings into one message:
`The Adventures of Tom Sawyer`.

Now we want to write the same sentence in all caps since it is the title of a book:

```js
$uppercase("The Adventures of " & fname & " " & lname)
```
The result is: `THE ADVENTURES OF TOM SAWYER`.

How about adding a new line and adding the name of the author?

```js
$uppercase("The Adventures of " & fname & " " & lname)
& "\n" & $uppercase("by " & author)
```

And the outcome is:
```
THE ADVENTURES OF TOM SAWYER
BY MARK TWAIN
```

What if we want to get the domain name from the incoming email address
`tom.sawyer@twaincreations.com`? To do that we could write the following JSONata
expression:

```js
$split(email, /[@,.]+/)[2]
```

This expression first takes the value of the `email` field, splits it using the
`@` and `.` characters to build an array with elements containing
`["tom","sawyer","twaincreations","com"]`. Then it takes the domain name value,
which is the element `[2]`, to get the final result of `twaincreations` .

If you noticed the email address domain contains the author's surname. Can we be sure?

```js
$contains(email,$lowercase($split(author,"")[1]))
```

This JSONata expression takes the value of the `author` field, splits it into an
array and takes the surname part (Twain). Then it converts it to lower case and
uses the value (`twain`) to check the `email` field for a presence of a value. The
answer is `true`.

More example of string functions and their implementation is available in
[JSONata documentation pages](http://docs.jsonata.org/string-functions.html).
