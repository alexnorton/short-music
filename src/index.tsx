import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Player from "./player/Player";
import configureStore from "./store/configureStore";

const App: React.ComponentType = require("./components/App").default;

import "./globalStyles";

const player = new Player();
const store = configureStore(player);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
