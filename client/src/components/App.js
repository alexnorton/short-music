import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Browser from "../containers/Browser";
import Controls from "../containers/Controls";
import Queue from "../containers/Queue";

const StyledApp = styled.div`
  display: flex;
  height: 100%;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  position: relative;
`;

const Side = styled.div`
  width: 40%;
  max-width: 400px;
  border-left: 1px solid #333;
  overflow: scroll;
`;

const Content = styled.div`
  flex: 1;
  overflow: scroll;
`;

const QueueToggle = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

class App extends React.Component {
  state = {
    showQueue: false,
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
          <Controls />
          <QueueToggle onClick={this.toggleQueue}>
            {this.state.showQueue ? "→" : "←"}
          </QueueToggle>
        </Main>
        {this.state.showQueue && (
          <Side>
            <Queue />
          </Side>
        )}
      </StyledApp>
    );
  }
}

export default App;
