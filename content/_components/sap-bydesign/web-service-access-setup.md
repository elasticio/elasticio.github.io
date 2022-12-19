---
title: Web service access setup
layout: component
description: Web Service consuming from SAP Business ByDesign
icon: sapbydesign.png
icontext: SAP ByDesign component
category: sap-byDesign
updatedDate: 2022-12-16
ComponentVersion: 2.1.4
---

This document will guide you to get access to Web Service consuming from SAP Business ByDesign.

## Creating user for WS communication

**1.** Open your SAP instance (https://myXXXXXX.sapbydesign.com), log in as admin user and navigate to 'New Service Agent' menu

![SAP instance](img/communication-setup1.png)

![New Service Agent menu](img/communication-setup2.png)

**2.** Fill all the required fields out and Save. Right after saving click 'Request User'

![Required fields](img/communication-setup3.png)

**3.** Navigate to Application and User Management -> Business Users. Choose your new requested user and edit Attributes and Access Rights. You should generate and save a new password for the user.

![User Management, Business Users](img/communication-setup4.png)

![Edit Attributes and Access Rights](img/communication-setup5.png)

In the Access Right edit session assign all the needed rights under the 'Work Center and View Assignment' tab

![Work Center and View Assignment tab](img/communication-setup6.png)

This user's login and password should be used for authentication in the {{site.data.tenant.name}} SAP ByD component.

## Setting up communication system for WS interactions

**1.** First you need to create a new communication system

![Communication system](img/communication-setup7.png)

![New communication system](img/new-service-agent1.png)

And set it as active (Actions -> Set to Active)
**2.** Next create a new Communication Scenario and check needed operations as Added.

![Communication Scenario](img/new-service-agent2.png)

**3.** You have to create a new communication arrangement if you don´t have any in your system. (Jump to the next step if you have)

![Communication arrangement](img/new-service-agent3.png)

![Communication arrangement, select Scenario](img/new-service-agent4.png)

**4.** If you already have or created one, choose the communication arrangement you created and click on 'Edit' and open 'Technical Data' tab. Click on 'Edit Advanced Settings'. There you can download WSDL.

![Edit communication arrangement](img/new-service-agent5.png)


![Edit Advanced Settings](img/new-service-agent6.png)
