import { combineReducers } from "redux";
import {
  PLAYING,
  PAUSED,
  TIME_UPDATE,
  LOADED_METADATA,
  PROGRESS,
} from "../actions/player";

const player = (
  state = { playing: false, duration: 0, currentTime: 0, seekableTo: 0 },
  action
) => {
  switch (action.type) {
    case PLAYING:
      return {
        ...state,
        playing: true,
      };
    case PAUSED:
      return {
        ...state,
        playing: false,
      };
    case TIME_UPDATE:
      return {
        ...state,
        currentTime: action.time,
      };
    case LOADED_METADATA:
      return {
        ...state,
        duration: action.duration,
      };
    case PROGRESS:
      return {
        ...state,
        seekableTo: action.seekableTo,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ player });

export default rootReducer;
