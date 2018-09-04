import Directory from "../model/Directory";
import {
  LibraryAction,
  DIRECTORY_REQUEST,
  DIRECTORY_FAILURE,
  DIRECTORY_SUCCESS,
} from "../actions/library";

export interface LibraryState {
  [path: string]: Directory;
}

const pathToKey = (path: string[]) => `/${path.join("/")}`;

const libraryReducer = (
  state: LibraryState = {},
  action: LibraryAction
): LibraryState => {
  switch (action.type) {
    case DIRECTORY_REQUEST:
      return {
        ...state,
        [pathToKey(action.path)]: {
          isFetching: true,
        },
      };
    case DIRECTORY_FAILURE:
      return {
        ...state,
        [pathToKey(action.path)]: {
          ...state[pathToKey(action.path)],
          isFetching: false,
          error: action.error,
        },
      };
    case DIRECTORY_SUCCESS:
      return {
        ...state,
        [pathToKey(action.path)]: {
          ...state[pathToKey(action.path)],
          isFetching: false,
          contents: action.directory,
        },
      };
    default:
      return state;
  }
};

export default libraryReducer;
