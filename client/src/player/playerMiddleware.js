import {
  PLAY_FILE,
  PLAY,
  PAUSE,
  playing,
  paused,
  timeUpdate,
  loadedMetadata,
} from "../actions";

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

  return next => action => {
    handleAction(player, action);
    next(action);
  };
};

export default playerMiddleware;
