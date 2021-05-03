import React, { useEffect, useLayoutEffect, useState } from "react";
import { getLibrary } from "../modules/actions/userAction";
import "./Board.css";
function Board({ playlist }) {
  return (
    <div>
      <div>title: {playlist.title}</div>
      <img src={playlist.thumbnail} />
    </div>
  );
}

export default function Library() {
  const [library, setLibrary] = useState();

  useLayoutEffect(() => {
    getLibrary().then((response) => {
      console.log(response);
      setLibrary(response);
    });
  }, []);

  if (!library) {
    return <div>loading</div>;
  }

  return (
    <div>
      <h1>This is Library</h1>
      {library.map((playlist) => (
        <Board key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
}
