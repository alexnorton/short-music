class Player {
  constructor() {
    this.audio = document.createElement("audio");

    this.audio.addEventListener("play", this.handlePlay.bind(this));
    this.audio.addEventListener("timeupdate", this.handleTimeUpdate.bind(this));
    this.audio.addEventListener(
      "loadedmetadata",
      this.handleLoadedMetadata.bind(this)
    );
  }

  playFile(path, file) {
    console.log("playFile", path, file);
    this.audio.src = `/get?path=${path.join("/")}&file=${file}`;
    this.audio.play();
  }

  handlePlay() {
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
}

export default Player;
