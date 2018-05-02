# Testing locally

If you don't have ``jekyll/jekyll`` on your machine yet, install it once.

````
docker pull jekyll/jekyll
````

Once you have ``jekyll/jekyll`` image locally, execute the following command from the root folder of this repo:

````
docker run --rm --label=jekyll --volume=$(pwd):/srv/jekyll \
  -it -p $(docker-machine ip `docker-machine active`):4000:4000 \
    jekyll/jekyll jekyll serve
````

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


# Deploying changes

1. Create a separate branch
2. Write your articles, change existing ones
3. Create a pull request into `master` branch
4. Let it review
5. Merge it
6. Enjoy the new docs

