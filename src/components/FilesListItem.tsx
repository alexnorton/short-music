import * as React from "react";
import styled from "styled-components";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeOff,
  FaEllipsisH,
} from "react-icons/fa";

import File from "../model/File";
import filenameToComponents from "../helpers/filenameToComponents";

interface StyledFilesListItemProps {
  selected: boolean;
}

const StyledFilesListItem = styled.div<StyledFilesListItemProps>`
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

interface TogglePlaybackButtonProps {
  currentFile: boolean;
  selected: boolean;
}

const TogglePlaybackButton = styled.button<TogglePlaybackButtonProps>`
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

interface PlayingIconProps {
  currentFile: boolean;
  selected: boolean;
  playing: boolean;
}

const PlayingIcon = styled.div<PlayingIconProps>`
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
  flex-grow: 1;
`;

interface MenuButtonProps {
  selected: boolean;
}

const MenuButton = styled.button<MenuButtonProps>`
  background: none !important;
  padding: 0 !important;
  border: none;
  outline: none;
  margin: 0 6px 0 0;
  font-size: 0;
  height: 20px;
  width: 20px;
  flex-shrink: 0;

  display: ${props => (props.selected ? "inherit" : "none")};

  ${StyledFilesListItem}:hover & {
    display: inherit;
  }

  svg {
    width: 100%;
    height: 12px;
    color: ${props => (props.selected ? "#fff" : "#2980b9")};
  }
`;

interface FilesListItemProps {
  file: File;
  selected: boolean;
  currentFile: boolean;
  playing: boolean;
  onPlayFile: { (): any };
  onToggle: { (): any };
  onOpenMenu: { (event: React.MouseEvent<Element>): any };
  onClick: { (event: React.MouseEvent<Element>): any };
  onDoubleClick: { (event: React.MouseEvent<Element>): any };
  onContextMenu: { (event: React.MouseEvent<Element>): any };
}

const FilesListItem: React.SFC<FilesListItemProps> = ({
  file,
  selected,
  currentFile,
  playing,
  onPlayFile,
  onToggle,
  onOpenMenu,
  onClick,
  onDoubleClick,
  onContextMenu,
}) => {
  const { number, name, extension } = filenameToComponents(file.title);

  return (
    <StyledFilesListItem
      selected={selected}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
    >
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
      <MenuButton selected={selected} onClick={onOpenMenu}>
        <FaEllipsisH />
      </MenuButton>
    </StyledFilesListItem>
  );
};

export default FilesListItem;
