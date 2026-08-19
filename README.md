# elastic.io Documentation
![](https://github.com/elasticio/splitter-component/blob/master/elastic.io%20Logo%20pure-01.png)


This repository contains the documentation of the elastic.io iPaaS platform. Visit
the [doc.elastic.io](https://docs.elastic.io) to see it live.

*   [Contributing](#contributing)
*   [White-labeling](#white-labeling)
*   [Search](#search)
*   [Testing locally](#testing-locally)

## Contributing
Contributions are welcome. If you create a pull request with some changes, we will review and incorporate as appropriate.

## Style Guidelines
* In order to maximize re-use for white-label customers who run elastic.io software under a different brand, it is important to use the handlebars replacements when appropriate. For example, instead of referencing `elastic.io` within a document, `{{site.data.tenant.name}}` should be used instead. [A full list of substitution values can be found here.](_data/tenant.yml)
* All git commits should have meaningful messages. Related commits should be combined into a single commit.
* Commits should be ideally be scoped to a single feature as much as possible.

## White-labeling
*(Follow the instructions in this section if you wish to set up a white-labeled copy of the documentation.)*

To provide a white-labeled documentation to your customers, please follow the
following steps:

1. Fork this repository
2. Customize [variables](_data/tenant.yml) used in documentation pages
3. Customize the [styles](./assets/css/common.css)
4.  Customize `CNAME` file (OPTIONAL: This is only required if documentation hosted on GitHub, but not necessary if documentation hosted on servers)
5. DO NOT edit any content to avoid merging conflicts
6. Pull changes from the original repository regularly so that your docs are up-to-date

## Search

The documentation uses a local client-side search.

Jekyll generates the search index at:

`/assets/js/search-data.json`

The index is regenerated automatically whenever the documentation site is built:

```bash
bundle exec jekyll build

## Testing locally

If you don't have the `jekyll/jekyll` Docker image on your machine yet,
install it once.

```sh
docker pull jekyll/jekyll
```

Once you have `jekyll/jekyll` image locally, execute the following
command from the root folder of this repo:

```sh
./start.sh
```

If you are on a Windows machine just copy the command from the
[start.sh](./start.sh) file and adjust it with Windows specific commands.

If your see the following output in the terminal, the docs are up and running:

```sh
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
 ```

The docs are available now at [http://localhost:4000/](http://localhost:4000/).
