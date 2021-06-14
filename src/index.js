import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "./context";
import App from "./containers/App";

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
