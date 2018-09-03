import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers/rootReducer";
import playerMiddleware from "../middleware/playerMiddleware";
import keyboardMiddleware from "../middleware/keyboardMiddleware";
import { TIME_UPDATE, PROGRESS } from "../actions/player";
import Player from "../player/Player";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsBlacklist: [TIME_UPDATE, PROGRESS],
    })
  : compose;

const configureStore = (player: Player) =>
  createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunk, playerMiddleware(player), keyboardMiddleware)
    )
  );

export default configureStore;
