import easycp from 'easycp';
import path from 'path';

export default async function install(yo) {
  if (yo.context.sourceFilesExist) {
    yo.fs.copy(path.resolve('README.md'), path.resolve('docs/index.md'));
  }
  const installChar = yo.options.install
    ? yo.options.install[0].toLowerCase()
    : 'y';
  if (!yo.answers.install || installChar === 'n' || installChar === 'f')
    return false;
  return easycp('make', ['env']);
}
