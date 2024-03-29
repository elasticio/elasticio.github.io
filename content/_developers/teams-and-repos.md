---
title: Managing your Teams/Components
description: This article discribes how to structure your work into Git repositories and manage your Teams and Components.
layout: article
section: How-Tos and Tutorials
order: 4
redirect_from:
  - /guides/teams-and-repos.html
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

To access your new team, click on the team name:

![See Details](/assets/img/developer-guide/team-repo/Enter_the_Team.png)

As you can see, you're the only member of the team. To add more developers, click *Invite Developer*:

![Invite Developer](/assets/img/developer-guide/team-repo/Invite_Developer.png)

You will see a list of members **(1)**, which you can choose from. Select the required members and click *Send Invites* **(2)** to invite developers:

![List of members - Send Invites](/assets/img/developer-guide/team-repo/Screenshot_3.png)

As soon as you click *Send Invites*, the selected users become team members.

>**Please Note** that only members of the same Contract can be invited into this developer team. The list shows all the possible members that can be invited to this current team.

### Delete the developers team

If you need to delete a developer team:
*   You should have the appropriate [permissions](/guides/managing-user-roles-in-a-tenant) and
*   The developer team must contain no integration component.

If the above conditions are true, you can proceed and delete the developer team using an API call or via UI. However, the functionality of the endpoints is not limited to these two actions. You can find out more about this in the [API documentation]({{site.data.tenant.apiDocsUri}}/v2#/teams).

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

![New Repo](/assets/img/developer-guide/team-repo/Create_Repo.gif)

You can now see it in the list of repositories:

![List of repositories](/assets/img/developer-guide/team-repo/Repo_List.png)

>**Note:** As with the naming of the teams use letters, digits, `-` and `_` to name your repository.

### Manage the component repository

To manage your repository click on the name to see the following page with details:

![Manage your repository](/assets/img/developer-guide/team-repo/Repo_Details.png)

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

## Managing Environment variables

To add these values as environment variables to the component repository on the platform please select **Developer Teams** on Navigation panel:

![Navigate Developer Teams](/assets/img/developer-guide/team-repo/DevTeams.png)

Then click on your Team:

![Choose your Team](/assets/img/developer-guide/team-repo/Enter_the_team.png)

And find component you need:

![Component you need](/assets/img/developer-guide/team-repo/Enter_the_repo.png)

In the component description you can see Environment variables field where you can configure them:

![Configure here](/assets/img/developer-guide/team-repo/Enter_envar.png)

Here you can create new Environment variables **(1)** or edit **(2)** and delete **(3)** existing one:

![Manage env vars](/assets/img/developer-guide/team-repo/Configuring_Envar.png)

When you create Environment variables, please set name and value and click to **Add**:

![Create env vars](/assets/img/developer-guide/team-repo/CreatingEnvar.gif)

## Related links

- [Integration Component Overview](/getting-started/integration-component)
- [Managing user roles in a tenant](/guides/managing-user-roles-in-a-tenant)
- [Delete the developer team]({{site.data.tenant.apiDocsUri}}/v2#/teams/delete_teams__team_id_)
