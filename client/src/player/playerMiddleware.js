import { PLAY_FILE, playing, timeUpdate, loadedMetadata } from "../actions";

const handleAction = (player, action) => {
  switch (action.type) {
    case PLAY_FILE:
      const { path, file } = action;
      player.playFile(path, file);
      break;
    default:
      break;
  }
};

const playerMiddleware = player => ({ dispatch }) => {
  player.onPlaying = () => dispatch(playing());
  player.onTimeUpdate = time => dispatch(timeUpdate(time));
  player.onLoadedMetadata = duration => dispatch(loadedMetadata(duration));

  return next => action => {
    handleAction(player, action);
    next(action);
  };
};

export default playerMiddleware;
