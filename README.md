# How to contribute

1. Make changes to the documentation contents in the https://github.com/elasticio/docs repo in your branch.
2. Create a PR and go through a review
3. Update the docs submodule in the text Jekyll application 
4. Publishing the content to production

## Updating the docs submodule in the Jekyll application 

The test version of the docs is accessible on http://docs.eio.ninja. In this section we describe how to publish the new docs content to this web site. 

If you are first-time user, do the following steps

1. Clone https://github.com/drobiazko/elasticio.github.io
2. Init the submodule by executing `git submodule update --init`
3. Start your Jekyll app locally if you want to see the docs

If you are returning user, perform the following steps:

1. `git checkout master`
2. `git pull --rebease origin master`
3. `git checkout -b {MY_BRANCH}`
4. Update submodule `git submodule update --update`
5. The last step will create changes to the `docs` folder. Please commit them to your branch
6. `git push origin {MY_BRANCH}`
7. Go to GitHub and create a PR from `MY_BRANCH` to `master`. Please note that you must create a PR to `master` in `drobiazko/elasticio.github.io` repository and not in `elasticio/elasticio.github.io`.
8. Go through review
9. Merge the content to `master`
10. Enjoy the content on http://docs.eio.ninja

## Publishing the docs to production

Please note that the following steps are for the repo https://github.com/elasticio/elasticio.github.io

1. `git checkout master`
2. `git pull --rebease origin master`
3. `git checkout -b {MY_BRANCH}`
4. Update submodule `git submodule update --update`
5. The last step will create changes to the `docs` folder. Please commit them to your branch
6. `git push origin {MY_BRANCH}`
7. Go to GitHub and create a PR from `MY_BRANCH` to `master`. 
8. Go through review
9. Merge the content to `master`
10. Enjoy the content on https://docs.elastic.io

# White-labeling the docs

This project is a documentation for the elastic.io platform. In order to provide a white-labeled documentation to your customers, please follow the following steps: 


1. Fork this repository
2. Customize [variables](_data/tenant.yml) used in documentation pages
3. Customize the [styles](./assets/css/common.css)
4. Customize your [Algolia](https://www.algolia.com/) configuration in the [_config.yml](./_config.yml) file (application_id, index_name and search_only_api_key) or delete them if you don't need search
5. Customize CNAME file (OPTIONAL: This is only required if documentation hosted on GitHub, but not necessary if documentation hosted on servers)
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
