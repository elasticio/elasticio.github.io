---
title: Web service access setup
layout: component
category: sap-byDesign
description: Web Service consuming from SAP Business ByDesign
icon: sapbydesign.png
icontext: SAP ByDesign component
createdDate: 2019-06-06
updatedDate: 2019-11-06
---

This document will guide you to get access to Web Service consuming from SAP Business ByDesign.

## Creating user

First we need to create a user for web services communication:

1.  Open your SAP instance (`https://myXXXXXX.sapbydesign.com`), log in as admin user and navigate to *New Service Agent* menu ![New service agent menu](img/new-service-agent1.png)  ![New service agent page](img/new-service-agent2.png).
2.  Fill all the required fields out and Save. Right after saving click *Request User* ![Enter the values](img/new-service-agent3.png).
3.  Navigate to Application and User Management -> Business Users. Choose your new requested user and edit Attributes and Access Rights. You should generate and save a new password for the user. ![Generate password](img/new-service-agent4.png) ![application and user management page](img/new-service-agent5.png) In the Access Right edit session assign all the needed rights under the *Work Center and View Assignment* tab ![Edit access rights page](img/new-service-agent6.png) This user's login and password should be used for authentication in the {{site.data.tenant.name}} SAP ByDesign component.

## Setting communication

Now we need to setup the communication system for the web services interactions:

1.  First you need to create a new communication system ![Creating new communication](img/communication-setup1.png) ![filling up the form](img/communication-setup2.png) And set it as active (Actions -> Set to Active)
2.  Next create a new Communication Scenario and check needed operations as Added ![Creating new communication Scenario](img/communication-setup3.png)
3.  You have to create a new communication arrangement if you don´t have any in your system. (Jump to the next step if you have) ![Creating new communication arrangement](img/communication-setup4.png) ![Choosing the arrangement](img/communication-setup5.png)
4.  If you already have or created one, choose the communication arrangement you created and click on *Edit* and open *Technical Data* tab. Click on *Edit Advanced Settings*. There you can download `WSDL`. ![Navigate to technical data](img/communication-setup6.png) ![Click to download](img/communication-setup7.png)
