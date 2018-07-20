class Player {
  constructor() {
    this.audio = document.createElement("audio");
  }

  playFile(path, file) {
    console.log("playFile", path, file);
    this.audio.src = `/get?path=${path.join("/")}&file=${file}`;
    this.audio.play();
  }
}

export default Player;
