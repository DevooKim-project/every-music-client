import React from "react";
import { Button, makeStyles, Paper, Typography } from "@material-ui/core";

import { getAuthUrl, getPlatformToken, refreshPlatformAccessToken } from "../../modules/actions";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "60%",
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
    marginBottom: theme.spacing(1),
    background: "#EBEBEB",
  },
  button: {
    margin: theme.spacing(1),
    color: "black",
  },
  disabledButton: {
    backgroundColor: "yellow",
  },
  spotifyButton: {
    backgroundColor: "#1DB954",
    color: "white",
    "&:hover": {
      backgroundColor: "#096E2C",
      borderColor: "#096E2C",
      color: "white",
      boxShadow: "none",
    },
  },
  youtubeButton: {
    backgroundColor: "#ff0000",
    color: "white",
    "&:hover": {
      backgroundColor: "#B30000",
      borderColor: "#B30000",
      color: "white",
      boxShadow: "none",
    },
  },
  uploadButton: {
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

const buttonProps = {
  variant: "contained",
  size: "small",
};

const fetchAuthUrl = async (type, platform, redirectUrl) => {
  return await getAuthUrl({ type, platform, redirectUrl });
};

const PlatformForm = ({ selectedPlatform, platformHandler, type }) => {
  const classes = useStyle();

  const tokenHandler = async (state, platform, win) => {
    switch (state) {
      case "NOT_REQUIRED":
        platformHandler(platform, type);
        win.close();
        return;
      case "REQUIRED_REFRESH_ACCESS_TOKEN":
        const response = await refreshPlatformAccessToken(platform);
        if (response.state) {
          platformHandler(platform, type);
        }
        win.close();
        return;
      case "REQUIRED_OAUTH":
        if (!win.closed) {
          await oauthHandler(platform, win);
        } else {
          platformHandler(platform, type);
        }
        return;
    }
  };

  const oauthHandler = async (platform, win) => {
    const currentUrl =
      window.location.protocol + "//" + window.location.host + window.location.pathname;
    const url = await fetchAuthUrl("token", platform, currentUrl);
    win.location = url;
    const interval = setInterval(async () => {
      if (win.closed) {
        const response = await getPlatformToken(platform);
        tokenHandler(response.state, platform, win);
        clearInterval(interval);
      }
    }, [1000]);
  };

  const activeBtnHandler = (platform) => {
    return selectedPlatform[type] === platform || selectedPlatform["source"] === platform; //소스에 선택되었거나 대상에 선택되었으면 비활성화
  };

  const onPlatform = async (platform) => {
    const win = window.open("", "", "width=400, height=700");
    const response = await getPlatformToken(platform);
    await tokenHandler(response.state, platform, win);
  };

  const onUpload = (platform) => {
    platformHandler(platform, type);
  };

  return (
    <Paper className={classes.root} elevation={3}>
      <div className={classes.header}></div>
      <Typography variant="subtitle1">
        {type === "source" ? "소스를 선택하세요" : "대상을 선택하세요"}
      </Typography>
      <div className={classes.buttons}>
        <Button
          className={`${classes.button} ${classes.spotifyButton}`}
          {...buttonProps}
          disabled={activeBtnHandler("spotify")}
          onClick={() => onPlatform("spotify")}
        >
          spotify
        </Button>
        <Button
          className={`${classes.button} ${classes.youtubeButton}`}
          {...buttonProps}
          disabled={activeBtnHandler("google")}
          onClick={() => onPlatform("google")}
        >
          youtube
        </Button>
        {type === "destination" && (
          <Button
            className={`${classes.button} ${classes.uploadButton}`}
            {...buttonProps}
            disabled={activeBtnHandler("upload")}
            onClick={() => onUpload("upload")}
          >
            upload
          </Button>
        )}
      </div>
    </Paper>
  );
};

export default PlatformForm;
