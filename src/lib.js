import emptyDir from 'empty-dir';
import fs from 'fs-extra';
import gitUserEmail from 'git-user-email';
import gitUserName from 'git-user-name';
import path from 'path';

export function isEmpty() {
  return emptyDir.sync(process.cwd());
}

export function guessEmail() {
  return gitUserEmail() || 'email@example.com';
}

export function guessUsername(email) {
  const matches = (email || guessEmail()).match(/^[^@]+/g);
  if (matches.length > 0) return matches[0];
  return 'some-username';
}

export function guessName() {
  const matches = process.cwd().match(/[^\/]+$/g);
  if (isEmpty() && matches.length > 0) return matches[0];
  return 'some-name';
}

export function guessAuthorName() {
  return gitUserName() || 'Some Name';
}

export async function copy(yo) {
  await fs.mkdirs(path.resolve('docs/_templates'));
  yo.fs.copy(
    yo.templatePath('template/shared/docs'),
    yo.destinationPath('docs')
  );
  yo.fs.copyTpl(
    yo.templatePath(`template/${yo.context.template}/docs/conf.py`),
    yo.destinationPath('docs/conf.py'),
    yo.context
  );
  yo.fs.copy(
    yo.templatePath('template/shared/Makefile'),
    yo.destinationPath('Makefile')
  );
  yo.fs.copyTpl(
    yo.templatePath('template/shared/README.md'),
    yo.destinationPath('README.md'),
    yo.context
  );
  yo.fs.copy(
    yo.templatePath('template/shared/_editorconfig'),
    yo.destinationPath('.editorconfig')
  );
  yo.fs.copy(
    yo.templatePath('template/shared/_gitignore'),
    yo.destinationPath('.gitignore')
  );
  yo.fs.copy(
    yo.templatePath('template/shared/_prettierrc'),
    yo.destinationPath('.prettierrc')
  );
  yo.fs.copy(
    yo.templatePath('template/shared/requirements.txt'),
    yo.destinationPath('requirements.txt')
  );
}
