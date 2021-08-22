import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import spareDucks, { getSparesAction } from "./spareDucks";
import clientDucks, { getClientsAction } from "./clientDucks";
import globalDucks from "./globalDucks";

const rootReducer = combineReducers({
  global: globalDucks,
  spares: spareDucks,
  clients: clientDucks
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  getSparesAction()(store.dispatch);
  getClientsAction()(store.dispatch);

  return store;
}
