# Usage of Script

## Description
This script creates a pull request in [elasticio.github.io repository](https://github.com/elasticio/elasticio.github.io) 
See also examples of **circle.ci** configs for:
1. [Java](circle_java.yml)
2. [NodeJs](node_java.yml)

## Environment Variables
| Name                 | Description                                                                              |
|----------------------|------------------------------------------------------------------------------------------|
| DOCS_GITHUB_TOKEN    | Token with a read/write to elasticio.github.io repository                                  |
| DOCS_GITHUB_EMAIL    | Email of a user, this user will be used to create a PR in elasticio.github.io repository     |
| DOCS_GITHUB_USERNAME | Username of a user, this user will be used to create a PR in  elasticio.github.io repository |

## Options
| Option | Mandatory                          | Description                                                                                                                                                                                                                                                                  |
|--------|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| n      | Yes                                | Name of markdown file without extension e.g: utility-component, salesforce-component. You can find out value for ths parameter in [components directory of elasticio.github.io repository](https://github.com/elasticio/elasticio.github.io/tree/master/content/_components) |
| p      | No. Default ouptput of pwd command | Path to project. If running from circle.ci can be safely omitted otherwise you may want to provide path to project                                                                                                                                                           |
#### Examples
1) `bash create_pr.bash -p /path/to/component -n utility-component` - creates docs for utility component. It is assumed that component root is in provided path.
2) `bash create_pr.bash -n salesforce-component` - creates docs for salesforce component. It is assumed that component root is in output of command `pwd`.

## How to use
1) Setup circle.ci for your project
2) Create environment variables described in `Environment Variables` section
3) Open example circle.ci file for [Java](circle_java.yml) or [NodeJs](node_java.yml)
4) Copy paste `docs` job to `jobs` section of your `config.yml` file
5) In step `Create PR` provide correct values for options `n` - **name of target markdown file without extension** and `p` - path to component in system **can be omitted in circle.ci**
6) Copy paste `deploy_docs` workflow to `workflows` section of your `config.yml` file
7) Create environment variable `DOCS_GITHUB_TOKEN` in your circle.ci configs for project with value: token for technical user: `username`  with correct rights to push into [elasticio.github.io repository](https://github.com/elasticio/elasticio.github.io). Can be found in Bitwarden.

## How it works
1) Clones the repository [elasticio.github.io repository](https://github.com/elasticio/elasticio.github.io) locally
2) Creates a branch with the name: `docs-update-$project_name-$current_time` where is: $project_name - provided name in option `n`, $current_time - epoch time.
3) Switches to the created branch
4) Copies the README.md file from provided in option `p` path.  If the option is not provided, the default value is an output of `pwd` command
5) Replaces a content of `/content/_components/$project_name.md` with a content of README.md from the previous step.
6) Creates a default header with the following information(title, layout, section) in an updated file
7) Commits and pushes the changes to the [elasticio.github.io repository](https://github.com/elasticio/elasticio.github.io)
8) Using GitHub API creates a pull request into the master with the title: `Updating docs for the component: $project_name`

## Limitations
Components that have complex structure of documentation, not supported yet:
1) aws-s3
2) batch
3) jdbc
4) sap-bydesign
5) simple-trigger
6) zip
Value for `section` header must be added manually, in current version its populated with: `PLACEHOLDER`
