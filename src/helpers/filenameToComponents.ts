interface FilenameComponents {
  number: string | null;
  name: string;
  extension: string | null;
}

const filenameToComponents = (filename: string): FilenameComponents => {
  const match = filename.match(/^(\d+(?:-\d+)?)?(.+?)(\.[^.]+)?$/);

  if (match) {
    const [, number, name, extension] = match;

    return { number, name, extension };
  }

  return { number: null, name: filename, extension: null };
};

export default filenameToComponents;
