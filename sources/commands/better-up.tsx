import React from 'react';
import { Box, render } from 'ink';
import { Command, Usage } from 'clipanion';
import { BaseCommand } from '@yarnpkg/cli';
import { Configuration, Project, StreamReport, Cache } from '@yarnpkg/core';

enum SettingKey {
  LOCKFILE_FILENAME = 'lockfileFilename',
  NPM_REGISTRY_SERVER = 'npmRegistryServer',
}

export default class UpCommand extends BaseCommand {
  static usage: Usage = Command.Usage({
    description: ``,
    details: ``,
    examples: [
      [
        'Check what packages need to be upgrade',
        'yarn bump',
      ],
    ],
  });

  @Command.Path('better-up')
  async execute(): Promise<number | void> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const {project, workspace} = await Project.find(configuration, this.context.cwd);
    const cache = await Cache.find(configuration);
    // console.log(configuration);
    // console.log(workspace);
    // workspace?.manifest
    render(
      <Box>Hello world!!</Box>
    );
    return 0;
  }
}
