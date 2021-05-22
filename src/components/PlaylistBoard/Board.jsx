import React from "react";
import { Link } from "react-router-dom";

const Board = ({ playlist }) => {
  return (
    <div owner={playlist.owner}>
      <Link to={`/track/${playlist.id}`}>
        <div>
          {playlist.title} / {playlist.id}
        </div>
      </Link>
      {/* <Route path="/track/:id" render={() => <TrackBoard playlist={playlist} />} /> */}

      <div>like - {playlist.like}</div>
      <Link to={`/board/${playlist.owner.id}`}>
        <button>{playlist.owner.nick}</button>
      </Link>
      <img src={playlist.thumbnail} />
    </div>
  );

  return <div></div>;
};

export default Board;
