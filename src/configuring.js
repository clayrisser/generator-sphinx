import glob from 'glob';
import path from 'path';

export default async function configuring(yo) {
  yo.destinationRoot(yo.context.destination);
  const sourceFiles = glob.sync(
    `${path.resolve('docs', yo.context.sourcePath)}/*.${yo.context.template}`
  );
  yo.context.sourceFilesExist = sourceFiles.length > 0;
}
