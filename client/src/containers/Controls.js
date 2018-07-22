import React, { Fragment } from "react";
import { connect } from "react-redux";

import { play, pause } from "../actions/user";

const Controls = ({ playing, duration, currentTime, onPlay, onPause }) => (
  <Fragment>
    <p>
      <strong>Playing:</strong> {playing ? "yes" : "no"}
    </p>
    <p>
      <strong>Duration:</strong> {duration}
    </p>
    <p>
      <strong>Current time:</strong> {currentTime}
    </p>
    <button onClick={playing ? onPause : onPlay}>
      {playing ? "Pause" : "Play"}
    </button>
  </Fragment>
);

const mapStateToProps = ({ player: { playing, duration, currentTime } }) => ({
  playing,
  duration,
  currentTime,
});

const mapDispatchToProps = dispatch => ({
  onPlay: () => dispatch(play()),
  onPause: () => dispatch(pause()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
