import path from 'path';
import {
  guessAuthorEmail,
  guessAuthorName,
  guessUsername,
  guessProjectDescription,
  guessProjectDestination,
  guessProjectVersion,
  guessProjectName
} from 'project-guess';

export default async function prompting(yo) {
  const { name } = await yo.optionOrPrompt([
    {
      type: 'input',
      name: 'name',
      message: 'Project Name:',
      default: guessProjectName()
    }
  ]);
  let { destination } = await yo.optionOrPrompt([
    {
      type: 'input',
      name: 'destination',
      message: 'Destination:',
      default: guessProjectDestination(name)
    }
  ]);
  destination = path.resolve(destination);
  const { description, version, license } = await yo.optionOrPrompt([
    {
      type: 'input',
      name: 'description',
      message: 'Project Description:',
      default: guessProjectDescription()
    },
    {
      type: 'input',
      name: 'version',
      message: 'Version:',
      default: guessProjectVersion()
    },
    {
      type: 'input',
      name: 'license',
      message: 'License:',
      default: 'MIT'
    }
  ]);
  const { authorName, authorEmail } = await yo.optionOrPrompt([
    {
      type: 'input',
      name: 'authorName',
      message: 'Author Name:',
      default: guessAuthorName()
    },
    {
      type: 'input',
      name: 'authorEmail',
      message: 'Author Email:',
      default: guessAuthorEmail()
    }
  ]);
  const { githubUsername } = await yo.optionOrPrompt([
    {
      type: 'input',
      name: 'githubUsername',
      message: 'GitHub Username:',
      default: guessUsername(authorEmail)
    }
  ]);
  const { authorUrl } = await yo.optionOrPrompt([
    {
      type: 'input',
      name: 'authorUrl',
      message: 'Author URL:',
      default: `https://${githubUsername}.com`
    }
  ]);
  const { repository } = await yo.optionOrPrompt([
    {
      type: 'input',
      name: 'repository',
      message: 'Repository:',
      default: `https://github.com/${githubUsername}/${name}`
    }
  ]);
  const {
    homepage,
    install,
    latexType,
    sourcePath,
    template,
    theme
  } = await yo.optionOrPrompt([
    {
      type: 'input',
      name: 'homepage',
      message: 'Homepage:',
      default: repository
    },
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
    },
    {
      type: 'input',
      name: 'sourcePath',
      message: 'Source Path:',
      default: './src'
    },
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
    version
  };
  yo.composeWith(require.resolve('generator-github-project'), {
    ...yo.answers,
    template: 'minimal'
  });
  yo.context = { ...yo.context, ...yo.answers };
}
