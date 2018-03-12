import easycp from 'easycp';
import fs from 'fs-extra';
import path from 'path';

export default async function installing(yo) {
  if (yo.context.sourceFilesExist) {
    await fs.copy(path.resolve('README.md'), path.resolve('docs/index.md'));
  }
  const install = yo.options.install
    ? yo.options.install[0].toLowerCase()
    : 'y';
  if (!yo.answers.install || install === 'n' || install === 'f') return false;
  return easycp('make', ['env']);
}
