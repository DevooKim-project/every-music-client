import axios from "axios";

export const getUser = async (id) => {
  const options = {
    method: "GET",
    url: `/user/${id}`,
  };
  const response = await axios(options);
  return response.data;
};

export const getLibrary = async (playlistId = null) => {
  const options = {
    method: "GET",
    url: playlistId ? `/user/library/${playlistId}` : `/user/library`,
  };
  const response = await axios(options);
  return response.data;
};
