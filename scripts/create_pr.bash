#!/bin/bash

path=$(pwd)
while getopts ":p:n:" opt; do
  case $opt in
    p) path="$OPTARG"
    ;;
    n) project_name="$OPTARG"
    ;;
    \?) echo "Invalid option -$OPTARG" >&2
    ;;
  esac
done

repo="https://$DOCS_GITHUB_TOKEN@github.com/elasticio/elasticio.github.io"
repo_name='elasticio.github.io'
current_time=$(date +'%s')
branch_name=docs-update-$project_name-$current_time
email="$DOCS_GITHUB_EMAIL"
username="$DOCS_GITHUB_USERNAME"

git config --global credential.helper store
git config --global user.email $email
git config --global user.name $username
git clone $repo $HOME/$repo_name
cd $HOME/$repo_name || exit
git checkout -b $branch_name
cp $path/README.md $HOME/$repo_name/content/_components/$project_name.md
content="---
title: $project_name
layout: article
section: PLACEHOLDER
---
---
"
echo "$content" | cat - $HOME/$repo_name/content/_components/$project_name.md > temp && mv temp $HOME/$repo_name/content/_components/$project_name.md
git add $HOME/$repo_name/content/_components/$project_name.md
git commit -m "Update docs for component: $project_name"
git push -q --repo $repo --set-upstream  origin $branch_name

json_template='{"title":"%s", "head":"%s", "base":"master"}'
payload=$(printf "$json_template" "Updating docs for the component: $project_name" "$branch_name")
echo  https://api.github.com/repos/elasticio/$repo_name/pulls
curl -u $username:$DOCS_GITHUB_TOKEN --data "$payload" https://api.github.com/repos/elasticio/$repo_name/pulls
