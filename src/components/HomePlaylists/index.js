import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { CardMedia, Paper } from "@material-ui/core";

import NoImage from "../Common/noimage.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    // margin: theme.spacing(1),
    background: "pink",
  },
  gridWrapper: {
    width: "50%",
    // height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(2),
      width: "80%",
    },
    margin: theme.spacing(2),
    background: "skyBlue",
  },
  header: {
    width: "100%",
    background: "yellow",
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px",
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "700",
  },
  grid: {
    padding: theme.spacing(1),
  },
  thumbnail: {
    borderRadius: "3px",
    height: "100%",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
}));

const Home = ({ playlists }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.gridWrapper} elevation={3}>
        <GridList className={classes.grid} cellHeight={"auto"} spacing={8} cols={3}>
          {playlists.map((playlist) => (
            <GridListTile key={playlist.id}>
              <Link className={classes.link} to={`/playlist/${playlist.id}`}>
                <CardMedia
                  className={classes.thumbnail}
                  component="img"
                  alt="No Image"
                  image={playlist.thumbnail}
                  onError={(e) => {
                    e.target.src = NoImage;
                  }}
                />
              </Link>
            </GridListTile>
          ))}
        </GridList>
      </Paper>
    </div>
  );
};

export default Home;
