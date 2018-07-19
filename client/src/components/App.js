import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";

import Browser from "../containers/Browser";

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <div>
            <Route path="/:path+" component={Browser} />
            <Route path="/" exact component={Browser} />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
