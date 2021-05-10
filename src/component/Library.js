import React, { useContext, useLayoutEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import { Context } from "../context";
import { getPlaylistBoardByUser } from "../modules/actions";
import { getLibrary } from "../modules/actions/userAction";
import "./Board.css";
import Track from "./Track";
function Board({ playlist }) {
  return (
    <div>
      <Link to={`/track/${playlist.id}`}>
        <div>
          {playlist.title} / {playlist.id}
        </div>
      </Link>
      <Route path="/track/:id" render={() => <Track playlist={playlist} />} />

      <div>like - {playlist.like}</div>
      <img src={playlist.thumbnail} />
    </div>
  );
}

export default function Library() {
  const {
    state: { payload },
  } = useContext(Context);
  const [library, setLibrary] = useState(new Map());

  useLayoutEffect(() => {
    getLibrary().then((response) => {
      response.forEach((playlist) => {
        setLibrary((prev) => new Map([...prev, [playlist.id, playlist]]));
      });
    });

    getPlaylistBoardByUser(payload.id).then(({ results }) => {
      results.forEach((playlist) => {
        setLibrary((prev) => new Map([...prev, [playlist.id, playlist]]));
      });
    });
  }, []);

  if (!library.size) {
    return <div>loading</div>;
  }

  return (
    <div>
      <h1>This is Library</h1>
      {Array.from(library).map(([key, playlist]) => (
        <Board key={key} playlist={playlist} />
      ))}
    </div>
  );
}
