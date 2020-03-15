import { Plugin } from '@yarnpkg/core';

import BetterUpCommand from './commands/better-up';

const plugin: Plugin = {
  commands: [
    BetterUpCommand,
  ],
};

export default plugin;
