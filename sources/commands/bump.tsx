import React from 'react';
import { Box, render } from 'ink';
import { Command, Usage } from 'clipanion';
import { BaseCommand } from '@yarnpkg/cli';
import {
  Configuration, Project, StreamReport, Cache, Workspace, Descriptor, IdentHash,
} from '@yarnpkg/core';

enum SettingKey {
  LOCKFILE_FILENAME = 'lockfileFilename',
  NPM_REGISTRY_SERVER = 'npmRegistryServer',
}

// TODO
interface Release {

}

// TODO
interface Changelog {
  from: Release;
  to: Release;
}

// TODO
function formatChangelog(changelog: Changelog) {

}

export default class UpCommand extends BaseCommand {
  static usage: Usage = Command.Usage({
    description: '',
    details: '',
    examples: [
      [
        'Check what packages need to be upgrade',
        'yarn bump',
      ],
      [
        'Check update for the lodash package',
        'yarn bump lodash',
      ],
      [
        'Check update for packages match "^gatsby-*"',
        'yarn bump "^gatsby-*"',
      ],
      [
        'Check packages exclude react and react-dom',
        'yarn bump --exclude react --exclude react-dom',
      ],
    ],
  });

  @Command.Rest()
  packages: string[] = [];

  @Command.Array('--exclude')
  exclude: string[] = [];

  getHardDependencies(workspace: Workspace) {
    const dependencies = workspace.manifest.dependencies;
    const devDependencies = workspace.manifest.devDependencies;
    return new Map([...dependencies, ...devDependencies]);
  }

  resolveFullPackageName({scope, name}: Descriptor) {
    return scope ? `@${scope}/${name}` : name;
  }

  @Command.Path('bump')
  async execute(): Promise<number | void> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const {workspace} = await Project.find(configuration, this.context.cwd);

    if (!workspace) {
      throw Error('');
    }

    const hardDependencies = this.getHardDependencies(workspace);

    const packageNames = [...hardDependencies.values()]
      .filter(descriptor => this.resolveFullPackageName(descriptor).match(this.packages.join('|') || null as any))
      .filter(descriptor => !this.resolveFullPackageName(descriptor).match(this.exclude.join('|') || null as any))
      .map(this.resolveFullPackageName);

    render(
      <>
        {packageNames.map(p => <Box key={p}>{p}</Box>)}
      </>
    );
    return 0;
  }
}
