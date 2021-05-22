import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";

import { Context } from "./context";

import "./App.css";
import config from "./config";
import Router from "./Router";
import auth from "./auth";

function App() {
  const {
    state: { isLoggedIn, payload },
    dispatch,
  } = useContext(Context);

  config();
  auth({ isLoggedIn, payload, dispatch });

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
