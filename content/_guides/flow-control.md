---
title: Flow Control
description: This document provides basic information on flow control and differences between dynamic and static flow control.
layout: article
section: Data transfer
category: data-transfer
order: 5
---

## Introduction

Our platform designed to connect a variety of applications and systems. The platform uses dynamic and static flow control to manage the flow of data between connected applications and systems. Understanding the differences between these two methods of flow control is important to ensure efficient, reliable, and scalable data integration.

## Static Flow Control

Static flow control involves setting a fixed rate of data transfer between applications, regardless of their current performance or capacity. While static flow control can be useful in situations where the performance of the applications and network is predictable and stable, it can lead to problems if the data flow rate is set too high or too low. Static flow control can cause data loss, latency issues, or other problems if the rate of data flow is not adjusted based on real-time feedback from each application.

## Dynamic Flow Control

Dynamic flow control, on the other hand, is a method of adjusting the rate of data transfer between applications based on real-time feedback from each endpoint. In our platform dynamic flow control involves using algorithms to calculate the optimal data flow rate based on factors such as network latency, processing speed, and available resources. This rate can be adjusted in real-time as conditions change, ensuring that data integration remains efficient and reliable. Dynamic flow control is essential in complex IT environments where the performance and capacity of applications and network conditions can change rapidly.

>**Please note:** If your component is written in Java then you can now disable the dynamic flow control in the step by setting the `AMQP_PUBLISH_CONFIRM_ENABLED` environment variable in the component repository as false. This is only possible if your component is using the Java sailor version 3.3.5.
