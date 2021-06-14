import React, { useEffect, useState } from "react";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import { convertPlaylist } from "../../modules/actions";
import { catchError } from "../../modules/actions/errorActions";
import useAsync from "../../modules/useAsync";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "row",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#E87C74",
    color: "white",
    "&:hover": {
      backgroundColor: "#9C443E",
      borderColor: "#9C443E",
      color: "white",
      boxShadow: "none",
    },
  },
}));

const buttonProps = {
  variant: "contained",
  color: "primary",
  size: "small",
};
const ConvertForm = ({ destination, playlists, tracks, initPlatform }) => {
  const classes = useStyle();
  console.log(playlists, tracks);
  const [convertState, convertRefetch] = useAsync(
    () => convertPlaylist(destination, playlists, tracks),
    [],
    true
  );
  const { loading, data: convertData, error } = convertState;

  useEffect(() => {
    if (error) {
      catchError(error, initPlatform);
    }
  }, [error]);

  const goPlatformHandler = (platform, playlistId = undefined) => {
    let url;
    if (platform === "google") {
      url = `https://music.youtube.com/playlist?list=${playlistId}`;
    }
    if (platform === "spotify") {
      url = `https://open.spotify.com/playlist/${playlistId}`;
    }
    window.open(url);
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>에러발생</div>;
  return (
    <div>
      {convertData ? (
        <div className={classes.root}>
          {convertData.playlists.map((playlist) => (
            <Button
              {...buttonProps}
              className={classes.button}
              key={playlist.platformId}
              onClick={() => {
                goPlatformHandler(destination, playlist.platformId);
              }}
            >
              {playlist.title}
            </Button>
          ))}
        </div>
      ) : (
        <Button
          {...buttonProps}
          className={classes.button}
          disabled={convertData}
          onClick={convertRefetch}
        >
          변환하기
        </Button>
      )}
    </div>
  );
};

export default ConvertForm;
