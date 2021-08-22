import React from "react";
import ReactDOM from "react-dom";
import App from "./components/main/App";
import { Provider } from "react-redux";
import generateStore from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";

let store = generateStore();

let WithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<WithStore />, document.getElementById("root"));
