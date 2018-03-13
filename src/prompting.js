import YoBasePrompts from 'yo-base-prompts';
import path from 'path';

export default async function prompting(yo) {
  const {
    name,
    destination,
    description,
    version,
    license,
    authorName,
    authorEmail,
    githubUsername,
    authorUrl,
    homepage,
    repository
  } = await new YoBasePrompts(yo).prompt({
    name: true,
    destination: true,
    description: true,
    version: true,
    license: true,
    authorName: true,
    authorEmail: true,
    githubUsername: true,
    authorUrl: true,
    homepage: true,
    repository: true
  });
  const { latexType, template, theme } = await yo.optionOrPrompt([
    {
      type: 'list',
      name: 'theme',
      message: 'Theme',
      choices: ['sphinx_rtd_theme'],
      default: 'sphinx_rtd_theme'
    },
    {
      type: 'list',
      name: 'latexType',
      message: 'LaTeX Type',
      choices: ['manual', 'howto', 'article', 'jsbook', 'jreport'],
      default: 'manual'
    },
    {
      type: 'list',
      name: 'template',
      message: 'Template',
      choices: ['js'],
      default: 'js'
    }
  ]);
  const { themeStyle } = await yo.optionOrPrompt([
    {
      type: 'list',
      name: 'themeStyle',
      message: 'Theme Style:',
      when: theme === 'sphinx_rtd_theme',
      choices: ['orange'],
      default: 'orange'
    }
  ]);
  let { sourcePath } = await yo.optionOrPrompt([
    {
      type: 'input',
      name: 'sourcePath',
      message: 'Source Path:',
      default: './src'
    }
  ]);
  sourcePath = path.relative(
    path.resolve(destination, 'docs'),
    path.resolve(destination, sourcePath)
  );
  const { install } = await yo.optionOrPrompt([
    {
      type: 'confirm',
      name: 'install',
      message: 'Install dependencies',
      default: true
    }
  ]);
  yo.answers = {
    authorEmail,
    authorName,
    authorUrl,
    description,
    destination,
    githubUsername,
    homepage,
    install,
    latexType,
    license,
    name,
    repository,
    sourcePath,
    template,
    theme,
    themeStyle,
    version
  };
  if (
    (await yo.optionOrPrompt([
      {
        type: 'confirm',
        name: 'generatorGithubProject',
        message: 'Generator GitHub Project:',
        default: true
      }
    ])).generatorGithubProject
  ) {
    yo.composeWith(require.resolve('generator-github-project'), {
      ...yo.answers,
      template: 'minimal'
    });
  }
  yo.context = { ...yo.context, ...yo.answers };
}
