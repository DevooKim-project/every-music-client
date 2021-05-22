import React, { useEffect } from "react";
import { convertPlaylist } from "../../modules/actions";
import { catchError } from "../../modules/actions/errorActions";
import useAsync from "../../modules/useAsync";

const ConvertForm = ({ destination, playlists, tracks, initPlatform }) => {
  const [convertState, convertRefetch] = useAsync(
    () => convertPlaylist(destination, playlists, tracks),
    [],
    true
  );
  const { loading, data: convertData, error } = convertState;

  useEffect(() => {
    if (error) {
      catchError(error, initPlatform);
    }
  }, [error]);

  const goPlatformHandler = (platform, playlistId = undefined) => {
    let url;
    if (platform === "google") {
      url = `https://www.youtube.com/playlist?list=${playlistId}`;
    }
    if (platform === "spotify") {
      url = `https://open.spotify.com/playlist/${playlistId}`;
    }
    window.open(url);
  };

  if (loading) return <div>변환중</div>;
  if (error) return <div>에러발생</div>;

  return (
    <div>
      <button disabled={convertData} onClick={convertRefetch}>
        변환하기
      </button>
      {convertData && (
        <div>
          <div>변환 완료</div>
          {convertData.playlists.map((playlist) => (
            <button
              key={playlist.platformId}
              onClick={() => {
                goPlatformHandler(destination, playlist.platformId);
              }}
            >
              {playlist.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConvertForm;
