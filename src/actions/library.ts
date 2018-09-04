import { Dispatch } from "redux";

import DirectoryContents from "../model/DirectoryContents";
import ApiResponse from "../model/ApiResponse";
import compareItems from "../helpers/compareItems";
import { SERVER_ENDPOINT } from "../config";

export const DIRECTORY_REQUEST = "DIRECTORY_REQUEST";
export interface DirectoryRequest {
  type: typeof DIRECTORY_REQUEST;
  path: string;
}
export const directoryRequest = (path: string): DirectoryRequest => ({
  type: DIRECTORY_REQUEST,
  path,
});

export const DIRECTORY_FAILURE = "DIRECTORY_FAILURE";
export interface DirectoryFailure {
  type: typeof DIRECTORY_FAILURE;
  path: string;
  error: string;
}
export const directoryFailure = (
  path: string,
  error: string
): DirectoryFailure => ({
  type: DIRECTORY_FAILURE,
  path,
  error,
});

export const DIRECTORY_SUCCESS = "DIRECTORY_SUCCESS";
export interface DirectorySuccess {
  type: typeof DIRECTORY_SUCCESS;
  path: string;
  directory: DirectoryContents;
}
export const directorySuccess = (
  path: string,
  directory: DirectoryContents
): DirectorySuccess => ({
  type: DIRECTORY_SUCCESS,
  path,
  directory,
});

export const fetchDirectory = (path: string) => async (dispatch: Dispatch) => {
  dispatch(directoryRequest(path));

  try {
    const req = await fetch(`${SERVER_ENDPOINT}/${path}`);

    if (req.status !== 200) {
      throw Error(`${req.status} ${req.statusText}`);
    }

    const json: ApiResponse = await req.json();

    const contents: DirectoryContents = {
      directories: json
        .filter(item => item.type === "directory")
        .map(item => item.name)
        .sort(compareItems),
      files: json
        .filter(item => item.type === "file" || item.type === "url")
        .map(item => ({
          directory: path,
          filename: item.name,
          title: item.name,
          url:
            item.type === "url"
              ? item.url
              : `${SERVER_ENDPOINT}/${path}/${item.name}`,
        }))
        .sort((a, b) => compareItems(a.title, b.title)),
    };
    dispatch(directorySuccess(path, contents));
  } catch (error) {
    dispatch(directoryFailure(path, error.message));
  }
};

export type LibraryAction =
  | DirectoryRequest
  | DirectoryFailure
  | DirectorySuccess;
