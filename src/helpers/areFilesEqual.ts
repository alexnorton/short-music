import File from "../model/File";

const areFilesEqual = (a: File, b: File): boolean =>
  `${a.directory}/${a.filename}` === `${b.directory}/${b.filename}`;

export default areFilesEqual;
