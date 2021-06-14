import React, { useLayoutEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import NoImage from "../Common/noimage.png";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    // paddingTop: theme.spacing(0.75),
    // paddingBottom: theme.spacing(0.75),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderBottom: "1px black solid",
  },
  thumbnailWrapper: {
    flexGrow: 0.1,
    margin: theme.spacing(1),
    textAlign: "center",
  },
  thumbnail: {
    width: 70,
    // height: 70,
  },
  imageSpotify: {
    width: "75px",
    paddingTop: theme.spacing(0.75),
    paddingBottom: theme.spacing(0.75),
  },
  imageYoutube: {
    maxWidth: "135px",
    marginTop: "-8px",
    marginBottom: "-8px",
    marginLeft: "-30px",
    marginRight: "-30px",
    clipPath: " inset(12.5% 21.9% 12.5% 21.9%)",
  },
  content: {
    flexGrow: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "left",
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      textAlign: "left",
      minWidth: 0,
    },
  },
  title: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flexBasis: "60%",
    marginRight: theme.spacing(3),
    fontWeight: "500",
    maxWidth: "100%",
    [theme.breakpoints.down("xs")]: {
      flexBasis: "auto",
      fontSize: "1rem",
    },
  },
  name: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "#3B3936",
    [theme.breakpoints.down("xs")]: {
      flexBasis: "auto",
      fontSize: "0.8rem",
    },
  },
}));
// const YOUTUBE_CDN_HOST = "i.ytimg.com";
const Info = ({ track, measure }) => {
  const classes = useStyles();
  // const [isYoutube, setIsYoutube] = useState(false);
  // useLayoutEffect(() => {
  //   const thumbnail = track.thumbnail.split("/")[2];
  //   setIsYoutube(thumbnail === YOUTUBE_CDN_HOST ? true : false);
  // }, []);
  return (
    <Box className={classes.root}>
      <div className={classes.thumbnailWrapper}>
        <img
          // className={isYoutube ? classes.imageYoutube : classes.imageSpotify}
          className={classes.thumbnail}
          src={track.thumbnail}
          onError={(e) => {
            e.target.src = NoImage;
          }}
          onLoad={measure}
        />
      </div>
      <div className={classes.content}>
        <div className={classes.title}>{track.title}</div>
        <div className={classes.name}>{track.artistName}</div>
      </div>
    </Box>
  );
};

export default Info;
