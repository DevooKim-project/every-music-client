import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import queryString from "query-string";
import { getPlaylistBoard } from "../../modules/actions";
import useAsync from "../../modules/useAsync";
import Paginate from "../Common/Paginate";
import Board from "./Board";

const Playlist = () => {
  const { id } = useParams();
  const query = queryString.parse(window.location.search);
  const [currentPage, setCurrentPage] = useState(query.page || 1);

  const [state, refetch] = useAsync(() => getPlaylistBoard(id, currentPage, 5), [id, currentPage]);
  const { loading, data, error } = state;

  useEffect(() => {
    if (currentPage != query.page) {
      setCurrentPage(query.page || 1);
    }
  }, [query.page]);

  const currentPageHandler = (event, value) => {
    setCurrentPage(value);
    window.history.pushState({}, null, `/board/?page=${value}`);
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) return null;

  return (
    <div>
      {data.results.map((playlist) => (
        <Board key={playlist.id} playlist={playlist} />
      ))}
      <Paginate
        defaultPage={currentPage}
        currentPageHandler={currentPageHandler}
        totalPages={data.totalPages}
      />
    </div>
  );
};

export default Playlist;
