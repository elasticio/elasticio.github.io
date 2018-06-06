# White-labeling the docs

This project is a documentation for the elastic.io platform. In order to provide a white-labeled documentation to your customers, please follow the following steps: 


1. Fork this repository
2. Customize [variables](_data/tenant.yml) used in documentation pages
3. Customize the [styles](./assets/css/common.css)
4. Customize your [Algolia](https://www.algolia.com/) configuration in the [_config.yml](./_config.yml) file (application_id, index_name and search_only_api_key) or delete them if you don't need search
5. Customize CNAME file.
6. DO NOT edit any content to avoid merging conflicts
7. Pull changes from the original repository regularly so that your docs are up-to-date

# How to create Algolia configuration 

1. [Sign-up](https://www.algolia.com/users/sign_up) or [sign-in](https://www.algolia.com/users/sign_in) 
2. Go to “Indices” section and add new index:
![algolia2](https://user-images.githubusercontent.com/36419533/41036629-59584f76-6999-11e8-99d9-cb04a49612dd.png)
3. Here is your `index_name`:
![algolia3](https://user-images.githubusercontent.com/36419533/41036633-5ec96c60-6999-11e8-8af3-3a2cd26f5933.png)
4. Find `application_id` and `search_only_api_key` in “API Keys” section:
![algolia4](https://user-images.githubusercontent.com/36419533/41036640-6449c626-6999-11e8-93b7-c5d0ea8ede03.png)


5. Now you can Customize your Algolia configuration in the _config.yml file

# Be aware that “elasticio” is also mentioned in documentation:

 - as password of Petstore Component:
   - /getting-started/credential.html
   - /getting-started/first-flow.html
   - /getting-started/webhooks-flow.html

- as part of terminal command example:
  - /developer-guide/teams-and-repos.html
  - /developer-guide/deploying-component.html

- as example of code:
  - /developer-guide/building-nodejs-component.html
  - /developer-guide/building-java-component.html
  - /references/sailor-compatibility-matrix.html

- as HTTP request body example:
  - /integrator-guide/rest-api-component.html






# Testing locally

If you don't have the ``jekyll/jekyll`` Docker image on your machine yet,
install it once.

````
docker pull jekyll/jekyll
````

Once you have ``jekyll/jekyll`` image locally, execute the following
command from the root folder of this repo:

````
./start.sh
````

If you are on a Windows machine just copy the command from the
[start.sh](./start.sh) file and adjust it with Windows specific commands.

If your see the following output in the terminal, the docs are up and running:

````
No active host found
Error getting IP address: Host is not running
Configuration file: /srv/jekyll/_config.yml
Configuration file: /srv/jekyll/_config.yml
            Source: /srv/jekyll
       Destination: /srv/jekyll/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 0.672 seconds.
 Auto-regeneration: enabled for '/srv/jekyll'
Configuration file: /srv/jekyll/_config.yml
    Server address: http://0.0.0.0:4000/
  Server running... press ctrl-c to stop.
 ````

The docs are available now at [http://localhost:4000/](http://localhost:4000/).


# Contributing to the project

1. Fork this repo
2. Write your articles, change existing ones
3. Create a pull request back to this repo
4. Wait for review approval by contributors
5. Enjoy the new docs
