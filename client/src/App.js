import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";

import DirectoryListing from "./DirectoryListing";

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <div>
            <Route path="/:path+" component={DirectoryListing} />
            <Route path="/" exact component={DirectoryListing} />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
