import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import FaPlay from "react-icons/lib/fa/play";
import FaPause from "react-icons/lib/fa/pause";
import FaForward from "react-icons/lib/fa/forward";
import FaBackward from "react-icons/lib/fa/backward";

import { toggle, pause, next, previous } from "../actions/user";
import ProgressBar from "../components/ProgressBar";
import secondsToTimecode from "../helpers/secondsToTimecode";

const StyledControls = styled.div`
  border-top: 1px solid #333;
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const ControlsContainer = styled.div`
  flex-basis: 100%;
  max-width: 800px;
`;

const ControlsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
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
  font-size: 0;
  border: none;
  background: none !important;
  padding: 0;
  margin: 0 10px;
  outline: none;
  height: 25px;
  width: 25px;
  color: #333;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const PlayButton = ControlsButton.extend`
  height: 35px;
  width: 35px;
`;

const Controls = ({
  playing,
  duration,
  currentTime,
  onToggle,
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
        <PlayButton onClick={onToggle}>
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
  onToggle: () => dispatch(toggle()),
  onNext: () => dispatch(next()),
  onPrevious: () => dispatch(previous())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
