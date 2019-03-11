import * as uuidv4 from "uuid/v4";

import PlayerFile from "./PlayerFile";
import QueueItem from "./QueueItem";

class Player {
  audio: HTMLAudioElement;
  queue: QueueItem[];
  queueIndex: number | null;

  onPlaying?: { (): void };
  onQueueChanged?: { (queue: QueueItem[]): void };
  onFileChanged?: { (queueIndex: number): void };
  onTimeUpdate?: { (time: number): void };
  onLoadedMetadata?: { (duration: number): void };
  onPause?: { (): void };
  onProgress?: { (seekableTo: number): void };

  constructor() {
    this.audio = document.createElement("audio");
    this.queue = [];
    this.queueIndex = null;

    this.audio.addEventListener("playing", this.handlePlaying);
    this.audio.addEventListener("timeupdate", this.handleTimeUpdate);
    this.audio.addEventListener("loadedmetadata", this.handleLoadedMetadata);
    this.audio.addEventListener("pause", this.handlePause);
    this.audio.addEventListener("progress", this.handleProgress);
    this.audio.addEventListener("ended", this.handleEnded);
  }

  // Control methods

  playFile(file: PlayerFile) {
    this.audio.src = file.url;
    this.audio.play();
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  toggle() {
    if (this.audio.paused) {
      this.play();
      return;
    }
    this.pause();
  }

  loadAndPlayQueue(files: PlayerFile[], index: number) {
    const queueItems = this.getQueueItems(files);
    this.updateQueue(queueItems);
    this.playQueueIndex(index);
  }

  addToQueue(files: PlayerFile[], next?: boolean) {
    const insertAt = next ? this.queueIndex || 0 : this.queue.length;

    const queueItems = this.getQueueItems(files);

    const newQueue = [
      ...this.queue.slice(0, insertAt),
      ...queueItems,
      ...this.queue.slice(insertAt),
    ];

    this.updateQueue(newQueue);
  }

  updateQueue(queueItems: QueueItem[]) {
    this.queue = queueItems;

    if (this.onQueueChanged) {
      this.onQueueChanged(this.queue);
    }
  }

  getQueueItems(files: PlayerFile[]) {
    return files.map(file => ({ file, id: uuidv4() }));
  }

  playQueueIndex(index: number) {
    this.queueIndex = index;
    const queueItem = this.queue[this.queueIndex];
    this.playFile(queueItem.file);

    if (this.onFileChanged) {
      this.onFileChanged(this.queueIndex);
    }
  }

  previous() {
    if (this.audio.currentTime < 3) {
      if (this.queueIndex !== null) {
        const newIndex = this.queueIndex - 1;

        if (this.queue[newIndex]) {
          this.playQueueIndex(newIndex);
        }
      }
    } else {
      this.seek(0);
    }
  }

  next() {
    if (this.queueIndex !== null) {
      const newIndex = this.queueIndex + 1;

      if (this.queue[newIndex]) {
        this.playQueueIndex(newIndex);
      }
    }
  }

  seek(time: number) {
    this.audio.currentTime = time;
  }

  // Event handlers

  handlePlaying = () => {
    if (this.onPlaying) {
      this.onPlaying();
    }
  };

  handleTimeUpdate = () => {
    if (this.onTimeUpdate) {
      this.onTimeUpdate(this.audio.currentTime);
    }
  };

  handleLoadedMetadata = () => {
    if (this.onLoadedMetadata) {
      this.onLoadedMetadata(this.audio.duration);
    }
  };

  handlePause = () => {
    if (this.onPause) {
      this.onPause();
    }
  };

  handleProgress = () => {
    if (this.onProgress) {
      const seekableTo =
        this.audio.seekable.length > 0
          ? this.audio.seekable.end(this.audio.seekable.length - 1)
          : 0;

      this.onProgress(seekableTo);
    }
  };

  handleEnded = () => {
    if (this.queueIndex !== null) {
      const newIndex = this.queueIndex + 1;

      if (this.queue[newIndex]) {
        this.playQueueIndex(newIndex);
      }
    }
  };
}

export default Player;
