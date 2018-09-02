import * as React from "react";
import styled from "styled-components";

const ProgressContainer = styled.div`
  height: 4px;
  width: 100%;
  background-color: rgba(220, 221, 225, 0.5);
  position: relative;
`;

const SeekableBar = styled.div`
  height: 100%;
  background-color: #dcdde1;
  position: absolute;
`;

const PlayedBar = styled.div`
  height: 100%;
  background-color: #2980b9;
  position: absolute;
`;

interface ProgressBarProps {
  duration: number;
  seekableTo: number;
  currentTime: number;
}

const ProgressBar: React.SFC<ProgressBarProps> = ({
  duration,
  seekableTo,
  currentTime,
}) => (
  <ProgressContainer>
    <SeekableBar
      style={{ width: `${duration ? (seekableTo / duration) * 100 : 0}%` }}
    />
    <PlayedBar
      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
    />
  </ProgressContainer>
);

export default ProgressBar;
