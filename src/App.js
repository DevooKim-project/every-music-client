import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { Context } from "./context";

import "./App.css";
import config from "./config";
import Router from "./Router";
import auth from "./auth";

function App() {
  const [authConfig, setAuthConfig] = useState(false);
  useEffect(() => {
    config();
  }, []);

  const authConfigHandler = () => {
    setAuthConfig(true);
  };

  auth(authConfigHandler);

  return (
    <>
      {authConfig && (
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
