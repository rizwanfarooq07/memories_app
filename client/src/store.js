import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { postsReducer } from "./reducers/postsReducer";

const reducers = combineReducers({
  post: postsReducer,
});

const middleWare = [thunk];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
