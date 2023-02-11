import { createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootreducers from "./components/redux/redcucers/main";


const middleware = [thunk];
// const createStore = redux.default;
// const store = createStore(reducer);

const store = createStore(
    rootreducers,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
