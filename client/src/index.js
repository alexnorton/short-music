import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Player from "./Player";
import App from "./components/App";
import configureStore from "./store/configureStore";

import "./index.css";

const player = new Player();

const store = configureStore(player);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
