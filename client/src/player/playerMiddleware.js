import { PLAY_FILE, PLAY, PAUSE } from "../actions/user";
import {
  playing,
  paused,
  timeUpdate,
  loadedMetadata,
  progress,
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

  return next => action => {
    handleAction(player, action);
    next(action);
  };
};

export default playerMiddleware;
