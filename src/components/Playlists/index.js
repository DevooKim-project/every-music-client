import React, { useLayoutEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import Info from "./Info";
import { Avatar, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  user: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    background: "#F6E5DD",
  },
  avatar: {
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginRight: "0.5rem",
    },
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      marginRight: "0.5rem",
    },
    border: "1px solid black",
    background: "#8BAAE8",
    fontSize: "2rem",
  },
  playlists: {
    display: "flex",
    justifyContent: "space-around",
    overflow: "hidden",
    // padding: theme.spacing(2),
    background: "#EBEBEB",
  },
  gridList: {
    // paddingTop: theme.spacing(1),
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(2),
    },
  },
}));

const Board = ({ playlists, userData }) => {
  const classes = useStyles();
  const [user, setUser] = useState();

  useLayoutEffect(() => {
    if (userData) {
      setUser({ id: userData.id, nick: userData.nick || userData.name, image: userData.image });
    }
  }, []);

  return (
    <>
      {user && (
        <Paper className={classes.user} elevation={3}>
          <Avatar className={classes.avatar} alt={user.nick[0]} src={user.image}>
            {!user.image && user.nick[0]}
          </Avatar>
          <h1>{user.nick}</h1>
        </Paper>
      )}
      {playlists.length ? (
        <Paper className={classes.playlists} elevation={3}>
          <GridList cellHeight={"auto"} className={classes.gridList} cols={2} spacing={0}>
            {playlists.map((playlist) => (
              <GridListTile key={playlist.id}>
                <Info playlist={playlist} />
              </GridListTile>
            ))}
          </GridList>
        </Paper>
      ) : null}
    </>
  );
};

export default Board;
