import React, { useContext, useState, useEffect } from "react";

import Login from "./Login";
import Dashboard from "./Dashboard";
import { Context } from "../context";

const platforms = ["google", "spotify", "kakao"];
function Info() {
  const type = new URLSearchParams(window.location.search).get("type");
  const {
    state: { isLoggedIn },
  } = useContext(Context);

  if (type === "token") {
    return <Login platforms={platforms} />;
  }

  return isLoggedIn ? (
    <Dashboard />
  ) : (
    <div>
      <Login platforms={platforms} />
    </div>
  );
}

function Sidebar() {
  return (
    <div>
      <h1>This is Sidebar</h1>
      <Info />
    </div>
  );
}

export default React.memo(Sidebar);
