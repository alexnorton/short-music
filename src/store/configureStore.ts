import { createStore, applyMiddleware, compose, Store } from "redux";
import thunk from "redux-thunk";

import rootReducer, { StoreState } from "../reducers/rootReducer";
import playerMiddleware from "../middleware/playerMiddleware";
import keyboardMiddleware from "../middleware/keyboardMiddleware";
import { TIME_UPDATE, PROGRESS } from "../actions/player";
import Player from "../player/Player";

/* eslint-disable @typescript-eslint/no-explicit-any */
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsBlacklist: [TIME_UPDATE, PROGRESS],
    })
  : compose;
/* eslint-enable */

const configureStore = (player: Player): Store<StoreState> =>
  createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunk, playerMiddleware(player), keyboardMiddleware)
    )
  );

export default configureStore;
