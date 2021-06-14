import React from "react";
import { makeStyles, Paper } from "@material-ui/core";

import { getPlaylists } from "../../modules/actions";
import useAsync from "../../modules/useAsync";
import HomePlaylists from "../../components/HomePlaylists";
import Main from "../../components/Home";

const useStyle = makeStyles((theme) => ({
  main: {
    // height: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const LIMIT = 6;
const fetchPlaylists = () => {
  return getPlaylists(1, LIMIT, { _id: "desc" });
};

const Home = () => {
  const classes = useStyle();
  const [playlistsState, playlistsRefetch] = useAsync(() => fetchPlaylists(), []);
  const { loading: playlistsLoading, data: playlistsData, error: playlistsError } = playlistsState;

  if (playlistsLoading) return <div>loading</div>;
  if (playlistsError) return <div>error</div>;
  if (!playlistsData) return null;

  return (
    <>
      <Paper className={classes.main} elevation={3}>
        <Main />
        {playlistsData && <HomePlaylists playlists={playlistsData.results} />}
      </Paper>
    </>
  );
};

export default Home;
