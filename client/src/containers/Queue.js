import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledQueue = styled.div`
  padding: 10px;
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

const Queue = ({ queue }) => (
  <StyledQueue>
    {queue.length > 0 ? (
      <QueueList>
        {queue.map(path => {
          const file = path[path.length - 1];
          const directoryPath = path.slice(0, path.length - 1);
          return (
            <QueueItem key={path.join("/")}>
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

const mapStateToProps = ({ player: { queue } }) => ({
  queue,
});

export default connect(mapStateToProps)(Queue);
