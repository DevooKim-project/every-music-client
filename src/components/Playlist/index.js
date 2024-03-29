import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { BsCloudDownload } from "react-icons/bs";
import { RiHeadphoneLine } from "react-icons/ri";

import Info from "./Info";
import MoreButton from "./MoreButton";
import UpdateForm from "./UpdateForm";
import { deletePlaylist, getAuthUrl, likePlaylist } from "../../modules/actions";
import SpotifyIcon from "../../Images/Spotify_Icon.png";
import YoutubeIcon from "../../Images/Youtube_Icon.png";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  playlistButtons: {
    display: "flex",
    // justifyContent: "space-between",
    // alignItems: "center",
  },
  redirectButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#707070",
    borderRadius: "6px",
    paddingLeft: theme.spacing(0.8),
    marginRight: theme.spacing(1),
    border: "1px solid white",
  },
  convertButtons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#707070",
    // background: "#776A59",
    borderRadius: "6px",
    paddingLeft: theme.spacing(0.8),
    border: "1px solid white",
  },
  icon: {
    width: "24px",
  },
}));

const fetchAuthUrl = async (type, platform, redirectUrl) => {
  return await getAuthUrl({ type, platform, redirectUrl });
};

const Playlist = ({ playlist, isLike, context, convertPlaylist }) => {
  const classes = useStyles();
  const { id, isLoggedIn, payload } = context;
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [playlistInfo, setPlaylistInfo] = useState(playlist);
  const [spotifyDisable, setSpotifyDisable] = useState(false);
  const [youtubeDisable, setYoutubeDisable] = useState(false);
  const [like, setLike] = useState(isLike);
  const [isMine, setIsMine] = useState(payload ? playlist.owner.id === payload.id : false);

  let redirectIcon;
  let redirectUrl;
  if (playlist.platform === "spotify") {
    redirectIcon = <img className={classes.icon} src={SpotifyIcon} />;
    redirectUrl = `https://open.spotify.com/playlist/${playlist.platformId}`;
  }
  if (playlist.platform === "youtube") {
    redirectIcon = <img className={classes.icon} src={YoutubeIcon} />;
    redirectUrl = `https://music.youtube.com/playlist?list=${playlist.platformId}`;
  }

  const playlistInfoHandler = (playlistInfo) => {
    setPlaylistInfo((prev) => {
      return { ...prev, ...playlistInfo };
    });
  };

  const updateDialogHandler = () => {
    setOpenUpdateDialog((prev) => {
      return !prev;
    });
  };

  const deleteDialogHandler = () => {
    setOpenDeleteDialog((prev) => {
      return !prev;
    });
  };

  const deletePlaylistHandler = async () => {
    await deletePlaylist(playlistInfo.id);
    window.history.back();
  };

  const onLike = () => {
    if (!isLoggedIn) {
      return alert("로그인 후 이용");
    }
    const state = !like ? "like" : "unlike";
    likePlaylist(id, state);
    setLike((prev) => {
      return !prev;
    });
  };

  const onClickConvert = (platform, disabled) => {
    if (disabled) {
      const url =
        platform === "spotify"
          ? "https://open.spotify.com/collection/playlists"
          : "https://music.youtube.com/library/playlists";
      window.open(url);
    } else {
      convertHandler(platform);
    }
  };

  const onClickRedirect = () => {
    window.open(redirectUrl);
  };

  const convertHandler = async (platform) => {
    if (platform === "spotify") {
      setSpotifyDisable(true);
    }
    if (platform === "google") {
      setYoutubeDisable(true);
    }
    const win = window.open("", "", "width=400, height=700");
    const currentUrl = window.location.protocol + "//" + window.location.host + "/convert";
    const url = await fetchAuthUrl("token", platform, currentUrl);
    win.location = url;
    const interval = setInterval(async () => {
      if (win.closed) {
        convertPlaylist(platform);
        clearInterval(interval);
      }
    }, [1000]);
  };

  return (
    <div className={classes.root}>
      <Info playlist={playlistInfo}>
        <div className={classes.buttons}>
          <div className={classes.buttonGroup}>
            <IconButton onClick={onLike} aria-label="add to favorites">
              {like ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon style={{ color: "red" }} />
              )}
            </IconButton>

            {isMine && (
              <MoreButton
                updateDialogHandler={updateDialogHandler}
                deleteDialogHandler={deleteDialogHandler}
              />
            )}
          </div>

          <div className={classes.playlistButtons}>
            <div className={classes.redirectButton}>
              <RiHeadphoneLine />
              <IconButton onClick={onClickRedirect}>{redirectIcon}</IconButton>
            </div>

            {isLoggedIn && (
              <div className={classes.convertButtons}>
                <BsCloudDownload />
                <IconButton
                  onClick={() => {
                    onClickConvert("spotify", spotifyDisable);
                  }}
                >
                  <img className={classes.icon} src={SpotifyIcon} />
                </IconButton>
                <IconButton
                  onClick={() => {
                    onClickConvert("google", youtubeDisable);
                  }}
                >
                  <img className={classes.icon} src={YoutubeIcon} />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </Info>
      <UpdateForm
        playlist={playlistInfo}
        playlistInfoHandler={playlistInfoHandler}
        openUpdate={openUpdateDialog}
        updateDialogHandler={updateDialogHandler}
      />

      <Dialog
        open={openDeleteDialog}
        onClose={deleteDialogHandler}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>플레이리스트 삭제</DialogTitle>

        <div style={{ textAlign: "center" }}>플레이리스트를 삭제합니다.</div>
        <DialogActions>
          <Button className={classes.button} color="secondary" onClick={deletePlaylistHandler}>
            delete
          </Button>
          <Button className={classes.button} onClick={deleteDialogHandler}>
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Playlist;
