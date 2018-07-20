import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Browser from "../containers/Browser";
import Controls from "../containers/Controls";

class App extends React.Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path="/:path+" component={Browser} />
            <Route path="/" exact component={Browser} />
          </Switch>
        </HashRouter>
        <Controls />
      </div>
    );
  }
}

export default App;
