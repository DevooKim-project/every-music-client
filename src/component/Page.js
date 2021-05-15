import React, { useState } from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Library from "./Library";

import Main from "./Main";
import Convert from "./Convert";
import Playlist from "./Playlist";
import Track from "./Track";

export default React.memo(function Page() {
  return (
    <div>
      <Link to="/">Main</Link>
      <div> </div>
      <Link to="/board">PlaylistBoard</Link>
      <div> </div>
      <Link to="/convert">Convert playlist</Link>
    </div>
  );
});
