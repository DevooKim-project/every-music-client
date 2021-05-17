import React, { useCallback, useEffect, useState } from "react";
import { deletePlaylist, likePlaylist } from "../../modules/actions";
import Modal from "../Common/Modal";
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
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
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

  const updateModalHandler = () => {
    setOpenUpdateModal((prev) => {
      return !prev;
    });
  };

  const deleteModalHandler = () => {
    setOpenDeleteModal((prev) => {
      return !prev;
    });
  };

  const deletePlaylistHandler = async () => {
    await deletePlaylist(playlist.id);
    window.history.back();
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
        openUpdate={openUpdateModal}
        openUpdateHandler={updateModalHandler}
      />
      {playlist.isMine && <button onClick={updateModalHandler}>Edit</button>}
      {playlist.isMine && <button onClick={deleteModalHandler}>Delete</button>}
      <button onClick={onLike}>{like ? "unlike" : "like"}</button>
      <Modal
        open={openDeleteModal}
        successHandler={deletePlaylistHandler}
        successText={"Delete"}
        close={deleteModalHandler}
        header={"Delete Playlist"}
      >
        플레이리스트를 삭제합니다.
      </Modal>
    </div>
  );
};

export default PlaylistInfo;
