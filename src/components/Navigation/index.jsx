import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link to="/">Main</Link>
      <div></div>
      <Link to="/board">PlaylistBoard</Link>
      <div></div>
      <Link to="/convert">Convert playlist</Link>
      <div></div>
    </nav>
  );
};

export default Navigation;
