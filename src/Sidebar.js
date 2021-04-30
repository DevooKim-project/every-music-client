import React, { useContext, useState, useEffect } from "react";

import Login from "./Login";
import Dashboard from "./Dashboard";

function Sidebar({ state }) {
  console.log(state);
  return state.isLoggedIn ? <Dashboard state={state} /> : <Login />;
}

export default React.memo(Sidebar);
