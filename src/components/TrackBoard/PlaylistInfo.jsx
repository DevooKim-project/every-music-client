import React, { useState } from "react";
import { useParams } from "react-router";
import { likePlaylist } from "../../modules/actions";

const Update = ({ playlist }) => {
  return (
    <div>
      <h3>This is Edit</h3>
    </div>
  );
};

const Viewer = ({ playlist }) => {
  return (
    <div>
      <div>title - {playlist.title}</div>
      <div>uploader - {playlist.owner.nick}</div>
      <div>description - {playlist.description}</div>
    </div>
  );
};

const PlaylistInfo = ({ playlistBody, likeRefetch }) => {
  const { id } = useParams();
  const { playlist, isMine, isLike } = playlistBody;
  const [updateDisplay, setUpdateDisplay] = useState(false);
  const [update, setUpdate] = useState(playlist);
  console.log(isLike);

  let updateButton;
  let likeAndCancelButton;

  const onDisplay = () => {
    setUpdateDisplay((prev) => {
      return !prev;
    });
    setUpdate(playlist);
  };

  const onLike = () => {
    const state = !isLike ? "like" : "unlike";
    likePlaylist(id, state);
    likeRefetch();
    // setLike((prev) => {
    // return !prev;
    // });
  };

  if (updateDisplay) {
    updateButton = isMine ? <button onClick={updatePlaylist}>Save</button> : undefined;
    likeAndCancelButton = <button onClick={onDisplay}>Cancel</button>;
  }
  if (!updateDisplay) {
    updateButton = isMine ? <button onClick={onDisplay}>Edit</button> : undefined;
    likeAndCancelButton = <button onClick={onLike}>{isLike ? "unlike" : "like"}</button>;
  }

  return (
    <div>
      <div>------playlist--------</div>
      {updateDisplay ? <Update /> : <Viewer playlist={playlist} />}
      {updateButton}
      {likeAndCancelButton}
      <div>----------------------</div>
    </div>
  );
};

export default PlaylistInfo;
