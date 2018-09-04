import File from "./File";

export default interface DirectoryContents {
  directories: string[];
  files: File[];
}
