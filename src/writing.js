import fs from 'fs-extra';
import path from 'path';

export default async function writing(yo) {
  await fs.mkdirs(path.resolve('docs/_templates'));
  yo.fs.copy(
    yo.templatePath(
      `themes/${yo.context.theme}/${yo.context.themeStyle}/_static`
    ),
    yo.destinationPath('docs/_static')
  );
  yo.fs.copyTpl(
    yo.templatePath(`template/${yo.context.template}/docs/conf.py`),
    yo.destinationPath('docs/conf.py'),
    yo.context
  );
  yo.fs.copy(
    yo.templatePath(`template/${yo.context.template}/_readthedocs.yml`),
    yo.destinationPath('.readthedocs.yml')
  );
  yo.fs.copyTpl(
    yo.templatePath('template/shared/Makefile'),
    yo.destinationPath('Makefile'),
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
  if (yo.context.sourceFilesExist && fs.existsSync(path.resolve('README.md'))) {
    yo.fs.copy(path.resolve('README.md'), path.resolve('docs/index.md'));
  } else {
    yo.fs.copy(
      yo.templatePath(`template/${yo.context.template}/src`),
      yo.destinationPath('src')
    );
    yo.fs.copyTpl(
      yo.templatePath(`template/shared/docs/index.md`),
      yo.destinationPath('docs/index.md'),
      yo.context
    );
  }
}
