#!/bin/bash

set -uo pipefail

if [[ -z "$GITHUB_TOKEN" ]]; then
    echo '$GITHUB_TOKEN must be provided'
    exit 1
fi

# Checkout the target branch
git checkout $GIT_BRANCH || git checkout -b $GIT_BRANCH

# Checking if the command pre-installed
yarn bump --help > /dev/null
if [[ $? -ne 0 ]]; then
  yarn import "$PLUGIN_REMOTE"
fi

yarn bump $@ || exit 1

REPOSITORY="https://:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"

git config --local user.name "$GIT_USERNAME"
git config --local user.email "$GIT_EMAIL"
git commit -a -m "$GIT_COMMIT_MSG"

git push $REPOSITORY HEAD:$GIT_BRANCH
