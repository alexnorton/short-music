const filenameToComponents = (filename: string) => {
  const match = filename.match(/^(\d+(?:-\d+)?)?(.+?)(\.[^.]+)?$/);

  if (match) {
    const [, number, name, extension] = match;

    return { number, name, extension };
  }

  return { number: null, name: filename, extension: null };
};

export default filenameToComponents;
