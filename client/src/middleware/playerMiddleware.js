import {
  PLAY_FILE,
  PLAY,
  PAUSE,
  LOAD_AND_PLAY_QUEUE,
  NEXT,
  PREVIOUS,
  PLAY_QUEUE_INDEX,
  TOGGLE,
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

const handleAction = (player, action) => {
  switch (action.type) {
    case PLAY_FILE:
      const { path, file } = action;
      player.playFile(path, file);
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
      player.loadAndPlayQueue(action.queue);
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
    default:
      break;
  }
};

const playerMiddleware = player => ({ dispatch }) => {
  player.onPlaying = () => dispatch(playing());
  player.onPause = () => dispatch(paused());
  player.onTimeUpdate = time => dispatch(timeUpdate(time));
  player.onLoadedMetadata = duration => dispatch(loadedMetadata(duration));
  player.onProgress = seekableTo => dispatch(progress(seekableTo));
  player.onQueueChanged = queue => dispatch(queueChanged(queue));
  player.onFileChanged = (file, index) => dispatch(fileChanged(file, index));

  return next => action => {
    handleAction(player, action);
    next(action);
  };
};

export default playerMiddleware;
