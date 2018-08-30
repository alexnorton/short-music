import { Middleware } from "redux";
import { toggle } from "../actions/user";

const keyboardMiddleware: Middleware = ({ dispatch }) => {
  document.addEventListener("keydown", event => {
    if (event.key === " ") {
      event.preventDefault();
      dispatch(toggle());
    }
  });

  return next => action => next(action);
};

export default keyboardMiddleware;
