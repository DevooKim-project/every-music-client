import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Avatar, Box, Typography } from "@material-ui/core";

import NoImage from "../Common/noimage.png";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      display: "block",
      textAlign: "center",
      padding: theme.spacing(1),
    },
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#636363",
    padding: theme.spacing(1),
  },
  thumbnail: {
    [theme.breakpoints.down("xs")]: {
      height: 160,
      width: 160,
    },
    height: 240,
    width: 240,
  },
  content: {
    fontSize: "1.2rem",
    // backgroundColor: "grey",
    textAlign: "left",
    padding: "0.5rem",
    color: "white",
    fontWeight: "bold",
    width: "inherit",
    flexGrow: 1,
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
  },

  link: {
    color: "white",
    textDecoration: "none",
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "0.5rem",
  },
  avatar: {
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(2.5),
      height: theme.spacing(2.5),
      marginRight: "0.5rem",
    },
    [theme.breakpoints.up("xs")]: {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
      marginRight: "0.5rem",
    },
    background: "#8BAAE8",
    fontWeight: "500",
    // color: "#753E9C",
  },
  title: {
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.3rem",
    },
  },
  description: {
    color: "#DEDEDE",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  nickname: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
}));

const Info = ({ playlist, children }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={5}>
      <img
        className={classes.thumbnail}
        src={playlist.thumbnail}
        onError={(e) => {
          e.target.src = NoImage;
        }}
      />
      <Box className={classes.content}>
        <Typography className={classes.title} variant="h5" component="div">
          {playlist.title}
        </Typography>
        <Typography className={classes.description} variant="subtitle2">
          {playlist.description}
        </Typography>
        <Link className={classes.link} to={`/user/${playlist.owner.id}`}>
          <Box className={classes.profile}>
            <Avatar
              className={classes.avatar}
              alt={playlist.owner.nick[0]}
              src={playlist.owner.image}
            >
              {!playlist.owner.image && playlist.owner.nick[0]}
            </Avatar>
            <Typography className={classes.nickname} variant="subtitle2">
              {playlist.owner.nick}
            </Typography>
          </Box>
        </Link>
        {children}
      </Box>
    </Paper>
  );
};

export default Info;
