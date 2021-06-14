import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import { IconButton, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";

import { authUri } from "../../modules/actions";
import SpotifyIcon from "../Common/Spotify_Icon.png";
import SpotifyIconWhite from "../Common/Spotify_Icon_white.png";
import YoutubeIcon from "../Common/Youtube_Icon.png";
import YoutubeIconBlack from "../Common/Youtube_Icon_black.png";
import KakaoIcon from "../Common/Kakao_Icon.png";

const useStyles = makeStyles((theme) => ({
  login: {
    display: "flex",
    position: "relative",

    flexDirection: "column",
    alignItems: "center",
    width: "400px",
    margin: "auto",
    overflow: "hidden",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "225px",
    },
  },
  buttonWrapper: {
    width: "300px",
    [theme.breakpoints.down("sm")]: {
      width: "250px",
    },
  },
  button: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(0.5),
    paddingRight: theme.spacing(1),
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
    fontSize: "1rem",
    fontWeight: 600,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.7rem",
    },
  },
  logo: {
    width: "300px",
  },

  icon: {
    width: "24px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    flexBasis: "24px",
  },
  text: { flexGrow: 1, textAlign: "left" },
  youtubeButton: {
    border: "1px solid #ff0000",
    borderRadius: "6px",
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  spotifyButton: {
    border: "1px solid #1DB954",
    borderRadius: "6px",
    backgroundColor: "#1DB954",
    // color: "#E5E3E6",
    color: "#ffffff",
  },
  kakaoButton: {
    border: "1px solid #FEE500",
    borderRadius: "6px",
    backgroundColor: "#FEE500",
    color: "#000000",
  },
}));

const Login = ({ dialogOpen, handleDialog }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDownMD = useMediaQuery(theme.breakpoints.down("md"));
  const [maxWidth, setMaxWidth] = useState("md");

  useEffect(() => {
    setMaxWidth(isDownMD ? "sm" : "md");
  }, [isDownMD]);

  const uriHandler = (value) => {
    window.location = authUri(
      value,
      window.location.protocol + "//" + window.location.host + "/",
      "login"
    );
  };
  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleDialog} fullWidth={true} maxWidth={maxWidth}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <div className={classes.login}>
            <Button
              className={classes.buttonWrapper}
              onClick={() => {
                uriHandler("google");
              }}
            >
              <div className={`${classes.button} ${classes.youtubeButton}`}>
                <img src={YoutubeIcon} className={classes.icon} />
                <div className={classes.text}>Login With youtube</div>
              </div>
            </Button>
            <Button
              className={classes.buttonWrapper}
              onClick={() => {
                uriHandler("spotify");
              }}
            >
              <div className={`${classes.button} ${classes.spotifyButton}`}>
                <img src={SpotifyIconWhite} className={classes.icon} />
                <div className={classes.text}>Login With Spotify</div>
              </div>
            </Button>
            <Button
              className={classes.buttonWrapper}
              onClick={() => {
                uriHandler("kakao");
              }}
            >
              <div className={`${classes.button} ${classes.kakaoButton}`}>
                <img src={KakaoIcon} className={classes.icon} />
                <div className={classes.text}>Login With Kakao</div>
              </div>
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
