import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Paper from "@material-ui/core/Paper";

import NoImage from "../../Images/noimage.png";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),

    background: "#363230",
    color: "white",
    fontWeight: 600,
  },
  content: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  thumbnail: {
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px",
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  icon: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    marginRight: "0.2rem",
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(1.5),
      height: theme.spacing(1.5),
    },
  },
  like: {
    display: "flex",
    paddingTop: "0.2rem",
    paddingBottom: "0.2rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.5rem",
    },
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
}));

const Info = ({ playlist }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={5}>
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
      <div className={classes.content}>
        <div className={classes.title}>{playlist.title}</div>
        <div className={classes.like}>
          <FavoriteIcon className={classes.icon} style={{ color: "red" }} />
          {playlist.like}개
        </div>
      </div>
    </Paper>
  );
};

export default Info;
