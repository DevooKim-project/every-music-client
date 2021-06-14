import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

import PlatformForm from "./PlatformForm";
import PlaylistForm from "./PlaylistForm";
import Result from "./Result";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "flex-start",
    alignItems: "center",
    // padding: theme.spacing(1),
    paddingTop: theme.spacing(1),
    // background: "#EBEBEB",
  },
}));

const initData = {
  source: null,
  destination: null,
};
const Convert = () => {
  const classes = useStyle();
  const [selectedPlatform, setSelectedPlatform] = useState(initData);
  const [playlists, setPlaylists] = useState([]);

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
    <div className={classes.root}>
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
