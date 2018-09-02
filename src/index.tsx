import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Player from "./player/Player";
import configureStore from "./store/configureStore";
import App from "./components/App";

import "./globalStyles";

const player = new Player();
const store = configureStore(player);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
