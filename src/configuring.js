import glob from 'glob';

export default async function configuring(yo) {
  yo.destinationRoot(yo.context.destination);
  const sourceFiles = glob.sync(
    `${yo.context.sourcePath}/*.${yo.context.template}`
  );
  yo.context.sourceFilesExist = sourceFiles.length > 0;
}
