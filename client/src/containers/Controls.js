import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import FaPlay from "react-icons/lib/fa/play";
import FaPause from "react-icons/lib/fa/pause";
import FaForward from "react-icons/lib/fa/forward";
import FaBackward from "react-icons/lib/fa/backward";

import { play, pause, next, previous } from "../actions/user";
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

const ControlsButton = styled.button`
  font-size: 24px;
  border: none;
  background: none;
  padding: 0;
  margin: 0 10px;
  outline: none;
  opacity: 0.8;

  :hover {
    opacity: 1;
  }
`;

const PlayButton = ControlsButton.extend`
  font-size: 36px;
`;

const Controls = ({
  playing,
  duration,
  currentTime,
  onPlay,
  onPause,
  seekableTo,
  file,
  onPrevious,
  onNext
}) => (
  <StyledControls>
    <ControlsContainer>
      <ControlsRow>
        <ControlsButton onClick={onPrevious}>
          <FaBackward />
        </ControlsButton>
        <PlayButton onClick={playing ? onPause : onPlay}>
          {playing ? <FaPause /> : <FaPlay />}
        </PlayButton>
        <ControlsButton onClick={onNext}>
          <FaForward />
        </ControlsButton>
      </ControlsRow>
      <FileRow>{file ? file.file[file.file.length - 1] : "Stopped"}</FileRow>
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
  player: { playing, duration, currentTime, queue, queueIndex }
}) => ({
  playing,
  duration,
  currentTime,
  file: queue[queueIndex]
});

const mapDispatchToProps = dispatch => ({
  onPlay: () => dispatch(play()),
  onPause: () => dispatch(pause()),
  onNext: () => dispatch(next()),
  onPrevious: () => dispatch(previous())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
