import React from "react";
import styled from "styled-components";
import FaPlay from "react-icons/lib/fa/play";

import filenameToComponents from "../helpers/filenameToComponents";

const StyledFilesListItem = styled.div`
  color: #2980b9;
  cursor: default;
  user-select: none;
  height: 26px;
  line-height: 26px;
  border-width: 1px 0 0 0;
  border-color: #ddd;
  border-style: solid;
  border-collapse: collapse;
  background-color: ${props => (props.selected ? "#ddd" : "inherit")};

  :hover {
    color: #3498db;
  }
`;

const MutedText = styled.span`
  color: #7f8c8d;

  ${StyledFilesListItem}:hover & {
    color: #95a5a6;
  }
`;

const PlayButton = styled.button`
  visibility: hidden;
  background: none !important;
  padding: 0 !important;
  border: none;
  margin: 0 5px;
  outline: none;
  height: 10px;
  width: 10px;

  ${StyledFilesListItem}:hover & {
    visibility: visible;
  }
`;

const FilesListItem = ({ file, selected, onPlayFile }) => {
  const { number, name, extension } = filenameToComponents(file);

  return (
    <StyledFilesListItem selected={selected}>
      <PlayButton onClick={onPlayFile}>
        <FaPlay />
      </PlayButton>
      {number && <MutedText>{number}</MutedText>}
      {name}
      {extension && <MutedText>{extension}</MutedText>}
    </StyledFilesListItem>
  );
};

export default FilesListItem;
