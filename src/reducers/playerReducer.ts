import {
  PlayerAction,
  PLAYING,
  PAUSED,
  TIME_UPDATE,
  LOADED_METADATA,
  PROGRESS,
  QUEUE_CHANGED,
  FILE_CHANGED,
} from "../actions/player";

export interface PlayerState {
  playing: boolean;
  duration: number;
  currentTime: number;
  seekableTo: number;
  queue: Array<any>;
  queueIndex: number | null;
}

const playerReducer = (
  state: PlayerState = {
    playing: false,
    duration: 0,
    currentTime: 0,
    seekableTo: 0,
    queue: [],
    queueIndex: null,
  },
  action: PlayerAction
): PlayerState => {
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
    case QUEUE_CHANGED:
      return {
        ...state,
        queue: action.queue,
      };
    case FILE_CHANGED:
      return {
        ...state,
        queueIndex: action.queueIndex,
      };
    default:
      return state;
  }
};

export default playerReducer;
