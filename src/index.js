import "./index.css";

/*--- Utilities Imports ---*/
import React from "react";
import ReactDOM from "react-dom";
import { store } from "./redux/store"; //import store

/*--- Component Imports ---*/
import App from "./App";
import { Provider } from "react-redux"; //import Provider
import { BrowserRouter as Router } from "react-router-dom";

/*Overwriting history.pushstate, history.replaceState and history.popstate in order
to create a custom 'locationchange' event*/
/*Link: https://stackoverflow.com/questions/6390341/how-to-detect-if-url-has-changed-after-hash-in-javascript*/
window.history.pushState = ((f) =>
  function pushState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event("pushstate"));
    window.dispatchEvent(new Event("locationchange"));
    return ret;
  })(window.history.pushState);

window.history.replaceState = ((f) =>
  function replaceState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event("replacestate"));
    window.dispatchEvent(new Event("locationchange"));
    return ret;
  })(window.history.replaceState);

window.addEventListener("popstate", () => {
  window.dispatchEvent(new Event("locationchange"));
});

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
