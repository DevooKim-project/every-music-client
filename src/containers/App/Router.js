import React from "react";
import { Route, Switch } from "react-router";
import { makeStyles } from "@material-ui/core";

import PlaylistsBoard from "../PlaylistsBoard";
import PlaylistBoard from "../PlaylistBoard";
import Library from "../Library";
import Convert from "../Convert";
import Home from "../Home";

const useStyles = makeStyles((theme) => ({
  body: {
    margin: "0 auto",
    marginTop: theme.spacing(2),
    maxWidth: "1400px",
    minHeight: `calc(100vh - ${theme.spacing(16)}px)`,
    background: "inherit",
    height: "100%",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "650px",
      marginTop: theme.spacing(5),
      minHeight: `calc(100vh - ${theme.spacing(18)}px)`,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.up("xl")]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
  },
}));

const Router = () => {
  const classes = useStyles();
  return (
    <div className={classes.body}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/convert">
          <Convert />
        </Route>
        <Route exact path="/user/:id">
          <PlaylistsBoard />
        </Route>
        <Route exact path="/playlists">
          <PlaylistsBoard />
        </Route>
        <Route path="/playlist/:id">
          <PlaylistBoard />
        </Route>
        <Route exact path="/library">
          <Library />
        </Route>
      </Switch>
    </div>
  );
};

export default Router;
