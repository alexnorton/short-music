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

export const TOGGLE = "TOGGLE";
export const toggle = () => ({ type: TOGGLE });

export const LOAD_AND_PLAY_QUEUE = "LOAD_AND_PLAY_QUEUE";
export const loadAndPlayQueue = queue => ({ type: LOAD_AND_PLAY_QUEUE, queue });

export const PREVIOUS = "PREVIOUS";
export const previous = () => ({ type: PREVIOUS });

export const NEXT = "NEXT";
export const next = () => ({ type: NEXT });

export const PLAY_QUEUE_INDEX = "PLAY_QUEUE_INDEX";
export const playQueueIndex = index => ({ type: PLAY_QUEUE_INDEX, index });