const filenameToComponents = filename => {
  const match = filename.match(/^(\d+(?:-\d+)?)?(.+?)(\..+)?$/);

  const [, number, name, extension] = match;

  return { number, name, extension };
};

export default filenameToComponents;
