import React, { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";

import { useParams } from "react-router";
import { getTracks, likePlaylist } from "../modules/actions";
import { getLibrary } from "../modules/actions/userAction";
import { Context } from "../context";

function Track({ track }) {
  return (
    <div>
      <div>title - {track.title}</div>
      <div>artist - {track.artist}</div>
      <img src={track.thumbnail} />
    </div>
  );
}

export default function TrackBoard() {
  const [playlist, setPlaylist] = useState();
  const [tracks, setTracks] = useState([]);
  const [like, setLike] = useState();
  const {
    state: { isLoggedIn },
  } = useContext(Context);
  const { id } = useParams();

  useLayoutEffect(() => {
    if (isLoggedIn) {
      getLibrary(id)
        .then((response) => {
          setLike(response.isLike);
        })
        .catch(() => {});
    }
  }, [isLoggedIn]);

  useLayoutEffect(() => {
    getTracks(id).then((response) => {
      setTracks(response.tracks);
      response.tracks = undefined;
      setPlaylist(response);
    });
  }, []);

  const onLike = useCallback(() => {
    const state = !like ? "like" : "unlike";
    likePlaylist(id, state);
    setLike((prev) => {
      return !prev;
    });
  }, [like]);

  //데이터가 존재하지 않을경우 별도 처리
  if (!playlist || !tracks) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h1>This is Track</h1>
      <div>-----playlist-----</div>
      <div>title - {playlist.title}</div>
      <div>uploader - {playlist.owner.nick}</div>
      <button onClick={onLike}>{like ? "unlike" : "like"}</button>
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
}
