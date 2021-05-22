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
  const [selectedPlatform, setSelectedPlatform] = useState(initData);
  const [playlists, setPlaylists] = useState([]);

  //비로그인 시 안나오도록 변경
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     alert("로그인 필요");
  //     window.history.back();
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    setSelectedPlatform((prev) => {
      return { source: prev.source };
    });
    setPlaylists([]);
  }, [selectedPlatform.source]);

  const initPlatform = () => {
    setSelectedPlatform(initData);
  };

  const platformHandler = (value, type) => {
    setSelectedPlatform((prev) => {
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
      <PlatformForm
        selectedPlatform={selectedPlatform}
        platformHandler={platformHandler}
        type={"source"}
      />
      {selectedPlatform.source && (
        <PlatformForm
          selectedPlatform={selectedPlatform}
          platformHandler={platformHandler}
          type={"destination"}
        />
      )}
      {selectedPlatform.destination && (
        <PlaylistForm
          source={selectedPlatform.source}
          initPlatform={initPlatform}
          playlistHandler={playlistHandler}
        />
      )}
      {playlists.length !== 0 && (
        <>
          {playlists.map((playlist) => (
            <p>{playlist.title}</p>
          ))}
          <Result
            selectedPlatform={selectedPlatform}
            playlists={playlists}
            initPlatform={initPlatform}
          />
        </>
      )}
    </div>
  );
};

export default Convert;
