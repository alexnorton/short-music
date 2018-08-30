export default (input: string): string => {
  const matches = input.match(/^(?:The )?(.+)$/i);
  if (matches) {
    return matches[1];
  }
  return input;
};
