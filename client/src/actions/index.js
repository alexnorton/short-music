export const PLAY_FILE = "PLAY_FILE";
export const playFile = (path, file) => ({
  type: PLAY_FILE,
  path,
  file,
});

export const PLAYING = "PLAYING";
export const playing = () => ({
  type: PLAYING,
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
