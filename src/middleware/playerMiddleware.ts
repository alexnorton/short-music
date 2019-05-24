import Player from "../player/Player";
import {
  UserAction,
  PLAY_FILE,
  PLAY,
  PAUSE,
  LOAD_AND_PLAY_QUEUE,
  NEXT,
  PREVIOUS,
  PLAY_QUEUE_INDEX,
  TOGGLE,
  PLAY_LATER,
  PLAY_NEXT,
} from "../actions/user";
import {
  playing,
  paused,
  timeUpdate,
  loadedMetadata,
  progress,
  queueChanged,
  fileChanged,
} from "../actions/player";
import { Middleware } from "redux";

const handleAction = (player: Player, action: UserAction): void => {
  switch (action.type) {
    case PLAY_FILE:
      const { file } = action;
      player.playFile(file);
      break;
    case PLAY:
      player.play();
      break;
    case PAUSE:
      player.pause();
      break;
    case TOGGLE:
      player.toggle();
      break;
    case LOAD_AND_PLAY_QUEUE:
      player.loadAndPlayQueue(action.queue, action.index);
      break;
    case PREVIOUS:
      player.previous();
      break;
    case NEXT:
      player.next();
      break;
    case PLAY_QUEUE_INDEX:
      player.playQueueIndex(action.index);
      break;
    case PLAY_LATER:
      player.addToQueue(action.files);
      break;
    case PLAY_NEXT:
      player.addToQueue(action.files, true);
      break;
    default:
      break;
  }
};

const playerMiddleware = (player: Player): Middleware => ({ dispatch }) => {
  player.onPlaying = () => dispatch(playing());
  player.onPause = () => dispatch(paused());
  player.onTimeUpdate = time => dispatch(timeUpdate(time));
  player.onLoadedMetadata = duration => dispatch(loadedMetadata(duration));
  player.onProgress = seekableTo => dispatch(progress(seekableTo));
  player.onQueueChanged = queue => dispatch(queueChanged(queue));
  player.onFileChanged = index => dispatch(fileChanged(index));

  return next => action => {
    handleAction(player, action);
    next(action);
  };
};

export default playerMiddleware;
