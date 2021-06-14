import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { getTrackFromPlatform } from "../../modules/actions";
import { catchError } from "../../modules/actions/errorActions";
import useAsync from "../../modules/useAsync";
import ConvertForm from "./ConvertForm";
import UploadForm from "./UploadForm";

const buttonProps = {
  variant: "contained",
  color: "primary",
  size: "small",
};

const useStyle = makeStyles((theme) => ({
  root: {
    width: "60%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    background: "#EBEBEB",
  },
  subHeader: {
    color: "black",
    borderBottom: "1px solid black",
    padding: theme.spacing(1),
    textAlign: "center",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
    color: "white",
  },
  button: {
    backgroundColor: "#DDE88B",
    color: "black",
    "&:hover": {
      backgroundColor: "#929C4E",
      borderColor: "#929C4E",
      color: "white",
      boxShadow: "none",
    },
  },
}));
const Result = ({ selectedPlatform, playlists, initPlatform }) => {
  const classes = useStyle();
  const { source, destination } = selectedPlatform;
  const [trackState, trackRefetch] = useAsync(() => getTrackFromPlatform(source, playlists), []);
  const { loading: trackLoading, data: trackData, error: trackError } = trackState;
  useEffect(() => {
    if (trackError) {
      catchError(trackError, initPlatform);
    }
  }, [trackError]);

  if (trackLoading) return <CircularProgress />;
  if (trackError) return <div>에러발생</div>;
  if (!trackData) return null;

  return (
    <Paper className={classes.root} elevation={3}>
      <List subheader={<div className={classes.subHeader}>선택한 플레이리스트</div>}>
        {playlists.map((playlist) => (
          <ListItem autoFocus={true} divider={true} dense={true}>
            <ListItemText style={{ textAlign: "center" }} primary={playlist.title} />
          </ListItem>
        ))}
      </List>

      <div className={classes.buttons}>
        {destination === "upload" ? (
          <UploadForm playlists={playlists} tracks={trackData.tracks} />
        ) : (
          <>
            <ConvertForm
              destination={destination}
              playlists={playlists}
              tracks={trackData.tracks}
              initPlatform={initPlatform}
            />
            <Box style={{ width: "1rem" }} />
            <UploadForm playlists={playlists} tracks={trackData.tracks} />
          </>
        )}
      </div>

      <Link className={classes.link} to="/">
        <Button {...buttonProps} className={classes.button}>
          메인으로 이동
        </Button>
      </Link>
    </Paper>
  );
};

export default Result;
