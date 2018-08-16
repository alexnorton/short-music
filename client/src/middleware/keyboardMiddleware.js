import { toggle } from "../actions/user";

const keyboardMiddleware = ({ dispatch }) => {
  document.addEventListener("keydown", event => {
    if (event.key === " ") {
      event.preventDefault();
      dispatch(toggle());
    }
  });

  return next => action => next(action);
};

export default keyboardMiddleware;
