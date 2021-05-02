import React, { useContext, useState, useEffect } from "react";

import Login from "./Login";
import Dashboard from "./Dashboard";
import { Context } from "../context";

function Info() {
  const {
    state: { isLoggedIn },
  } = useContext(Context);
  return isLoggedIn ? <Dashboard /> : <Login />;
}

function Sidebar() {
  const [test, setTest] = useState(0);
  const onClick = () => {
    setTest((prev) => {
      return prev + 1;
    });
  };
  return (
    <div>
      <h1>This is Sidebar</h1>
      <button onClick={onClick}>Test</button>
      <div>{test}</div>
      <Info />
    </div>
  );
}

export default React.memo(Sidebar);
