import React from "react";
import { Route, Switch } from "react-router";
import {
  Header,
  Library,
  Navigation,
  PlaylistBoard,
  Sidebar,
  TrackBoard,
  Convert,
} from "./components";

const Wrapper = ({ children }) => {
  return (
    <>
      <Header />
      <Navigation />
      <Sidebar />
      {children}
    </>
  );
};

const Router = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Wrapper>
          {/* <Main /> */}
          <h1>Main</h1>
        </Wrapper>
      </Route>
      <Route exact path="/convert">
        <Wrapper>
          <Convert />
        </Wrapper>
      </Route>
      <Route path="/board/:id">
        <Wrapper>
          <PlaylistBoard />
        </Wrapper>
      </Route>
      <Route exact path="/board">
        <Wrapper>
          <PlaylistBoard />
        </Wrapper>
      </Route>
      <Route path="/track/:id">
        <Wrapper>
          <TrackBoard />
        </Wrapper>
      </Route>
      <Route exact path="/library">
        <Wrapper>
          <Library />
        </Wrapper>
      </Route>
    </Switch>
  );
};

export default Router;
