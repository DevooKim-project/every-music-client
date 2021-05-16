import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import Cookie from "js-cookie";

import { Context } from "./context";

import "./App.css";
import config from "./config";
import Router from "./Router";
import auth from "./auth";

function App() {
  const refreshToken = Cookie.get("refreshToken");
  const {
    state: { isLoggedIn, payload },
    dispatch,
  } = useContext(Context);

  config();
  auth({ isLoggedIn, payload, dispatch, refreshToken });

  if (refreshToken && !isLoggedIn) return null;

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
