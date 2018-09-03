import Directory from "../model/Directory";
import { LibraryAction } from "../actions/library";

export interface LibraryState {
  [path: string]: Directory;
}

const libraryReducer = (
  state: LibraryState = {},
  action: LibraryAction
): LibraryState => {
  return state;
};

export default libraryReducer;
