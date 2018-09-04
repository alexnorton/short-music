import DirectoryContents from "./DirectoryContents";

export default interface Directory {
  contents?: DirectoryContents;
  isFetching: boolean;
  error?: string;
}
