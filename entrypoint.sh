#!/bin/bash

set -uo pipefail

if [[ -z "$GITHUB_TOKEN" ]]; then
    echo '$GITHUB_TOKEN must be provided'
    exit 1
fi

git config --local user.name "$GIT_USERNAME"
git config --local user.email "$GIT_EMAIL"

git remote set-url origin "https://:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"

# Checkout the target branch
git fetch origin
git checkout -b "$GIT_BRANCH" "origin/$GIT_BRANCH" 2>/dev/null || git checkout -b "$GIT_BRANCH" "origin/$GIT_BASE_REF"

# Rebase
git rebase -X theirs "origin/$GIT_BASE_REF"

# Checking if the command pre-installed
yarn bump --help >/dev/null 2>&1
if [[ $? -ne 0 ]]; then
  echo "Download plugin from $PLUGIN_SOURCE..."
  local ARTIFACT_URL="${PLUGIN_SOURCE}/releases/download/v${PLUGIN_VERSION}/plugin-bump_ubuntu-latest.js"
  yarn plugin import "$ARTIFACT_URL"
fi

yarn bump $@

# Commit & force-push updates
git commit -a -m "$GIT_COMMIT_MSG"
git push -uf origin "HEAD:$GIT_BRANCH"
