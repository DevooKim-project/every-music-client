import React, { useState } from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Library from "./Library";

import Main from "./Main";
import Playlist from "./Playlist";
import Track from "./Track";

export default React.memo(function Page() {
  return (
    <div>
      <Link to="/">Main</Link>
      <Link to="/board">PlaylistBoard</Link>

      <Switch>
        <Route exact path="/" render={() => <Main />} />
        <Route path="/board/:id" render={() => <Playlist />} />
        <Route exact path="/board" render={() => <Playlist />} />
        <Route path="/track/:id" render={() => <Track />} />
        <Route path="/library" render={() => <Library />} />
      </Switch>
    </div>
  );
});
