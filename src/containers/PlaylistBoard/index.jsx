import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

import { Context } from "../../context";
import { convertPlaylist, getPlaylist, getLibrary } from "../../modules/actions";
import useAsync from "../../modules/useAsync";
import Playlist from "../../components/Playlist";
import Track from "../../components/Track";
import { Box, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  track: {
    marginTop: theme.spacing(1),
    backgroundColor: "#FBF6E8",
  },
}));

const convertPlaylistCallback = (playlistData) => (platform) => {
  convertPlaylist(platform, [playlistData.playlist], [playlistData.tracks]);
};

const PlaylistBoard = () => {
  const { id } = useParams();
  const {
    state: { isLoggedIn, payload },
  } = useContext(Context);
  const [playlistState, playlistRefetch] = useAsync(() => getPlaylist(id), []);
  const [likeState, likeRefetch] = useAsync(() => getLibrary(id), [], true);
  const { loading: playlistLoading, data: playlistData, error: playlistError } = playlistState;
  const { loading: likeLoading, data: likeData, error: likeError } = likeState;
  const classes = useStyles();

  useEffect(() => {
    if (isLoggedIn) {
      likeRefetch();
    }
  }, [isLoggedIn]);

  if (playlistLoading || likeLoading) return <div>로딩중..</div>;
  if (playlistError || likeError) return <div>에러 발생</div>;
  if (!playlistData || (isLoggedIn === true && !likeData)) return null;

  return (
    <div>
      <div className="top">
        <Playlist
          playlist={playlistData.playlist}
          isLike={likeData ? likeData.isLike : false}
          context={{ id, isLoggedIn, payload }}
          convertPlaylist={convertPlaylistCallback(playlistData)}
        />
      </div>
      <Paper className={classes.track} elevation={5}>
        <Track tracks={playlistData.tracks} />
      </Paper>
    </div>
  );
};

export default React.memo(PlaylistBoard);
