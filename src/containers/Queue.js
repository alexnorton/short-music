import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { playQueueIndex } from "../actions/user";

const StyledQueue = styled.div`
  padding: 10px;
  height: 100%;
  background-color: #f5f6fa;
`;

const QueueHeading = styled.h2`
  margin-top: 0;
`;

const QueueList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const QueueItem = styled.li`
  :not(:last-child) {
    margin-bottom: 10px;
  }
`;

const QueueButton = styled.button`
  background: none !important;
  color: #2980b9;
  border: none;
  padding: 0 !important;
  font: inherit;
  text-align: left;
  cursor: pointer;
  outline: none;

  :hover {
    color: #3498db;
  }
`;

const Queue = ({ queue, queueIndex, playQueueIndex }) => (
  <StyledQueue>
    <QueueHeading>Up next</QueueHeading>
    {queue.length > 0 ? (
      <QueueList>
        {queue.map(({ filename, directory, id }, index) => {
          return (
            <QueueItem key={id}>
              <QueueButton onClick={() => playQueueIndex(index)}>
                {queueIndex === index && "▶ "}
                {filename}
              </QueueButton>
              <br />
              {directory}
            </QueueItem>
          );
        })}
      </QueueList>
    ) : (
      "Queue empty"
    )}
  </StyledQueue>
);

const mapStateToProps = ({ player: { queue, queueIndex } }) => ({
  queue,
  queueIndex,
});

const mapDispatchToProps = dispatch => ({
  playQueueIndex: index => dispatch(playQueueIndex(index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Queue);
