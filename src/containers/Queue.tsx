import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { bindActionCreators, Dispatch } from "redux";

import { playQueueIndex } from "../actions/user";
import { StoreState } from "../reducers/rootReducer";
import QueueItem from "../player/QueueItem";

const StyledQueue = styled.div`
  padding: 10px;
  height: 100%;
`;

const QueueHeading = styled.h2`
  margin-top: 0;
`;

const QueueList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const QueueListItem = styled.li`
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

interface QueueProps {
  queue: QueueItem[];
  queueIndex: number | null;
}

interface QueueDispatchProps {
  playQueueIndex: { (index: number): any };
}

class Queue extends React.PureComponent<QueueProps & QueueDispatchProps> {
  render() {
    const { queue, queueIndex, playQueueIndex } = this.props;

    return (
      <StyledQueue>
        <QueueHeading>Up next</QueueHeading>
        {queue.length > 0 ? (
          <QueueList>
            {queue.map(({ file: { filename, directory }, id }, index) => {
              return (
                <QueueListItem key={id}>
                  <QueueButton onClick={() => playQueueIndex(index)}>
                    {queueIndex === index && "▶ "}
                    {filename}
                  </QueueButton>
                  <br />
                  {directory.join("/")}
                </QueueListItem>
              );
            })}
          </QueueList>
        ) : (
          "Queue empty"
        )}
      </StyledQueue>
    );
  }
}

const mapStateToProps = ({
  player: { queue, queueIndex },
}: StoreState): QueueProps => ({
  queue,
  queueIndex,
});

const mapDispatchToProps = (dispatch: Dispatch): QueueDispatchProps =>
  bindActionCreators(
    {
      playQueueIndex,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Queue);
