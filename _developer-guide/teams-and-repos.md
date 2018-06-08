---
title: Managing your Teams/Components
layout: article
section: Developing Components
order: 1
---

When developing your own [integration components](/getting-started/integration-component) for the {{site.data.tenant.name}} platform, you need to structure your work into Git repositories. Each repository represents an integration component and gets used to push your local code to {{site.data.tenant.name}} remote server. Every push results in a new deployment of the component.

The access to the component repository is restricted to a team the repository belongs to. Each member of the team can change, configure and deploy a component. The team itself belongs to an organization and so only members of the organization can be invited to the team.

In this guide you can learn how to:
*   **[Manage developer teams](#manage-developer-teams)**
    -   [Create a developer team](#creating-a-developer-team)
    -   [Invite developers into your team](#invite-developers-into-your-team)
    -   [Delete the developers team](#delete-the-developers-team)
*   **[Manage integration components](#manage-integration-components)**
    -   [Create a component repository](#create-a-component-repository)
    -   [Manage the component repository](#manage-the-component-repository)


## Manage developer teams

A developer team controls access to the component repositories belonging to that team. The team members may collaborate on common integration component in integration projects.

### Creating a developer team

To create a new developer team navigate to the Developers section and click on a button **+ Create new team**:

![Creating a team](/assets/img/developer-guide/team-repo/developer-team-create-new.png "Creating a team")

**Please note: use letters, digits, `-` and `_` to name your team. No spaces!**

After creating the team you are automatically becoming the member of that team.

You can proceed to either creating your first repository in this team and push your custom component or you can invite your fellow developers into the same team to collaborate in the development of that particular component.

### Invite developers into your team

To invite your colleagues into your development team to work on the same custom component click **Invite developer** drop-down:

![Invite a team member](/assets/img/developer-guide/team-repo/developer-team-members.png "Invite a team member")

Picture above shows a team with already invited developers and the drop-down menu with a possibility to invite more developers to the team. When you invite a developer to the team they receive an e-mail inviting them to join the team.

**Please note that you can only invite members of the current organisation to this developer team.** The drop-down menu shows all the possible members that can be invited to this current team.

You can skip to the integration component [repository creation section](#manage-integration-components) from here. Otherwise if you need to delete a developer team continue to the next section.

### Delete the developers team

If you need to delete a developer team:
*   You should have organisation admin access role and
*   The developer team must contain no integration component.

If the above conditions are true, you can proceed and delete the developer team using [an API call]({{site.data.tenant.apiBaseUri}}/v2/docs/#delete-a-team).


## Manage integration components

Almost every developer has worked with some sort of version control and repository management. GitHub, one of the most famous code developing and collaborating platforms, is the most famous for its use of repository practice. We use the same tactics which give developers complete autonomy to manage their code.

> Please remind your fellow developers to follow the same procedure and upload their own unique SSH Key before proceeding further.

### Create a component repository

As mentioned above, each repository represents a component. That's why we use repository and component terms interchangeably here. Every component resides in a particular repository. To create a repository click on **New repo** button and input the desired name and press **Create**.

**Please note: As with the naming of the teams use letters, digits, `-` and `_` to name your repository. No spaces!**

![Repository instructions](/assets/img/developer-guide/team-repo/create-repo-instructions.png "Repository instructions")

In this particular example, the name of the repository is `salesforce-acme` and it belongs to the `acme-production` team. This screen shows the further instructions and guidelines on how to proceed further. Here are the necessary steps for the clarity:

1.  Upload SSH key - Please [upload your public SSH key](ssh-keys) here if you haven't uploaded it yet.
2.  Clone our "Hello World" component
```sh
git clone {{site.data.tenant.petStoreSourceNodeJS}} salesforce-acme
cd salesforce-acme
```
3.  Edit code to make your own component. Please read our documentation to learn how to implement your components.
4.  Push your code
```sh
git remote add ipaas acme-production@{{site.data.tenant.gitDomain}}:salesforce-acme.git
git push ipaas master
```

### Manage the component repository

Here is how the main Development page would look like after the deployment of your custom component:

![The deployed component](/assets/img/developer-guide/team-repo/repo-afterpush.png "The deployed component")

To manage your repository click on the name to see the following page with details:

![Component repository setup](/assets/img/developer-guide/team-repo/repo-sucsess.png "Component repository setup")

#### Repository URL:

This is the URL that you can push the code for deploying the updates.

**Please note: the cloning of your repositories is not supported.** To update the code push it again to create the next version of it. Please contact our support if you need the copy of your repository.

#### Environment variables:

You can set all environment variables for this particular repository by following the link. Consult our documentation on How to define environment variables for integration components.

#### Access:

This feature gives a possibility to set the component as Private, Public and Global:

*   Private means accessible to the current team members.
*   Public means accessible for entire tenant.
*   Global means accessible for all tenants.

#### Build history:

Here is the deployment history of the repository containing:

*   The date of deployment
*   the version of the repository deployment and the commit ID.
*   Status of the build - green check mark means success. If the deployment failed it will show a red cross.
*   State of the build - showing which build is the default.
*   Log of the deployment - clicking the "View" button will open a pop-out window showing the log of that particular deployment.
