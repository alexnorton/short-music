import * as uuidv4 from "uuid/v4";

class Player {
  audio: HTMLAudioElement;
  queue: Array<any>;
  queueIndex: number | null;

  onPlaying?: { (): void };
  onQueueChanged?: { (queue: Array<any>): void };
  onFileChanged?: { (file: any, queueIndex: number): void };
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

  playFile(path: Array<string>) {
    this.audio.src = `/data/${path.join("/")}`;
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

  loadAndPlayQueue(files: Array<any>) {
    this.updateQueue(files);
    this.playQueueIndex(0);
  }

  updateQueue(files: Array<any>) {
    this.queue = files.map(file => ({ file, id: uuidv4() }));

    if (this.onQueueChanged) {
      this.onQueueChanged(this.queue);
    }
  }

  playQueueIndex(index: number) {
    this.queueIndex = index;
    const file = this.queue[this.queueIndex].file;

    if (this.onFileChanged) {
      this.onFileChanged(file, this.queueIndex);
    }

    this.playFile(file);
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
