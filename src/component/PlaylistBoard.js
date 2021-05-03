import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useParams } from "react-router";

import { getPlaylistBoard, getPlaylistBoardByUser } from "../modules/actions";
import "./Board.css";

const Playlist = React.memo(function Playlist({ playlist }) {
  return (
    <div owner={playlist.owner}>
      <Link to={`/track/${playlist.id}`}>
        <div>
          {playlist.title} / {playlist.id}
        </div>
      </Link>
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
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getPlaylistBoardByUser(id).then((response) => {
        setPlaylists(response.results);
      });
    } else {
      getPlaylistBoard().then((response) => {
        setPlaylists(response.results);
      });
    }
  }, [id]);
  console.log(playlists[0]);

  return (
    <div>
      <h1>This is Board</h1>
      {playlists.map((playlist) => (
        <Playlist key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
});
