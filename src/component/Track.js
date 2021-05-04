import React, { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { useParams } from "react-router";
import { getTracks, likePlaylist, updatePlaylistOptions } from "../modules/actions";
import { getLibrary } from "../modules/actions/userAction";
import { Context } from "../context";

const Update = React.memo(function Update({ playlist, setPlaylist }) {
  const { title, description, visible } = playlist;

  const onChange = (e) => {
    const { value, name } = e.target;
    console.log(value);
    setPlaylist({
      ...playlist,
      [name]: value,
    });
  };

  const onRadioChange = (e) => {
    const { value, name } = e.target;
    setPlaylist({
      ...playlist,
      [name]: value === "public" ? true : false,
    });
  };
  return (
    <div>
      <h3>This is Edit</h3>
      <input name="title" placeholder={title} onChange={onChange} value={title} />
      <p></p>
      <input name="description" placeholder={description} onChange={onChange} value={description} />
      <p></p>
      <input
        type="radio"
        name="visible"
        onChange={onRadioChange}
        checked={visible === "public" || visible}
        value={"public"}
      />
      <div>public</div>
      <input
        type="radio"
        name="visible"
        onChange={onRadioChange}
        checked={visible === "private" || !visible}
        value={"private"}
      />
      <div>private</div>
    </div>
  );
});

const Playlist = React.memo(function Playlist({ playlist }) {
  return (
    <div>
      <div>title - {playlist.title}</div>
      <div>uploader - {playlist.owner.nick}</div>
      <div>description - {playlist.description}</div>
    </div>
  );
});

const Board = React.memo(function Board({ track }) {
  return (
    <div>
      <div>title - {track.title}</div>
      <div>artist - {track.artist.name}</div>
      <img src={track.thumbnail} />
    </div>
  );
});

export default function Track() {
  const [playlist, setPlaylist] = useState();
  const [tracks, setTracks] = useState([]);
  const [like, setLike] = useState();
  const [update, setUpdate] = useState();
  const [updateDisplay, setUpdateDisplay] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const { id } = useParams();
  const {
    state: { isLoggedIn, payload },
  } = useContext(Context);

  let updateButton;
  let likeAndCancelButton;
  const onDisplay = useCallback(() => {
    setUpdateDisplay((prev) => {
      return !prev;
    });
    setUpdate(playlist);
  });

  const onLike = useCallback(() => {
    const state = !like ? "like" : "unlike";
    likePlaylist(id, state);
    setLike((prev) => {
      return !prev;
    });
  }, [like]);

  const updatePlaylist = useCallback(() => {
    updatePlaylistOptions(update).then((response) => {
      response.tracks = undefined;
      setPlaylist(response);
      setUpdateDisplay((prev) => {
        return !prev;
      });
    });
  });

  if (updateDisplay) {
    updateButton = isMine ? <button onClick={updatePlaylist}>Save</button> : undefined;
    likeAndCancelButton = <button onClick={onDisplay}>Cancel</button>;
  }
  if (!updateDisplay) {
    updateButton = isMine ? <button onClick={onDisplay}>Edit</button> : undefined;
    likeAndCancelButton = <button onClick={onLike}>{like ? "unlike" : "like"}</button>;
  }

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
      setIsMine(payload ? response.owner.id === payload.id : false);
    });
  }, [payload]);

  //데이터가 존재하지 않을경우 별도 처리
  if (!playlist || !tracks) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h1>This is Track</h1>
      <div>-----playlist-----</div>
      {updateDisplay ? <Update playlist={update} setPlaylist={setUpdate} /> : <Playlist playlist={playlist} />}
      {updateButton}
      {likeAndCancelButton}
      <div>---------------------</div>
      {tracks.map((track) => (
        <Board key={track.id} track={track} />
      ))}
    </div>
  );
}
