import React from "react";
import styled from "styled-components";
import FaPlay from "react-icons/lib/fa/play";
import FaPause from "react-icons/lib/fa/pause";
import FaVolumeUp from "react-icons/lib/fa/volume-up";
import FaVolumeOff from "react-icons/lib/fa/volume-off";

import filenameToComponents from "../helpers/filenameToComponents.ts";

const StyledFilesListItem = styled.div`
  color: ${props => (props.selected ? "#fff" : "#333")};
  cursor: default;
  user-select: none;
  height: 30px;
  line-height: 30x;
  margin-bottom: -1px;
  border-width: 1px 0;
  border-color: #ddd;
  border-style: solid;
  border-collapse: collapse;
  background-color: ${props => (props.selected ? "#2980b9" : "inherit")};
  display: flex;
  align-items: center;
`;

const MutedText = styled.span`
  opacity: 0.6;
`;

const FileAction = styled.div`
  display: flex;
  height: 100%;
  width: 34px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const TogglePlaybackButton = styled.button`
  background: none !important;
  padding: 0 !important;
  border: none;
  outline: none;
  margin: 0;
  font-size: 0;
  height: 12px;
  width: 12px;
  flex-shrink: 0;

  display: none;

  ${StyledFilesListItem}:hover & {
    display: inherit;
  }

  svg {
    width: 100%;
    height: 100%;
    color: ${props => (props.selected ? "#fff" : "#2980b9")};
  }
`;

const PlayingIcon = styled.div`
  display: ${props => (props.currentFile ? "inherit" : "none")};
  height: 16px;
  width: 16px;

  ${StyledFilesListItem}:hover & {
    display: none;
  }

  svg {
    color: ${props => (props.selected ? "#fff" : "#2980b9")};
  }
`;

const FileName = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  flex-shrink: 1;
`;

const FilesListItem = ({
  file,
  selected,
  currentFile,
  playing,
  onPlayFile,
  onToggle,
}) => {
  const { number, name, extension } = filenameToComponents(file.title);

  return (
    <StyledFilesListItem selected={selected}>
      <FileAction>
        <TogglePlaybackButton
          onClick={event => {
            event.stopPropagation();
            (currentFile ? onToggle : onPlayFile)();
          }}
          currentFile={currentFile}
          selected={selected}
        >
          {playing ? <FaPause /> : <FaPlay />}
        </TogglePlaybackButton>
        <PlayingIcon
          selected={selected}
          currentFile={currentFile}
          playing={playing}
        >
          {playing ? <FaVolumeUp /> : <FaVolumeOff />}
        </PlayingIcon>
      </FileAction>
      <FileName>
        {number && <MutedText>{number}</MutedText>}
        {name}
        {extension && <MutedText>{extension}</MutedText>}
      </FileName>
    </StyledFilesListItem>
  );
};

export default FilesListItem;
