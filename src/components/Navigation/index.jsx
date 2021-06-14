import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { Context } from "../../context";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontSize: "1.2rem",

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      justifyContent: "space-between",
    },
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  a: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
}));

const Navigation = () => {
  const {
    state: { isLoggedIn },
  } = useContext(Context);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link className={classes.link} to="/">
        <div className={classes.a}>Main</div>
      </Link>

      <Link className={classes.link} to="/playlists">
        <div className={classes.a}>Board</div>
      </Link>

      <Link className={classes.link} to="/convert">
        <div className={classes.a}>Convert</div>
      </Link>

      {isLoggedIn && (
        <Link className={classes.link} to="/library">
          <div className={classes.a}>Library</div>
        </Link>
      )}
    </div>
  );
};

export default Navigation;
