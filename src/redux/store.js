import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

const logger = ({ getState }) => {
  return (next) => (action) => {
    console.log("will dispatch", action);
    const returnValue = next(action);
    console.log("state after dispatch", getState());
    return returnValue;
  };
};
const middleware = [thunk, logger];
const enhancer = compose(applyMiddleware(...middleware));
const store = createStore(reducer, enhancer);
export default store;
