import React, { useContext, useEffect, useState } from "react";

import { getPlaylistsByUser, getLibrary } from "../../modules/actions";
import useAsync from "../../modules/useAsync";
import { Context } from "../../context";
import Playlists from "../../components/Playlists";

const User = () => {
  const {
    state: { isLoggedIn, payload },
  } = useContext(Context);
  const [library, setLibrary] = useState(new Map());
  const [libraryState, libraryRefetch] = useAsync(getLibrary, [], true);
  const [playlistState, playlistRefetch] = useAsync(() => getPlaylistsByUser(payload.id), [], true);
  const { loading: libraryLoading, data: libraryData, error: libraryError } = libraryState;
  const { loading: playlistLoading, data: playlistData, error: playlistError } = playlistState;

  useEffect(() => {
    if (isLoggedIn) {
      libraryRefetch();
      playlistRefetch();
    }
  }, [isLoggedIn]);

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
  // if (!library.size) return null;

  return (
    <div>
      <Playlists playlists={Array.from(library.values())} userData={payload} />
    </div>
  );
};

export default User;
