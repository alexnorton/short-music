import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Browser from "../containers/Browser";
import Controls from "../containers/Controls";
import Queue from "../containers/Queue";

const StyledApp = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const Main = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  position: relative;
`;

const Side = styled.div`
  width: 40%;
  max-width: 400px;
  border-left: 1px solid #dcdde1;
  overflow-y: scroll;
  background-color: #f5f6fa;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

const QueueToggle = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

class App extends React.Component {
  state = {
    showQueue: false
  };

  toggleQueue = () => {
    this.setState({ showQueue: !this.state.showQueue });
  };

  render() {
    return (
      <StyledApp>
        <Main>
          <Content>
            <BrowserRouter>
              <Switch>
                <Route path="/:path+" component={Browser} />
                <Route path="/" exact component={Browser} />
              </Switch>
            </BrowserRouter>
          </Content>
          <QueueToggle onClick={this.toggleQueue}>
            {this.state.showQueue ? "→" : "←"}
          </QueueToggle>
          {this.state.showQueue && (
            <Side>
              <Queue />
            </Side>
          )}
        </Main>
        <Controls />
      </StyledApp>
    );
  }
}

export default App;
