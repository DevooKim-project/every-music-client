import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getPlaylistBoard } from "../../modules/actions";
import useAsync from "../../modules/useAsync";
import Board from "./Board";

const Playlist = () => {
  const { id } = useParams();
  const [state, refetch] = useAsync(() => getPlaylistBoard(id), [id]);
  const { loading, data, error } = state;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) return null;

  return (
    <div>
      {data.results.map((playlist) => (
        <Board key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
};

export default Playlist;
