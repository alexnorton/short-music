import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Browser from "../containers/Browser";
import Controls from "../containers/Controls";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled.div`
  flex: 1;
  overflow: scroll;
`;

const App = () => (
  <StyledApp>
    <Content>
      <BrowserRouter>
        <Switch>
          <Route path="/:path+" component={Browser} />
          <Route path="/" exact component={Browser} />
        </Switch>
      </BrowserRouter>
    </Content>
    <Controls />
  </StyledApp>
);

export default App;
