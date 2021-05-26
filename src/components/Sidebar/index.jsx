import React, { useContext, useEffect } from "react";
import { Context } from "../../context";
import Dashboard from "./Dashboard";
import Login from "./Login";

const Sidebar = () => {
  const {
    state: { isLoggedIn },
  } = useContext(Context);

  return (
    <div className="sidebar">
      <h1>This is Sidebar</h1>
      {isLoggedIn ? <Dashboard /> : <Login />}
    </div>
  );
};

export default Sidebar;
