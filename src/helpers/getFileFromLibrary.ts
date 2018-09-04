import { LibraryState } from "../reducers/libraryReducer";
import File from "../model/File";

const getFileFromLibrary = (
  library: LibraryState,
  directory: string[],
  filename: string
): File | null => {
  const libraryDirectory = library["/" + directory.join("/")];
  if (!libraryDirectory) return null;

  const { contents } = libraryDirectory;
  if (!contents) return null;

  const { files } = contents;

  const matches = files.filter(file => file.filename === filename);

  if (matches.length > 0) {
    return matches[0];
  }

  return null;
};

export default getFileFromLibrary;
