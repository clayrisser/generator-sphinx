import path from 'path';
import {
  guessAuthorEmail,
  guessAuthorName,
  guessAuthorUrl,
  guessProjectDescription,
  guessProjectDestination,
  guessProjectLicense,
  guessProjectName,
  guessProjectRepository,
  guessProjectVersion,
  guessUsername
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
      default: guessProjectDescription(`A project for ${name}`)
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
      default: guessProjectLicense()
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
      default: guessAuthorUrl(githubUsername)
    }
  ]);
  const { repository } = await yo.optionOrPrompt([
    {
      type: 'input',
      name: 'repository',
      message: 'Repository:',
      default: guessProjectRepository(githubUsername, name)
    }
  ]);
  const { homepage, latexType, template, theme } = await yo.optionOrPrompt([
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
