import React from "react";
import styled from "styled-components";
import FaPlay from "react-icons/lib/fa/play";

import filenameToComponents from "../helpers/filenameToComponents";

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

const PlayButton = styled.button`
  visibility: hidden;
  background: none !important;
  padding: 0 !important;
  border: none;
  margin: 0 10px;
  outline: none;
  height: 12px;
  width: 12px;
  font-size: 0;
  flex-shrink: 0;

  ${StyledFilesListItem}:hover & {
    visibility: visible;
  }
`;

const PlayIcon = styled(FaPlay)`
  width: 100%;
  height: 100%;
  color: ${props => (props.selected ? "#fff" : "#2980b9")};
`;

const FileName = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  flex-shrink: 1;
`;

const FilesListItem = ({ file, selected, onPlayFile }) => {
  const { number, name, extension } = filenameToComponents(file);

  return (
    <StyledFilesListItem selected={selected}>
      <PlayButton onClick={onPlayFile}>
        <PlayIcon selected={selected} />
      </PlayButton>
      <FileName>
        {number && <MutedText>{number}</MutedText>}
        {name}
        {extension && <MutedText>{extension}</MutedText>}
      </FileName>
    </StyledFilesListItem>
  );
};

export default FilesListItem;
