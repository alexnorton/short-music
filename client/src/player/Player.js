class Player {
  constructor() {
    this.audio = document.createElement("audio");
    this.queue = [];
    this.queueIndex = null;

    this.audio.addEventListener("playing", this.handlePlaying.bind(this));
    this.audio.addEventListener("timeupdate", this.handleTimeUpdate.bind(this));
    this.audio.addEventListener(
      "loadedmetadata",
      this.handleLoadedMetadata.bind(this)
    );
    this.audio.addEventListener("pause", this.handlePause.bind(this));
    this.audio.addEventListener("progress", this.handleProgress.bind(this));
    this.audio.addEventListener("ended", this.handleEnded.bind(this));
  }

  // Control methods

  playFile(path) {
    this.audio.src = `/data/${path.join("/")}`;
    this.audio.play();
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  loadAndPlayQueue(files) {
    this.updateQueue(files);
    this.playQueue(0);
  }

  updateQueue(files) {
    this.queue = files;

    if (this.onQueueChanged) {
      this.onQueueChanged(this.queue);
    }
  }

  playQueue(index) {
    this.queueIndex = index;
    const file = this.queue[this.queueIndex];

    if (this.onFileChanged) {
      this.onFileChanged(file, this.queueIndex);
    }

    this.playFile(file);
  }

  // Event handlers

  handlePlaying() {
    if (this.onPlaying) {
      this.onPlaying();
    }
  }

  handleTimeUpdate() {
    if (this.onTimeUpdate) {
      this.onTimeUpdate(this.audio.currentTime);
    }
  }

  handleLoadedMetadata() {
    if (this.onLoadedMetadata) {
      this.onLoadedMetadata(this.audio.duration);
    }
  }

  handlePause() {
    if (this.onPause) {
      this.onPause();
    }
  }

  handleProgress() {
    if (this.onProgress) {
      const seekableTo =
        this.audio.seekable.length > 0
          ? this.audio.seekable.end(this.audio.seekable.length - 1)
          : 0;

      this.onProgress(seekableTo);
    }
  }

  handleEnded() {
    const newIndex = this.queueIndex + 1;

    if (this.queue[newIndex]) {
      this.playQueue(newIndex);
    }
  }
}

export default Player;
