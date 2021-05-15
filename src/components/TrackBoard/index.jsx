import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Context } from "../../context";
import { getTracks } from "../../modules/actions";
import { getLibrary } from "../../modules/actions/userAction";
import useAsync from "../../modules/useAsync";
import PlaylistInfo from "./PlaylistInfo";

const TrackBoard = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState();
  const [likeState, likeRefetch] = useAsync(getLibrary(id), [], true);
  const [trackState, trackRefetch] = useAsync(getTracks(id), [], true);
  const {
    state: { payload },
  } = useContext(Context);
  const { data: likeData } = likeState;
  const { loading, data: trackData, error } = trackState;

  useEffect(() => {
    likeRefetch();
    trackRefetch();
  }, []);

  useEffect(() => {
    if (trackData && likeData) {
      console.log("dd");
      setPlaylist({
        playlist: trackData.playlist,
        isMine: payload ? trackData.playlist.owner.id === payload.id : false,
        isLike: likeData.isLike,
      });
    }
  }, [trackData, likeData]);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러 발생</div>;
  if (!trackData || !playlist) return null;

  return (
    <div>
      <h1>This is Track</h1>
      <PlaylistInfo playlistBody={playlist} likeRefetch={likeRefetch} />
      {/* {trackData.track.map((track) => (
        <div key={track.id}>{track.title}</div>
      ))} */}
    </div>
  );
};

export default TrackBoard;
