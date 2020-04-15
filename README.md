# yarn-plugin-bump

A Yarn 2 plugin for upgrading PnP-mode dependencies easily with a dead-simple command and no waste of interactions.

## Why

- [Dependabot doesn't support Yarn 2 yet.](https://github.com/dependabot/dependabot-core/issues/1297)
- [Renovate doesn't support Yarn 2 yet.](https://github.com/renovatebot/renovate/issues/5230)
- Yarn doesn't have command to bump packages automatically.\
  (Only interactive one)

## Roadmap

These plugins will be used in the very short term while waiting for a better option.

Only essential features would be implemented.

- [x] Package bumping (yarn up is used as it is)
- [x] Package filtering
- [ ] Simple markdown formatting

Advanced features like semver range support and fetching release notes are not planned for now.

But feel free to fork this project, or send an issue about any idea you have.

## Install

```bash
yarn plugin import https://github.com/cometkim/yarn-plugin-bump/releases/download/v0.0.6/plugin-bump.js
```

## How to use

Simple run to upgrade all your dependencies

```bash
yarn bump
```

There's more options to specify the range, See `yarn bump --help`.

```bash
A Yarn 2 plugin to easily upgrade dependencies.

Usage:

$ yarn bump [--exclude #0] [--kind #0] ...

Details:

A Yarn 2 plugin for upgrading PnP-mode dependencies easily with a dead-simple
command and no waste of interactions.

Examples:

Upgrade all dependencies
  $ yarn bump

Upgrade only the lodash package
  $ yarn bump ^lodash$

Upgrade packages match with "^gatsby-*"
  $ yarn bump "^gatsby-*"

Upgrade only exclude react and react-dom
  $ yarn bump --exclude react --exclude react-dom

Upgrade only development dependencies
  $ yarn bump --kind development

Upgrade only production dependencies
  $ yarn bump --kind production
```

## Using the plugin through GitHub action

Example 1. Bumping all dependencies and devDependencies and push it to bump-all branch every saturday.

```yml
on:
  schedule: "0 0 * * 6"

name: Bumping dependencies

jobs:
  bump-all:
    - name: Checkout
      uses: actions/checkout@v2
      with:
        ref: master

    - name: Bump up Yarn 2 dependencies
      uses: cometkim/yarn-plugin-bump@master
      with:
        branch: dependencies/all

    - name: Sync dependency update branch with Pull Request
      uses: vsoch/pull-request-action@1.0.5
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        PULL_REQUEST_FROM_BRANCH: dependencies/all
```
