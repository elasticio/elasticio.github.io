---
title: Managing your Teams/Components
description: This article discribes how to structure your work into Git repositories and manage your Teams and Components.
layout: article
section: Developing Components
category: component
order: 1
---

When developing your own [integration components](/getting-started/integration-component) for the {{site.data.tenant.name}} platform, you need to structure your work into Git repositories. Each repository represents an integration component and gets used to push your local code to {{site.data.tenant.name}} remote server. Every push results in a new deployment of the component.

The access to the component repository is restricted to a team the repository belongs to. Each member of the team can change, configure and deploy a component. The team itself belongs to a Contract and so only members of the Contract can be invited to the team.

## Manage developer teams

A developer team controls access to the component repositories belonging to that
team. The team members may collaborate on common integration component in integration projects.

### Creating a developer team

>**Note**: you must have appropriate [permissions](/guides/managing-user-roles-in-a-tenant).

To create a new developer team, navigate to *Developer Teams* and click *Add New Team* button. Then give the team a unique name and click *Save*. Your team has been added to the list:

![Developer Teams - Add New Team button](/assets/img/developer-guide/team-repo/devteam.gif)

>**Note**: you can only use letters, digits, `-` and `_` to name your team.

To access your new team, click *See Details*:

![See Details](/assets/img/developer-guide/team-repo/Screenshot_1.png)

As you can see, you're the only member of the team. To add more developers, click *Invite Developer*:

![Invite Developer](/assets/img/developer-guide/team-repo/Screenshot_2.png)

You will see a list of members **(1)**, which you can choose from. Select the required members and click *Send Invites* **(2)** to invite developers:

![List of members - Send Invites](/assets/img/developer-guide/team-repo/Screenshot_3.png)

As soon as you click *Send Invites*, the selected users become team members.

>**Note,** only members of the same Contract can be invited into this developer team. The list shows all the possible members that can be invited to this current team.


### Delete the developers team

If you need to delete a developer team:
*   You should have the appropriate [permissions](/guides/managing-user-roles-in-a-tenant) and
*   The developer team must contain no integration component.

If the above conditions are true, you can proceed and delete the developer team using [an API call]({{site.data.tenant.apiBaseUri}}/v2/docs/#delete-a-team).


## Manage integration components

Almost every developer has worked with some sort of version control and repository
management. GitHub, one of the most famous code developing and collaborating platforms,
is the most famous for its use of repository practice. We use the same tactics which
give developers complete autonomy to manage their code.

>**Note**: Remind your fellow developers to follow the same procedure and upload
their own unique SSH Key before proceeding further.

### Create a component repository

As mentioned above, each repository represents a component. That's why we use
repository and component terms interchangeably here. Every component resides in
a particular repository.

>**Note**: you must have appropriate [permissions](/guides/managing-user-roles-in-a-tenant) to create repositories.

To create a new repository for your custom Components, click *New Repo* button **(1)**, enter repository name **(2)**, and then click *Save* **(3)**:

![New Repo](/assets/img/developer-guide/team-repo/Screenshot_4.png)

You can now see it in the list of repositories:

![List of repositories](/assets/img/developer-guide/team-repo/Screenshot_5.png)

>**Note:** As with the naming of the teams use letters, digits, `-` and `_` to name your repository.


### Manage the component repository

To manage your repository click on the name to see the following page with details:

![Manage your repository](/assets/img/developer-guide/team-repo/Screenshot_6.png)

#### Repository URL:

This is the URL that you can push the code for deploying the updates.

>**Note:** the cloning of your repositories is not supported. To update the code
push it again to create the next version of it. Please contact our support if
you need the copy of your repository.

#### Environment variables:

You can set all environment variables for this particular repository by following the link. Consult our documentation on How to define environment variables for integration components.

#### Access and visibility:

This feature gives a possibility to set the Component as `Team`, `Tenant` and `Global`:

*   `Team` means the Component is visible and accessible to the current Contract members.
*   `Tenant` means the Component is visible and accessible for entire Tenant.
*   `Global` means the Component is visible and accessible for all Tenants - **can be set only by support**.

#### Build history:

Here is the deployment history of the repository containing:

*   The date of deployment.
*   The version of the repository deployment and the commit ID.
*   Status of the build - green check mark means success. If the deployment failed it will show a red cross.
*   State of the build - showing which build is the default.
*   Log of the deployment - clicking the "View" button will open a pop-out window showing the log of that particular deployment.

## Related links

- [Integration Component Overview](/getting-started/integration-component)
- [Managing user roles in a tenant](/guides/managing-user-roles-in-a-tenant)
- [Delete the developer team]({{site.data.tenant.apiBaseUri}}/v2/docs/#delete-a-team)
