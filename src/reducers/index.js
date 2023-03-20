import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import userReducer from "./user";
import correctionTableReducer from "./correctionTable";

const rootStore = combineReducers({
  userReducer,
  correctionTableReducer
});
const middlewareEnhancer = applyMiddleware(thunkMiddleware);
const composedEnhancers = compose(middlewareEnhancer);
const store = createStore(rootStore, {}, composedEnhancers);

export default store;
