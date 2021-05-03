import React, { useState } from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Main from "./Main";
import PlaylistBoard from "./PlaylistBoard";
import TrackBoard from "./TrackBoard";

export default React.memo(function Page() {
  return (
    <Router>
      <Link to="/">Main</Link>
      <Link to="/board">PlaylistBoard</Link>

      <Switch>
        <Route exact path="/" render={() => <Main />} />
        <Route path="/board/:id" render={() => <PlaylistBoard />} />
        <Route exact path="/board" render={() => <PlaylistBoard />} />
        <Route path="/track/:id" render={() => <TrackBoard />} />
      </Switch>
    </Router>
  );
});
