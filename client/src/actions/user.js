export const PLAY_FILE = "PLAY_FILE";
export const playFile = (path, file) => ({
  type: PLAY_FILE,
  path,
  file,
});

export const PLAY = "PLAY";
export const play = () => ({ type: PLAY });

export const PAUSE = "PAUSE";
export const pause = () => ({ type: PAUSE });
