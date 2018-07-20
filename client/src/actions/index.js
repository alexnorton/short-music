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

export const PLAYING = "PLAYING";
export const playing = () => ({
  type: PLAYING,
});

export const PAUSED = "PAUSED";
export const paused = () => ({
  type: PAUSED,
});

export const TIME_UPDATE = "TIME_UPDATE";
export const timeUpdate = time => ({
  type: TIME_UPDATE,
  time,
});

export const LOADED_METADATA = "LOADED_METADATA";
export const loadedMetadata = duration => ({
  type: LOADED_METADATA,
  duration,
});
