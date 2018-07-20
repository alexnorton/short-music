class Player {
  constructor() {
    this.audio = document.createElement("audio");

    this.audio.addEventListener("playing", this.handlePlaying.bind(this));
    this.audio.addEventListener("timeupdate", this.handleTimeUpdate.bind(this));
    this.audio.addEventListener(
      "loadedmetadata",
      this.handleLoadedMetadata.bind(this)
    );
    this.audio.addEventListener("pause", this.handlePause.bind(this));
  }

  playFile(path, file) {
    this.audio.src = `/data/${[...path, file].join("/")}`;
    this.audio.play();
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

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
}

export default Player;
