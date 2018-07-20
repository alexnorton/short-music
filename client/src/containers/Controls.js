import React, { Fragment } from "react";
import { connect } from "react-redux";

const Controls = ({ playing, duration, currentTime }) => (
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
  </Fragment>
);

const mapStateToProps = ({ player: { playing, duration, currentTime } }) => ({
  playing,
  duration,
  currentTime,
});

export default connect(mapStateToProps)(Controls);
