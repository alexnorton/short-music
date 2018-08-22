export const FILE_CHANGED = "FILE_CHANGED";
export const fileChanged = (file, queueIndex) => ({
  type: FILE_CHANGED,
  file,
  queueIndex,
});

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

export const PROGRESS = "PROGRESS";
export const progress = seekableTo => ({
  type: PROGRESS,
  seekableTo,
});

export const QUEUE_CHANGED = "QUEUE_CHANGED";
export const queueChanged = queue => ({
  type: QUEUE_CHANGED,
  queue,
});