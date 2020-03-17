import { Plugin } from '@yarnpkg/core';

import BumpCommand from './commands/bump';

const plugin: Plugin = {
  commands: [
    BumpCommand,
  ],
};

export default plugin;
