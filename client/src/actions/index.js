export const PLAY_FILE = "PLAY_FILE";
export const playFile = (path, file) => (dispatch, getState, player) => {
  player.playFile(path, file);
  dispatch({
    type: PLAY_FILE,
    path,
    file,
  });
};
