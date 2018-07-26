import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledQueue = styled.div`
  padding: 10px;
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

const Queue = ({ queue, queueIndex }) => (
  <StyledQueue>
    <QueueHeading>Up next</QueueHeading>
    {queue.length > 0 ? (
      <QueueList>
        {queue.map((path, index) => {
          const file = path[path.length - 1];
          const directoryPath = path.slice(0, path.length - 1);
          return (
            <QueueItem key={path.join("/")}>
              {queueIndex === index && "▶ "}
              {file}
              <br />
              {directoryPath.join(" / ")}
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

export default connect(mapStateToProps)(Queue);
