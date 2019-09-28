import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middlewares = [thunk];
const composeEnhancers = composeWithDevTools({trace: true});
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));
// const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;