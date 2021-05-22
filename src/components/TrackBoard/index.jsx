import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { Context } from "../../context";
import { getTracks } from "../../modules/actions";
import { getLibrary } from "../../modules/actions/userAction";
import useAsync from "../../modules/useAsync";
import PlaylistInfo from "./PlaylistInfo";

const Board = ({ track }) => {
  return (
    <div>
      <div>title - {track.title}</div>
      <div>artist - {track.artist.name}</div>
      <img src={track.thumbnail} />
    </div>
  );
};

const Track = () => {
  const { id } = useParams();
  const {
    state: { isLoggedIn, payload },
  } = useContext(Context);

  const [trackState, trackRefetch] = useAsync(() => getTracks(id), []);
  const [likeState, likeRefetch] = useAsync(() => getLibrary(id), [], true);
  const { loading: trackLoading, data: trackData, error: trackError } = trackState;
  const { loading: likeLoading, data: likeData, error: likeError } = likeState;

  useEffect(() => {
    if (isLoggedIn) {
      likeRefetch();
    }
  }, [isLoggedIn]);

  if (trackLoading || likeLoading) return <div>로딩중..</div>;
  if (trackError || likeError) return <div>에러 발생</div>;
  if (!trackData || (isLoggedIn === true && !likeData)) return null;

  return (
    <div>
      <h1>This is Track</h1>
      <div className="top">
        <PlaylistInfo
          playlistBody={trackData.playlist}
          likeData={likeData}
          context={{ id, isLoggedIn, payload }}
        />
      </div>
      <div className="bottom">
        {trackData.tracks.map((track) => (
          <Board key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Track);
