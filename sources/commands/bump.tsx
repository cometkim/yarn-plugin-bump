import { Cli, Command, Usage } from 'clipanion';
import { BaseCommand } from '@yarnpkg/cli';
import { Configuration, Project, Workspace, Descriptor } from '@yarnpkg/core';
import Essentials from '@yarnpkg/plugin-essentials';

export default class BumpCommand extends BaseCommand {
  static usage: Usage = Command.Usage({
    description: 'A Yarn 2 plugin to easily upgrade dependencies.',
    details: 'A Yarn 2 plugin for upgrading PnP-mode dependencies easily' +
      ' with a dead-simple command and no waste of interactions.'
    ,
    examples: [
      [
        'Upgrade all dependencies',
        'yarn bump',
      ],
      [
        'Upgrade only the lodash package',
        'yarn bump ^lodash$',
      ],
      [
        'Upgrade packages match with "^gatsby-*"',
        'yarn bump "^gatsby-*"',
      ],
      [
        'Upgrade only exclude react and react-dom',
        'yarn bump --exclude react --exclude react-dom',
      ],
      [
        'Upgrade only development dependencies',
        'yarn bump --kind development',
      ],
      [
        'Upgrade only production dependencies',
        'yarn bump --kind production',
      ],
    ],
  });

  @Command.Rest()
  packages: string[] = [];

  @Command.Array('--exclude')
  exclude: string[] = [];

  @Command.String('--kind')
  dependencyKind: 'development' | 'production' | 'all' = 'all';

  getDependencies(workspace: Workspace) {
    const dependencies = workspace.manifest.dependencies;
    if (this.dependencyKind === 'production') {
      return dependencies;
    }

    const devDependencies = workspace.manifest.devDependencies;
    if (this.dependencyKind === 'development') {
      return devDependencies;
    }

    return new Map([
      ...dependencies,
      ...devDependencies,
    ]);
  }

  resolveFullPackageName({ scope, name }: Descriptor) {
    return scope ? `@${scope}/${name}` : name;
  }

  @Command.Path('bump')
  async execute(): Promise<number | void> {
    if (!Essentials.commands) {
      throw new Error(
        `Yarn commands could not be loaded.
Please upgrade to Yarn 2.`
      );
    }

    const configuration = await Configuration.find(
      this.context.cwd,
      this.context.plugins
    );

    const { project } = await Project.find(
      configuration,
      this.context.cwd
    );

    for (const workspace of project.workspaces) {
      const dependencies = this.getDependencies(workspace);
      const descriptors = [...dependencies.values()]
        .filter(descriptor => this.resolveFullPackageName(descriptor)
          .match(this.packages.join('|') || '.*' as any))
        .filter(descriptor => !this.resolveFullPackageName(descriptor)
          .match(this.exclude.join('|') || null as any));

      const packageNames = descriptors.map(this.resolveFullPackageName);

      const cli = Cli.from(Essentials.commands);
      await cli.runExit(['up', ...packageNames], this.context);
    }
  }
}
