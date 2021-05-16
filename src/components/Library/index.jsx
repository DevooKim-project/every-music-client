import React, { useContext, useEffect, useState } from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import { TrackBoard } from "..";
import { Context } from "../../context";
import { getPlaylistBoardByUser } from "../../modules/actions";
import { getLibrary } from "../../modules/actions/userAction";
import useAsync from "../../modules/useAsync";

const Board = ({ playlist }) => {
  return (
    <div>
      <Link to={`/track/${playlist.id}`}>
        <div>
          {playlist.title} / {playlist.id}
        </div>
      </Link>

      <div>like - {playlist.like}</div>
      <img src={playlist.thumbnail} />
    </div>
  );
};

const Library = () => {
  const {
    state: { payload },
  } = useContext(Context);
  const [library, setLibrary] = useState(new Map());
  const fetchPlaylist = () => {
    return getPlaylistBoardByUser(payload.id);
  };
  const [libraryState, libraryRefetch] = useAsync(getLibrary, []);
  const [playlistState, playlistRefetch] = useAsync(fetchPlaylist, []);
  const { loading: libraryLoading, data: libraryData, error: libraryError } = libraryState;
  const { loading: playlistLoading, data: playlistData, error: playlistError } = playlistState;

  useEffect(() => {
    if (libraryData && playlistData) {
      libraryData.forEach((playlist) => {
        setLibrary((prev) => new Map([...prev, [playlist.id, playlist]]));
      });
      playlistData.results.forEach((playlist) => {
        setLibrary((prev) => new Map([...prev, [playlist.id, playlist]]));
      });
    }
  }, [libraryLoading, playlistLoading]);

  if (libraryLoading || playlistLoading) return <div>로딩중</div>;
  if (libraryError || playlistError) return <div>에러발생</div>;
  if (!libraryData || !playlistData) return null;

  return (
    <div>
      <h1>This is Library</h1>
      {Array.from(library).map(([key, playlist]) => (
        <Board key={key} playlist={playlist} />
      ))}
    </div>
  );
};

export default Library;
