import { createStore, applyMiddleware, compose } from "redux";

import rootReducer from "../reducers/rootReducer.ts";
import playerMiddleware from "../middleware/playerMiddleware";
import keyboardMiddleware from "../middleware/keyboardMiddleware";
import { TIME_UPDATE, PROGRESS } from "../actions/player.ts";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsBlacklist: [TIME_UPDATE, PROGRESS],
    })
  : compose;

const configureStore = player =>
  createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(playerMiddleware(player), keyboardMiddleware)
    )
  );

export default configureStore;
