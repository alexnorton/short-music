import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Browser from "../containers/Browser";
import Controls from "../containers/Controls";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/:path+" component={Browser} />
            <Route path="/" exact component={Browser} />
          </Switch>
        </BrowserRouter>
        <Controls />
      </div>
    );
  }
}

export default App;
