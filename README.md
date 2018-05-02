# White-labeling the docs

This project is a documentation for the elastic.io platform. In order to
provide a white-labeled documentation to your customers, please follow
the following steps:

1. Fork this repository
2. Customize [variables](_data/tenant.yml) used in documentation pages
3. Customize the [styles](./assets/css/common.css)
4. DO NOT edit any content to avoid merging conflicts
5. Pull changes from the original repository regularly so that your docs
are up-to-date

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

