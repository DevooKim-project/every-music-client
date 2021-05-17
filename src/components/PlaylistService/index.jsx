import React, { useContext, useEffect, useState } from "react";

import { Context } from "../../context";
import PlatformForm from "./PlatformForm";
import "./Convert.css";
import PlaylistForm from "./PlaylistForm";
import Result from "./Result";

const initData = {
  source: null,
  destination: null,
};

const Convert = () => {
  const {
    state: { isLoggedIn },
  } = useContext(Context);
  const [platform, setPlatform] = useState(initData);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인 필요");
      window.history.back();
    }
  }, []);

  useEffect(() => {
    setPlatform((prev) => {
      return { source: prev.source };
    });
    setPlaylists([]);
  }, [platform.source]);

  const initPlatform = () => {
    setPlatform(initData);
  };

  const platformHandler = (value, type) => {
    setPlatform((prev) => {
      const obj = { ...prev };
      obj[type] = value;
      return obj;
    });
  };

  const playlistHandler = (value) => {
    setPlaylists(value);
  };

  return (
    <div>
      <h1>This is Convert</h1>
      <PlatformForm platform={platform} platformHandler={platformHandler} type={"source"} />
      {platform.source && (
        <PlatformForm platform={platform} platformHandler={platformHandler} type={"destination"} />
      )}
      {platform.destination && (
        <PlaylistForm
          source={platform.source}
          initPlatform={initPlatform}
          playlistHandler={playlistHandler}
        />
      )}
      {playlists.length !== 0 && (
        <>
          {playlists.map((playlist) => (
            <p>{playlist.title}</p>
          ))}
          <Result platform={platform} playlists={playlists} type={"convert"} />
        </>
      )}
    </div>
  );
};

export default Convert;
