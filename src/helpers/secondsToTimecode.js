const secondsToTimecode = input => {
  const hours = Math.floor(input / (60 * 60));
  const minutes = Math.floor((input % (60 * 60)) / 60).toString();
  const seconds = Math.floor(input % 60).toString();

  if (hours > 0) {
    return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
  }

  return `${minutes}:${seconds.padStart(2, "0")}`;
};

export default secondsToTimecode;
