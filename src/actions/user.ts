export const PLAY_FILE = "PLAY_FILE";
export interface PlayFile {
  type: typeof PLAY_FILE;
  file: any;
}
export const playFile = (path: any, file: any): PlayFile => ({
  type: PLAY_FILE,
  file,
});

export const PLAY = "PLAY";
export interface Play {
  type: typeof PLAY;
}
export const play = (): Play => ({ type: PLAY });

export const PAUSE = "PAUSE";
export interface Pause {
  type: typeof PAUSE;
}
export const pause = (): Pause => ({ type: PAUSE });

export const TOGGLE = "TOGGLE";
export interface Toggle {
  type: typeof TOGGLE;
}
export const toggle = (): Toggle => ({ type: TOGGLE });

export const LOAD_AND_PLAY_QUEUE = "LOAD_AND_PLAY_QUEUE";
export interface LoadAndPlayQueue {
  type: typeof LOAD_AND_PLAY_QUEUE;
  queue: Array<any>;
}
export const loadAndPlayQueue = (queue: Array<any>): LoadAndPlayQueue => ({
  type: LOAD_AND_PLAY_QUEUE,
  queue,
});

export const PREVIOUS = "PREVIOUS";
export interface Previous {
  type: typeof PREVIOUS;
}
export const previous = (): Previous => ({ type: PREVIOUS });

export const NEXT = "NEXT";
export interface Next {
  type: typeof NEXT;
}
export const next = (): Next => ({ type: NEXT });

export const PLAY_QUEUE_INDEX = "PLAY_QUEUE_INDEX";
export interface PlayQueueIndex {
  type: typeof PLAY_QUEUE_INDEX;
  index: number;
}
export const playQueueIndex = (index: number): PlayQueueIndex => ({
  type: PLAY_QUEUE_INDEX,
  index,
});

export type UserAction =
  | PlayFile
  | Play
  | Pause
  | Toggle
  | LoadAndPlayQueue
  | Previous
  | Next
  | PlayQueueIndex;
