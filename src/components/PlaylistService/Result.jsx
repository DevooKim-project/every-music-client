import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getTrackFromPlatform } from "../../modules/actions";
import { catchError } from "../../modules/actions/errorActions";
import useAsync from "../../modules/useAsync";
import ConvertForm from "./ConvertForm";
import UploadForm from "./UploadForm";

const Result = ({ platform, playlists, initPlatform }) => {
  const { source, destination } = platform;
  const fetchTrack = () => {
    return getTrackFromPlatform(source, playlists);
  };
  const [trackState, trackRefetch] = useAsync(fetchTrack, []);
  const { loading: trackLoading, data: trackData, error: trackError } = trackState;

  useEffect(() => {
    if (trackError) {
      catchError(trackError, initPlatform);
    }
  }, [trackError]);

  if (trackLoading) return <div>로딩중</div>;
  if (trackError) return <div>에러발생</div>;
  if (!trackData) return null;

  return (
    <>
      {destination === "upload" ? (
        <UploadForm playlists={playlists} tracks={trackData.tracks} />
      ) : (
        <>
          <ConvertForm
            destination={destination}
            playlists={playlists}
            tracks={trackData.tracks}
            initPlatform={initPlatform}
          />
          <UploadForm playlists={playlists} tracks={trackData.tracks} />
        </>
      )}
      <Link to="/">
        <button>메인으로 이동</button>
      </Link>
    </>
  );
};

export default Result;
