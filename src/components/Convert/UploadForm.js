import React, { useEffect, useState } from "react";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import { uploadPlaylist } from "../../modules/actions";
import useAsync from "../../modules/useAsync";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#A2C5E8",
    color: "black",
    "&:hover": {
      backgroundColor: "#5D7C9C",
      borderColor: "#5D7C9C",
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

const UploadForm = ({ playlists, tracks }) => {
  const classes = useStyle();
  const [uploadState, uploadRefetch] = useAsync(() => uploadPlaylist(playlists, tracks), [], true);
  const { loading, data: uploadData, error } = uploadState;

  const onClick = () => {
    const libraryURL = window.location.protocol + "//" + window.location.host + "/library";
    window.open(libraryURL);
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>에러발생</div>;

  return (
    <div className={classes.root}>
      {uploadData ? (
        <Button {...buttonProps} className={classes.button} onClick={onClick}>
          라이브러리로 이동하기
        </Button>
      ) : (
        <Button
          {...buttonProps}
          className={classes.button}
          disabled={uploadData}
          onClick={uploadRefetch}
        >
          업로드하기
        </Button>
      )}
    </div>
  );
};

export default UploadForm;
