import React from "react";
import { getTrackFromPlatform } from "../../modules/actions";
import useAsync from "../../modules/useAsync";
import ConvertForm from "./ConvertForm";
import UploadForm from "./UploadForm";

const Result = ({ platform, playlists }) => {
  const { source, destination } = platform;
  const fetchTrack = () => {
    return getTrackFromPlatform(source, playlists);
  };
  const [trackState, trackRefetch] = useAsync(fetchTrack, []);
  const { loading: trackLoading, data: trackData, error: trackError } = trackState;

  if (trackLoading) return <div>로딩중</div>;
  if (trackError) return <div>에러발생</div>;
  if (!trackData) return null;

  return (
    <>
      {destination === "upload" ? (
        <UploadForm playlists={playlists} tracks={trackData.tracks} />
      ) : (
        <>
          <ConvertForm destination={destination} playlists={playlists} tracks={trackData.tracks} />
          <UploadForm playlists={playlists} tracks={trackData.tracks} />
        </>
      )}
    </>
  );
};

export default Result;
