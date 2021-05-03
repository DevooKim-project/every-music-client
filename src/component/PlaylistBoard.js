import React, { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useParams } from "react-router";

import { getPlaylistBoard, getPlaylistBoardByUser, likePlaylist } from "../modules/actions";
import { Context } from "../context";

import "./Board.css";
import TrackBoard from "./TrackBoard";

const Playlist = React.memo(function Playlist({ playlist }) {
  return (
    <div owner={playlist.owner}>
      <Link to={`/track/${playlist.id}`}>
        <div>
          {playlist.title} / {playlist.id}
        </div>
      </Link>
      <Route path="/track/:id" render={() => <TrackBoard playlist={playlist} />} />

      <div>like - {playlist.like}</div>
      <Link to={`/board/${playlist.owner.id}`}>
        <button>{playlist.owner.nick}</button>
      </Link>
      <img src={playlist.thumbnail} />
    </div>
  );
});

export default React.memo(function PlaylistBoard() {
  const [playlists, setPlaylists] = useState([]);
  const {
    state: { isLoggedIn },
  } = useContext(Context);
  const { id } = useParams();

  useLayoutEffect(() => {
    if (id && isLoggedIn) {
      getPlaylistBoardByUser(id).then((response) => {
        setPlaylists(response.results);
      });
    } else {
      getPlaylistBoard().then((response) => {
        setPlaylists(response.results);
      });
    }
  }, [id, isLoggedIn]);

  //데이터가 존재하지 않을경우 별도 처리
  if (!playlists) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h1>This is Board</h1>
      {playlists.map((playlist) => (
        <Playlist key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
});
