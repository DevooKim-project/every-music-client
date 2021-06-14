import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import queryString from "query-string";
import { getPlaylists, getPlaylistsByUser, getUser } from "../../modules/actions";
import useAsync from "../../modules/useAsync";
import Playlists from "../../components/Playlists";
import Paginate from "../../components/Paginate";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

const fetchPlaylist = ({ id, currentPage, limit = 8, sort = { like: "desc" } }) => {
  return id
    ? getPlaylistsByUser(id, currentPage, limit, sort)
    : getPlaylists(currentPage, limit, sort);
};

const fetchUser = (id) => {
  return id ? getUser(id) : null;
};

const PlaylistsBoard = () => {
  const classes = useStyle();
  const { id } = useParams();
  const query = queryString.parse(window.location.search);
  const [currentPage, setCurrentPage] = useState(query.page || 1);
  const [userState, userRefetch] = useAsync(() => fetchUser(id), [id]);
  const [playlistsState, playlistsRefetch] = useAsync(
    () => fetchPlaylist({ id, currentPage }),
    [id, currentPage]
  );
  const { loading: playlistsLoading, data: playlistsData, error: playlistsError } = playlistsState;
  const { loading: userLoading, data: userData, error: userError } = userState;

  useEffect(() => {
    if (currentPage != query.page) {
      setCurrentPage(query.page || 1);
    }
  }, [query.page]);

  const currentPageHandler = (event, value) => {
    setCurrentPage(value);
    window.history.pushState({}, null, `/playlists/?page=${value}`);
  };

  if (playlistsLoading || userLoading) return <div>로딩중..</div>;
  if (playlistsError || userError) return <div>에러 발생</div>;
  if (!(playlistsData || userData)) return null;
  return (
    <div className={classes.root}>
      <Playlists playlists={playlistsData.results} userData={userData} />
      <Paginate
        defaultPage={currentPage}
        currentPageHandler={currentPageHandler}
        totalPages={playlistsData.totalPages}
      />
    </div>
  );
};

export default PlaylistsBoard;
