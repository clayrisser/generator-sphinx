import easycp from 'easycp';

export default async function install(yo) {
  const installChar = yo.options.install
    ? yo.options.install[0].toLowerCase()
    : 'y';
  if (!yo.answers.install || installChar === 'n' || installChar === 'f')
    return false;
  return easycp('make', ['env']);
}
