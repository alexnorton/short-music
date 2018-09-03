import { combineReducers } from "redux";

import playerReducer, { PlayerState } from "./playerReducer";
import libraryReducer, { LibraryState } from "./libraryReducer";

export interface StoreState {
  player: PlayerState;
  library: LibraryState;
}

const rootReducer = combineReducers<StoreState>({
  player: playerReducer,
  library: libraryReducer,
});

export default rootReducer;
