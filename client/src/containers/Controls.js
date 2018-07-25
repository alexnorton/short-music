import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { play, pause } from "../actions/user";
import ProgressBar from "../components/ProgressBar";
import secondsToTimecode from "../helpers/secondsToTimecode";

const StyledControls = styled.div`
  border-top: 1px solid #333;
  display: flex;
  justify-content: center;
  padding: 15px;
`;

const ControlsContainer = styled.div`
  flex-basis: 100%;
  max-width: 800px;
`;

const ControlsRow = styled.div`
  display: flex;
  justify-content: center;
`;

const FileRow = styled.div`
  display: flex;
  justify-content: center;
`;

const TimesRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PlayButton = styled.button`
  font-size: 20px;
`;

const Controls = ({
  playing,
  duration,
  currentTime,
  onPlay,
  onPause,
  seekableTo,
  file,
}) => (
  <StyledControls>
    <ControlsContainer>
      <ControlsRow>
        <PlayButton onClick={playing ? onPause : onPlay}>
          {playing ? "Pause" : "Play"}
        </PlayButton>
      </ControlsRow>
      <FileRow>{file ? file[file.length - 1] : "Stopped"}</FileRow>
      <TimesRow>
        <div>{secondsToTimecode(currentTime)}</div>
        <div>-{secondsToTimecode(duration - currentTime)}</div>
      </TimesRow>
      <ProgressBar
        duration={duration}
        currentTime={currentTime}
        seekableTo={seekableTo}
      />
    </ControlsContainer>
  </StyledControls>
);

const mapStateToProps = ({
  player: { playing, duration, currentTime, queue, queueIndex },
}) => ({
  playing,
  duration,
  currentTime,
  file: queue[queueIndex],
});

const mapDispatchToProps = dispatch => ({
  onPlay: () => dispatch(play()),
  onPause: () => dispatch(pause()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
