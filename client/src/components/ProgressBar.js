import React from "react";
import styled from "styled-components";

const ProgressContainer = styled.div`
  height: 15px;
  width: 100%;
  border: 1px solid #333;
  background-color: #ddd;
  position: relative;
`;

const SeekableBar = styled.div`
  height: 100%;
  background-color: blue;
  position: absolute;
`;

const PlayedBar = styled.div`
  height: 100%;
  background-color: red;
  position: absolute;
`;

const ProgressBar = ({ duration, seekableTo, currentTime }) => (
  <ProgressContainer>
    <SeekableBar
      duration={duration}
      style={{ width: `${duration ? (seekableTo / duration) * 100 : 0}%` }}
    />
    <PlayedBar
      duration={duration}
      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
    />
  </ProgressContainer>
);

export default ProgressBar;
