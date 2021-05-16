import React, { useCallback, useEffect, useState } from "react";
import { likePlaylist } from "../../modules/actions";
import UpdateForm from "./UpdateForm";

const Playlist = ({ playlist }) => {
  return (
    <div>
      <div>-----playlist-----</div>
      <div>title - {playlist.title}</div>
      <div>uploader - {playlist.owner.nick}</div>
      <div>description - {playlist.description}</div>
      <div>---------------------</div>
    </div>
  );
};

const PlaylistInfo = ({ playlistBody, likeData, context }) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [playlist, setPlaylist] = useState({ playlist: null, isMine: false, like: false });
  const [like, setLike] = useState(false);
  const [render, setRender] = useState(false);
  const { id, isLoggedIn, payload } = context;

  useEffect(() => {
    setPlaylist({
      ...playlistBody,
      isMine: payload ? playlistBody.owner.id === payload.id : false,
    });
    // setLike(likeData.isLike);
    likeData ? setLike(likeData.isLike) : setLike(false);
    setRender(true);
  }, []);

  const openUpdateHandler = () => {
    setOpenUpdate((prev) => {
      return !prev;
    });
  };

  const onLike = useCallback(() => {
    if (!isLoggedIn) {
      return alert("로그인 후 이용");
    }
    const state = !like ? "like" : "unlike";
    likePlaylist(id, state);
    setLike((prev) => {
      return !prev;
    });
  }, [like]);

  if (!render) return null;

  return (
    <div>
      <Playlist playlist={playlist} />
      <UpdateForm
        playlist={playlist}
        setPlaylist={setPlaylist}
        openUpdate={openUpdate}
        openUpdateHandler={openUpdateHandler}
      />
      {playlist.isMine && <button onClick={openUpdateHandler}>Edit</button>}
      <button onClick={onLike}>{like ? "unlike" : "like"}</button>
    </div>
  );
};

export default PlaylistInfo;
