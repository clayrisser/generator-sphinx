import 'babel-polyfill';
import Generator from 'yeoman-generator';
import _ from 'lodash';
import easycp from 'easycp';
import optionOrPrompt from 'yeoman-option-or-prompt';
import path from 'path';
import {
  copy,
  guessAuthorName,
  guessEmail,
  guessName,
  guessUsername,
  isEmpty
} from './lib';

module.exports = class extends Generator {
  initializing() {
    if (this.options.destination)
      this.destinationRoot(this.options.destination);
    this.context = { _ };
    this.optionOrPrompt = optionOrPrompt;
  }

  async prompting() {
    const { name } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project Name:',
        default: guessName()
      }
    ]);
    let newFolder = false;
    if (!this.options.destination && !isEmpty()) {
      newFolder = await this.optionOrPrompt([
        {
          type: 'confirm',
          name: 'newFolder',
          message: 'New Folder:',
          default: false
        }
      ]).newFolder;
    }
    const { description, version, license } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'description',
        message: 'Project Description:',
        default: `The awesome ${name} project`
      },
      {
        type: 'input',
        name: 'version',
        message: 'Version:',
        default: '0.0.1'
      },
      {
        type: 'input',
        name: 'license',
        message: 'License:',
        default: 'MIT'
      }
    ]);
    const { authorName, authorEmail } = await this.optionOrPrompt([
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
        default: guessEmail()
      }
    ]);
    const { githubUsername } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'githubUsername',
        message: 'GitHub Username:',
        default: guessUsername(authorEmail)
      }
    ]);
    const { authorUrl } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'authorUrl',
        message: 'Author URL:',
        default: `https://${githubUsername}.com`
      }
    ]);
    const { repository } = await this.optionOrPrompt([
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
      template,
      theme
    } = await this.optionOrPrompt([
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
        type: 'confirm',
        name: 'install',
        message: 'Install dependencies',
        default: true
      }
    ]);
    this.answers = {
      authorEmail,
      authorName,
      authorUrl,
      description,
      githubUsername,
      homepage,
      install,
      latexType,
      license,
      name,
      newFolder,
      repository,
      template,
      theme,
      version
    };
    this.context = { ...this.context, ...this.answers };
  }

  configuring() {
    if (this.context.newFolder) {
      this.destinationRoot(path.resolve(this.answers.name));
    }
  }

  default() {}

  async writing() {
    await copy(this);
  }

  conflicts() {}

  async install() {
    await easycp('ln', [
      path.resolve('README.md'),
      path.resolve('docs/index.md')
    ]);
    const install = this.options.install
      ? this.options.install[0].toLowerCase()
      : 'y';
    if (!this.answers.install || install === 'n' || install === 'f')
      return false;
    return easycp('make', ['env']);
  }

  end() {}
};
