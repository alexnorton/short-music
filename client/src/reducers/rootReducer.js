import { combineReducers } from "redux";

const player = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({ player });

export default rootReducer;
