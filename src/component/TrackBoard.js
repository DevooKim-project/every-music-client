import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getTracks } from "../modules/actions";

const Track = React.memo(function Track({ track }) {
  console.log("track: ", track);
  return (
    <div>
      <div>title - {track.title}</div>
      <div>artist - {track.artist}</div>
      <img src={track.thumbnail} />
    </div>
  );
});

export default React.memo(function TrackBoard() {
  const [tracks, setTracks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getTracks(id).then((response) => {
      setTracks(response);
    });
  }, [id]);

  return (
    <div>
      <h1>This is Track</h1>
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
});
