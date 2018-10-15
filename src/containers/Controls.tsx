import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import styled from "styled-components";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

import { toggle, next, previous } from "../actions/user";
import ProgressBar from "../components/ProgressBar";
import secondsToTimecode from "../helpers/secondsToTimecode";
import filenameToComponents from "../helpers/filenameToComponents";
import { StoreState } from "../reducers/rootReducer";
import File from "../model/File";
import getFileFromLibrary from "../helpers/getFileFromLibrary";

const StyledControls = styled.div`
  border-top: 1px solid #dcdde1;
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: #f5f6fa;
`;

const ControlsContainer = styled.div`
  width: 100%;
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

const MutedText = styled.span`
  opacity: 0.6;
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

const PlayButton = styled(ControlsButton)`
  height: 35px;
  width: 35px;
`;

const StyledFileName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface FileNameProps {
  filename: string;
}

const FileName: React.SFC<FileNameProps> = ({ filename }) => {
  const { number, name, extension } = filenameToComponents(filename);

  return (
    <StyledFileName>
      {number && <MutedText>{number}</MutedText>}
      {name}
      {extension && <MutedText>{extension}</MutedText>}
    </StyledFileName>
  );
};

const ProgressContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

interface ControlsProps {
  playing: boolean;
  duration: number;
  currentTime: number;
  seekableTo: number;
  file?: File;
}

interface ControlsDispatchProps {
  onToggle: { (): any };
  onPrevious: { (): any };
  onNext: { (): any };
}

const Controls: React.SFC<ControlsProps & ControlsDispatchProps> = ({
  playing,
  duration,
  currentTime,
  onToggle,
  seekableTo,
  file,
  onPrevious,
  onNext,
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
      <FileRow>{file ? <FileName filename={file.title} /> : "Stopped"}</FileRow>
      <ProgressContainer>
        <TimesRow>
          <div>{secondsToTimecode(currentTime)}</div>
          <div>-{secondsToTimecode(duration - currentTime)}</div>
        </TimesRow>
        <ProgressBar
          duration={duration}
          currentTime={currentTime}
          seekableTo={seekableTo}
        />
      </ProgressContainer>
    </ControlsContainer>
  </StyledControls>
);

const mapStateToProps = ({
  player: { playing, duration, currentTime, queue, queueIndex, seekableTo },
  library,
}: StoreState): ControlsProps => ({
  playing,
  duration,
  currentTime,
  seekableTo,
  file:
    (queue &&
      queueIndex !== null &&
      getFileFromLibrary(
        library,
        queue[queueIndex].file.directory,
        queue[queueIndex].file.filename
      )) ||
    undefined,
});

const mapDispatchToProps = (dispatch: Dispatch): ControlsDispatchProps =>
  bindActionCreators(
    {
      onToggle: toggle,
      onNext: next,
      onPrevious: previous,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
