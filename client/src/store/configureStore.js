import { createStore, applyMiddleware, compose } from "redux";

import rootReducer from "../reducers/rootReducer";
import playerMiddleware from "../player/playerMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = player =>
  createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(playerMiddleware(player)))
  );

export default configureStore;
