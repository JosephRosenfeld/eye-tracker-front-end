import "./index.css";

/*--- Utilities Imports ---*/
import React from "react";
import ReactDOM from "react-dom";
import { store } from "./redux/store"; //import store

/*--- Component Imports ---*/
import App from "./App";
import { Provider } from "react-redux"; //import Provider
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
