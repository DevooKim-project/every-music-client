import React from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Main from "./Main";
import Board from "./Board";

export default React.memo(function Page() {
  return (
    <Router>
      <Link to="/">Main</Link>
      <Link to="/board">Board</Link>

      <Route exact path="/" render={() => <Main />} />
      <Switch>
        <Route path="/board/:id" render={() => <Board />} />
        <Route exact path="/board" render={() => <Board />} />
      </Switch>
    </Router>
  );
});
