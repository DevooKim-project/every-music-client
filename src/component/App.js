import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Cookie from "js-cookie";

import { loginByToken } from "../modules/actions";
import { Context } from "../context";

import "../App.css";
import config from "../config";
import Header from "./Header";
import Page from "./Page";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Router from "../Router";
import auth from "../auth";

function App() {
  const refreshToken = Cookie.get("refreshToken");
  const {
    state: { isLoggedIn, payload },
    dispatch,
  } = useContext(Context);

  config();
  auth({ isLoggedIn, payload, dispatch, refreshToken });

  if (refreshToken && !isLoggedIn) return null;

  // return (
  //   <div>
  //     <Router>
  //       <Header />
  //       <Page />
  //       <Sidebar />
  //       <Footer />
  //     </Router>
  //   </div>
  // );

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
