import { createStore, applyMiddleware, compose } from "redux";

import rootReducer from "../reducers/rootReducer";
import playerMiddleware from "../player/playerMiddleware";
import { TIME_UPDATE, PROGRESS } from "../actions/player";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsBlacklist: [TIME_UPDATE, PROGRESS],
    })
  : compose;

const configureStore = player =>
  createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(playerMiddleware(player)))
  );

export default configureStore;
