export const FILE_CHANGED = "FILE_CHANGED";
export interface FileChanged {
  type: typeof FILE_CHANGED;
  queueIndex: number;
}
export const fileChanged = (queueIndex: number): FileChanged => ({
  type: FILE_CHANGED,
  queueIndex
});

export const PLAYING = "PLAYING";
export interface Playing {
  type: typeof PLAYING;
}
export const playing = (): Playing => ({
  type: PLAYING
});

export const PAUSED = "PAUSED";
export interface Paused {
  type: typeof PAUSED;
}
export const paused = (): Paused => ({
  type: PAUSED
});

export const TIME_UPDATE = "TIME_UPDATE";
export interface TimeUpdate {
  type: typeof TIME_UPDATE;
  time: number;
}
export const timeUpdate = (time: number): TimeUpdate => ({
  type: TIME_UPDATE,
  time
});

export const LOADED_METADATA = "LOADED_METADATA";
export interface LoadedMetadata {
  type: typeof LOADED_METADATA;
  duration: number;
}
export const loadedMetadata = (duration: number): LoadedMetadata => ({
  type: LOADED_METADATA,
  duration
});

export const PROGRESS = "PROGRESS";
export interface Progress {
  type: typeof PROGRESS;
  seekableTo: number;
}
export const progress = (seekableTo: number): Progress => ({
  type: PROGRESS,
  seekableTo
});

export const QUEUE_CHANGED = "QUEUE_CHANGED";
export interface QueueChanged {
  type: typeof QUEUE_CHANGED;
  queue: any;
}
export const queueChanged = (queue: any): QueueChanged => ({
  type: QUEUE_CHANGED,
  queue
});

export type PlayerAction =
  | FileChanged
  | Playing
  | Paused
  | TimeUpdate
  | LoadedMetadata
  | Progress
  | QueueChanged;
